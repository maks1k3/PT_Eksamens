<?php

namespace App\Http\Controllers\Api\Dev;

use Illuminate\Support\Str;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Logic\Core\DataSource;
use App\Logic\Core\Response;
use App\Helpers\Core\RoutesHelper;

class RoutesController extends Controller
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
    * Method name
    *
    * @access public
    * @return json
    */
    public function search(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="search">    
        
        $routes = RoutesHelper::getAllRoutes();
        
        $params = DataSource::parseRequest($request);
        
        if (!empty($params['search'])) {
            $routes = $routes->filter(function($item) use($params) {
                $pos1 = stripos($item->uri, $params['search']);
                $pos2 = stripos($item->action, $params['search']);
                return ($pos1 !== false && $pos1 >= 0) || ($pos2 !== false && $pos2 >= 0);
            });
        }
        
        $results_per_page = !empty($params['results_per_page']) ? $params['results_per_page'] : 10;
       
        
        if (!empty($params['filters']['method'])) {
            $routes = $routes->filter(function($item) use($params) {
                return in_array($params['filters']['method'], $item->methods);
            });
        }
        
        $page = intval($params['page']);
        
        $pages = $routes->chunk($results_per_page);
        $lastPage = $pages->count();
        $rows = $routes->forPage($page, $results_per_page);
        
        $loadMore = false;
        
        if ($rows->count() < $results_per_page){
            $loadMore = false;
        }
        else if($lastPage !== $page) {
            $loadMore = true;
        }
        
        $result = [
            'count' => $rows->count(),//number of rows displayed
            'lastPage' => $lastPage,//last page number
            'loadMore' => $loadMore,//tells if there is more rows to load
            'page' => $page, //current page
            'rows' => $rows->values()->all(),
            'total' => $routes->count(),//total results number
        ];

        return Response::success($result);       
    //</editor-fold>
    }

    /**
    * Autocomplete routes names
    *
    * @access public
    * @return json
    */
    public function autocomplete(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="autocomplete">  
        $routes = RoutesHelper::getAllRoutes();
        
        $term = $request->term;
        
        $routes = $routes->filter(function($item) {
            return in_array('POST', $item->methods);
        });
        
        $routes = $routes->reject(function($item) {
            return Str::startsWith($item->uri, 'app/');
        });
        
        $routes = $routes->map(function($item) { 
            return [
                'label' => $item->uri,
                'value' => $item->uri,
            ];
        })->filter(function($item) use($term) {
            $position = stripos($item['value'], $term);
            
            return $position !== false && $position >= 0;
        })->values()->all();        
        
        return Response::success([
            'options' => $routes,                        
        ]);      
    //</editor-fold>
    }

}