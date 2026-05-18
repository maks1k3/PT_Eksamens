<?php
namespace App\Logic\Core;

use Illuminate\Support\Arr;
use DB;

class Translations
{
    
    static $lang;
    static $translations;
  
           
    /**
     * Set title
     *
     * @access public           
     * @param  string $lang - lang
     * @param  string $key - translation key
     * @return string
    */
    public static function get($key, $lang = null) {
    //<editor-fold defaultstate="collapsed" desc="get">   
        if ($lang === null) {
            $lang = app()->getLocale();
        }
        
        $translations = self::getAll($lang);
        
        return Arr::get($translations, $key, $key);        
    //</editor-fold>
    }
    
    /**
     * Get translations
     *
     * @access public           
     * @return array
    */
    public static function getAll($lang, $refresh = false) {
    //<editor-fold defaultstate="collapsed" desc="getAll"> 
        
        if ((empty(self::$translations) || $lang !== self::$lang) || $refresh) {
            $query = DB::connection('main')->table('translations as t');

            $query->select('t.name as name', 'c.content as value');


            $query->leftJoin('content_translations as c',function($join) use($lang) {
                $join->on('c.container_id', '=', 't.id');
                $join->on('c.lang', '=', DB::raw("'{$lang}'"));            
                $join->on('c.container_name', '=', DB::raw("'translations'"));            
            }); 

            $translations = $query->get()->mapWithKeys(function ($item) {
                return [$item->name => $item->value];
            })->all();        
            
            self::$translations = $translations;
            self::$lang = $lang;
        }
        else {
            $translations = self::$translations;            
        }
        

        return $translations;
    //</editor-fold>
    }   
    

}

Translations::$translations = [];
