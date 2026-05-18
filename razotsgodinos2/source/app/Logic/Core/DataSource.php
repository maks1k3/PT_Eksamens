<?php
namespace App\Logic\Core;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use DB;

class DataSource
{
    
    /**
     * Parse request
     *
     * @access public
     * @param  Illuminate\Http\Request $request - request    
     * @return array
     */
    public static function parseRequest($request) {
    //<editor-fold defaultstate="collapsed" desc="parseRequest"> 
        $result = [];
        
        $result['page'] = $request->input('page', 1);
        $result['results_per_page'] = $request->input('results_per_page', null);
        $result['search'] = $request->input('search', null);
        $result['filters'] = $request->input('filters', null);
        $result['order'] = $request->input('order', null);
        
        return $result;
    //</editor-fold>      
    }
        
    /**
     * Get result
     *
     * @access public           
     * @param  array $params - ['page', 'results_per_page', 'search', 'filters', 'order']  
     * @param  DB $query - query    
     * @param  array $columns - $columns    
     * @param  array $filters - available filters    
     * @param  array $formatters - custom response column formatters    
     * @param  array $options - extra options    
     * @return array
    */
    public static function get($params, $query, $columns, $filters = [], $formatters = [], $options = []) {
    //<editor-fold defaultstate="collapsed" desc="get"> 
        $result = [];
        
        static::addSelect($query, $columns);
                
        static::search($params, $query, $columns, $options);
        static::filters($params, $query, $columns, $filters, $options);
                
        $total = 0;
        
        if (!isset($options['total'])) {
            $total = $query->count();
        }
        else if ($options['total'] === 'from_sub_query') {
            $subQuery = clone $query;
            
            $total = DB::connection($query->connection->getName())->table( DB::raw("({$subQuery->toSql()}) as sub") )
            ->mergeBindings($subQuery) 
            ->count();
        }
        else {
            $total = $options['total'];
        }       
        
        $results_per_page = static::getResultsPerPage($params, $options);
        $page = static::getPage($params);
        $limit = static::getLimit($page, $results_per_page);
        
        $queryPaginate = clone $query;
        
        if ($results_per_page !== 'all') {
           
            static::paginate($queryPaginate, $results_per_page, $limit);
        }
        
        static::order($params, $queryPaginate, $columns, $options);
        
        $rows = $queryPaginate->get();
        $count = $rows->count();
        
        static::addEmptyColumns($rows, $columns);
        
        $result['rows'] = static::formatRows($rows, $formatters);        
        
        $result['total'] = $total; 
        $result['count'] = $count; 
        $result['lastPage'] = static::getLastPage($total, $results_per_page);
        $result['loadMore'] = static::getLoadMore($count, $result['lastPage'], $results_per_page, $page);
        $result['page'] = $page;
        
        return $result;        
    //</editor-fold>
    }
    
    # ========================================================================#
    #
    #                           Helpers
    #    
    # ========================================================================#    
    
    /**
     * Add select
     *
     * @access public           
     * @param  DB $query - query 
     * @param  array $columns - $columns     
     * @return void
     */
    public static function addSelect($query, $columns) {
    //<editor-fold defaultstate="collapsed" desc="addSelect"> 
        foreach($columns as $column => $alias) {
            if (!Str::startsWith($column, '__empty__')) {
                $query->addSelect(DB::raw("{$column} as {$alias}"));
            }
        }
    //</editor-fold>
    }
    
    /**
     * Add empty columns
     *
     * @access public           
     * @param  Collection $rows - rows
     * @param  array $columns - $columns     
     * @return void
     */
    public static function addEmptyColumns($rows, $columns) {
    //<editor-fold defaultstate="collapsed" desc="addEmptyColumns"> 
        $columns_to_add = [];
        
        foreach($columns as $column => $alias) {
            if (Str::startsWith($column, '__empty__')) {
                $columns_to_add[] = $alias;
            }            
        }
        
        if (!empty($columns_to_add)) {
            foreach ($rows as $row) {
                foreach ($columns_to_add as $column) {
                    $row->{$column} = '';
                }
            }
        }
    //</editor-fold>
    }
    
