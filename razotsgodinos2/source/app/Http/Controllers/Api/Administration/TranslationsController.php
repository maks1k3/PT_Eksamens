<?php

namespace App\Http\Controllers\Api\Administration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;    
use DB;

use App\Logic\Core\Langs;
use App\Models\Core\Translation;
use App\Types\Main\ContentTranslations as ContentTranslationsTypes;
use App\Logic\Core\ContentTranslations;

class TranslationsController extends Controller
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
        $query = DB::connection('main')->table('translations as t');
        
        //columns       
        $columns = [
            't.id' => 'id',
            't.name' => 'name',
        ];

        $langs = Langs::getAll();

        foreach($langs as $lang) {
            $columns[$lang.'.content'] = $lang;
        }
        
        
        ContentTranslations::leftJoin($query, $langs, 't.id', ContentTranslationsTypes::translations->value);
        
        # ========================================================================#
        #
        #                           Formatters
        #    
        # ========================================================================#    

        $formatters = [];

        # ========================================================================#
        #
        #                           Filters
        #    
        # ========================================================================#  
        
        $filters = [];

        //override multi column search
        $filters['id'] = function($query, $value) {
            $query->where('t.id', '=', $value);
        };
        
        $filters['name'] = function($query, $value) {
            $query->where('t.name', '=', $value);
        };


        $options = [
            'results_per_page' => '10',
            'order' => [
                'id' => 'desc',
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
            
            'get' => [        
                'rules' => [
                   'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get"> 
                    $translation = Translation::find($request->id);
                    
                    if (empty($translation)) {
                        return Response::error("No translation with id:{$request->id}!");
                    }
                    
                    $langs = Langs::getAll();
                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::translations->value, $translation->id);
                                
                    return Response::success([
                        'translation' => $translation,
                        'translations' => $translations,                        
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
                //<editor-fold defaultstate="collapsed" desc="edit"> 
                    $translation = Translation::find($request->id);
                    
                    if (empty($translation)) {
                        return Response::error("No translation with id:{$request->id}!");
                    }
                    
                    $langs = Langs::getAll();
                                        
                    foreach($langs as $lang) {
                        if (isset($request[$lang])) {
                            $content_translation = ContentTranslations::getContainer(ContentTranslationsTypes::translations->value, $translation->id, $lang);
                            $content_translation->content = trim(base64_decode($request[$lang]));
                            $content_translation->save();
                        }
                    }

                    return Response::success([                        
                        'msg' => 'Tulkojums ir atjaunināts!'
                    ]);
                //</editor-fold>     
                },
            ],  

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }

}