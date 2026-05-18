<?php
namespace App\Http\Controllers\Media;

use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

use App\Logic\Media\Files;
use App\Models\Media\File as FileModel;
use File;
use App\Helpers\Media\FileHelper;

class FilesController extends Controller
{
    /**
    * Constructor
    *
    * @return void
    */
    public function __construct()
    {


    }
    
    /**
    * Download file
    *
    * @access public  
    * @param  integer $file_id - file id 
    * @return file
    */
    public function download($file_id) {
    //<editor-fold defaultstate="collapsed" desc="download"> 
        $auth_user = auth()->user(); 
        $file_id = intval($file_id);
        
        $file = FileModel::findOrFail($file_id);
        
        $config = Files::getConfig($file->container_name);
        
        if (!Arr::get($config, 'canView')($file->container_name, $file->container_id, $auth_user)) {
            abort(404);
        }        
        
        $path = Files::getUploadDir($file->container_name);
        
        if (empty($file->file_name)) {
            abort(404);
        }
        
        $file_name = "{$path}/{$file->file_name}.{$file->extension}";
        
        if (!File::exists($file_name)) {
            abort(404);
        }
      
        return FileHelper::download($file_name, "{$file->display_name}.{$file->extension}");        
    //</editor-fold>      
    }  
    
    /**
    * Preview file
    *
    * @access public  
    * @param  integer $file_id - file id 
    * @return file
    */
    public function preview($file_id) {
    //<editor-fold defaultstate="collapsed" desc="preview">  
        $auth_user = auth()->user(); 
        $file_id = intval($file_id);
        
        $file = FileModel::findOrFail($file_id);
        
        $config = Files::getConfig($file->container_name);
        
        if (!Arr::get($config, 'canView')($file->container_name, $file->container_id, $auth_user)) {
            abort(404);
        }        
        
        $path = Files::getUploadDir($file->container_name);
        
        if (empty($file->file_name)) {
            abort(404);
        }
        
        $file_name = "{$path}/{$file->file_name}.{$file->extension}";
        
        if (!File::exists($file_name)) {
            abort(404);
        }
      
        return FileHelper::output($file_name);       
    //</editor-fold>      
    }  
    
}