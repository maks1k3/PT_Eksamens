<?php
namespace App\Config;

use App\Logic\Core\Users;

use App\Logic\CMS\CollectionItem;
use App\Logic\Media\Videos as VideosLogic;
use App\Models\Media\Video;

class Videos
{

            
    /**
     * Get videos configuration
     *
     * @access public                
     * @return array
    */
    public static function get() {
    //<editor-fold defaultstate="collapsed" desc="get"> 
        $config = [];
            
        /*
        |--------------------------------------------------------------------------
        |                             cms_content
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="cms_content"> 
        $config['cms_content'] = [  
            'updatePosition' => false, 
            'administration' => true,
            'canEdit' => function ($container_name, $container_id, $auth_user) {
                return Users::isCMSAdmin($auth_user);
            },
            'canView' => function ($container_name, $container_id, $auth_user) {
                return true;
            },
            'callbacks' => [
                                
                'onCreate' => function ($request) {
                    return null;
                },                  
                'onDelete' => function ($request, $video) {
                    VideosLogic::softDelete($video);
                },
                'deleteCustomResponse' => function ($request, $video) {
                    return [
                        'msg' => 'Video is deleted!',
                        'video' => VideosLogic::formatResponseData($video),
                    ];
                },  
                        
            ],                    
        ];        
        //</editor-fold> 
            
        /*
        |--------------------------------------------------------------------------
        |                             cms_collection
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="cms_collection"> 
        $config['cms_collection'] = [  
            'updatePosition' => false,//end|start|false,   
            'administration' => true,
            'canEdit' => function ($container_name, $container_id, $auth_user) {
                return Users::isCMSAdmin($auth_user);
            },
            'canView' => function ($container_name, $container_id, $auth_user) {
                return true;
            },
            'callbacks' => [
                                
                'onCreate' => function ($request, $video_data) {
                    $collection_item = CollectionItem::create($request->collection_name, $request->collection_id);
                    $collection_item_data = CollectionItem::get(['en'], $collection_item->id);
                    $video_id = head($collection_item_data['media']['videos']);
                        
                    $video = Video::find($video_id);
                    VideosLogic::update($video, $video_data);
                    
                    return $video;
                },                
                'onDelete' => function ($request, $video) {
                    VideosLogic::softDelete($video);
                },                
                'deleteCustomResponse' => function ($request, $video) {
                    return [
                        'msg' => 'Video is deleted!',
                        'video' => VideosLogic::formatResponseData($video),
                    ];
                }, 
            ],                    
        ];        
        //</editor-fold> 
        
    
    
        return $config;
    //</editor-fold>
    }
    
}