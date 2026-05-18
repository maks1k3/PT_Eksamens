<?php

namespace App\Http\Controllers\Api\CMS\Administration;

use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

use App\Logic\CMS\CollectionItem;
use App\Models\CMS\Collection;

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

            //reorder
            'reorder' => [        
                'rules' => [
                    'name' => 'required|string',
                    'collection_id' => 'required|integer',
                    'ids' => 'required|string',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="reorder"> 
                    $config = CollectionItem::getConfig($request->name);
                                        
                    //callbacks
                    $beforeReorder = Arr::get($config, 'callbacks.beforeReorder');
                    $onReorder = Arr::get($config, 'callbacks.onReorder');
                    $afterReorder = Arr::get($config, 'callbacks.afterReorder');
                    
                    if (is_callable($beforeReorder)) {
                        $beforeReorder($request);
                    }

                    if (is_callable($onReorder)) {
                        $onReorder($request);
                    }
                    else {
                        reorder($request->ids, Collection::class);                       
                    }

                    if (is_callable($afterReorder)) {
                        $afterReorder($request);
                    }                      
                    
                    return Response::success([
                        'msg' => 'New order saved!', 
                    ]); 
                //</editor-fold>     
                },
            ],         

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    

}