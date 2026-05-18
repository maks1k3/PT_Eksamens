<?php

namespace App\Http\Controllers\Api\Administration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Core\Settings;
use App\Logic\Core\Langs;
use App\Models\Core\Lang;

class SettingsController extends Controller
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
    * Actions
    *
    * @access public
    * @return json 
    */
    public function actions(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="actions"> 
        
        $actions = [
                        
            //get_footer_js
            'get_footer_js' => [        
                'rules' => [
                    
                ],
                'action' => function($request)  {
                //<editor-fold defaultstate="collapsed" desc="get_footer_js"> 
                    return Response::success([
                        'footer_js' => Settings::getFooterJs(),
                    ]);  
                //</editor-fold>     
                },
            ],  
                        
            //set_footer_js
            'set_footer_js' => [        
                'rules' => [
                    'footer_js' => 'present|string'
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="set_footer_js"> 
                    Settings::set('footer_js', base64_decode($request->footer_js));

                    return Response::success([
                        'msg' => 'Footer js updated!',
                    ]);
                //</editor-fold>     
                },
            ],       

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }
}