<?php
namespace App\Helpers\Media;
//d
use File;

class FileHelper
{
    
    /**
     * Get file info
     *
     * @access public           
     * @param  string $file - path to file
     * @return array
    */
    public static function getFileInfo($file) {
    //<editor-fold defaultstate="collapsed" desc="getFileInfo"> 
        $file_info = [];   
        
        $file_info['file_name'] = File::name($file); 
        $file_info['extension'] = File::extension($file); 
        $file_info['size'] = File::size($file);       
        $file_info['mime'] = File::mimeType($file);     
        
        return $file_info;
    //</editor-fold>
    } 

    /**
     * Get uploaded file info
     *
     * @access public           
     * @param  Illuminate\Http\Request $uploaded_file - $request->file 
     * @return array
    */
    public static function getUploadedFileInfo($uploaded_file) {
    //<editor-fold defaultstate="collapsed" desc="getUploadedFileInfo"> 
        $file_info = [];   
        
        $file_info['file_name'] = pathinfo($uploaded_file->getClientOriginalName(), PATHINFO_FILENAME); 
        $file_info['extension'] = $uploaded_file->getClientOriginalExtension(); 
        $file_info['size'] = $uploaded_file->getSize();       
        $file_info['mime'] = $uploaded_file->getMimeType();     
        $file_info['real_path'] = $uploaded_file->getRealPath();
        
        return $file_info;
    //</editor-fold>
    } 
            
    /**
     * Format bytes to kb, mb, gb, tb
     *
     * @param  integer $size
     * @param  integer $precision
     * @return integer
     */
    public static function getReadableSize($size, $precision = 2){
    //<editor-fold defaultstate="collapsed" desc="getReadableSize">     
        if ($size > 0) {
            $size = (int) $size;
            $base = log($size) / log(1024);
            $suffixes = array(' bytes', ' KB', ' MB', ' GB', ' TB');

            return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
        } else {
            return $size;
        }
    //</editor-fold>       
    }
    
    /**
     * Download file
     *
     * @param  string $path - path to file
     * @param  string $file_name - desired file's name
     * @return response
     */
    public static function download($path, $file_name){
    //<editor-fold defaultstate="collapsed" desc="download"> 
        return response()->download($path, $file_name);
    //</editor-fold>       
    }
    
    /**
    * Output file
    *
    * @param  string $path - path to file    
    * @return response
    */
    public static function output($path){
    //<editor-fold defaultstate="collapsed" desc="download"> 
        return response()->file($path);
    //</editor-fold>       
    }
    
}