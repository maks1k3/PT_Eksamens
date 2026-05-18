<?php
namespace App\Logic\Core;
use App\Models\Core\Setting;
use App\Models\Core\Lang;

class Settings
{
    # ========================================================================#
    #
    #                           Helpers
    #    
    # ========================================================================#    
    
    /**
     * Get value
     *
     * @access public           
     * @param  \App\Models\Main\Setting $setting - setting
     * @return mixed
    */
    public static function getValue($setting) {
    //<editor-fold defaultstate="collapsed" desc="getValue">                
        if (empty($setting)) {
            return null;
        }
        else {
            $value = $setting->value;
            
            if (empty($value)) {
                return null;
            }
            else {
                return $value['value'];
            }
        }
        
    //</editor-fold>
    }
            
    /**
     * Get
     *
     * @access public           
     * @param  string $name - setting's $name 
     * @return mixed
    */
    public static function get($name) {
    //<editor-fold defaultstate="collapsed" desc="get"> 
        $setting = Setting::whereName($name)->first();
        
        return self::getValue($setting);        
    //</editor-fold>
    }    
    
    /**
     * Set
     *
     * @access public           
     * @param  string $name - setting's $name 
     * @param  string $value - setting's $value 
     * @return void
    */
    public static function set($name, $value) {
    //<editor-fold defaultstate="collapsed" desc="set"> 
        $setting = Setting::firstOrCreate(['name' => $name]);  
        
        $setting->value = ['value' => $value];
        $setting->save();
    //</editor-fold>
    }
    
    /**
     * Get all
     *
     * @access public           
     * @return array
    */
    public static function getAll() {
    //<editor-fold defaultstate="collapsed" desc="getAll"> 
        $settings = Setting::all();
        
        $result = [];
        
        foreach ($settings as $setting) {
            
            $name = $setting->name;
            $value = self::getValue($setting);
            
            //special settings
            if (empty($value) && in_array($name, ['default_lang', 'footer_js'])) {
                
                if ($name === 'default_lang') {
                    $value = self::getDefaultLangName();                   
                }                
                else if ($name === 'footer_js') {
                    $value = self::getFooterJs();
                }
            }            
            
            $result[$setting->name] = self::getValue($setting);            
            
        }
        
        return $result;        
    //</editor-fold>
    }    
    
    # ========================================================================#
    #
    #                           Special settings
    #    
    # ========================================================================# 
    
    /**
     * Get default lang name
     *
     * @access public
     * @return string
    */
    public static function getDefaultLangName() {
    //<editor-fold defaultstate="collapsed" desc="getDefaultLangName"> 
        $name = self::get('default_lang');
      
        if (empty($name)) {
            $lang = Lang::orderBy('position', 'asc')->first();
            
            if (empty($lang)) {
                return 'en';
            }
            else {
                return $lang->name;
            }
        }
        
        return $name;
    //</editor-fold>
    }
    
    /**
     * Get footer js 
     *
     * @access public
     * @return string
    */
    public static function getFooterJs() {
    //<editor-fold defaultstate="collapsed" desc="getFooterJs"> 
        $code = self::get('footer_js');
        
        if (empty($code)) {
            return '';
        }
        
        return $code;
    //</editor-fold>
    }
}