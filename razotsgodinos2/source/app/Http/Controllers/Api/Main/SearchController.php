<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Logic\Core\Response;
use DB;

use App\Logic\Core\DataSource;
use App\Logic\Core\Langs;
use App\Helpers\Core\SearchHelper;
use App\Logic\Media\Images;

class SearchController extends Controller
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
    * @return string json    
    */
    public function search(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="search">
        //DB::enableQueryLog();  
        $response = [];
        $auth_user = auth()->user();  

        //validation
        $rules = [  
            'lang' => 'string|required',
            'search' => 'string|min:2',
            'section' => 'in:products,news,solutions'
        ];
        $validate = Response::validate($request->all(), $rules);
        if ($validate) return $validate;
        
        $lang = Langs::getValidLang($request->lang);

        $query = DB::connection('main')->table('collections as c');
                
        $query->leftJoin('content_translations as c_t',function($join) use($request, $lang) {
            $join->on('c.id', '=', 'c_t.container_id');
            $join->on('c_t.container_name', '=', DB::raw("'cms_collection'"));            
            $join->on('c_t.lang', '=', DB::raw("'{$lang}'"));            
        });         
        
        //columns       
        $columns = [
            'c.id' => 'id',
            'c.name' => 'section',
            'c.media' => 'media',
            'c_t.title' => 'title',
            'c_t.search_index' => 'preview',       
        ];
        
        //permanent filters
             
        
        if (!empty($request->section)) {
            
            $query->where('c.name', '=' , $request->section);
            
        }
        else {
            $query->whereIn('c.name', 
                [
                    'products',
                    'news',
                    'solutions'
                ]
            );            
        }
        

        # ========================================================================#
        #
        #                           Formatters
        #    
        # ========================================================================#    

        $formatters = [];
        
        $formatters['media'] = function($value, $row) {            
            if (!empty($value)) {
               return json_decode($value, true);
            }
            else {
                return $value;
            }
        };

        # ========================================================================#
        #
        #                           Filters
        #    
        # ========================================================================#  
        $filters = [];

                        
        $options = [
            'results_per_page' => 2,
//            'order' => [
//                'n.created_at' => 'desc',               
//            ],
            'search' => [
                'disabled' => true,
            ],
            'filters' => [
                'disabled' => true,
            ],
        ];        

        
        $results_per_page = DataSource::getResultsPerPage($request, $options);
        $page = DataSource::getPage($request);
        $limit = DataSource::getLimit($page, $results_per_page);
                
        $search_results = [];
        if (!empty($request->search)) {
           
            $tmp = SearchHelper::generateSearchQuery($query, ['c_t.title', 'c_t.search_index'], $request->search, $limit, $results_per_page, true);
            
            $query = $tmp['query'];
            
            $search_results['searchTerm'] = $request->search;
            $search_results['keywords'] = $tmp['keywords'];
            $search_results['foundWholePhrase'] = $tmp['found_whole_phrase'];
        }
        
        
        
        $formatters['preview'] = function($value, $row) use ($request, $search_results) { 
            if (!empty($request->search)) {
                $tmp = htmlentities(SearchHelper::getSearchSnippet($search_results['keywords'], $row->preview, 10, $search_results['foundWholePhrase'], $request->search));
            
                if (!empty($tmp)) {
                    $value = $tmp;
                    return $value;
                }
                else {
                    return SearchHelper::getSearchIndex($value, false, 80);
                }
                
                
            }
            else {
                return SearchHelper::getSearchIndex($value, false, 80);
            }           
        };

        $params = DataSource::parseRequest($request);
        
        $response = DataSource::get($params, $query, $columns, $filters, $formatters, $options);
        
        $response = array_merge($response, $search_results);
        
        
        $images = [];
        
        foreach ($response['rows'] as $key => $row) {
            if (!empty($row['media'])) {
                $images[] = [
                    'key' => $key,
                    'id' => head($row['media']['images'])
                ];
            }
            
            if ($row['section'] === 'products') {
                $url = url($lang.'/product/'.$row['id'].'-'.Str::slug($row['title']));
            }
            else if ($row['section'] === 'news') {
                $url = url($lang.'/news/'.$row['id'].'-'.Str::slug($row['title']));
            }
            else if ($row['section'] === 'solutions') {
                $url = url($lang.'/solution/'.$row['id'].'-'.Str::slug($row['title']));
            }
            
            $response['rows'][$key]['url'] = $url;
        }
        
        if (!empty($images)) {
            $_images = Images::getImagesById(collect($images)->pluck('id')->all());
            $_images = collect($_images)->keyBy('id')->all();
        }
        
        foreach ($images as $image) {
            $key = $image['key'];
            $id = $image['id'];
            
            $thumbnail = $_images[$id]['thumbnail'];
            $response['rows'][$key]['thumbnail'] = $thumbnail;
            
        }
        
        
                
        //$response['sql'] = DB::getQueryLog();
        return Response::success($response);        
    //</editor-fold>
    }  

}