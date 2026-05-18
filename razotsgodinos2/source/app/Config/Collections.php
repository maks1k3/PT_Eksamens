<?php
namespace App\Config;

use Illuminate\Support\Arr;
use App\Helpers\Core\SearchHelper;

use App\Logic\CMS\CollectionItem;
use App\Models\CMS\Collection;

class Collections
{

            
    /**
     * Get CMS collections configuration
     *
     * @access public                
     * @return array
    */
    
    public static function get() {
    //<editor-fold defaultstate="collapsed" desc="get"> 
        $config = [];  
        
        /*
        |--------------------------------------------------------------------------
        |                             certificates_collection
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="certificates_collection"> 
        $config['certificates_collection'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                ];
            },
            'media' => [
                'images' => 1,
            ],
        ];
        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             renovation_collection
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="renovation_collection"> 
        $config['renovation_collection'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],
        ];
        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             building_collection
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="building_collection"> 
        $config['building_collection'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],
        ];
        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             reviews
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="reviews"> 
        $config['reviews'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
        ];
        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             privacy_policy
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="privacy_policy"> 
        $config['privacy_policy'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'description' => Arr::get($data, 'description', ''),
                ];
            },
        ];
        //</editor-fold>
            
             /*
        |--------------------------------------------------------------------------
        |                             reviews1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="reviews1"> 
        $config['reviews1'] = [  
            'data' => function ($data) {
                return [
                    'title' => Arr::get($data, 'title', ''),
                    'text' => Arr::get($data, 'text', ''),
                    'date' => Arr::get($data, 'date', ''),
                ];
            },
            'media' => [
                'images' => 1,
            ],
        ];
        //</editor-fold>
        
        return $config;
    //</editor-fold>
    }
    
}