    /**
     * Get results per page
     *
     * @access public     
     * @param  array $params - params      
     * @param  array $options - options     
     * @return mixed
     */
    public static function getResultsPerPage($params, $options) {
    //<editor-fold defaultstate="collapsed" desc="getResultsPerPage"> 
        $results_per_page = Arr::get($options, 'results_per_page', 10);  
        
        $results_per_page_from_params = Arr::get($params, 'results_per_page');
        
        if (!empty($results_per_page_from_params)) {
            if ($results_per_page_from_params === 'all') {
                $results_per_page = 'all';
            }
            else {
                $results_per_page = intval($results_per_page_from_params);
            }
        }        
        
        return $results_per_page;        
    //</editor-fold>
    }
    
    /**
     * Get page
     *
     * @access public     
     * @param  array $params - params
     * @return integer
     */
    public static function getPage($params) {
    //<editor-fold defaultstate="collapsed" desc="getPage">
        $page = 1;
        
        $page_from_params = Arr::get($params, 'page');
        
        if (!empty($page_from_params)) {
            $page = intval($page_from_params);
        }       
        
        if ($page <= 0) {
            $page = 1;
        }
        
        return $page;     
    //</editor-fold>
    }
    
    /**
     * Get last page
     *
     * @access public   
     * @param  integer $total - total records 
     * @param  mixed $results_per_page - results per page
     * @return integer
     */
    public static function getLastPage($total, $results_per_page) {
    //<editor-fold defaultstate="collapsed" desc="getLastPage">
        if ($results_per_page === 'all') {
            return 1;
        }
        else {
            return intval( ceil($total / $results_per_page) );
        }
    //</editor-fold>
    }
    
    /**
     * Get load more
     *
     * @access public     
     * @param  integer $count - rows count
     * @param  integer $last_page - last page
     * @param  mixed $results_per_page - results per page
     * @param  integer $page - current page
     * @return boolean
     */
    public static function getLoadMore($count, $last_page, $results_per_page, $page) {
    //<editor-fold defaultstate="collapsed" desc="getLastPage">
        if ($results_per_page === 'all') {
            return false;
        }
        else {            

            if ($count < $results_per_page) {
                return false;
            }
            else if($last_page !== $page){
                return true;
            }
            
            return false;
        }
    //</editor-fold>
    }
    
    /**
     * Get limit
     *
     * @access public     
     * @param  integer $page - page
     * @param  mixed $results_per_page - results per page
     * @return integer
     */
    public static function getLimit($page, $results_per_page) {
    //<editor-fold defaultstate="collapsed" desc="getLimit">
        $limit = 0;
        if ($results_per_page !== 'all') {
            $limit = ($results_per_page * $page) - $results_per_page;
        
            if($page === 1){
                $limit = 0;
            } 

            $limit = intval($limit);              
        }
           
        return $limit;
    //</editor-fold>
    }
    
    /**
     * Paginate
     *
     * @access public     
     * @param  DB $query - query 
     * @param  integer $results_per_page - results per page     
     * @param  integer $limit - limit     
     * @return void
     */
    public static function paginate($query, $results_per_page, $limit) {
    //<editor-fold defaultstate="collapsed" desc="paginate"> 
        $query->take($results_per_page);
        $query->skip($limit); 
    //</editor-fold>
    }
    
    
    # ========================================================================#
    #
    #                           Format response
    #    
    # ========================================================================# 
    
    /**
     * Format rows
     *
     * @access public     
     * @param  Collection $rows - rows 
     * @param  array $formatters - formatters
     * @return array
     */
    public static function formatRows($rows, $formatters) {
    //<editor-fold defaultstate="collapsed" desc="formatRows"> 
        $result = [];
        
        foreach($rows as $row) {
            $tmp = [];
            
            foreach($row as $key => $value) {
                if (isset($formatters[$key])) {
                    $tmp[$key] = $formatters[$key]($value, $row);
                }   
                else {
                    $tmp[$key] = $value;
                }
            }          
                    
            
            $result[] = $tmp;
        }
        
        return $result;
    //</editor-fold>
    }
    
