<?php

namespace App\Http\Controllers\Api\Dev;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

class LongTaskController extends Controller
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
    * Start long task
    *
    * @access public
    * @return json
    */
    public function start(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="start">    
      
        
        
        

        $response = [
            'total' => 356,                  
            'done' => 356,                  
        ];

        return Response::success($response);        
    //</editor-fold>
    }

}