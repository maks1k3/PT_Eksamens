<?php
namespace App\Logic\Main\Blog;
//s
use DB;
use App\Logic\Core\ContentTranslations;
use App\Types\Main\ContentTranslations as ContentTranslationsTypes;

class BlogCategories
{
    
     /**
     * Get query
     *
     * @access public           
     * @param  string $lang - language
     * @return object
    */
    public static function getQuery($lang) {
    //<editor-fold defaultstate="collapsed" desc="getQuery"> 
        $query = DB::connection('main')->table('blog_categories as b');
        
        $columns = [
            'b.id' => 'id',
            "$lang.title" => 'title',
        ];
        
        foreach ($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }
        
        ContentTranslations::leftJoin($query, [$lang], 'b.id', ContentTranslationsTypes::blog_category->value);
        
        return $query;
    //</editor-fold>
    }
    
    /**
     * Format response data
     *
     * @access public           
     * @param  object $item - item
     * @return array
     */
    public static function formatResponseData($item) {

    //<editor-fold defaultstate="collapsed" desc="formatResponseData">
        return [
            'id' => $item->id,
            'title' => $item->title,
        ];
    //</editor-fold>
    }
    
     /**
     * Get data
     *
     * @access public           
     * @param  object $item - item
     * @param  string $lang - lang
     * @return array
     */
    public static function get($lang) {
    //<editor-fold defaultstate="collapsed" desc="get">
        $query = self::getQuery($lang);
        $query->orderBy('position', 'asc');
        
        $items = $query->get();
                
        return $items->map(function($item) {
            return self::formatResponseData($item);
        })->all();   
    //</editor-fold>
        //dfs
    }
}