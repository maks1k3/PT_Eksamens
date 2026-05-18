<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\Core\MetaHelper;
use App\Logic\Core\Store;

class InternalPagesController extends Controller
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
    * Display default page
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function defaultPage(Request $request){
    //<editor-fold defaultstate="collapsed" desc="defaultPage">     
       return redirect("/todo"); 
    //</editor-fold>    
    }

    /**
    * Display internal pages
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function main(Request $request){
    //<editor-fold defaultstate="collapsed" desc="main">     
        MetaHelper::setTitle('Codebase');
               
        return view('internal.main', ['state' => Store::setState('en', [])]);
    //</editor-fold>    
    }    

    /**
    * Bundle test
    *
    * @access public
    * @param  string $bundle - bundle to test
    * @return \Illuminate\Http\Response 
    */
    public function bundle(Request $request, $bundle){
    //<editor-fold defaultstate="collapsed" desc="bundle">     
        $view_data = [
            'bundle' => $bundle,
            'state' => Store::setState('en', [])
        ];        
        
        return view('internal.bundle', $view_data);
    //</editor-fold>    
    }

}
