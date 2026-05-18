<?php

namespace App\Http\Controllers\Api\Main;
//s
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use App\Logic\Main\Blog\BlogEntries;

class BlogEntriesController extends Controller
{
    /**
    * Constructor
    *
    * @return void
    */
    public function __construct()
    {


    }
//s
    /**
    * Search
    *
    * @access public
    * @return json
    */
    public function search(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="search">  
        
        
        $lang = app()->getLocale();
        
        $query = BlogEntries::getQuery($lang);
        
        
        if ($request->has('category_id')) {
            $query->where('categories', 'LIKE', '%' . $request->category_id . '%');
        }
        
        $columns = BlogEntries::getColumns($lang);

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
                
        $options = [
            'results_per_page' => 999,
            'order' => [
                'b.position' => 'asc',
            ]
        ];        

        $params = DataSource::parseRequest($request);
        $response = DataSource::get($params, $query, $columns, $filters, $formatters, $options);

        foreach($response['rows'] as $index => $row) {
            $response['rows'][$index] = BlogEntries::formatResponseData((object)$row, $lang);
        }
        
        return Response::success($response);
    //</editor-fold>
    }

}