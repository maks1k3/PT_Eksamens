<?php

namespace App\Http\Controllers\Api\Media;
//s
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

use App\Logic\Media\Files;
use App\Models\Media\File;
use App\Config\Collections as CollectionsConfig;

class FilesController extends Controller
{
    /**
    * Constructor
    *
    * @return void
    */
    public function __construct()
    {


    }
    
    /**
    * Actions
    *
    * @access public
    * @return json 
    */
    public function actions(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="actions">
        $auth_user = auth()->user(); 

        $actions = [

            //get
            'get' => [        
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) use ($auth_user) {
                //<editor-fold defaultstate="collapsed" desc="get">            
                    $file = File::findOrFail($request->id);
                    
                    $config = Files::getConfig($file->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canView')($file->container_name, $file->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    return Response::success([
                        'file' => Files::formatResponseData($file),
                    ]);
                //</editor-fold>     
                },
            ],       
                        
            //list
            'list' => [        
                'rules' => [
                    'container_name' => 'required|string',
                    'container_id' => 'required|integer',
                ],
                'action' => function($request) use ($auth_user) {
                //<editor-fold defaultstate="collapsed" desc="list"> 
                    $config = Files::getConfig($request->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canView')($request->container_name, $request->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    $files = Files::getFileList($request->container_name, $request->container_id);
                    
                    return Response::success([
                        'files' => $files,
                    ]);                   
                //</editor-fold>     
                },
            ],         
                        
            //upload
            'upload' => [        
                'rules' => [
                    'container_name' => 'required|string',
                    'container_id' => 'required|integer',
                ],
                'action' => function($request) use ($auth_user) {
                //<editor-fold defaultstate="collapsed" desc="upload"> 
                    $container_name = $request->container_name; 
                    
                    if ($request->has('collection_name')) { 
                        $filesConfig = Arr::get(CollectionsConfig::get(), $request->collection_name.'.filesConfig', '');
                        if (!empty($filesConfig)) {
                            $container_name = $filesConfig;
                        }
                    }  
                    
                    $config = Files::getConfig($container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canEdit')($request->container_name, $request->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    $validation_rules = Arr::get($config, 'rules');
                    
                    //validation
                    $rules = [];
                    if (is_array($request->file)) {
                        $nbr = count($request->file) - 1;

                        foreach(range(0, $nbr) as $index) {
                            $rules['file.' . $index] = $validation_rules;
                        }
                    }
                    else {
                        $rules['file'] = $validation_rules;
                    }

                    $validate = Response::validate($request->all(), $rules);
                    if ($validate) return $validate;
                    
                    $files = [];
                    
                    if (is_array($request->file)) {
                        $files = $request->file;
                    }
                    else {
                        $files[] = $request->file;
                    }
                    
                    if (empty($files)) {
                        return Response::error('No files!');  
                    }
                    
                    //callbacks
                    $beforeCreate = Arr::get($config, 'callbacks.beforeCreate');
                    $onCreate = Arr::get($config, 'callbacks.onCreate');
                    $afterCreate = Arr::get($config, 'callbacks.afterCreate');
                      
                    $result = [];
                    
                    foreach ($files as $file) {
                        $request->file = $file;
                        
                        if (is_callable($beforeCreate)) {
                            $beforeCreate($request, $file);
                        }
                        
                        if (is_callable($onCreate)) {
                            $tmp = $onCreate($request, $file);
                        }
                        else {
                            $tmp = Files::create(
                                $file->getRealPath(), 
                                pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME), 
                                $file->getClientOriginalExtension(), 
                                $request->container_name, 
                                $request->container_id
                            );                            
                        }
                        
                        $result[] = Files::formatResponseData($tmp);
                        
                        if (is_callable($afterCreate)) {
                            $afterCreate($request, $tmp);
                        }
                    }
                    
                    return Response::success([
                        'files' => $result,
                    ]);
                //</editor-fold>     
                },
            ],         
                        
            //reupload
            'reupload' => [        
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) use ($auth_user) {
                //<editor-fold defaultstate="collapsed" desc="reupload"> 
                    $file = File::findOrFail($request->id);
                    
                    $config = Files::getConfig($file->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canEdit')($file->container_name, $file->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    $validation_rules = Arr::get($config, 'rules');
                    
                    $validate = Response::validate($request->all(), ['file' => $validation_rules]);
                    if ($validate) return $validate;
                    
                    //callbacks
                    $beforeUpdate = Arr::get($config, 'callbacks.beforeUpdate');
                    $onUpdate = Arr::get($config, 'callbacks.onUpdate');
                    $afterUpdate = Arr::get($config, 'callbacks.afterUpdate');
                    
                    if (is_callable($beforeUpdate)) {
                        $beforeUpdate($request, $file);
                    }

                    if (is_callable($onUpdate)) {
                        $onUpdate($request, $file);
                    }
                    else {
                        Files::update(
                            $request->file->getRealPath(), 
                            pathinfo($request->file->getClientOriginalName(), PATHINFO_FILENAME), 
                            $request->file->getClientOriginalExtension(), 
                            $file 
                        );                                        
                    }

                    if (is_callable($afterUpdate)) {
                        $afterUpdate($request, $file);
                    }
                    
                    return Response::success([                       
                        'file' => Files::formatResponseData($file),
                    ]);
                //</editor-fold>     
                },
            ],         
 
            //rename
            'rename' => [        
                'rules' => [
                    'id' => 'required|integer',
                    'display_name' => 'required|string', 
                ],
                'action' => function($request) use ($auth_user) {
                //<editor-fold defaultstate="collapsed" desc="rename"> 
                    $file = File::findOrFail($request->id);
                    
                    $config = Files::getConfig($file->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canEdit')($file->container_name, $file->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    //callbacks
                    $beforeRename = Arr::get($config, 'callbacks.beforeRename');
                    $onRename = Arr::get($config, 'callbacks.onRename');
                    $afterRename = Arr::get($config, 'callbacks.afterRename');
                    
                    if (is_callable($beforeRename)) {
                        $beforeRename($request, $file);
                    }

                    if (is_callable($onRename)) {
                        $onRename($request, $file);
                    }
                    else {
                        $file->display_name = $request->display_name;
                        $file->save();                      
                    }

                    if (is_callable($afterRename)) {
                        $afterRename($request, $file);
                    }                      
                    
                    return Response::success([
                        'file' => Files::formatResponseData($file),
                    ]); 
                //</editor-fold>     
                },
            ],                         
                        
            //delete
            'delete' => [        
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) use ($auth_user) {
                //<editor-fold defaultstate="collapsed" desc="delete"> 
                    $file = File::findOrFail($request->id);
                    
                    $config = Files::getConfig($file->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canEdit')($file->container_name, $file->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    //callbacks
                    $beforeDelete = Arr::get($config, 'callbacks.beforeDelete');
                    $onDelete = Arr::get($config, 'callbacks.onDelete');
                    $afterDelete = Arr::get($config, 'callbacks.afterDelete');
                    $deleteCustomResponse = Arr::get($config, 'callbacks.deleteCustomResponse');
                    
                    if (is_callable($beforeDelete)) {
                        $beforeDelete($request, $file);
                    }

                    if (is_callable($onDelete)) {
                        $onDelete($request, $file);
                    }
                    else {
                        Files::delete($file);                        
                    }

                    if (is_callable($afterDelete)) {
                        $afterDelete($request, $file);
                    }
                    
                    if (is_callable($deleteCustomResponse)) {
                        return Response::success($deleteCustomResponse($request, $file));                        
                    }
                    
                    return Response::success([
                        'msg' => 'File is deleted!',
                    ]);
                //</editor-fold>     
                },
            ],        
                        
            //reorder
            'reorder' => [        
                'rules' => [
                    'container_name' => 'required|string',
                    'container_id' => 'required|integer',
                    'ids' => 'required|string',
                ],
                'action' => function($request) use ($auth_user) {
                //<editor-fold defaultstate="collapsed" desc="reorder"> 
                    $config = Files::getConfig($request->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canEdit')($request->container_name, $request->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    if (Arr::get($config, 'updatePosition') === false) {
                        abort(404);
                    }
                    
                    //callbacks
                    $beforeReorder = Arr::get($config, 'callbacks.beforeReorder');
                    $onReorder = Arr::get($config, 'callbacks.onReorder');
                    $afterReorder = Arr::get($config, 'callbacks.afterReorder');
                    
                    if (is_callable($beforeReorder)) {
                        $beforeReorder($request);
                    }

                    if (is_callable($onReorder)) {
                        $onReorder($request);
                    }
                    else {
                        reorder($request->ids, File::class);                       
                    }

                    if (is_callable($afterReorder)) {
                        $afterReorder($request);
                    }                      
                    
                    return Response::success([
                        'msg' => 'New order saved!', 
                    ]); 
                //</editor-fold>     
                },
            ],                   

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    

}