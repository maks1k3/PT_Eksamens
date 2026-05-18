<?php
namespace App\Logic\CMS;

use Illuminate\Support\Arr;
use App\Models\CMS\Collection;
use App\Models\Core\ContentTranslation;

use App\Config\Collections as Config;
use App\Logic\CMS\Media;
use App\Helpers\Core\SearchHelper;
use App\Helpers\Core\DateHelper;

class CollectionItem
{
    
    # ========================================================================#
    #
    #                            Helpers
    #    
    # ========================================================================#
    
    /**
     * Get config
     *
     * @access public 
     * @param string $name - name       
     * @return mixed
    */
    public static function getConfig($name) {
    //<editor-fold defaultstate="collapsed" desc="getConfig">
        $defaults = [
            'imagesConfig' => 'cms_collection',
            'videosConfig' => 'cms_collection',
            'filesConfig' => 'cms_collection',
            'active' => true, //is active after creation
            'updatePosition' => 'end',//end|start, 
        ];  
        
        $config = Arr::get(Config::get(), $name);
        
        if (empty($config)) {
            return null;
        }
        
        $merged = collect($defaults)->merge($config)->all();
        
        return $merged;        
    //</editor-fold>
    }  
    
    /**
     * Format response data
     *
     * @access public    
     * @param  \App\Models\Main\Collection $collection - collection          
     * @return array
    */
    public static function formatResponseData($collection) {
    //<editor-fold defaultstate="collapsed" desc="formatResponseData"> 
        return [
            'id' => $collection->id,
            'name' => $collection->name,                      
            'collectionId' => $collection->collection_id,                      
            'data' =>  $collection->data,
            'langData' =>  $collection->langData,
            'media' => $collection->media,  
            'date' => $collection->date,           
            'shortDate' => date('Y-m-d', strtotime($collection->date)),           
            'active' => !!intval($collection->active),           
        ];
    //</editor-fold>
    }
    
    # ========================================================================#
    #
    #                            Retrieve data
    #    
    # ========================================================================#
    
    /**
     * Get collection item
     *
     * @access public           
     * @param  array  $langs - ['en', 'lv'] langs array    
     * @param  number $id - collection item's id
     * @return array
    */
    public static function get($langs, $id) {
    //<editor-fold defaultstate="collapsed" desc="get"> 
                
        $collection = Collection::find($id);        
        $config = self::getConfig(optional($collection)->name);
        
        $contentTranslations = ContentTranslation::whereContainerNameAndContainerId(
            'cms_collection', 
            $collection->id
        )
        ->get(['title', 'content', 'data', 'lang'])
        ->keyBy('lang');
                        
        $dataExtract = Arr::get($config, 'data');
        
        if (is_callable($dataExtract)) {            
            $collection->data = $dataExtract($collection->data);
        }
                
        $langDataExtract = Arr::get($config, 'langData');        
        $_langData = [];
        
        foreach($langs as $lang) {
            
            $langData = Arr::get($contentTranslations, $lang, (object) [
                'title' => null,
                'content' => null,
                'data' => null,
            ]);
            
            $_title = $langData->title === null ? '' : $langData->title;
            $_content = $langData->content === null ? '' : $langData->content;
            $_data = $langData->data;
                        
            if (is_callable($langDataExtract)) {            
                $_langData[$lang] = $langDataExtract($_title, $_content, $_data);
            }
            else {
                $_langData[$lang] = [
                    'title' => $_title,
                    'content' => $_content,
                    'data' => $_data,
                ];
            }            
            
        }
        
        $collection->langData = $_langData;
        
        return self::formatResponseData($collection);
    //</editor-fold>
    }
        
    # ========================================================================#
    #
    #                            CRUD
    #    
    # ========================================================================#
        
    /**
     * Create collection item
     *
     * @access public           
     * @param  string $name - collection's name 
     * @param  integer $collection_id - collection's id 
     * @return \App\Models\CMS\Collection
    */
    public static function create($name, $collection_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="create"> 
        $config = self::getConfig($name);
        
        if (empty($config)) {
            return null;
        }
        
        $collection = new Collection;
        $collection->name = $name;
        $collection->collection_id = $collection_id;  
        $collection->date = DateHelper::getDateTime();

        $collection->active = Arr::get($config, 'active');

        $updatePosition = Arr::get($config, 'updatePosition');

        if ($updatePosition === 'end') {
            $tmp = Collection::whereName($name)->orderBy('position', 'desc')->first();

            if (empty($tmp)) {
                $position = 0;
            }
            else {
                $position = $tmp->position;
                $position++;
            }

            $collection->position = $position;
        }            
        else {
            $tmp = Collection::whereName($name)->orderBy('position', 'desc')->first();

            if (empty($tmp)) {
                $position = 0;
            }
            else {
                $position = $tmp->position;                   
            }

            $collection->position = 0;
            Collection::whereNameAndCollectionId($name, $collection_id)->where('position', '>=' , 0)->increment('position', 1);
        }          
                
        $collection->save();        

        $media = Arr::get($config, 'media');
               
        if (!empty($media)) {                    
            $collection->media = Media::create(
                Arr::get($config, 'imagesConfig'),
                Arr::get($media, 'images', 0), 
                Arr::get($config, 'videosConfig'),
                Arr::get($media, 'videos', 0), 
                Arr::get($config, 'filesConfig'),
                Arr::get($media, 'files', 0),                      
                $collection->id
            );                    
        }    

        $collection->save();  
        
        return $collection;
    //</editor-fold>
    }
            
    /**
     * Update lang data
     *
     * @access public           
     * @param  \App\Models\CMS\Collection $collection - collection item to update
     * @param  string $lang - lang code
     * @param  array $langData - lang data
     * @return void
    */
    public static function updateLangData($collection, $lang, $langData) {
    //<editor-fold defaultstate="collapsed" desc="updateLangData"> 
               
        $contentTranslation = ContentTranslation::firstOrCreate(['container_name' => 'cms_collection', 'container_id' => $collection->id, 'lang' => $lang]);
                               
        $title = Arr::pull($langData, 'title');
        
        if ($title !== null) {
            $contentTranslation->title = $title;
        }
        
        $_content = Arr::pull($langData, 'content');
        
        if ($_content !== null) {
            $contentTranslation->content = $_content;            
            $contentTranslation->search_index = SearchHelper::getSearchIndex($_content);
        }
        
        $search_index = Arr::pull($langData, 'search_index');
        
        if ($search_index !== null) {
            $contentTranslation->search_index = $search_index;
        }
        
        if(!empty($langData)) {
            $contentTranslation->data = $langData;
        }
        
        $contentTranslation->save();
    //</editor-fold>
    } 
    
    /**
     * Delete
     *
     * @access public           
     * @param  \App\Models\CMS\Collection $collection - collection item to delete
     * @return void
    */
    public static function delete($collection) {
    //<editor-fold defaultstate="collapsed" desc="delete"> 
        
        ContentTranslation::whereContainerNameAndContainerId('cms_collection', $collection->id)->delete();
        
        if (!empty($collection->media)) {
            Media::delete($collection->media);
        }
                   
        Collection::whereNameAndCollectionId($collection->name, $collection->collection_id)->where('position', '>', $collection->position)->decrement('position');
        
        $collection->delete();
        
    //</editor-fold>
    }
    
   
    
}