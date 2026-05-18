<?php
namespace App\Logic\CMS;

use Illuminate\Support\Arr;
use App\Models\CMS\Content as ContentModel;
use App\Models\Core\ContentTranslation;

use App\Config\Content as Config;
use App\Logic\CMS\Media;
use App\Helpers\Core\SearchHelper;

use DB;

class Content
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
            'imagesConfig' => 'cms_content',
            'videosConfig' => 'cms_content',
            'filesConfig' => 'cms_content',
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
     * @param \App\Models\Main\Content $content - content          
     * @return array
    */
    public static function formatResponseData($content) {
    //<editor-fold defaultstate="collapsed" desc="formatResponseData"> 
        return [
            'id' => $content->id,
            'name' => $content->name,                      
            'data' =>  $content->data,
            'langData' => $content->langData,
            'media' => $content->media,  
        ];
    //</editor-fold>
    }
    
    # ========================================================================#
    #
    #                            Retrieve data
    #    
    # ========================================================================#
    
    /**
     * Get content
     *
     * @access public           
     * @param  array  $langs - ['en', 'lv'] langs array
     * @param  string $name - content's name
     * @return array
    */
    public static function get($langs, $name) {
    //<editor-fold defaultstate="collapsed" desc="get">                         
        $config = self::getConfig($name);
        
        $content = ContentModel::whereName($name)->first();
        
        
        $contentTranslations = ContentTranslation::whereContainerNameAndContainerId(
            'cms_content', 
            $content->id
        )
        ->get(['title', 'content', 'data', 'lang'])
        ->keyBy('lang');
                                     
        $dataExtract = Arr::get($config, 'data');
        
        if (is_callable($dataExtract)) {            
            $content->data = $dataExtract($content->data);
        }
                
        $langDataExtract = Arr::get($config, 'langData');        
        $_langData = [];
        
        foreach($langs as $lang) {
            
            $langData = Arr::get($contentTranslations, $lang, (object)[
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
            
        $content->langData = $_langData;
        
        return self::formatResponseData($content);
    //</editor-fold>
    }
    
    # ========================================================================#
    #
    #                            CRUD
    #    
    # ========================================================================#
       
        
    /**
     * Create
     *
     * @access public           
     * @param  string $name - content's name
     * @return \App\Models\CMS\Content
    */
    public static function create($name) {
    //<editor-fold defaultstate="collapsed" desc="create"> 
        $config = self::getConfig($name);
        
        if (empty($config)) {
            return null;
        }
        
        $content = new ContentModel;
        $content->name = $name;  
        $content->save();
                
        $media = Arr::get($config, 'media');
               
        if (!empty($media)) {  
            $content->media = Media::create(
                Arr::get($config, 'imagesConfig'),
                Arr::get($media, 'images', 0), 
                Arr::get($config, 'videosConfig'),
                Arr::get($media, 'videos', 0), 
                Arr::get($config, 'filesConfig'),
                Arr::get($media, 'files', 0),                      
                $content->id
            );
        }            
        $content->save();              
        
        
        return $content;
    //</editor-fold>
    }
            
    /**
     * Update lang data
     *
     * @access public           
     * @param  \App\Models\CMS\Content $content - content
     * @param  string $lang - lang code
     * @param  array $langData - lang data 
     * @return void
    */
    public static function updateLangData($content, $lang, $langData) {
    //<editor-fold defaultstate="collapsed" desc="updateLangData"> 
               
        $contentTranslation = ContentTranslation::firstOrCreate(['container_name' => 'cms_content', 'container_id' => $content->id, 'lang' => $lang]);
                    
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
     * @param  \App\Models\CMS\Content $content - content to delete
     * @return void
    */
    public static function delete($content) {
    //<editor-fold defaultstate="collapsed" desc="delete"> 
        
        ContentTranslation::whereContainerNameAndContainerId('cms_content', $content->id)->delete();  
        
        if (!empty($content->media)) {
            Media::delete($content->media);
        }
                
        $content->delete();
        
    //</editor-fold>
    }
    
}