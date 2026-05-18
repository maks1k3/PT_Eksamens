<?php
namespace App\Helpers\Media;
use Illuminate\Support\Arr;
//s
use InterventionImage;
use File;
use App\Logic\Core\Log;

use Symfony\Component\Process\Process;

class ImageHelper
{
    
    /**
     * Check if is image
     *
     * @access public           
     * @param  string $image - path to image
     * @return boolean
    */
    public static function isImage($image) {
    //<editor-fold defaultstate="collapsed" desc="isImage"> 
        $mime = File::mimeType($image);
        return substr($mime, 0, 5) === 'image';
    //</editor-fold>
    } 
    
    /**
     * Get image info
     *
     * @access public           
     * @param  string $image - path to image
     * @return array
    */
    public static function getImageInfo($image) {
    //<editor-fold defaultstate="collapsed" desc="getImageInfo"> 
        list($width, $height) = getimagesize($image);
        $image_info = [];   
        
        $image_info['file_name'] = File::name($image); 
        $image_info['extension'] = File::extension($image); 
        $image_info['size'] = File::size($image);       
        $image_info['mime'] = File::mimeType($image);     
        $image_info['width'] = $width === null ? 0 : $width;     
        $image_info['height'] = $height === null ? 0 : $height;   
        
        return $image_info;
    //</editor-fold>
    } 

    /**
     * Get image extension by mime
     * jgp,png,svg,gif or empty
     * @access public 
     * @param  string mime - image's mime              
     * @return string
    */
    public static function getImageExtensionByMime($mime) {
    //<editor-fold defaultstate="collapsed" desc="getImageExtensionByMime">
        $extension = '';
        
        if (in_array($mime, ['image/pjpeg', 'image/jpeg'])) {
            $extension = 'jpg';
        }
        else if ($mime === 'image/png') {
            $extension = 'png';
        }
        else if (in_array($mime,['image/svg', 'image/svg+xml', 'text/html'])) {
            $extension = 'svg';
        }
        else if ($mime === 'image/gif') {
            $extension = 'gif';
        }
        
        return $extension;
    //</editor-fold>
    }
            
    /**
     * Resize image
     *
     * @access public 
     * @param  string $file - path to file              
     * @param  string $destination - file destination              
     * @param  array $params - params              
     * @param  boolean $optimize - optimze image for page speed             
     * @return array
    */
    public static function resizeImage($file, $destination, $params = [], $optimize = false) {
    //<editor-fold defaultstate="collapsed" desc="resizeImage">
                
        $file_name = Arr::get($params, 'file_name', md5(uniqid().time()));
        $orientate = Arr::get($params, 'orientate', true);
        
        $dimensions = Arr::get($params, 'dimensions', [
            [
                'max' => 1920,
                'postfix' => '',
                'extension' => 'jpg',
            ],
            [
                'max' => 400,
                'postfix' => '_thumbnail',
                'extension' => 'jpg',
            ]
        ]);
        
        $_image = InterventionImage::make($file);  
        
        if ($orientate) {
            $_image->orientate();
        }
        
        $result = [];
        
        foreach ($dimensions as $dimension) {
            $max = Arr::get($dimension, 'max', 1920);
            $max_height = Arr::get($dimension, 'max_height', null);
            $postfix = Arr::get($dimension, 'postfix', '');
            $extension = Arr::get($dimension, 'extension', '');
            
            $image = clone $_image;
            
            $image->resize($max, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });   
            
            if ($max_height !== null) {
                $image->resize(null, $max_height, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
            }          
            
            
            $image_path = "{$destination}/{$file_name}{$postfix}.{$extension}";
            $image->save($image_path, 100);
            
            if ($optimize) {
                self::optimizeImage($image_path);
            }
            
            $result[] = self::getImageInfo($image_path);
           
        }
        
        
        return $result;
    //</editor-fold>
    }    
        
    /**
    * Download image from url and put to temp folder
    *   
    * 
    * @access public  
    * @param  string $url - url to image 
    * @param  integer $timeout - timeout 
    * @return string - path to tmp image
    */
    public static function downloadImageFromUrl($url, $timeout = 30) {
    //<editor-fold defaultstate="collapsed" desc="downloadImageFromUrl">    
        $file_name = md5(uniqid().time());     
        $destinationPath = storage_path('tmp');
        File::isDirectory($destinationPath) or File::makeDirectory($destinationPath, 0777, true, true);                     
        
        $file = $destinationPath.'/'.$file_name;      
        
        $headers = [];
        $headers[] = 'Accept: image/gif, image/x-bitmap, image/jpeg, image/pjpeg';              
        $headers[] = 'Connection: Keep-Alive';         
        $headers[] = 'Content-type: application/x-www-form-urlencoded;charset=UTF-8';         
        $user_agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';       
        $process = curl_init($url);         
        curl_setopt($process, CURLOPT_HTTPHEADER, $headers);         
        curl_setopt($process, CURLOPT_HEADER, 0);         
        curl_setopt($process, CURLOPT_USERAGENT, $user_agent);         
        curl_setopt($process, CURLOPT_CONNECTTIMEOUT, $timeout);        
        curl_setopt($process, CURLOPT_TIMEOUT, $timeout);         
        curl_setopt($process, CURLOPT_RETURNTRANSFER, 1);         
        curl_setopt($process, CURLOPT_FOLLOWLOCATION, 1);         
        $return = curl_exec($process);         
        curl_close($process); 

        file_put_contents($file, $return); 
        
        if (file_exists($file)) {
            $info = @getimagesize($file);
            //check if image
            if ($info === FALSE) {               
                Log::error('url_is_not_image', ['url' => $url]);               
                unlink($file);
                return null;
            }    
        }        
        
        return $file;
    //</editor-fold>         
    }    
    
    
    /**
     * Optimize image
     *
     * @access public           
     * @param  string $image_path - path to image
     * @return void
     */
    public static function optimizeImage($image_path) {
    //<editor-fold defaultstate="collapsed" desc="optimizeImage">
        
        try {
            $process = new Process(["convert $image_path -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace sRGB $image_path"]);
            $process->run();
        } catch (\Exception $ex) {
            dd($ex);
        }   
        
    //</editor-fold>  
    }

}
