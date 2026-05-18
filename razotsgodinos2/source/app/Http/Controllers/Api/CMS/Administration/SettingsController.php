<?php

namespace App\Http\Controllers\Api\CMS\Administration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Core\Settings;
use App\Logic\Core\Users;

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
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get_footer_js"> 
            
                    return Response::success([
                        'value' => Settings::getFooterJs(),
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
                        'msg' => 'Footer js ir atjaunināts!',
                    ]);
                //</editor-fold>     
                },
            ],   
                        
            //update_password
            'update_password' => [        
                'rules' => [                   
                    'current_password' => 'required|min:6',                         
                    'new_password' => 'required|min:6|confirmed',                         
                    'new_password_confirmation' => 'required|min:6',  
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update_password"> 
                    $auth_user = auth()->user();   
                    
                    if(!Users::checkPassword($request->current_password, $auth_user->password)) { 
                        return Response::error("Incorrect current password!");           
                    }

                    $auth_user->password = bcrypt($request->new_password);
                    $auth_user->save();        
                    
                    return Response::success("Parole ir atjaunināta!");    
                //</editor-fold>     
                },
            ],               

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    

}