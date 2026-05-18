<?php

namespace App\Http\Controllers\Api\CMS\Administration;
//s
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

use App\Logic\CMS\CollectionItem;
use App\Models\CMS\Collection;
use App\Logic\Core\Langs;

class CollectionItemController extends Controller
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
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get"> 
                    $collectionItem = Collection::find($request->id);
                    
                    if (empty($collectionItem)) {
                        return Response::error("CollectionItem with id {$request->id} doesn't exist!");
                    }
                    
                    $langs = Langs::getAll();
                    
                    $collectionItem = CollectionItem::get($langs, $request->id);
                    
                    return Response::success([                           
                        'collection' => $collectionItem,
                        'langs' => $langs,
                    ]);  
                //</editor-fold>     
                },
            ],    
                        
            //create
            'create' => [        
                'rules' => [
                    'name' => 'required|string',
                    'collection_id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="create"> 
                    $config = CollectionItem::getConfig($request->name);
                    
                    if (empty($config)) {
                        return Response::error("No configuration for {$request->name}!");
                    }
                    
                    //callbacks
                    $beforeCretae = Arr::get($config, 'callbacks.beforeCreate');
                    $onCreate = Arr::get($config, 'callbacks.onCreate');
                    $afterCreate = Arr::get($config, 'callbacks.afterCreate');

                    if (is_callable($beforeCretae)) {
                        $beforeCretae($request);
                    }

                    if (is_callable($onCreate)) {
                        $collectionItem = $onCreate($request);
                    }
                    else {
                        $collectionItem = CollectionItem::create($request->name, $request->collection_id);
                    }

                    if (is_callable($afterCreate)) {
                        $afterCreate($request, $collectionItem);
                    }         
                    

                    
                    $langs = Langs::getAll();                                            
                    
                    return Response::success([                        
                        'collection' => CollectionItem::get($langs, $collectionItem->id),
                        'langs' => $langs,
                    ]);  
                //</editor-fold>     
                },
            ],
                        
            //update
            'update' => [        
                'rules' => [
                    'id' => 'required|integer',
                    'data' => 'string',
                    'langData' => 'string',
                    'date' => 'string|date_format:Y-m-d H:i:s',
                    'active' => 'boolean',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update"> 
                    $collectionItem = Collection::find($request->id);
                    
                    if (empty($collectionItem)) {
                        return Response::error("CollectionItem with id {$request->id} doesn't exist!");
                    }                    
                    
                    $config = CollectionItem::getConfig($collectionItem->name);
                    
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
                            $data = $beforeUpdateData($data, $collectionItem);
                        }

                        if (is_callable($onUpdateData)) {
                            $onUpdateData($data, $collectionItem);
                        }
                        else {
                            $collectionItem->data = $data;
                            $collectionItem->save();
                        }

                        if (is_callable($afterUpdateData)) {
                            $afterUpdateData($data, $collectionItem);
                        }                        
                    }                    
                    
                    //update langData
                    
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
                            $langData = $beforeUpdateLangData($langData, $collectionItem);
                        }

                        if (is_callable($onUpdateLangData)) {
                            $onUpdateLangData($langData, $collectionItem);
                        }
                        else {
                                                        
                            foreach ($langData as $lang => $data) {    
                                CollectionItem::updateLangData($collectionItem, $lang, $data);
                            } 
                        }

                        if (is_callable($afterUpdateLangData)) {
                            $afterUpdateLangData($langData, $collectionItem);
                        }                          
                        
                    }
                    
                    //update date 
                    if (!empty($request->date)) { 
                        $date = $request->date;
                        
                        //callbacks
                        $beforeSetDate = Arr::get($config, 'callbacks.beforeSetDate');
                        $onSetDate = Arr::get($config, 'callbacks.onSetDate');
                        $afterSetDate = Arr::get($config, 'callbacks.afterSetDate');

                        if (is_callable($beforeSetDate)) {
                            $date = $beforeSetDate($request->date, $collectionItem);
                        }

                        if (is_callable($onSetDate)) {
                            $onSetDate($date, $collectionItem);
                        }
                        else {
                            $collectionItem->date = $date;    
                            $collectionItem->save();
                        }

                        if (is_callable($afterSetDate)) {
                            $afterSetDate($date, $collectionItem);
                        }           
                    }                   
                    
                    //update active
                    if (isset($request->active)) {
                        $active = !!intval($request->active);
                        
                        //callbacks
                        $beforeSetActive = Arr::get($config, 'callbacks.beforeSetActive');
                        $onSetActive = Arr::get($config, 'callbacks.onSetActive');
                        $afterSetActive = Arr::get($config, 'callbacks.afterSetActive');

                        if (is_callable($beforeSetActive)) {
                            $active = $beforeSetActive($active, $collectionItem);
                        }

                        if (is_callable($onSetActive)) {
                            $onSetActive($active, $collectionItem);
                        }
                        else {
                            $collectionItem->active = $active;    
                            $collectionItem->save(); 
                        }

                        if (is_callable($afterSetActive)) {
                            $afterSetActive($active, $collectionItem);
                        }           
                    }
                                        
                    $langs = Langs::getAll();  
                    
                    $collection = CollectionItem::get($langs, $request->id);                                                              
                    
                    return Response::success([  
                        'msg' => 'CollectionItem updated!',
                        'collection' => $collection,
                        'langs' => $langs,
                    ]);  
                //</editor-fold>     
                },
            ],
                        
            //delete
            'delete' => [        
                'rules' => [
                    'id' => 'required|integer', 
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="delete"> 
                    $collectionItem = Collection::find($request->id);
                    
                    if (empty($collectionItem)) {
                        return Response::error("CollectionItem with id {$request->id} doesn't exist!");
                    }                    
                    
                    $config = CollectionItem::getConfig($collectionItem->name);
                    
                    if (empty($config)) {
                        return Response::error("No configuration for {$request->name}!");
                    }            
                    
                    $canDelete = Arr::get($config, 'canDelete');
        
                    if (is_callable($canDelete)) {            
                        $check = $canDelete($collectionItem);
                        
                        if (!$check['passed']) {
                            return Response::error($check['msg']);
                        }
                    }
                    
                    //callbacks
                    $beforeDelete = Arr::get($config, 'callbacks.beforeDelete');
                    $onDelete = Arr::get($config, 'callbacks.onDelete');
                    $afterDelete = Arr::get($config, 'callbacks.afterDelete');

                    if (is_callable($beforeDelete)) {
                        $beforeDelete($request, $collectionItem);
                    }

                    if (is_callable($onDelete)) {
                        $onDelete($request, $collectionItem);
                    }
                    else {
                        CollectionItem::delete($collectionItem);
                    }

                    if (is_callable($afterDelete)) {
                        $afterDelete($request, $collectionItem);
                    }           
                    
                    
                    return Response::success([                        
                        'msg' => 'CollectionItem is deleted!',
                    ]);  
                //</editor-fold>     
                },
            ],                        

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    

}