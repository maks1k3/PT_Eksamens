<?php
namespace App\Logic\Core;
use Illuminate\Support\Str;


use App\Models\Core\Lang;
use App\Models\Core\ContentTranslation;
use App\Logic\Core\Settings;

use App\Logic\Core\Users;

class Langs
{
         
    static $langs;
    
    # ========================================================================#
    #
    #                            Helpers
    #    
    # ========================================================================#
            
    /**
     * Format lang
     *
     * @access public           
     * @param  string $lang - lang name 
     * @return string
    */
    public static function formatLang($lang) {
    //<editor-fold defaultstate="collapsed" desc="formatLang"> 
        $lang = Str::slug($lang);                    
        $lang = mb_substr($lang, 0, 2);
        
        return $lang;
    //</editor-fold>
    }
    
    /**
     * Check if lang is available
     *
     * @access public           
     * @param  string $lang - lang name 
     * @return string
    */
    public static function isAvailable($lang) {
    //<editor-fold defaultstate="collapsed" desc="isAvailable"> 
        $check = Lang::whereName($lang)->count() > 0;
        
        return !$check;
    //</editor-fold>
    }
    
    
    /**
     * Check if lang is valid
     *
     * @access public           
     * @param  string $name - lang name 
     * @return \App\Models\Core\Lang
    */
    public static function isValidLang($name) {
    //<editor-fold defaultstate="collapsed" desc="isValidLang"> 
        if (Users::isCMSAdmin(auth()->user())) {            
            $lang = Lang::whereName($name)->first();
        }
        else {
            $lang = Lang::whereNameAndActive($name, 1)->first();
        }
        
        if (empty($lang)) {
            return false;
        }
        
        return true;
    //</editor-fold>
    }
    
    # ========================================================================#
    #
    #                            Retrieve data
    #    
    # ========================================================================#
    
    /**
     * Get lang from name
     *
     * @access public           
     * @param  string $name - lang name 
     * @return string
    */
    public static function getValidLang($name = null) {
    //<editor-fold defaultstate="collapsed" desc="getLang"> 
        $langs = self::getAll();
                
        if (!empty($name) && in_array($name, $langs)) {
            $key = array_search($name, $langs); 
            $lang = $langs[$key];
        }
        else {
            $lang = self::getDefault();
        }
        
        return $lang;
    //</editor-fold>
    }
    
    /**
     * Get default lang
     *
     * @access public           
     * @param  string $lang - lang name 
     * @return string
    */
   public static function getDefault() {
    return 'lv';
}
    
    /**
     * Get all langs
     *
     * @access public           
     * @param  boolean $refresh - if true always takes from db
     * @return array
    */
    public static function getAll($refresh = false) {
    //<editor-fold defaultstate="collapsed" desc="getAll"> 
        if (empty(self::$langs) || $refresh) {
            
            $query = Lang::query();
            
            if (!Users::isCMSAdmin(auth()->user())) {
                $query->whereActive(1);
            }
            
            $langs = $query->orderBy('position', 'asc')->get(['name'])->pluck('name')->toArray();
            
            self::$langs = $langs;
        }
        else {
            $langs = self::$langs;
        }
                        
        return $langs;
    //</editor-fold>
    }
    
    /**
     * Get active langs
     *
     * @access public           
     * @return array
    */
    public static function getActive() {
    //<editor-fold defaultstate="collapsed" desc="getActive"> 
        $query = Lang::query();
            
        $query->whereActive(1);

        return $query->orderBy('position', 'asc')->get(['name'])->pluck('name')->toArray();
    //</editor-fold>
    }
    
    
    # ========================================================================#
    #
    #                            CRUD
    #    
    # ========================================================================#
    
    /**
     * Create
     *
     * @access public           
     * @param  string $name - new lang name   
     * @return \App\Models\Core\Lang
    */
    public static function create($name) {
    //<editor-fold defaultstate="collapsed" desc="create"> 
                
        $tmp = Lang::orderBy('position', 'desc')->first();
        
        if (empty($tmp)) {
            $position = 0;
        }
        else{
            $position = $tmp->position;
            $position++;
        }
        
        $lang = new Lang;        
        $lang->name = $name;
        $lang->active = true;
        $lang->position = $position;
                                
        $lang->save();
        
        return $lang;        
    //</editor-fold>
    }        
        
    /**
    * Enable
    *
    * @access public           
    * @param  \App\Models\Core\Lang $lang - $lang to enabled
    * @return void
    */
    public static function enable($lang) {
    //<editor-fold defaultstate="collapsed" desc="enable"> 
                       
        $lang->active = true;
        $lang->save();
        
    //</editor-fold>        
    }
    
    /**
    * Disable
    *
    * @access public           
    * @param  \App\Models\Core\Lang $lang - $lang to disable
    * @return void
    */
    public static function disable($lang) {
    //<editor-fold defaultstate="collapsed" desc="disable"> 
    //
        //do not allow to disable last lang
        if (Lang::whereActive(1)->count() <= 1) {
            return false;
        }
        
        $lang->active = false;
        $lang->save();        
    //</editor-fold>        
    }
    
    /**
    * Reorder
    *
    * @access public           
    * @param  array $ids - 1,2,3
    * @return void
    */
    public static function reorder($ids) {
    //<editor-fold defaultstate="collapsed" desc="reorder"> 
                 
        foreach($ids as $k => $v) {
            
            $item = Lang::find($v);
            if (!empty($item)) {
                $item->position = $k;
                $item->save();
            }
            
        }
        
    //</editor-fold>
    }
    
    /**
     * Delete
     *
     * @access public           
     * @param  \App\Models\Core\Lang $lang - $lang to delete       
     * @return void
    */
    public static function delete($lang) {
    //<editor-fold defaultstate="collapsed" desc="lang"> 
        
        //do not allow to delete last lang
        if (Lang::count() <= 1) {
            return false;
        }
        
        ContentTranslation::whereLang($lang->name)->delete();
        
        $lang->delete();
        
        Lang::where('position', '>', $lang->position)->decrement('position');             
    //</editor-fold>
    }
}

Langs::$langs = [];