<?php

namespace App\Http\Controllers\Main;
//s
use App\Http\Controllers\Controller;


use App\Helpers\Core\MetaHelper;
use App\Logic\Core\Store;
use App\Logic\Core\Langs;

class AdministrationPagesController extends Controller
{
    /**
    * Constructor
    *
    * @return void
    */
    public function __construct()
    {


    }
    
    /**
     * Main controller
     *
     * @access public   
     * @return void
     */
    public function main() {
    //<editor-fold defaultstate="collapsed" desc="main">      
        MetaHelper::setTitle('Administration');
        
        $extra = [            
            'configuration' => [                
                'navigationMode' => 'history',
            ],
        ];
        
        $lang = 'lv';
        
        $state = [];
        $state['activeLangs'] = Langs::getActive();
        
        $view_data = [
            'state' => Store::setState($lang, $state, $extra),
        ];   
        return view('administration.main', $view_data);
    //</editor-fold>          
    }
    

}