<?php

namespace App\Http\Controllers\Dev;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Helpers\Core\MetaHelper;
use App\Logic\Core\Store;
use App\Logic\Core\Langs;

class DevAdminController extends Controller
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
        MetaHelper::setTitle('Dev admin');
        
        $extra = [            
            'configuration' => [                
                'navigationMode' => 'history',
            ],
        ];
        
        $lang = 'en';
        
        $state = [];
        $state['activeLangs'] = Langs::getActive();
        
        $view_data = [
            'state' => Store::setState($lang, $state, $extra),
        ];   
        return view('dev.main', $view_data);
    //</editor-fold>          
    }
    

}