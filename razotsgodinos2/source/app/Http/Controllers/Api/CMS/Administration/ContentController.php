<?php

namespace App\Http\Controllers\Api\CMS\Administration;

use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

use App\Logic\CMS\Content;
use App\Models\CMS\Content as ContentModel;
use App\Logic\Core\Langs;

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
                    'name' => 'required|string',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get"> 
                    $content = ContentModel::whereName($request->name)->first();
                    
                    if (empty($content)) {
                        return Response::error("Content with name {$request->name} doesn't exist!");
                    }

                    $langs = Langs::getAll();
                    
                    $content = Content::get($langs, $request->name);
                    
                    return Response::success([                           
                        'content' => $content,
                        'langs' => $langs,
                    ]);                     
                //</editor-fold>     
                },
            ],    
                        
            //update
            'update' => [        
                'rules' => [
                    'name' => 'required|string',
                    'data' => 'string',
                    'langData' => 'string'
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update"> 
                    $content = ContentModel::whereName($request->name)->first();
                    
                    if (empty($content)) {
                        return Response::error("Content with name {$request->name} doesn't exist!");
                    }
                    
                    $config = Content::getConfig($request->name);
                    
                    if (empty($config)) {
                        return Response::error("No configuration for {$request->name}!");
                    }
                    
                    //update data
                    if (!empty($request->data)) {
                        
                        $data = json_decode(base64_decode($request->data), true);
                        
                        //callbacks
                        $beforeUpdateData = Arr::get($config, 'callbacks.beforeUpdateData');
                        $onUpdateData = Arr::get($config, 'callbacks.onUpdateData');
                        $afterUpdateData = Arr::get($config, 'callbacks.afterUpdateData');

                        if (is_callable($beforeUpdateData)) {
                            $data = $beforeUpdateData($data, $content);
                        }

                        if (is_callable($onUpdateData)) {
                            $onUpdateData($data, $content);
                        }
                        else {
                            $content->data = $data;
                            $content->save();
                        }

                        if (is_callable($afterUpdateData)) {
                            $afterUpdateData($data, $content);
                        }                        
                    }
                    
                    //update lang data
                    if (!empty($request->langData)) {                                               
                        
                        $tmp = json_decode(base64_decode($request->langData), true);
                        
                        $langData = [];
                        
                        foreach ($tmp as $lang => $value) {
                            $lang = Langs::getValidLang($lang);
                            $langData[$lang] = $value;
                        }
                        
                        //callbacks
                        $beforeUpdateLangData = Arr::get($config, 'callbacks.beforeUpdateLangData');
                        $onUpdateLangData = Arr::get($config, 'callbacks.onUpdateLangData');
                        $afterUpdateLangData = Arr::get($config, 'callbacks.afterUpdateLangData');

                        if (is_callable($beforeUpdateLangData)) {
                            $langData = $beforeUpdateLangData($langData, $content);
                        }

                        if (is_callable($onUpdateLangData)) {
                            $onUpdateLangData($langData, $content);
                        }
                        else {
                                                        
                            foreach ($langData as $lang => $data) {    
                                Content::updateLangData($content, $lang, $data);
                            } 
                        }

                        if (is_callable($afterUpdateLangData)) {
                            $afterUpdateLangData($data, $langData);
                        }                                           
                        
                    }
                    
                    $langs = Langs::getAll();
                    
                    $content = Content::get($langs, $request->name);
                    
                    return Response::success([    
                        'msg' => 'Content updated!',
                        'content' => $content,
                    ]);  
                //</editor-fold>     
                },
            ],   

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    

}