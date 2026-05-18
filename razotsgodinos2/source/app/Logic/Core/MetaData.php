<?php
namespace App\Logic\Core;

use App\Models\Core\MetaData as MetaDataModel;
use App\Models\Core\ContentTranslation;

use App\Logic\Core\Langs;

use DB;

class MetaData
{

    # ========================================================================#
    #
    #                           Retrieve data
    #    
    # ========================================================================#    
    
    
    /**
     * Get meta data
     *
     * @access public           
     * @param string $lang - language
     * @param string $container_name - container name 
     * @param integer $container_id - container id  
     * @return array
    */
    public static function get($lang, $container_name, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="get"> 
        $query = DB::connection('main')->table('meta_data as m'); 
        
        //columns       
        $columns = [
            'm.id' => 'id',
        ];

        $columns["{$lang}.title"] = 'title';
        $columns["{$lang}.content"] = 'description';

        $query->leftJoin('content_translations as '.$lang, function($join) use ($lang)
        {                           
            $join->on($lang.'.container_id', '=', 'm.id');
            $join->on($lang.'.container_name', '=', DB::raw("'meta_data'"));
            $join->on($lang.'.lang', '=', DB::raw("'{$lang}'"));
        });

        foreach($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }

        $query->where('m.container_name', '=', $container_name);
        $query->where('m.container_id', '=', $container_id);        

        $translations = $query->first();
        
        if (empty($translations)) {
            return [                 
                'title' => '',                 
                'description' => '',             
            ];   
        }

        return [
            'title' => $translations->title,
            'description' => $translations->description,
        ];
        
    //</editor-fold>
    }    
    
    
    /**
     * Get all meta data
     *
     * @access public           
     * @param string $container_name - container name 
     * @param integer $container_id - container id  
     * @return array
    */
    public static function getAll($container_name, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="getAll"> 
        $query = DB::connection('main')->table('meta_data as m');        
        //columns       
        $columns = [
            'm.id' => 'id',
            'm.container_id' => 'container_id',
            'm.container_name' => 'container_name',
        ];

        $langs = Langs::getAll();

        foreach($langs as $lang) {
            $columns["{$lang}.title"] = "{$lang}_title";
            $columns["{$lang}.content"] = "{$lang}_description";

            $query->leftJoin('content_translations as '.$lang, function($join) use ($lang)
            {                           
                $join->on($lang.'.container_id', '=', 'm.id');
                $join->on($lang.'.container_name', '=', DB::raw("'meta_data'"));
                $join->on($lang.'.lang', '=', DB::raw("'{$lang}'"));
            });

        }

        foreach($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }

        $query->where('m.container_name', '=', $container_name);
        $query->where('m.container_id', '=', $container_id);        

        $translations = $query->first();

        return [
            'translations' => $translations,
            'langs' => $langs,
        ];        
    //</editor-fold>
    }
    
    
    # ========================================================================#
    #
    #                           CRUD
    #    
    # ========================================================================#    
    
    
    /**
     * Create
     *
     * @access public           
     * @param  string $container_name - container name 
     * @param  integer $container_id - container id    
     * @return \App\Models\Core\MetaData
    */
    public static function create($container_name, $container_id = 0 ) {
    //<editor-fold defaultstate="collapsed" desc="create"> 
        
       return MetaDataModel::firstOrCreate(['container_name' => $container_name, 'container_id' => $container_id]);
        
    //</editor-fold>
    }
    
    /**
     * Update
     *
     * @access public           
     * @param  \App\Models\Core\MetaData $metaData - meta data to update
     * @param  array $data - data to update
     * @return void
    */
    public static function update($metaData, $data) {
    //<editor-fold defaultstate="collapsed" desc="update"> 
        
        $langs = Langs::getAll();
                                        
        foreach($langs as $lang) {
            if (isset($data["{$lang}_title"]) && isset($data["{$lang}_description"])) {
                $contentTranslation = ContentTranslation::firstOrCreate(['container_name' => 'meta_data', 'container_id' => $metaData->id, 'lang' => $lang]);
                $contentTranslation->title = $data["{$lang}_title"];
                $contentTranslation->content = $data["{$lang}_description"];
                $contentTranslation->save();
            }
        }
        
    //</editor-fold>
    }
    
    /**
     * Delete
     *
     * @access public           
     * @param  \App\Models\Core\MetaData $metaData - meta data to delete    
     * @return void
    */
    public static function delete($metaData) {
    //<editor-fold defaultstate="collapsed" desc="update"> 
        
        $metaData->delete();
        ContentTranslation::whereContainerNameAndContainerId('meta_data', $metaData->id)->delete();
        
    //</editor-fold>
    }
    
}