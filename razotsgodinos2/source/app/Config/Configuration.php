<?php
namespace App\Config;

class Configuration
{

            
    /**
     * Get configuration
     *
     * @access public                
     * @param array $params - custom params                
     * @return array
    */
    public static function get($params = []) {
    //<editor-fold defaultstate="collapsed" desc="get"> 
        
        $defaults = [
            'debugMode' => config('app.debug') ? true : false,
            'navigationMode' => 'navigation',//history|navigation|auto
            'googleMaps' => config('services.google_maps'),
            'reCaptcha' => config('services.recaptcha.key'),
            'mainUrl' => config('app.url'),
            'redirect' => '/',
        ];
        
        $merged = collect($defaults)->merge($params);

        return $merged->all();
    //</editor-fold>
    }
    
}