<?php

namespace App\Http\Controllers\Api\Administration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;    
use DB;
use App\Logic\Core\Langs;
use App\Types\Main\ContentTranslations as ContentTranslationsTypes;
use App\Logic\Core\ContentTranslations;
use App\Logic\Core\MetaData;
use App\Models\Core\MetaData as MetaDataModel;

class MetaDataController extends Controller
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
    * Search
    *
    * @access public
    * @return json
    */
    public function search(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="search">    
        $query = DB::connection('main')->table('meta_data as m');
        
        //columns       
        $columns = [
            'm.id' => 'id',
            'm.container_name' => 'name',
        ];

        $formatters = [];
        
        $langs = Langs::getAll();
        
        foreach($langs as $lang) {
            $columns[$lang.'.title'] = $lang.'_title';
            $columns[$lang.'.content'] = $lang.'_description';
        }
        
        ContentTranslations::leftJoin($query, $langs, 'm.id', ContentTranslationsTypes::meta_data->value);
        
        # ========================================================================#
        #
        #                           Filters
        #    
        # ========================================================================#  
        $filters = [];

        //override multi column search
        $filters['id'] = function($query, $value) {
            $query->where('m.id', '=', $value);
        };
        
        $filters['name'] = function($query, $value) {
            $query->where('m.name', '=', $value);
        };

        $options = [
            'results_per_page' => 10,
            'order' => [
                'm.id' => 'desc',               
            ]
        ];        

        $params = DataSource::parseRequest($request);
        $response = DataSource::get($params, $query, $columns, $filters, $formatters, $options);

        return Response::success($response);
    //</editor-fold>
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
                    $meta_data = MetaDataModel::find($request->id);
                    
                    if (empty($meta_data)) {
                        return Response::error("No metaData with id:{$request->id}!");
                    }
                  

                    $langs = Langs::getAll();
                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::meta_data->value, $meta_data->id);

                    return Response::success([
                        'translations' => $translations,
                        'meta_data' => $meta_data,                        
                    ]);                 
                //</editor-fold>     
                },
            ], 
                                             
            //update
            'update' => [        
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update"> 
                    $meta_data = MetaDataModel::find($request->id);
                    
                    if (empty($meta_data)) {
                        return Response::error("No metaData with id:{$request->id}!");
                    }
                    
                    $langs = Langs::getAll();
                    
                    $data = [];

                    foreach($langs as $lang) {
                        if (isset($request["{$lang}_title"]) && isset($request["{$lang}_description"])) {
                            $data["{$lang}_title"] = $request["{$lang}_title"];
                            $data["{$lang}_description"] = $request["{$lang}_description"];
                        }
                    }                  
                    
                    MetaData::update($meta_data, $data);

                    return Response::success([                        
                        'msg' => 'Metadati ir atjaunināti!'
                    ]);                  
                //</editor-fold>     
                },
            ],              

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }

}