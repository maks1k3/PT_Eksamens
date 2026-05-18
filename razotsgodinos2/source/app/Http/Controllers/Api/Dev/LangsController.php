<?php

namespace App\Http\Controllers\Api\Dev;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response; 
use App\Logic\Core\Langs;
use App\Models\Core\Lang;

class LangsController extends Controller
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
            
            
            'get' => [        
                'rules' => [
                   
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get"> 
                    $langs = Lang::orderBy('position', 'asc')->get()->map(function($item, $key) {
                        return [
                            'id' => $item->id,
                            'name' => $item->name,
                            'active' => !!$item->active,
                        ];
                    })->all();
                    
                    return Response::success([
                        'items' => $langs, 
                    ]);                    
                //</editor-fold>     
                },
            ],   
            
            'create' => [        
                'rules' => [
                   'name' => 'required|alpha|max:2'
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="create"> 
                    $lang = Langs::formatLang($request->name);
                    
                    if (!Langs::isAvailable($lang)) {
                        return Response::error("{$lang} is already in use!"); 
                    }
                    
                    $lang = Langs::create($lang);
                                        
                    return Response::success([
                        'item' => [
                            'id' => $lang->id,
                            'name' => $lang->name,
                            'active' => !!$lang->active,
                        ],
                        'msg' => "New lang: {$lang->name} created!"
                    ]);
                //</editor-fold>     
                },
            ],  
                  
            'toggle' => [        
                'rules' => [
                   'id' => 'required|integer'
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="toggle">
                    $lang = Lang::find($request->id);
                    if (empty($lang)) {
                        return Response::error("Lang with id {$request->id} doesn't exist!");                        
                    }
                    
                    if (!$lang->active) {
                        Langs::enable($lang);
                        return Response::success("Lang is enabled!");
                    }
                    else {
                        if (Langs::disable($lang) === false) {
                            return Response::error("Last lang cannot be disabled!");   
                        }
                        else {
                            return Response::success("Lang is disabled!");
                        }
                    }
                //</editor-fold>     
                },
            ],                            
           
            'delete' => [        
                'rules' => [
                   'id' => 'required|integer'
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="delete"> 
                    $lang = Lang::find($request->id);
                    if (empty($lang)) {
                        return Response::error("Lang with id {$request->id} doesn't exist!");                        
                    }
                    
                    if (Langs::delete($lang) === false ) {
                        return Response::error("Cannot delete last lang!"); 
                    }
                    
                    return Response::success("Lang is deleted!");
                //</editor-fold>     
                },
            ], 
                        
            'reorder' => [        
                'rules' => [
                   'ids' => 'required|string'
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="reorder"> 
                    reorder($request->ids, Lang::class);  
                    
                    return Response::success([
                        'msg' => 'New order is saved!', 
                    ]); 
                //</editor-fold>     
                },
            ],              

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }

}