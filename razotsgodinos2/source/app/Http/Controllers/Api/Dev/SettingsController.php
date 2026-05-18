<?php

namespace App\Http\Controllers\Api\Dev;

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
        $auth_user = auth()->user(); 

        $actions = [

            //get_default_lang
            'get_default_lang' => [        
                'rules' => [
                   
                ],
                'action' => function($request) use ($auth_user) {
                //<editor-fold defaultstate="collapsed" desc="get_default_lang"> 
                    $langs = Lang::count();
                    if ($langs === 0) {
                        return Response::error("No langs!");                        
                    }
                    
                    $langs = Lang::orderBy('position','asc')->get(['name'])->pluck('name')->toArray();
                    
                    return Response::success([
                        'defaultLang' => Settings::getDefaultLangName(),
                        'langs' => $langs,
                    ]);                     
                //</editor-fold>     
                },
            ],
                        
            //set_default_lang
            'set_default_lang' => [        
                'rules' => [
                    'name' => 'required|alpha|max:2',
                ],
                'action' => function($request) use ($auth_user) {
                //<editor-fold defaultstate="collapsed" desc="set_default_lang"> 
                    $name = Langs::formatLang($request->name);
                    $check = Lang::whereName($name)->count() > 0;
                    
                    if (!$check) {
                        return Response::error("Lang with name {$request->id} doesn't exist!");
                    }
                    
                    Settings::set('default_lang', $name);
                    
                    return Response::success([
                        'msg' => 'Default lang is updated!',
                    ]);
                //</editor-fold>     
                },
            ], 
                        
            //get_footer_js
            'get_footer_js' => [        
                'rules' => [
                    
                ],
                'action' => function($request) use ($auth_user) {
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
                'action' => function($request) use ($auth_user) {
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