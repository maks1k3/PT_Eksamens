<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

class CookiesController extends Controller
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
        $auth_user = auth()->user(); 

        $actions = [
                      
            'setCookies' => [        
                'rules' => [
                    'selectedCookieState' => 'present|boolean',
                ],
                'action' => function($request) {
                    //<editor-fold defaultstate="collapsed" desc="setCookies"> 
                    $selectedCookieState = $request->selectedCookieState;
                    
                    session(['marketing_cookies' => $selectedCookieState]);
                    
                    
                    return Response::success([
                        'selectedCookieState' => $selectedCookieState,
                    ]);
//                </editor-fold>     
                },
            ],
                        
            'getCookies' => [        
                'rules' => [
                ],
                'action' => function($request) {
                    //<editor-fold defaultstate="collapsed" desc="getCookies"> 
                    $value = session()->get('marketing_cookies', 'notVisited');
                    
                    
                    return Response::success([
                        'value' => $value,
                    ]);
//                </editor-fold>     
                },
            ],
        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    

}