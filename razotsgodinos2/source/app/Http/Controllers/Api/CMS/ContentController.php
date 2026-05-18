<?php

namespace App\Http\Controllers\Api\CMS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

use App\Logic\Core\Langs;
use App\Logic\CMS\Data;

class ContentController extends Controller
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

            //get
            'get' => [        
                'rules' => [
                    'lang' => 'required|string|max:2',
                    'name' => 'required|string',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get"> 
                    $lang = Langs::getValidLang($request->lang);
                    
                    $result = Data::get($lang, [
                        'content' => [
                            $request->name,              
                        ],           
                    ]);    

                    if (empty($result['content'])) {
                        return Response::error("No content with name:{$request->name}!");
                    }     
        
                    return Response::success($result);        
                //</editor-fold>     
                },
            ],       

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    

}