<?php
namespace App\Logic\Media;

use Illuminate\Support\Arr;
use App\Config\Files as Config;

use App\Models\Media\File as FileModel;
use App\Helpers\Media\FileHelper;
use File;

class Files
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
            ],            
            'updatePosition' => 'end',//end|start|false, 
            'directory' => storage_path('files'),
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
     * Format file response data
     *
     * @access public  
     * @param \App\Models\Media\File $file - file        
     * @return array
    */
    public static function formatResponseData($file) {
    //<editor-fold defaultstate="collapsed" desc="formatResponseData"> 
        return [
            'id' => $file->id,
            'container_id' => $file->container_id,
            'container_name' => $file->container_name,
            'download_url' => self::getDownloadUrl($file->id),
            'preview_url' => self::getPreviewUrl($file->id),
            'display_name' => $file->display_name,
            'original_name' => $file->original_name,
            'mime' => $file->mime,
            'extension' => $file->extension,            
            'size' => FileHelper::getReadableSize($file->size),            
        ];
    //</editor-fold>
    }
    
    /**
     * Get download url
     *
     * @access public    
     * @param  integer $id - file's id          
     * @return string
    */
    public static function getDownloadUrl($id) {
    //<editor-fold defaultstate="collapsed" desc="getDownloadUrl"> 
        return url('media/file/download/'.$id);
    //</editor-fold>
    }
    
    /**
     * Get preview url
     *
     * @access public    
     * @param  integer $id - file's id          
     * @return string
    */
    public static function getPreviewUrl($id) {
    //<editor-fold defaultstate="collapsed" desc="getPreviewUrl"> 
        return url('media/file/preview/'.$id);
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
        
    # ========================================================================#
    #
    #                            CRUD
    #    
    # ========================================================================#
    
    /**
     * Create file record in database
     *
     * @access public           
     * @param  string $container_name - file's container name
     * @param  int $container_id - file's id
     * @return \App\Models\Media\File
    */
    public static function createEmpty($container_name = null, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="createEmpty"> 
        
        $file = new FileModel;
        $file->container_id = $container_id;
        $file->container_name = $container_name;        
               
        $config = self::getConfig($container_name);                
                
        $updatePosition = Arr::get($config, 'updatePosition');
        
        if ($updatePosition === 'end') {
            $tmp = FileModel::whereContainerNameAndContainerId($container_name, $container_id)->orderBy('position', 'desc')->first();

            if (empty($tmp)) {
                $position = 0;
            }
            else {
                $position = $tmp->position;
                $position++;
            }

            $file->position = $position;
            $file->save();
        }            
        else if ($updatePosition === 'start') {
            $tmp = FileModel::whereContainerNameAndContainerId($container_name, $container_id)->orderBy('position', 'desc')->first();

            if (empty($tmp)) {
                $position = 0;
            }
            else {
                $position = $tmp->position;                   
            }

            $file->position = 0;   
            FileModel::whereContainerNameAndContainerId($container_name, $container_id)->where('position', '>=' , 0)->increment('position', 1);
            $file->save();
        }       
        
        $file->save();
        
        return $file;        
    //</editor-fold>
    }    
    
    /**
     * Create file record with file
     *
     * @access public           
     * @param  string $file_path - path to file
     * @param  string $file_name - file name
     * @param  string $extension - file extension
     * @param  string $container_name - files's container name
     * @param  int $container_id - container's id
     * @return \App\Models\Media\File
    */
    public static function create($file_path, $file_name, $extension, $container_name = null, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="create"> 
                
        $file = self::createEmpty($container_name, $container_id);
        
        self::save($file_path, $file_name, $extension, $file); 
                
        return $file;        
    //</editor-fold>
    }
    
    /**
     * Update file
     *
     * @access public 
     * @param  string $file_path - path to file
     * @param  string $file_name - file name
     * @param  string $extension - file extension  
     * @param  \App\Models\Media\File $file - file to update  
     * @return void
    */
    public static function update($file_path, $file_name, $extension, $file) {
    //<editor-fold defaultstate="collapsed" desc="update"> 
        
        self::deleteFile($file);
        
        self::save($file_path, $file_name, $extension, $file);
             
    //</editor-fold>
    }
    
    /**
     * Soft delete
     * Delete file but not row in table
     *
     * @access public           
     * @param  \App\Models\Media\File $file - file to soft delete       
     * @return void
    */
    public static function softDelete($file) {
    //<editor-fold defaultstate="collapsed" desc="softDelete"> 
        
        self::deleteFile($file);
        
        $file->display_name = null;
        $file->file_name = null;
        $file->original_name = null;
        $file->mime = null;
        $file->extension = null;
        $file->size = 0;
        $file->save();
             
    //</editor-fold>
    }
    
    /**
     * Delete
     *
     * @access public           
     * @param  \App\Models\Media\File $file - file to delete       
     * @return void
    */
    public static function delete($file) {
    //<editor-fold defaultstate="collapsed" desc="delete"> 
        $config = self::getConfig($file->container_name);
        $updatePosition = Arr::get($config, 'updatePosition');
                
        self::deleteFile($file);
        
        if ($updatePosition !== false) {
            FileModel::whereContainerNameAndContainerId($file->container_name, $file->container_id)->where('position', '>', $file->position)->decrement('position');
        }
        
        $file->delete();
             
    //</editor-fold>
    }
    
    /**
     * Delete file
     *
     * @access public           
     * @param  \App\Models\Media\File $file - file to delete
     * @return void
    */
    public static function deleteFile($file) {
    //<editor-fold defaultstate="collapsed" desc="deleteFile"> 
                
        $uploadDir = self::getUploadDir($file->container_name);
        
        if (!empty($file->file_name)) {
            File::delete($uploadDir.'/'.$file->file_name.'.'.$file->extension);            
        }
             
    //</editor-fold>
    }

    
    /**
     * Save file
     *
     * @access public           
     * @param  string $file_path - path to file
     * @param  string $file_name - file name
     * @param  string $extension - file extension
     * @param  \App\Models\Media\File $file - file 
     * @return void
     */
    public static function save($file_path, $file_name, $extension, $file) {
    //<editor-fold defaultstate="collapsed" desc="save"> 
                
        $uploadDir = self::getUploadDir($file->container_name);           
        
        $_file_name = md5(uniqid().time());
        
        if (empty($extension)) {
            $extension = 'file';
        }   
        
        File::copy($file_path, $uploadDir.'/'.$_file_name.'.'.$extension);
        
        $file_data = FileHelper::getFileInfo($file_path);
                
        $file->display_name = $file_name;
        $file->file_name = $_file_name;
        $file->original_name = $file_name;
        $file->mime = $file_data['mime'];
        $file->extension = $extension;
        $file->size = $file_data['size'];        
        $file->save();
                
    //</editor-fold> 
    }
    
    # ========================================================================#
    #
    #                           Deletion
    #    
    # ========================================================================#  
    
    /**
     * Delete file by id
     *
     * @access public           
     * @param  int $id - file id
     * @return void
     */
    public static function deleteFileById($id) {
    //<editor-fold defaultstate="collapsed" desc="deleteFileById">  
        $file = FileModel::find($id);
        
        if (!empty($file)) {
            self::delete($file);
        }        
    //</editor-fold>     
    }
    
    /**
     * Delete files 
     *
     * @access public           
     * @param  string $container_name - container's name 
     * @param  int $container_id - container's id
     * @return void
     */
    public static function deleteFiles($container_name, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="deleteFiles">  
        $files = FileModel::whereContainerNameAndContainerId($container_name, $container_id)->get();
                
        foreach ($files as $file) {
            self::delete($file);
        }        
    //</editor-fold>     
    }

    # ========================================================================#
    #
    #                           Retrieve
    #    
    # ========================================================================#    

    /**
     * Get file by id
     *
     * @access public           
     * @param  int $id - file id
     * @return array || null
     */
    public static function getFileById($id) {
    //<editor-fold defaultstate="collapsed" desc="getFileById">  
        $file = FileModel::find($id);
        
        if (empty($file)) {
            return null;
        }
        else {
            return self::formatResponseData($file);
        }
    //</editor-fold>     
    }
    
    /**
     * Get files
     *
     * @access public           
     * @param  array $ids - file ids 
     * @return array
     */
    public static function getFilesById($ids) {
    //<editor-fold defaultstate="collapsed" desc="getFilesById">      
        $files = FileModel::whereIn('id', $ids)->get();
        
        $result = [];
        
        foreach ($files as $file) {
            $result[] = self::formatResponseData($file);
        }
        
        return $result;
    //</editor-fold>    
    }
    
    /**
     * Get file list
     *
     * @access public           
     * @param  string $container_name - container's name 
     * @param  int $container_id - container's id
     * @return array
     */
    public static function getFileList($container_name, $container_id = 0) {
    //<editor-fold defaultstate="collapsed" desc="getFileList">          
        $files = FileModel::whereContainerNameAndContainerId($container_name, $container_id)->orderBy('position', 'asc')->get();
        
        $result = [];
        
        foreach ($files as $file) {
            $result[] = self::formatResponseData($file);
        }
        
        return $result;
    //</editor-fold>     
    }
 
    /**
    * Get file path or null
    *
    * @access public
    * @param  \App\Model\Media\File $file - file         
    * @return string or null
   */
   public static function getFilePath($file) {
    //<editor-fold defaultstate="collapsed" desc="getFilePath"> 
        $uploadDir = self::getUploadDir($file->container_name);
        
        $filePath = $uploadDir.'/'.$file->file_name.'.'.$file->extension;
        
        if (File::exists($filePath)) {
            return $filePath;
        }
        
        return null;        
    //</editor-fold>
    }
}