    /**
     * Search
     *
     * @access public     
     * @param  array $params - params
     * @param  DB $query - query 
     * @param  array $columns - columns 
     * @param  array $options - options 
     * @return void
     */
    public static function search($params, $query, $columns, $options) {
    //<editor-fold defaultstate="collapsed" desc="search"> 
        $disabled = Arr::get($options, 'search.disabled', false);
        
        if ($disabled) {
            return;
        }
        
        $search = Arr::get($params, 'search', null);
        
        if (!empty($search)) {
            
            $term = $search;
            
            $ignored_columns = Arr::get($options, 'search.ignored', []);
            $search_by_keywords = Arr::get($options, 'search.by_keywords', []);
            
            $query->where(function ($query) use ($term, $columns, $ignored_columns, $search_by_keywords) {
            
                foreach($columns as $column => $alias) {
                    
                    if (Str::startsWith($column, '__empty__') || in_array($alias, $ignored_columns)) {
                        continue;
                    }
                    
                    if (in_array($alias, $search_by_keywords)) {
                        $words = explode(' ', $term);
                        $words = array_filter($words);
                        
                        $query->orWhere(function ($query) use ($column, $words) {
                            foreach($words as $word){
                                $query->where($column, 'like', '%'.$word.'%');
                            }  

                        });
                    }
                    else {
                       $query->orWhere($column, 'like', '%'.$term.'%'); 
                    }
                      
                }
                
            });
        }
    //</editor-fold>
    }
    
    /**
     * Filters
     *
     * @access public     
     * @param  array $params - params
     * @param  DB $query - query 
     * @param  array $columns - columns 
     * @param  array $filters - filters 
     * @param  array $options - options 
     * @return void
     */
    public static function filters($params, $query, $columns, $filters, $options) {
    //<editor-fold defaultstate="collapsed" desc="filters"> 
        $disabled = Arr::get($options, 'filters.disabled', false);
        
        if ($disabled) {
            return;
        }
        
        $params_filters = Arr::get($params, 'filters', []);
        
        if (!empty($params_filters)) {
            
            if (is_array($params_filters)) {
               
                foreach($params_filters as $key => $value) {
                                        
                    if (is_string($value) && mb_strlen($value) === 0) {
                        continue;
                    }                   
                    
                    if(isset($filters[$key])) {
                        $filters[$key]($query, $value);
                    }
                    else if(array_search ($key, $columns) !== false) {
                        $column = array_search($key, $columns);
                        
                        if (!Str::startsWith($column, '__empty__')) {
                            $query->where($column, 'like', '%'.$value.'%');
                        }
                        
                    }
                }
            }
            
        }
    //</editor-fold>
    }
    
    /**
     * Order
     *
     * @access public     
     * @param  array $params - params
     * @param  DB $query - query 
     * @param  array $columns - columns 
     * @param  array $options - options 
     * @return void
     */
    public static function order($params, $query, $columns, $options) {
    //<editor-fold defaultstate="collapsed" desc="order"> 
        
        $params_order = Arr::get($params, 'order', []);
        
        if (!empty($params_order)) {
            
            if (is_array($params_order)) {                
               
                foreach($params_order as $key => $direction) {                    
                    $direction = in_array($direction, ['asc', 'desc']) ? $direction : 'asc';                    

                    if(array_search ($key, $columns) !== false) {
                        $column = array_search ($key, $columns); 
                        if (!Str::startsWith($column, '__empty__')) {
                            $query->orderBy(DB::raw($column), $direction);
                        }
                        
                    }
                }
            }
            else if ($params_order === 'random') {
                $query->inRandomOrder();
            }
            
            
        }
        else {
            $default_order = Arr::get($options, 'order', null); 
            
            if ($default_order !== null) {
                foreach($default_order as $key => $direction) {
                    $query->orderBy(DB::raw($key), $direction);
                }
            }
        } 
    //</editor-fold>
    }
    
    
}