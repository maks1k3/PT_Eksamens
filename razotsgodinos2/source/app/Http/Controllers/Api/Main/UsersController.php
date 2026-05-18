<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

class UsersController extends Controller
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
                        
            'update_profile' => [        
                'rules' => [
                    
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update_profile"> 
//                    $item = Item::find($request->id);
//                    if (empty($row)) {
//                        return Response::error("Item with id {$request->id} doesn't exist!");                        
//                    }
//
//                    return Response::success([
//                        'item' => $item,
//                    ]);
                //</editor-fold>     
                },
            ],  
                        
            'change_password' => [        
                'rules' => [
                    
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="change_password"> 
//                    $item = Item::find($request->id);
//                    if (empty($row)) {
//                        return Response::error("Item with id {$request->id} doesn't exist!");                        
//                    }
//
//                    return Response::success([
//                        'item' => $item,
//                    ]);
                //</editor-fold>     
                },
            ],                          

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    

}