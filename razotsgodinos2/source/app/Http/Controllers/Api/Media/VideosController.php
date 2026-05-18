<?php

namespace App\Http\Controllers\Api\Media;
//s
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

use App\Logic\Media\Videos;
use App\Models\Media\Video;
use App\Helpers\Media\VideoHelper;
use App\Config\Collections as CollectionsConfig;

class VideosController extends Controller
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
                    $video = Video::findOrFail($request->id);
                    
                    $config = Videos::getConfig($video->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canView')($video->container_name, $video->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    return Response::success([
                        'video' => Videos::formatResponseData($video),
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
                    $config = Videos::getConfig($request->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canView')($request->container_name, $request->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    $videos = Videos::getVideoList($request->container_name, $request->container_id);
                    
                    return Response::success([
                        'videos' => $videos,
                    ]);                   
                //</editor-fold>     
                },
            ],         
                        
            //add
            'add' => [        
                'rules' => [
                    'container_name' => 'required|string',
                    'container_id' => 'required|integer',
                    'url' => 'required|url',
                ],
                'action' => function($request) use ($auth_user) {
                //<editor-fold defaultstate="collapsed" desc="add"> 
                    $container_name = $request->container_name; 
                    
                    if ($request->has('collection_name')) { 
                        $videosConfig = Arr::get(CollectionsConfig::get(), $request->collection_name.'.videosConfig', '');
                        if (!empty($videosConfig)) {
                            $container_name = $videosConfig;
                        }
                    }  
                    
                    $config = Videos::getConfig($container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canEdit')($request->container_name, $request->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    $video_data = VideoHelper::getVideoData($request->url);
                    
                    if ($video_data === false) {
                        return Response::error("{$request->url} is not a video!");  
                    }                    
                    
                    //callbacks
                    $beforeCreate = Arr::get($config, 'callbacks.beforeCreate');
                    $onCreate = Arr::get($config, 'callbacks.onCreate');
                    $afterCreate = Arr::get($config, 'callbacks.afterCreate');
                      
                    if (is_callable($beforeCreate)) {
                        $video_data = $beforeCreate($request, $video_data);
                    }

                    if (is_callable($onCreate)) {
                        $video = $onCreate($request, $video_data);
                    }
                    else {
                        $video = Videos::create($video_data, $request->container_name, $request->container_id);
                    }

                    if (is_callable($afterCreate)) {
                        $afterCreate($request, $video, $video_data);
                    }
                    
                    return Response::success([
                        'video' => Videos::formatResponseData($video),
                    ]);
                //</editor-fold>     
                },
            ],         
                        
            //update
            'update' => [        
                'rules' => [
                    'id' => 'required|integer',
                    'url' => 'required|url',
                ],
                'action' => function($request) use ($auth_user) {
                //<editor-fold defaultstate="collapsed" desc="update"> 
                    $video = Video::findOrFail($request->id);
                    
                    $config = Videos::getConfig($video->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canEdit')($video->container_name, $video->container_id, $auth_user)) {
                        abort(404);
                    }
                  
                    $video_data = VideoHelper::getVideoData($request->url);
                 
                    if ($video_data === false) {
                        return Response::error("{$request->url} is not a video!");  
                    }                    
                                        
                    //callbacks
                    $beforeUpdate = Arr::get($config, 'callbacks.beforeUpdate');
                    $onUpdate = Arr::get($config, 'callbacks.onUpdate');
                    $afterUpdate = Arr::get($config, 'callbacks.afterUpdate');
                    
                    if (is_callable($beforeUpdate)) {
                        $video_data = $beforeUpdate($request, $video, $video_data);
                    }

                    if (is_callable($onUpdate)) {
                        $onUpdate($request, $video, $video_data);
                    }
                    else {
                        Videos::update($video, $video_data);                        
                    }

                    if (is_callable($afterUpdate)) {
                        $afterUpdate($request, $video, $video_data);
                    }
                    
                    return Response::success([
                        'video' => Videos::formatResponseData($video),
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
                    $video = Video::findOrFail($request->id);
                    
                    $config = Videos::getConfig($video->container_name);
                    
                    if (!Arr::get($config, 'administration')) {
                        abort(404);
                    }
                    
                    if (!Arr::get($config, 'canEdit')($video->container_name, $video->container_id, $auth_user)) {
                        abort(404);
                    }
                    
                    //callbacks
                    $beforeDelete = Arr::get($config, 'callbacks.beforeDelete');
                    $onDelete = Arr::get($config, 'callbacks.onDelete');
                    $afterDelete = Arr::get($config, 'callbacks.afterDelete');
                    $deleteCustomResponse = Arr::get($config, 'callbacks.deleteCustomResponse');
                    
                    if (is_callable($beforeDelete)) {
                        $beforeDelete($request, $video);
                    }

                    if (is_callable($onDelete)) {
                        $onDelete($request, $video);
                    }
                    else {
                        Videos::delete($video);                        
                    }

                    if (is_callable($afterDelete)) {
                        $afterDelete($request, $video);
                    }
                    
                    if (is_callable($deleteCustomResponse)) {
                        return Response::success($deleteCustomResponse($request, $video));                        
                    }
                    
                    return Response::success([
                        'msg' => 'Video is deleted!',
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
                    $config = Videos::getConfig($request->container_name);
                    
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
                        reorder($request->ids, Video::class);                       
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