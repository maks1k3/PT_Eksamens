<?php
namespace App\Logic\CMS;

use DB;
use Illuminate\Support\Arr;

use App\Config\Content as ContentConfig;
use App\Config\Collections as CollectionsConfig;
use App\Logic\CMS\Media;
use App\Logic\Core\Users;


class Data
{
    
    
    # ========================================================================#
    #
    #                            Helpers
    #    
    # ========================================================================# 
    
    /**
     * Parse row
     *
     * @access public      
     * @param  oject $row - row data     
     * @return array
    */
    public static function parseRow($row) {
    //<editor-fold defaultstate="collapsed" desc="get">  
        if (!empty($row->data)) {
            $row->data = json_decode($row->data, true);
        }
        
        if (!empty($row->langData)) {
            $row->langData = json_decode($row->langData, true);
        }
        
        if (!empty($row->media)) {
            $row->media = json_decode($row->media, true);
        }
    //</editor-fold>
    }   

    # ========================================================================#
    #
    #                            Retrieve data
    #    
    # ========================================================================#
        
    /**
     * Get data
     *
     * @access public      
     * @param  string $lang - current lang     
     * @param  array $params - params 
     * @return array
    */
    public static function get($lang, $params) {
    //<editor-fold defaultstate="collapsed" desc="get">          
        $collectionItems = Arr::get($params, 'collectionItems', []);
        
        $state = [
            'content' => [],
            'collections' => [],
            'collectionItems' => $collectionItems,
            'images' => [],
            'videos' => [],
            'files' => [],
        ];
        
        $content = Arr::get($params, 'content', []);
        if (!empty($content)) {
            self::getContent($lang, $content, $state);
        }
        
        
        $collections = Arr::get($params, 'collections', []);
        
        if (!empty($collections)) {
            self::getCollections($collections, $state); 
        }
       
    
        self::getCollectionItems($lang, $state);  
        Media::getMedia($state);      
        
        if (empty($state['content'])) {
            $state['content'] = (object)[];
        }
        
        if (empty($state['collections'])) {
            $state['collections'] = (object)[];
        }
        
        if (empty($state['collectionItems'])) {
            $state['collectionItems'] = (object)[];
        }
        
        return $state;     
    //</editor-fold>
    }
  
    
    # ========================================================================#
    #
    #                           Content
    #    
    # ========================================================================# 
       
    /**
     * Get content
     *
     * @access public    
     * @param  string $lang - current lang            
     * @param  array $content - content names
     * @param  array $state - app state
     * @return void
    */
    public static function getContent($lang, $content, &$state) {
    //<editor-fold defaultstate="collapsed" desc="getContent">                 
        $query =  DB::connection('main')->table('content as c');
        
        $query->leftJoin('content_translations as t',function($join) use($lang) {
            $join->on('t.container_name', '=', DB::raw("'cms_content'"));
            $join->on('t.lang', '=', DB::raw("'{$lang}'")); 
            $join->on('t.container_id', '=', 'c.id');
        }); 
        
        //columns       
        $columns = [
            'c.id' => 'id',
            'c.name' => 'name', 
            'c.data' => 'data', 
            'c.media' => 'media', 
            't.title' => 'title', 
            't.content' => 'content', 
            't.data' => 'langData', 
        ];
        
        foreach($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }
        
        $query->whereIn('c.name', $content);
        
        $rows = $query->get();
        
        
        $config_items = array_keys(ContentConfig::get());
        $found_items = array_keys($rows->groupBy('name')->toArray());        
        $not_exist_in_db = array_diff($content, $found_items);     
        
        foreach($not_exist_in_db as $name) {
            if (in_array($name, $config_items)) {
                Content::create($name);                 
            }
        }
        
        if (!empty($not_exist_in_db)) {
            $rows = $query->get();
        }
        
        foreach($rows as $row) {          
           self::parseContent($row, $state);            
        }
        
        
    //</editor-fold>
    }
    
