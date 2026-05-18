<?php

namespace App\Http\Controllers\Api\Media;
//ss
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

use App\Logic\Media\Images;
use App\Models\Media\Image;
use App\Config\Collections as CollectionsConfig;

class ImagesController extends Controller
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
                    $image = Image::findOrFail($request->id);
                    
                    $config = Images::getConfig($image->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canView')($image->container_name, $image->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    return Response::success([
                        'image' => Images::formatResponseData($image),
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
                    $config = Images::getConfig($request->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canView')($request->container_name, $request->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    $images = Images::getImageList($request->container_name, $request->container_id);
                    
                    return Response::success([
                        'images' => $images,
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
                    init_long_operation();
                    $container_name = $request->container_name; 
                    
                    if ($request->has('collection_name')) { 
                        $imagesConfig = Arr::get(CollectionsConfig::get(), $request->collection_name.'.imagesConfig', '');
                        if (!empty($imagesConfig)) {
                            $container_name = $imagesConfig;
                        }
                    } 
                    
                    $config = Images::getConfig($container_name);
                    
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
                      
                    $images = [];
                    
                    foreach ($files as $file) {
                        
                        
                        if (is_callable($beforeCreate)) {
                            $beforeCreate($request, $file);
                        }
                        
                        if (is_callable($onCreate)) {
                            $image = $onCreate($request, $file);                            
                        }
                        else {
                            $image = Images::create($file->getRealPath(), $request->container_name, $request->container_id);
                            
                        }
                        
                        $images[] = Images::formatResponseData($image);
                        
                        if (is_callable($afterCreate)) {
                            $afterCreate($request, $image);
                        }
                    }
                    
                    return Response::success([
                        'images' => $images,
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
                    init_long_operation();
                    $image = Image::findOrFail($request->id);
                    
                    $config = Images::getConfig($image->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canEdit')($image->container_name, $image->container_id, $auth_user)) {
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
                        $beforeUpdate($request, $image);
                    }

                    if (is_callable($onUpdate)) {
                        $onUpdate($request, $image);
                    }
                    else {
                        Images::update($image, $request->file->getRealPath());                        
                    }

                    if (is_callable($afterUpdate)) {
                        $afterUpdate($request, $image);
                    }
                    
                    return Response::success([
                        'msg' => 'Image updated!',
                        'image' => Images::formatResponseData($image),
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
                    $image = Image::findOrFail($request->id);
                    
                    $config = Images::getConfig($image->container_name);
                                        
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canEdit')($image->container_name, $image->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    //callbacks
                    $beforeDelete = Arr::get($config, 'callbacks.beforeDelete');
                    $onDelete = Arr::get($config, 'callbacks.onDelete');
                    $afterDelete = Arr::get($config, 'callbacks.afterDelete');
                    $deleteCustomResponse = Arr::get($config, 'callbacks.deleteCustomResponse');
                                        
                    if (is_callable($beforeDelete)) {
                        $beforeDelete($request, $image);
                    }

                    if (is_callable($onDelete)) {
                        $onDelete($request, $image);
                    }
                    else {
                        Images::delete($image);                        
                    }

                    if (is_callable($afterDelete)) {
                        $afterDelete($request, $image);
                    }
                    
                    if (is_callable($deleteCustomResponse)) {
                        return Response::success($deleteCustomResponse($request, $image));                        
                    }
                    
                    return Response::success([
                        'msg' => 'Image is deleted!',
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
                    $config = Images::getConfig($request->container_name);
                    
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
                        reorder($request->ids, Image::class);                       
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