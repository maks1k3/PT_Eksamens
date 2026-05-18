<?php
namespace App\Logic\Core;

use DB;
use App\Models\Core\ContentTranslation;

class ContentTranslations
{

        
    /**
     * Left join
     *
     * @access public           
     * @param  object $query - DB query
     * @param  array $langs - langs
     * @param  string $container_id - container id 
     * @param  string $container_name - container name 
     * @param  string $prefix - prefix
     * @return void
    */
    public static function leftJoin($query, $langs, $container_id, $container_name, $prefix = '') {
    //<editor-fold defaultstate="collapsed" desc="leftJoin"> 
        foreach($langs as $lang) {
            
            $query->leftJoin('content_translations as '.$prefix.$lang, function($join) use ($lang, $container_id, $container_name, $prefix)
            {                
                $join->on($prefix.$lang.'.container_id', '=', DB::raw("{$container_id}"));
                $join->on($prefix.$lang.'.container_name', '=', DB::raw("'{$container_name}'"));
                $join->on($prefix.$lang.'.lang', '=', DB::raw("'{$lang}'"));
            });            
        }   
    //</editor-fold>
    }
    
    
    /**
     * Get translations
     *
     * @access public           
     * @param  array $langs - langs
     * @param  string $container_name - container name 
     * @param  integer $container_id - container id 
     * @return array or null
    */
    public static function get($langs, $container_name, $container_id) {
    //<editor-fold defaultstate="collapsed" desc="get"> 
        
        $translations = ContentTranslation::whereContainerIdAndContainerName($container_id, $container_name)
                ->whereIn('lang', $langs)
                ->get()
                ->keyBy('lang');

        if ($translations->isEmpty()) {
            return null;
        }
        
        return $translations;
    //</editor-fold>
    }
    
    /**
     * Get container
     *
     * @access public           
     * @param  string $container_name - container name 
     * @param  integer $container_id - container id 
     * @param  string $lang - lang
     * @return \App\Models\Core\ContentTranslation
    */
    public static function getContainer($container_name, $container_id, $lang) {
    //<editor-fold defaultstate="collapsed" desc="getContainer">         
        return ContentTranslation::firstOrCreate(['container_name' => $container_name, 'container_id' => $container_id, 'lang' => $lang]);
    //</editor-fold>
    }
    
    /**
     * Delete translations
     *
     * @access public           
     * @param  string $container_name - container name 
     * @param  integer $container_id - container id 
     * @return void
    */
    public static function delete($container_name, $container_id) {
    //<editor-fold defaultstate="collapsed" desc="delete">         
        ContentTranslation::whereContainerNameAndContainerId($container_name, $container_id)->delete(); 
    //</editor-fold>
    }
}