    /**
     * Parse content
     *
     * @access public                          
     * @param  oject $row - row data
     * @param  array $state - app state
     * @return void
    */
    public static function parseContent($row, &$state) {
    //<editor-fold defaultstate="collapsed" desc="parseContent">         
        $config = Arr::get(ContentConfig::get(), $row->name);
        if (empty($config)) {
            return;
        }
        
        self::parseRow($row);
                
        $data_extract = Arr::get($config, 'data');
        $lang_data_extract = Arr::get($config, 'langData');
        
        $item = [
            'id' => $row->id,
            'name' => $row->name,
            'media' => $row->media,
            'data' => null,
            'langData' => null,
        ];
        
        if (is_callable($data_extract)) {            
            $item['data'] = $data_extract($row->data);
        }
        
        if (is_callable($lang_data_extract)) {  
            
            $_title = $row->title === null ? '' : $row->title;
            $_content = $row->content === null ? '' : $row->content;
            $_data = $row->langData;
            
            $item['langData'] = $lang_data_extract($_title, $_content, $_data);
        }
        
        $state['content'][$row->name] = $item;
        
        Media::extract($row, $state);
        
    //</editor-fold>
    }
    
    # ========================================================================#
    #
    #                           Collections
    #    
    # ========================================================================# 
    
    /**
     * Get collections
     *
     * @access public                
     * @param  array $collections - collections params
     * @param  array $state - app state 
     * @return void
    */
    public static function getCollections($collections, &$state) {
    //<editor-fold defaultstate="collapsed" desc="getCollections"> 
        foreach ($collections as $name => $options) {
            self::getCollection($name, $options, $state);
        }
    //</editor-fold>
    }
    
    /**
     * Get collection
     *
     * @access public 
     * @param  string $name - collection name              
     * @param  array $options - search options  
     * @param  array $state - app state 
     * @return void
    */
    public static function getCollection($name, $options, &$state) {
    //<editor-fold defaultstate="collapsed" desc="getCollections">         
        $name = Arr::get($options, 'collection_name', $name);
        
        $config = Arr::get(CollectionsConfig::get(), $name);
        if (empty($config)) {
            return;
        }
        
        $query =  DB::connection('main')->table('collections as c');
                
        //columns       
        $columns = [
            'c.id' => 'id',           
        ];
        
        foreach($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }
        
        $query->where('c.name', '=', $name);
        
        $collection_id = Arr::get($options, 'collection_id');
        
        if ($collection_id !== null) {
            $query->where('c.collection_id', '=', $collection_id);
        }
        
        $active = Arr::get($options, 'active');
        
        if ($active !== null && !Users::isCMSAdmin(auth()->user())) {
            $query->where('c.active', '=', $active);
        }
        
        $total = $query->count();
        
        $results_per_page = Arr::get($options, 'results_per_page', 10);
        $page = intval(Arr::get($options, 'page', 1));
        
        $limit = 0;
        if ($results_per_page !== 'all') {
            $limit = ($results_per_page * $page) - $results_per_page;
        
            if($page === 1) {
                $limit = 0;
            } 

            $limit = intval($limit);              
        }
                
        if ($results_per_page !== 'all') {
           
            $query->take($results_per_page);
            $query->skip($limit); 
        }

        $order = Arr::get($options, 'order', [ 'position' => 'asc' ]); 
        
        if ($order === 'random') {
            $query->inRandomOrder();   
        }
        else {
            foreach ($order as $column => $direction) {
                $query->orderBy($column, $direction);
            }
        }
        
                
        $rows = $query->get();        
        $count = $rows->count();
        
        if ($results_per_page === 'all') {
            $lastPage = 1;
        }
        else {
            $lastPage = intval( ceil($total / $results_per_page) );
        }
        
        
        if ($results_per_page === 'all') {
            $loadMore = false;
        }
        else {            

            if($count < $results_per_page){
                $loadMore = false;
            }
            else if($lastPage !== $page){
                $loadMore = true;
            }
            else {
                $loadMore = false;
            }
            
            
        }
        
        $result = [];
        $result['ids'] = $rows->pluck('id')->toArray();
        
        
        $result['total'] = $total; 
        $result['count'] = $count; 
        $result['lastPage'] = $lastPage;
        $result['loadMore'] = $loadMore;
        $result['page'] = $page;               
        
        $result['refreshOptions'] = self::getRefreshOptions($options, $page, $results_per_page);     
        
        $collection_id = intval($collection_id);
        
        if ($collection_id > 0) {
            $name = $name.'_'.$collection_id;
        }
        
        $state['collections'][$name] = $result;
        $state['collectionItems'] = array_merge($state['collectionItems'], $result['ids']);         
        
    //</editor-fold>
    }
    
