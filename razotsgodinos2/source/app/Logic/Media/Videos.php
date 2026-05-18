<?php
namespace App\Logic\Media;

use Illuminate\Support\Arr;

use App\Config\Videos as Config;

use App\Models\Media\Video;
use App\Helpers\Media\ImageHelper;
use File;

class Videos
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
     * @param string $container_name - container name           
     * @return array
    */
    public static function getConfig($container_name) {
    //<editor-fold defaultstate="collapsed" desc="getConfig">
        $defaults = [ 
            'updatePosition' => 'end',//end|start|false,   
            'administration' => false,  
            'canEdit' => function ($container_name, $container_id, $auth_user) {
                return false;
            },
            'canView' => function ($container_name, $container_id, $auth_user) {
                return false;
            },
        ];  
        
        $config = Arr::get(Config::get(), $container_name, []);
        
        $merged = collect($defaults)->merge($config)->all();
        
        return $merged;        
    //</editor-fold>
    }    
    
    /**
     * Format video response data
     *
     * @access public  
     * @param \App\Models\Media\Video $video - video        
     * @return array
    */
    public static function formatResponseData($video) {
    //<editor-fold defaultstate="collapsed" desc="formatResponseData"> 
        return [
            'id' => $video->id,
            'container_id' => $video->container_id,
            'container_name' => $video->container_name,
            'image' => self::getImageUrl($video->thumbnail),
            'thumbnail' => self::getThumbnailUrl($video->thumbnail),
            'title' => $video->title,
            'description' => $video->description,
            'link' => $video->link,
            'player' => $video->player,
            'provider' => $video->provider,
            'thumbnail_width' => $video->thumbnail_width,
            'thumbnail_height' => $video->thumbnail_height,
        ];
    //</editor-fold>
    }    
        
    /**
     * Get url to full video thumbnail 
     *
     * @access public
     * @param  string $file_name - file name           
     * @return string
    */
    public static function getImageUrl($file_name) {
    //<editor-fold defaultstate="collapsed" desc="getImageUrl"> 
        if (empty($file_name)) {
            return asset('img/placeholder/no_image.jpg');
        }
        else{
            return self::getUploadUrl().'/'.$file_name.'.jpg';
        }
    //</editor-fold>
    }
    
    /**
     * Get url to the video thumbnail
     *
     * @access public  
     * @param  string $file_name - file name        
     * @return string
    */
    public static function getThumbnailUrl($file_name) {
    //<editor-fold defaultstate="collapsed" desc="getThumbnailUrl"> 
        if (empty($file_name)) {
            return asset('img/placeholder/no_image_thumbnail.jpg');
        }
        else {            
            return self::getUploadUrl().'/'.$file_name.'_thumbnail.jpg';
        }
    //</editor-fold>
    }
    
    /**
     * Get upload directory
     *
     * @access public          
     * @return string
    */
    public static function getUploadDir() {
    //<editor-fold defaultstate="collapsed" desc="getUploadDir">         
        return public_path('uploads/video_thumbnails');
    //</editor-fold>
    }
    
    /**
     * Get upload url
     *
     * @access public               
     * @return string
    */
    public static function getUploadUrl() {
    //<editor-fold defaultstate="collapsed" desc="getUploadUrl">
        return asset('uploads/video_thumbnails');
    //</editor-fold>
    }
    
    /**
     * Save thumbnail
     *
     * @access public    
     * @param  string $thumbnail - video's thumbnail          
     * @return array
    */
    public static function saveThumbnail($thumbnail) {
    //<editor-fold defaultstate="collapsed" desc="saveThumbnail"> 
        $tmp = ImageHelper::downloadImageFromUrl($thumbnail);
        
        if (!empty($tmp)) {
            $params = [
                'file_name' => md5(uniqid().time()),                
                'dimensions' => [
                    [
                        'max' => 1920,                            
                        'extension' => 'jpg',
                    ],
                    [
                        'max' => 400,
                        'postfix' => '_thumbnail',
                        'extension' => 'jpg',
                    ]        
                ],
            ];
            
            $result = ImageHelper::resizeImage($tmp, self::getUploadDir(), $params);
            
            $image_info = head($result);
            
            $thumbnail_data = [
                'file_name' => $image_info['file_name'],
                'width' => $image_info['width'],
                'height' => $image_info['height'],
            ];
            
            File::delete($tmp);
        }
        else {
            $thumbnail_data = [
                'file_name'=> null,  
                'width'=> 0,  
                'height'=> 0,  
            ];
        }
            
        return $thumbnail_data;
    //</editor-fold>
    }
    
    
    # ========================================================================#
    #
    #                            CRUD
    #    
    # ========================================================================#
    
    /**
     * Create video record in database
     *
     * @access public           
     * @param  string $container_name - video's container name
     * @param  int $container_id - video's id
     * @return \App\Models\Media\Video
    */
    public static function createEmpty($container_name = null, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="createEmpty"> 
                
        $video = new Video;
        $video->container_id = $container_id;
        $video->container_name = $container_name;
       
        
        $config = self::getConfig($container_name);
        
        $updatePosition = Arr::get($config, 'updatePosition');
        
        if ($updatePosition === 'end') {
            $tmp = Video::whereContainerNameAndContainerId($container_name, $container_id)->orderBy('position', 'desc')->first();

            if (empty($tmp)) {
                $position = 0;
            }
            else {
                $position = $tmp->position;
                $position++;
            }

            $video->position = $position;
            $video->save();
        }            
        else if ($updatePosition === 'start') {
            $tmp = Video::whereContainerNameAndContainerId($container_name, $container_id)->orderBy('position', 'desc')->first();

            if (empty($tmp)) {
                $position = 0;
            }
            else {
                $position = $tmp->position;                   
            }

            $video->position = 0;   
            Video::whereContainerNameAndContainerId($container_name, $container_id)->where('position', '>=' , 0)->increment('position', 1);
            $video->save();
        }           
        
        $video->save();
        return $video;        
    //</editor-fold>
    }    
    
    /**
     * Create video record with video data
     *
     * @access public           
     * @param  array $video_data - video's data
     * @param  string $container_name - video's container name
     * @param  int $container_id - container's id
     * @return \App\Models\Media\Video
    */
    public static function create($video_data, $container_name = null, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="create"> 
        
        $video = self::createEmpty($container_name, $container_id);
        
        self::save($video_data, $video); 
        
        return $video;          
    //</editor-fold>
    }
    
    /**
     * Update video data
     *
     * @access public           
     * @param  \App\Models\Media\Video $video - video to update
     * @param  array $video_data - video's data       
     * @return void
    */
    public static function update($video, $video_data) {
    //<editor-fold defaultstate="collapsed" desc="update"> 
        
        self::deleteThumbnailFile($video);
        
        self::save($video_data, $video);
        
    //</editor-fold>
    }
    
    /**
     * Soft delete
     * Delete video thumbnail but not row in table
     *
     * @access public           
     * @param  \App\Models\Media\Video $video - video to soft delete       
     * @return void
    */
    public static function softDelete($video) {
    //<editor-fold defaultstate="collapsed" desc="softDelete"> 
        
        self::deleteThumbnailFile($video);
        
        $video->title = null;
        $video->description = null;
        $video->player = null;
        $video->provider = null;
        $video->link = null;
        $video->thumbnail = null;
        $video->thumbnail_width = 0;
        $video->thumbnail_height = 0;
        $video->save();
             
    //</editor-fold>
    }
    
    /**
     * Delete video and thumbnail
     *
     * @access public           
     * @param  \App\Models\Media\Video $video - video to delete       
     * @return void
    */
    public static function delete($video) {
    //<editor-fold defaultstate="collapsed" desc="delete"> 
        $config = self::getConfig($video->container_name);
        $updatePosition = Arr::get($config, 'updatePosition');
        
        self::deleteThumbnailFile($video);
        
        if ($updatePosition !== false) {
            Video::whereContainerNameAndContainerId($video->container_name, $video->container_id)->where('position', '>', $video->position)->decrement('position');
        }
        
        $video->delete();
             
    //</editor-fold>
    }
    
    /**
     * Delete thumbnail file
     *
     * @access public           
     * @param  \App\Models\Media\Video $video - video    
     * @return void
    */
    public static function deleteThumbnailFile($video) {
    //<editor-fold defaultstate="collapsed" desc="delete"> 
        
        if (!empty($video->thumbnail)) {
            
            File::delete(self::getUploadDir().'/'.$video->thumbnail.'.jpg');
            File::delete(self::getUploadDir().'/'.$video->thumbnail.'_thumbnail.jpg');
            
        }        
             
    //</editor-fold>
    }
    
    /**
     * Save video
     *
     * @access public           
     * @param  array $video_data - video data   
     * @param  \App\Models\Media\Video $video - video to save 
     * @return void 
    */
    public static function save($video_data, $video) {
    //<editor-fold defaultstate="collapsed" desc="save">    
        $thumbnail_data = self::saveThumbnail($video_data['thumbnail']);
        
        
        $video->title = $video_data['title'];
        $video->description = $video_data['description'];
        $video->player = $video_data['player'];
        $video->provider = $video_data['provider'];
        $video->link = $video_data['link'];
        
        $video->thumbnail = $thumbnail_data['file_name'];
        $video->thumbnail_width = $thumbnail_data['width'];
        $video->thumbnail_height = $thumbnail_data['height'];
        $video->save();
        
        return $video;      
    //</editor-fold> 
    }
    
    # ========================================================================#
    #
    #                           Deletion
    #    
    # ========================================================================#  
    
    /**
     * Delete video by id
     *
     * @access public           
     * @param  int $id - video id
     * @return void
     */
    public static function deleteVideoById($id) {
    //<editor-fold defaultstate="collapsed" desc="deleteVideoById">  
        $video = Video::find($id); 
        
        if (!empty($video)) {
            self::delete($video);
        }        
    //</editor-fold>     
    }
    
    /**
     * Delete videos  
     *
     * @access public           
     * @param  string $container_name - container's name 
     * @param  int $container_id - container's id
     * @return void
     */
    public static function deleteVideos($container_name, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="deleteVideos">  
        $videos = Video::whereContainerNameAndContainerId($container_name, $container_id)->get();
                
        foreach ($videos as $video) {
            self::delete($video);
        }        
    //</editor-fold>     
    }
    
    # ========================================================================#
    #
    #                           Retrieve
    #    
    # ========================================================================#    

    /**
     * Get video by id
     *
     * @access public           
     * @param  int $id - video id
     * @return array || null
     */
    public static function getVideoById($id) {
    //<editor-fold defaultstate="collapsed" desc="getVideoById">  
        $video = Video::find($id);
        
        if (empty($video)) {
            return null;
        }
        else {
            return self::formatResponseData($video);
        }
    //</editor-fold>     
    }
    
    /**
     * Get videos
     *
     * @access public           
     * @param  array $ids - video ids 
     * @return array
     */
    public static function getVideosById($ids) {
    //<editor-fold defaultstate="collapsed" desc="getVideosById">      
        $videos = Video::whereIn('id', $ids)->get();
        
        $result = [];
        
        foreach ($videos as $video) {
            $result[] = self::formatResponseData($video);
        }
        
        return $result;
    //</editor-fold>    
    }
    
    /**
     * Get video list
     *
     * @access public           
     * @param  string $container_name - container's name 
     * @param  int $container_id - container's id
     * @return array
     */
    public static function getVideoList($container_name, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="getVideoList">          
        $videos = Video::whereContainerNameAndContainerId($container_name, $container_id)->orderBy('position', 'asc')->get();
        
        $result = [];
        
        foreach ($videos as $video) {
            $result[] = self::formatResponseData($video);
        }
        
        return $result;
    //</editor-fold>     
    }
    
}