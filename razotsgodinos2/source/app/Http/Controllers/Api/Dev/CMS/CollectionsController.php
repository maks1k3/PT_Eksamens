<?php

namespace App\Http\Controllers\Api\Dev\CMS;

use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;    
use DB;
use App\Helpers\Core\SearchHelper;

use App\Logic\CMS\CollectionItem;
use App\Models\CMS\Collection;
use App\Models\Core\Lang;
use App\Logic\CMS\Media;

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
    * Search
    *
    * @access public
    * @return json
    */
    public function search(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="search">    
        $query = DB::connection('main')->table('collections as r');
                
        //columns       
        $columns = [
            'r.id' => 'id',
            'r.created_at' => 'created_at',
            'r.updated_at' => 'updated_at',   
            'r.date' => 'date',      
            'r.name' => 'name',
            'r.data' => 'data',
            'r.media' => 'media',          
            'r.position' => 'position',          
            'r.collection_id' => 'collection_id',          
            'r.active' => 'active',          
        ];

        # ========================================================================#
        #
        #                           Formatters
        #    
        # ========================================================================#    

        $formatters = [];

        $formatters['data'] = function($value, $row) {            
            return SearchHelper::getSearchIndex($value, false, 100);
        };


        # ========================================================================#
        #
        #                           Filters
        #    
        # ========================================================================#  
        $filters = [];

        //override multi column search
        $filters['id'] = function($query, $value) {
            $query->where('r.id', '=' ,$value);
        };
        
        $filters['name'] = function($query, $value) {
            $query->where('r.name', '=' , $value);
        };
        
        $filters['position'] = function($query, $value) {
            $query->where('r.position', '=' , $value);
        };
        
        $filters['collection_id'] = function($query, $value) {
            $query->where('r.collection_id', '=' , $value);
        };
        
        //special filters
        $filters['date_from'] = function($query, $value) {
            $query->where('r.date', '>=',  $value.' 00:00:00');
        };     

        $filters['date_to'] = function($query, $value) {
            $query->where('r.date', '<=', $value.' 23:59:59');
        };  
        
        $filters['select_active'] = function($query, $value) {
            $query->where('r.active', '=' , $value);
        };         

        $options = [
            'results_per_page' => 10,
            'order' => [
                'r.id' => 'desc',                
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
        $auth_user = auth()->user(); 

        $actions = [

            'get' => [        
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get"> 
                    $collection = Collection::find($request->id);
                    
                    if (empty($collection)) {
                        return Response::error("Collection with id {$request->id} doesn't exist!");                        
                    }
                    
                    $langs = Lang::orderBy('position','asc')->get(['name'])->pluck('name')->toArray();
                    
                    $data = CollectionItem::get($langs, $collection->id);
                    
                    $media = null;
                    
                    
                    if (!empty($data['media'])) {
                        $media = [
                            'images' => Arr::get($data, 'media.images', []),
                            'videos' => Arr::get($data, 'media.videos', []),
                            'files' => Arr::get($data, 'media.files', []),
                        ];
                        Media::getMedia($media);
                    }       

                    return Response::success([
                        'collection' => $data,
                        'langs' => $langs,
                        'media' => $media,
                    ]);
                //</editor-fold>     
                },
            ],       

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    
    
    
}