    /**
     * Get refresh options
     *
     * @access public   
     * @param  string $lang - current lang   
     * @param  array $state - app state 
     * @return void
    */
    public static function getRefreshOptions($options, $page, $results_per_page) {
    //<editor-fold defaultstate="collapsed" desc="getRefreshOptions"> 
        $result = $options;
        
        if ($results_per_page !== 'all' && $page > 1 && Arr::get($options, 'is_load_more', false)) {
            $results_per_page = $page * $results_per_page;
            $page = 1;
        }
        
        $result['results_per_page'] = $results_per_page;
        $result['page'] = $page;
        
        return $result;
    //</editor-fold>
    }
    
    /**
     * Get content
     *
     * @access public   
     * @param  string $lang - current lang   
     * @param  array $state - app state 
     * @return void
    */
    public static function getCollectionItems($lang, &$state) {
    //<editor-fold defaultstate="collapsed" desc="getCollectionItems"> 
        if (empty($state['collectionItems'])) {
            return;
        }
        
        $query =  DB::connection('main')->table('collections as c');
        
        $query->leftJoin('content_translations as t',function($join) use($lang) {
            $join->on('t.container_name', '=', DB::raw("'cms_collection'"));
            $join->on('t.container_id', '=', 'c.id');
            $join->on('t.lang', '=', DB::raw("'{$lang}'"));            
        }); 
        
        //columns       
        $columns = [
            'c.id' => 'id',
            'c.name' => 'name', 
            'c.collection_id' => 'collectionId',
            'c.data' => 'data', 
            'c.media' => 'media', 
            't.title' => 'title', 
            't.content' => 'content', 
            't.data' => 'langData', 
            'c.date' => 'date',
            'c.active' => 'active',
        ];
        
        foreach($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }
        
        $query->whereIn('c.id', array_unique($state['collectionItems']));
        
        $rows = $query->get();
        
        $state['collectionItems'] = [];
        
        foreach($rows as $row) {          
           self::parseCollectionItem($row, $state);            
        }
    //</editor-fold>
    }
            
    /**
     * Parse collection item
     *
     * @access public   
     * @param  oject $row - row data  
     * @param  array $state - app state 
     * @return void
    */
    public static function parseCollectionItem($row, &$state) {
    //<editor-fold defaultstate="collapsed" desc="parseCollectionItem"> 
        $config = Arr::get(CollectionsConfig::get(), $row->name);
        if (empty($config)) {
            return;
        }
        
        self::parseRow($row);
                
        $data_extract = Arr::get($config, 'data');
        $lang_data_extract = Arr::get($config, 'langData');
        
        $item = [
            'id' => $row->id,
            'name' => $row->name,
            'collectionId' => $row->collectionId,
            'media' => $row->media,
            'data' => null,
            'langData' => null,
            'date' => $row->date,           
            'shortDate' => date('Y-m-d', strtotime($row->date)),        
            'active' => !!intval($row->active),  
        ];
        
        if (is_callable($data_extract)) {            
            $item['data'] = $data_extract($row->data);
        }
        
        if (is_callable($lang_data_extract)) { 
            
            $_title = $row->title === null ? '' : $row->title;
            $_content = $row->content === null ? '' : $row->content;
            $_data = $row->langData;
            
            $item['langData'] = $lang_data_extract($_title, $_content, $_data);
        }
        
        $state['collectionItems'][$row->id] = $item;
        
        Media::extract($row, $state);
    //</editor-fold>
    }

}