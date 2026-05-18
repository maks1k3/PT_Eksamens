<?php

namespace App\Http\Controllers\Api\CMS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

use App\Logic\Core\Langs;
use App\Logic\CMS\Data;

class CollectionsController extends Controller
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
                    'active' => 'boolean',     
                    'is_load_more' => 'boolean',     
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get"> 
                    $lang = Langs::getValidLang($request->lang);
                    
                    $params = [];
        
                    foreach (['collection_id', 'page', 'results_per_page', 'active', 'is_load_more', 'order'] as $option) {
                        if ($request->{$option} !== null) {
                            $params[$option] = $request->{$option};
                        }
                    }


                    $options = [];

                    $options[$request->name] = $params;

                    $result = Data::get($request->lang, [
                        'collections' => $options
                    ]);


                    if (empty($result['collections'])) {
                        return Response::error("No collection with name:{$request->name}!");
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