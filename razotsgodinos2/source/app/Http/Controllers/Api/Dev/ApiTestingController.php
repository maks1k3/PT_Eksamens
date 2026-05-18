<?php

namespace App\Http\Controllers\Api\Dev;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

class ApiTestingController extends Controller
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
    * Testing
    *
    * @access public
    * @return json
    */
    public function test(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="test"> 
        return Response::success(['msg' => 'Api test!']);        
    //</editor-fold>
    }
    

}