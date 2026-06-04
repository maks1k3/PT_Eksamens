<?php
namespace App\Config;

use App\Logic\Core\Users;

use App\Logic\CMS\CollectionItem;
use App\Logic\Media\Images as ImagesLogic;
use App\Models\Media\Image;

class Images
{

            
    /**
     * Get images configuration
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
            'rules' => [
                'required',
                'file',
                'image',
                'max:20000',//20mb
            ],
            'updatePosition' => false,
            'administration' => true,
            'resize' => false,
            'optimize' => false,//optimize image file for page speed
            'canEdit' => function ($container_name, $container_id, $auth_user) {
                return Users::isCMSAdmin($auth_user);
            },
            'canView' => function ($container_name, $container_id, $auth_user) {
                return true;
            },
            'callbacks' => [   
                'onCreate' => function ($request, $file) {
                    return null;
                },                
                'onDelete' => function ($request, $image) {
                    ImagesLogic::softDelete($image);
                },                
                'deleteCustomResponse' => function ($request, $image) {
                    return [
                        'msg' => 'Image is deleted!',
                        'image' => ImagesLogic::formatResponseData($image),
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
            'rules' => [
                'required',
                'file',
                'image',
                'max:20000',//20mb
            ],
            'updatePosition' => false,   
            'administration' => true,
            'canEdit' => function ($container_name, $container_id, $auth_user) {
                return Users::isCMSAdmin($auth_user);
            },
            'canView' => function ($container_name, $container_id, $auth_user) {
                return true;
            },
            'callbacks' => [
                'onCreate' => function ($request, $file) {
                    $collection_item = CollectionItem::create($request->collection_name, $request->collection_id);
                    $collection_item_data = CollectionItem::get(['en'], $collection_item->id);
                    $image_id = head($collection_item_data['media']['images']);
                        
                    $image = Image::find($image_id);
                    ImagesLogic::update($image, $file->getRealPath());
                    return $image;
                },                
                'onDelete' => function ($request, $image) {
                    ImagesLogic::softDelete($image);
                },                
                'deleteCustomResponse' => function ($request, $image) {
                    return [
                        'msg' => 'Image is deleted!',
                        'image' => ImagesLogic::formatResponseData($image),
                    ];
                },                   
                
            ],
        ];        
        //</editor-fold> 
     
        /*
        |--------------------------------------------------------------------------
        |                             cms_content_optimized
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="cms_content_optimized"> 
        $config['cms_content_optimized'] = [   
            'rules' => [
                'required',
                'file',
                'image',
                'max:20000',//20mb
            ],
            'updatePosition' => false,
            'administration' => true,
            'optimize' => true,//optimize image file for page speed
            'canEdit' => function ($container_name, $container_id, $auth_user) {
                return Users::isCMSAdmin($auth_user);
            },
            'canView' => function ($container_name, $container_id, $auth_user) {
                return true;
            },
            'callbacks' => [   
                'onCreate' => function ($request, $file) {
                    return null;
                },                
                'onDelete' => function ($request, $image) {
                    ImagesLogic::softDelete($image);
                },                
                'deleteCustomResponse' => function ($request, $image) {
                    return [
                        'msg' => 'Image is deleted!',
                        'image' => ImagesLogic::formatResponseData($image),
                    ];
                },                      
                
            ],
        ];        
        //</editor-fold>         
                
         /*
        |--------------------------------------------------------------------------
        |                             cms_collection_optimized
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="cms_collection_optimized"> 
        $config['cms_collection_optimized'] = [   
            'rules' => [
                'required',
                'file',
                'image',
                'max:20000',//20mb
            ],
            'updatePosition' => false,   
            'administration' => true,
            'optimize' => true,//optimize image file for page speed
            'canEdit' => function ($container_name, $container_id, $auth_user) {
                return Users::isCMSAdmin($auth_user);
            },
            'canView' => function ($container_name, $container_id, $auth_user) {
                return true;
            },
            'callbacks' => [
                'onCreate' => function ($request, $file) {
                    $collection_item = CollectionItem::create($request->collection_name, $request->collection_id);
                    $collection_item_data = CollectionItem::get(['en'], $collection_item->id);
                    $image_id = head($collection_item_data['media']['images']);
                        
                    $image = Image::find($image_id);
                    ImagesLogic::update($image, $file->getRealPath());
                    return $image;
                },                
                'onDelete' => function ($request, $image) {
                    ImagesLogic::softDelete($image);
                },                
                'deleteCustomResponse' => function ($request, $image) {
                    return [
                        'msg' => 'Image is deleted!',
                        'image' => ImagesLogic::formatResponseData($image),
                    ];
                },                   
                
            ],
        ];        
        //</editor-fold>   
                
        /*
        |--------------------------------------------------------------------------
        |                             single_image_optimized
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="single_image_optimized"> 
        $config['single_image_optimized'] = [  
            'rules' => [
                'required',
                'file',
                'image',
                'max:20000',//20mb
            ],
            'administration' => true,
            'resized' => false,
            'optimize' => false,//optimize image file for page speed
            'canEdit' => function ($container_name, $container_id, $auth_user) {       
                return Users::isCMSAdmin($auth_user);
            },
            'canView' => function ($container_name, $container_id, $auth_user) {        
                return true;
            },
            'callbacks' => [
        
                'onCreate' => function ($request, $file) {
                    return null;
                },
                'onDelete' => function ($request, $image) {            
                    ImagesLogic::softDelete($image);
                },
                'deleteCustomResponse' => function ($request, $image) {
                    return [
                        'msg' => 'Image is deleted!',
                        'image' => ImagesLogic::formatResponseData($image),
                    ];
                },                 

            ]        
        ];        
        //</editor-fold>        
                
        /*
        |--------------------------------------------------------------------------
        |                             png_image
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="png_image"> 
        $config['png_image'] = [   
            'updatePosition' => false, 
            'administration' => true,  
            'optimize' => false,
            'orientate' => false,
            'resize' => [],
            'canEdit' => function ($container_name, $container_id, $auth_user) {   

                return Users::isCMSAdmin($auth_user);
            },
            'canView' => function ($container_name, $container_id, $auth_user) {        
                return true;
            },
            'callbacks' => [

                'onCreate' => function ($request, $file) {
                    return null;
                },
                'onDelete' => function ($request, $image) {            
                    ImagesLogic::softDelete($image);
                },
                'deleteCustomResponse' => function ($request, $image) {
                    return [
                        'msg' => 'Image is deleted!',
                        'image' => ImagesLogic::formatResponseData($image),
                    ];
                },                 

            ]
        ];        
        //</editor-fold>  
                
         /*
        |--------------------------------------------------------------------------
        |                             blog_gallery
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="blog_gallery"> 
        $config['blog_gallery'] = [   
            'rules' => [
                'required',
                'file',
                'image',
                'max:20000',//20mb
            ],
            'updatePosition' => 'end',//end|start|false,   
            'orientate' => true,
            'optimize' => true,//optimize image file for page speed
            'administration' => true,  
            'canEdit' => function ($container_name, $container_id, $auth_user) {       
                return Users::isCMSAdmin($auth_user);
            },
            'canView' => function ($container_name, $container_id, $auth_user) {        
                return true;
            },
        ]; 
            
            $config['event_gallery'] = [   
            'rules' => [
                'required',
                'file',
                'image',
                'max:20000',//20mb
            ],
            'updatePosition' => 'end',//end|start|false,   
            'orientate' => true,
            'optimize' => true,//optimize image file for page speed
            'administration' => true,  
            'canEdit' => function ($container_name, $container_id, $auth_user) {       
                return Users::isCMSAdmin($auth_user);
            },
            'canView' => function ($container_name, $container_id, $auth_user) {        
                return true;
            },
        ];
        //</editor-fold>
           //s 
        return $config;
    //</editor-fold>
    }
    
}
