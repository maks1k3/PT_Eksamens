<?php

namespace App\Http\Controllers\Api\Core;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;


class ActionsController extends Controller
{
    /**
    * Constructor
    *
    * @return void
    */
    public function __construct()
    {
        
    }
    
# ========================================================================#
#
#                            Ping
#    
# ========================================================================# 
   
    /**
    * Maintain users session
    *
    * @access public        
    * @return string json
    */
    public function ping(){ 
    //<editor-fold defaultstate="collapsed" desc="Ping">  
        return Response::success('Pong');     
    //</editor-fold>      
    }    
 
    
# ========================================================================#
#
#                            Echo 
#    
# ========================================================================# 

    /**
    * Echo request data
    *
    * @access public        
    * @return string json
    */
    public function echoRequest(Request $request){       
    //<editor-fold defaultstate="collapsed" desc="echoRequest">    
        $response = $request->toArray();
        return Response::success($response);     
    //</editor-fold>    
    }   
 
    
# ========================================================================#
#
#                            Success 
#    
# ========================================================================# 
    
    /**
    * Success
    *
    * @access public        
    * @return string json
    */
    public function success(Request $request){       
    //<editor-fold defaultstate="collapsed" desc="success"> 
        return Response::success('Success!');
    //</editor-fold>     
    }   
   
    
# ========================================================================#
#
#                            Error 
#    
# ========================================================================# 
    
    /**
    * Error
    *
    * @access public        
    * @return string json
    */
    public function error(Request $request){       
    //<editor-fold defaultstate="collapsed" desc="error"> 
        return Response::error('Error!');
    //</editor-fold>    
    }   
    
# ========================================================================#
#
#                            Fail 
#    
# ========================================================================# 
    
    /**
    * Fail
    *
    * @access public        
    * @return string
    */
    public function fail(Request $request){       
    //<editor-fold defaultstate="collapsed" desc="fail"> 
        return 'This is failure!';
    //</editor-fold>    
    }       
        
    
 
}

