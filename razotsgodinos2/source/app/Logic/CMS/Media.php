<?php
namespace App\Logic\CMS;

use Illuminate\Support\Arr;

use App\Models\Media\Image;
use App\Logic\Media\Images;

use App\Models\Media\Video;
use App\Logic\Media\Videos;

use App\Models\Media\File;
use App\Logic\Media\Files;


class Media
{
    
    # ========================================================================#
    #
    #                            Helpers 
    #    
    # ========================================================================# 
    
    /**
     * Extract media
     *
     * @access public        
     * @param  oject $row - row data
     * @param  array $state - app state 
     * @return void
    */
    public static function extract($row, &$state) {
    //<editor-fold defaultstate="collapsed" desc="mediaExtract"> 
        if (empty($row->media)) {
            return;
        }
        
        $videos = Arr::get($row->media, 'videos', []);        
        
        if (!empty($videos)) {
            $state['videos'] = array_merge($state['videos'], $videos);            
        }
        
        $images = Arr::get($row->media, 'images', []);
        if (!empty($images)) {
            $state['images'] = array_merge($state['images'], $images);
        }        
        
        $files = Arr::get($row->media, 'files', []);
        if (!empty($files)) {
            $state['files'] = array_merge($state['files'], $files);
        }
                
    //</editor-fold>
    }
    
    # ========================================================================#
    #
    #                            Retrieve data
    #    
    # ========================================================================# 
    
    /**
     * Get media
     *
     * @access public             
     * @param  array $state - app state 
     * @return void
    */
    public static function getMedia(&$state) {
    //<editor-fold defaultstate="collapsed" desc="getMedia"> 
        
        $video_ids = array_unique($state['videos']);
        $state['videos'] = [];
        
        if (!empty($video_ids)) {
            $videos = Video::whereIn('id', $video_ids)->get();
            
            foreach($videos as $video) {
                $state['videos'][$video->id] = Videos::formatResponseData($video);                
            }
        }
        else {
            $state['videos'] = (object)[];
        }
        
        $image_ids = array_unique($state['images']);
        $state['images'] = [];
        
        if (!empty($image_ids)) {
            $images = Image::whereIn('id', $image_ids)->get();
            
            foreach($images as $image) {
                $state['images'][$image->id] = Images::formatResponseData($image);                 
            }
        }
        else {
            $state['images'] = (object)[];
        }
        
        $file_ids = array_unique($state['files']);
        $state['files'] = [];
        
        if (!empty($file_ids)) {
            $files = File::whereIn('id', $file_ids)->get();
            
            foreach($files as $file) {
                $state['files'][$file->id] = Files::formatResponseData($file);                 
            }
        }
        else {
            $state['files'] = (object)[];
        }
        
    //</editor-fold>
    }    
    
    # ========================================================================#
    #
    #                            CRUD
    #    
    # ========================================================================# 
    
    /**
     * Create media
     *
     * @access public    
     * @param  int $videos - number of videos     
     * @param  int $images - number of images     
     * @param  int $files - number of files 
     * @param  string $container_name - container's name
     * @param  int $container_id - container's id  
     * @return array
    */   
    public static function create($imagesConfig, $images, $videosConfig, $videos, $filesConfig, $files, $container_id) {
    //<editor-fold defaultstate="collapsed" desc="create"> 
        $result = [];
                
        if ($images > 0) {
            $result['images'] = [];
            
            for ($i = 1; $i <= $images; $i++) {
                $result['images'][] = Images::createEmpty($imagesConfig, $container_id)->id;
            }
        }
        
        if ($videos > 0) {
            $result['videos'] = [];
            
            for ($i = 1; $i <= $videos; $i++) {                
                $result['videos'][] = Videos::createEmpty($videosConfig, $container_id)->id;
            }
        }
        
        if ($files > 0) {
            $result['files'] = [];
            
            for ($i = 1; $i <= $files; $i++) {
                $result['files'][] = Files::createEmpty($filesConfig, $container_id)->id;
            }
        }        
        
        return $result;
    //</editor-fold>
    }
    
    
    /**
     * Delete media
     *
     * @access public           
     * @param  array $media - media to delete
     * @return void
    */
    public static function delete($media) {
    //<editor-fold defaultstate="collapsed" desc="delete"> 
        
        $image_ids = Arr::get($media, 'images');
        
        if (!empty($image_ids)) {
            
            foreach($image_ids as $image_id) {
                $image = Image::find($image_id);
                if (!empty($image)) {
                    Images::delete($image);
                }
            }
        }
        
        $video_ids = Arr::get($media, 'videos');
        
        if (!empty($video_ids)) {
                        
            foreach($video_ids as $video_id) {
                $video = Video::find($video_id);
                if (!empty($video)) {
                    Videos::delete($video);
                }
            }
        }
                
        $file_ids = Arr::get($media, 'files');
        
        if (!empty($file_ids)) {
            
            foreach($file_ids as $file_id) {
                $file = File::find($file_id);
                if (!empty($file)) {
                    Files::delete($file);
                }
            }
        }
        
    //</editor-fold>
    }
}