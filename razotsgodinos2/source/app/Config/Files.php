<?php
namespace App\Config;

use App\Logic\Core\Users;

use App\Logic\CMS\CollectionItem;
use App\Logic\Media\Files as FilesLogic;
use App\Models\Media\File;

class Files
{

            
    /**
     * Get files configuration
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
                    return null;
                },
                'onDelete' => function ($request, $file) {
                    FilesLogic::softDelete($file);
                },
                'deleteCustomResponse' => function ($request, $file) {
                    return [
                        'msg' => 'File is deleted!',
                        'file' => FilesLogic::formatResponseData($file),
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
                    $file_id = head($collection_item_data['media']['files']);
                        
                    $result_file = File::find($file_id);
                                        
                    FilesLogic::update(
                        $file->getRealPath(), 
                        pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME), 
                        $file->getClientOriginalExtension(), 
                        $result_file 
                    );  
                    
                    return $result_file;
                },
                'onDelete' => function ($request, $file) {
                    FilesLogic::softDelete($file);
                },
                'deleteCustomResponse' => function ($request, $file) {
                    return [
                        'msg' => 'File is deleted!',
                        'file' => FilesLogic::formatResponseData($file),
                    ];
                }, 
            ],                        
        ];        
        //</editor-fold> 
  
                
        /*
        |--------------------------------------------------------------------------
        |                             pdf_file
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="pdf_file"> 
        $config['pdf_file'] = [  
            'rules' => [
                'required',
                'file',  
                'mimes:pdf',
                'max:10000',//10mb
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
                    return null;
                },
                'onDelete' => function ($request, $file) {
                    FilesLogic::softDelete($file);
                },
                'deleteCustomResponse' => function ($request, $file) {
                    return [
                        'msg' => 'File is deleted!',
                        'file' => FilesLogic::formatResponseData($file),
                    ];
                },   
            ],                        
        ];        
        //</editor-fold>                 
                
        
        return $config;
    //</editor-fold>
    }
    
}