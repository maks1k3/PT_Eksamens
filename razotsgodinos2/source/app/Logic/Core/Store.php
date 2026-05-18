<?php
namespace App\Logic\Core;

use Illuminate\Support\Arr;

use App\Config\Configuration;
use App\Config\User;

use App\Logic\Core\Translations;
use App\Logic\Core\Langs;

class Store
{  
    
    /**
     * Set application preloaded state
     *
     * @access public           
     * @param  string $lang - current lang
     * @param  array $ui - redux ui state
     * @param  array $extra - extra data
     * @return array
    */
    public static function setState($lang, $ui = [], $extra = []) {
    //<editor-fold defaultstate="collapsed" desc="setState">
        $state = [];
        
        $state['configuration'] = Configuration::get(Arr::get($extra, 'configuration', [])); 
        $state['translations'] = Translations::getAll($lang);
        $state['ui'] = $ui;
        
        $state['ui']['user'] = User::get(Arr::get($extra, 'user', []));
        $state['ui']['langs'] = Langs::getAll();
        $state['ui']['currentLang'] = $lang;
               
        return $state;
    //</editor-fold>
    }
}