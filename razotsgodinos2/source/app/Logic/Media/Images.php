<?php
namespace App\Logic\Media;

use Illuminate\Support\Arr;
use App\Config\Images as Config;

use App\Models\Media\Image;
use App\Helpers\Media\ImageHelper;
use App\Helpers\Media\FileHelper;
use File;

class Images
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
            'rules' => [
                'required',
                'file',
                'image',
                'max:10000',//10mb
            ],
            'updatePosition' => 'end',//end|start|false, 
            'orientate' => true,
            'resize' => [
                [
                    'max' => 1920,                    
                    'extension' => 'jpg',
                ],
                [
                    'max' => 400,
                    'postfix' => '_thumbnail',
                    'extension' => 'jpg',
                ],        
            ],  
            'optimize' => false,
            'thumbnail' => '_thumbnail',
            'directory' => public_path('uploads/images'),
            'url' => asset('uploads/images'),
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
     * Format image response data
     *
     * @access public    
     * @param \App\Models\Media\Image $image - image          
     * @return array
    */
    public static function formatResponseData($image) {
    //<editor-fold defaultstate="collapsed" desc="formatResponseData"> 
        return [
            'id' => $image->id,
            'container_id' => $image->container_id,
            'container_name' => $image->container_name,
            'image' => self::getImageUrl($image->container_name, $image->file_name, $image->extension),
            'thumbnail' => self::getThumbnailUrl($image->container_name, $image->file_name, $image->extension),
            'title' => $image->title,
            'description' => $image->description,
            'original' => $image->original,
            'width' => $image->width,
            'height' => $image->height,
            'resized' => $image->resized,
            'sizes' => self::getSizes($image),
            'mime' => $image->mime,
            'extension' => $image->extension,            
            'size' => FileHelper::getReadableSize($image->size),  
        ];
    //</editor-fold>
    }
    
    /**
     * Get url to the image
     *
     * @access public
     * @param string $container_name - container name          
     * @param string $file_name - file name           
     * @param string $extension - extension           
     * @return string
    */
    public static function getImageUrl($container_name, $file_name, $extension) {
    //<editor-fold defaultstate="collapsed" desc="getImageUrl"> 
        if (empty($file_name)) {
            return asset('img/placeholder/no_image.jpg');
        }
        else {
            return self::getUploadUrl($container_name).'/'.$file_name.'.'.$extension;
        }
    //</editor-fold>
    }
    
    /**
     * Get url to the image thumbnail
     *
     * @access public  
     * @param string $container_name - container name            
     * @param string $file_name - file name           
     * @param string $extension - extension           
     * @return string
    */
    public static function getThumbnailUrl($container_name, $file_name, $extension) {
    //<editor-fold defaultstate="collapsed" desc="getThumbnailUrl"> 
                
        if (empty($file_name)) {
            return asset('img/placeholder/no_image_thumbnail.jpg');
        }
        else {            
            return self::getUploadUrl($container_name).'/'.$file_name.self::getThumbnailPostfix($container_name).'.'.$extension;
        }
    //</editor-fold>
    }
            
    /**
     * Get thumbnail postfix
     *
     * @access public      
     * @param string $container_name - container name         
     * @return integer
    */
    public static function getThumbnailPostfix($container_name) {
    //<editor-fold defaultstate="collapsed" desc="getThumbnailPostfix"> 
        $config = self::getConfig($container_name);
        
        return Arr::get($config, 'thumbnail');
    //</editor-fold>
    }
        
    /**
     * Get upload directory
     *
     * @access public   
     * @param string $container_name - container name              
     * @return string
    */
    public static function getUploadDir($container_name) {
    //<editor-fold defaultstate="collapsed" desc="getUploadDir">   
        $config = self::getConfig($container_name);
        
        return Arr::get($config, 'directory');        
    //</editor-fold>
    }
    
    /**
     * Get upload url
     *
     * @access public   
     * @param string $container_name - container name                        
     * @return string
    */
    public static function getUploadUrl($container_name) {
    //<editor-fold defaultstate="collapsed" desc="getUploadUrl">
        $config = self::getConfig($container_name);
        
        return Arr::get($config, 'url');     
    //</editor-fold>
    }    

    /**
     * Get images config
     *
     * @access public 
     * @param  string $mime - image's mime type              
     * @return string
    */
    public static function getExtension($mime) {
    //<editor-fold defaultstate="collapsed" desc="getExtension">
        $extension = ImageHelper::getImageExtensionByMime($mime);
        
        if (empty($extension)) {
            $extension = 'jpg';
        }        
        
        return $extension;
    //</editor-fold>
    }
        
    # ========================================================================#
    #
    #                            CRUD
    #    
    # ========================================================================#
    
    
    /**
     * Create image record in database
     *
     * @access public           
     * @param  string $container_name - image's container name
     * @param  int $container_id - container's id
     * @return \App\Models\Media\Image
    */
    public static function createEmpty($container_name = null, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="createEmpty"> 
                        
        $image = new Image;
        $image->container_id = $container_id;
        $image->container_name = $container_name;
        $image->resized = false;
        
        
        $config = self::getConfig($container_name);
        $resize = Arr::get($config, 'resize');
        
        if (!empty($resize)) {            
            $image->resized = true; 
        }
        
        $updatePosition = Arr::get($config, 'updatePosition');
        
        if ($updatePosition === 'end') {
            $tmp = Image::whereContainerNameAndContainerId($container_name, $container_id)->orderBy('position', 'desc')->first();

            if (empty($tmp)) {
                $position = 0;
            }
            else {
                $position = $tmp->position;
                $position++;
            }

            $image->position = $position;
            $image->save();
        }            
        else if ($updatePosition === 'start') {
            $tmp = Image::whereContainerNameAndContainerId($container_name, $container_id)->orderBy('position', 'desc')->first();

            if (empty($tmp)) {
                $position = 0;
            }
            else {
                $position = $tmp->position;                   
            }

            $image->position = 0;   
            Image::whereContainerNameAndContainerId($container_name, $container_id)->where('position', '>=' , 0)->increment('position', 1);
            $image->save();
        }       
        
        $image->save();
                 
        return $image;        
    //</editor-fold>
    }
    
    /**
     * Create image record with file
     *
     * @access public           
     * @param  string $file_path - path to image file
     * @param  string $container_name - image's container name
     * @param  int $container_id - container's id
     * @return \App\Models\Media\Image
    */
    public static function create($file_path, $container_name = null, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="create">         
        
        $image = self::createEmpty($container_name, $container_id);
        
        self::save($file_path, $image); 
        
        return $image;        
    //</editor-fold>
    }
    
    /**
     * Update image file
     *
     * @access public           
     * @param  \App\Models\Media\Image $image - image to update
     * @param  string $file_path - path to image file    
     * @return void
    */
    public static function update($image, $file_path) {
    //<editor-fold defaultstate="collapsed" desc="update"> 
        
        self::deleteImageFile($image);
        
        self::save($file_path, $image);
             
    //</editor-fold>
    }
    
    /**
     * Soft delete
     * Delete image file but not row in database
     *
     * @access public           
     * @param  \App\Models\Media\Image $image - image to soft delete       
     * @return void
    */
    public static function softDelete($image) {
    //<editor-fold defaultstate="collapsed" desc="softDelete"> 
        
        self::deleteImageFile($image);
        
        $image->file_name = null;
        $image->width = 0;
        $image->height = 0;
        $image->extension = 'jpg';
        $image->mime = null;
        $image->size = null;
        $image->save();
             
    //</editor-fold>
    }    
    
    /**
     * Delete image with file
     *
     * @access public           
     * @param  \App\Models\Media\Image $image - image to delete       
     * @return void
    */
    public static function delete($image) {
    //<editor-fold defaultstate="collapsed" desc="delete"> 
        $config = self::getConfig($image->container_name);
        $updatePosition = Arr::get($config, 'updatePosition');
        
        self::deleteImageFile($image);
        
        if ($updatePosition !== false) {
            Image::whereContainerNameAndContainerId($image->container_name, $image->container_id)->where('position', '>', $image->position)->decrement('position');
        }
        
        $image->delete();
             
    //</editor-fold>
    }
    
     /**
     * Delete image file
     *
     * @access public           
     * @param  \App\Models\Media\Image $image - image
     * @return void
    */
    public static function deleteImageFile($image) {
    //<editor-fold defaultstate="collapsed" desc="deleteImageFile"> 
        $config = self::getConfig($image->container_name);
        
        $uploadDir = self::getUploadDir($image->container_name);
        
        if (!empty($image->file_name)) {
            
            $resize = Arr::get($config, 'resize');
            
            if (!empty($resize)) {
                
                foreach ($resize as $item) {
                    $postfix = Arr::get($item, 'postfix', '');
                    $extension = Arr::get($item, 'extension', 'jpg');
                    File::delete($uploadDir.'/'.$image->file_name.$postfix.'.'.$extension);
                }
            }
            
            File::delete($uploadDir.'/'.$image->file_name.'.'.$image->extension);
            
        }        
             
    //</editor-fold>
    }
    
    /**
    * Save image
    *
    * @access public           
    * @param  string $file - path to file    
    * @param  \App\Models\Media\Image $image - image to save 
    * @return void 
    */
    public static function save($file, $image){
    //<editor-fold defaultstate="collapsed" desc="save">   
        $config = self::getConfig($image->container_name);
        
        $orientate = Arr::get($config, 'orientate');
        $resize = Arr::get($config, 'resize');
        $optimize = Arr::get($config, 'optimize');
        $directory = Arr::get($config, 'directory');              
        
        $mime = File::mimeType($file);        
        
        if (empty($resize) || in_array($mime, ['image/svg+xml', 'text/html'])) {
            
            $img = \Intervention\Image\ImageManagerStatic::make($file);

            // Resize maintaining aspect ratio and max width/height
            $img->resize(1920, 1080, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            $new_file = $directory . '/' . md5(uniqid() . time()) . '.' . self::getExtension($mime);

            // Save the image with 70% quality
            $img->save($new_file, 45);

            if ($optimize) {
                ImageHelper::optimizeImage($new_file);
            }

            $image_info = ImageHelper::getImageInfo($new_file);

            $image->file_name = $image_info['file_name'];
            $image->width = $image_info['width'];
            $image->height = $image_info['height'];
            $image->extension = $image_info['extension'];
            $image->mime = $image_info['mime'];
            $image->size = $image_info['size'];
            $image->save();     
        }
        else {
            $params = [
                'file_name' => md5(uniqid().time()),
                'orientate' => $orientate,//performs a rotation to image from EXIF.
                'dimensions' => $resize,
            ];
            
            $result = ImageHelper::resizeImage($file, $directory, $params, $optimize);
            
            $image_info = head($result);
                        
            $image->file_name = $image_info['file_name'];
            $image->width = $image_info['width'];
            $image->height = $image_info['height'];
            $image->extension = $image_info['extension'];
            $image->mime = $image_info['mime'];
            $image->size = $image_info['size'];
            $image->save();            
        }
        
    //</editor-fold>    
    }    
    
    # ========================================================================#
    #
    #                           Deletion
    #    
    # ========================================================================#  
    
    /**
     * Delete image by id
     *
     * @access public           
     * @param  int $id - image id
     * @return void
     */
    public static function deleteImageById($id) {
    //<editor-fold defaultstate="collapsed" desc="deleteImageById">  
        $image = Image::find($id);
        
        if (!empty($image)) {
            self::delete($image);
        }        
    //</editor-fold>     
    }
    
    /**
     * Delete images 
     *
     * @access public           
     * @param  string $container_name - container's name 
     * @param  int $container_id - container's id
     * @return void
     */
    public static function deleteImages($container_name, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="deleteImages">  
        $images = Image::whereContainerNameAndContainerId($container_name, $container_id)->get();
                
        foreach ($images as $image) {
            self::delete($image);
        }        
    //</editor-fold>     
    }
    
    # ========================================================================#
    #
    #                           Retrieve
    #    
    # ========================================================================#    

    /**
     * Get image by id
     *
     * @access public           
     * @param  int $id - image id
     * @return array || null
     */
    public static function getImageById($id) {
    //<editor-fold defaultstate="collapsed" desc="getImageById">  
        $image = Image::find($id);
        
        if (empty($image)) {
            return null;
        }
        else {
            return self::formatResponseData($image);
        }
    //</editor-fold>     
    }
    
    /**
     * Get images
     *
     * @access public           
     * @param  array $ids - image ids 
     * @return array
     */
    public static function getImagesById($ids) {
    //<editor-fold defaultstate="collapsed" desc="getImagesById">      
        $images = Image::whereIn('id', $ids)->get();
        
        $result = [];
        
        foreach ($images as $image) {
            $result[] = self::formatResponseData($image);
        }
        
        return $result;
    //</editor-fold>    
    }
    
    /**
     * Get image list
     *
     * @access public           
     * @param  string $container_name - container's name 
     * @param  int $container_id - container's id
     * @return array
     */
    public static function getImageList($container_name, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="getImageList">          
        $images = Image::whereContainerNameAndContainerId($container_name, $container_id)->orderBy('position', 'asc')->get();
        
        $result = [];
        
        foreach ($images as $image) {
            $result[] = self::formatResponseData($image);
        }
        
        return $result;
    //</editor-fold>     
    }
    
    /**
     * Get sizes
     *
     * @access public           
     * @param  App\Models\Media\Image $image - image
     * @return array
    */
    public static function getSizes($image) {
    //<editor-fold defaultstate="collapsed" desc="getSizes"> 
        $config = self::getConfig($image->container_name);
        
        $resize = Arr::get($config, 'resize');
        
        if (empty($resize)) {
            return [];
        }        
        
        $result = [];
        $uploadUrl = self::getUploadUrl($image->container_name);
                
        foreach ($resize as $item) {
            $max = Arr::get($item, 'max', '');
            $postfix = Arr::get($item, 'postfix', '');
            $extension = Arr::get($item, 'extension', 'jpg');
                        
            $result[$max] = $uploadUrl.'/'.$image->file_name.$postfix.'.'.$extension;
        }
        
        return $result;
    //</editor-fold>
    }
    
    /**
    * Get image file path or placeholder
    *
    * @access public
    * @param  \App\Model\Media\Image $image - image         
    * @return string
   */
   public static function getImageFilePath($image) {
    //<editor-fold defaultstate="collapsed" desc="getImageFilePath">         
        $uploadDir = self::getUploadDir($image->container_name);
        
        $filePath = $uploadDir.'/'.$image->file_name.'.'.$image->extension;
        
        if (File::exists($filePath) && File::isFile($filePath)) {
            return $filePath;
        }
        
        return base_path('public_html/img/placeholder/no_image_thumbnail.jpg');
    //</editor-fold>
    }
    
}