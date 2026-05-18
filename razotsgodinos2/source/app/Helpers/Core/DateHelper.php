<?php
namespace App\Helpers\Core;


class DateHelper
{
    /**
    * Get current time stamp date('Y-m-d H:i:s')
    *
    * @access public              
    * @param  integer $time - unix time stamp
    * @return string - 'Y-m-d H:i:s'
    */
    public static function getDateTime($time = null){
    //<editor-fold defaultstate="collapsed" desc="getDateTime"> 
        if (!empty($time)) {
            return date('Y-m-d H:i:s', $time);
        }
        else {
            return date('Y-m-d H:i:s');
        }        
    //</editor-fold>    
    } 
    
    /**
    * Get current datedate('Y-m-d')
    *
    * @access public              
    * @param  integer $time - unix time stamp
    * @return string - 'Y-m-d H:i:s'
    */
    public static function getDate($time = null){
    //<editor-fold defaultstate="collapsed" desc="getDate"> 
        if (!empty($time)) {
            return date('Y-m-d', $time);
        }
        else {
            return date('Y-m-d');
        }        
    //</editor-fold>    
    } 
    
    /**
    * Convert unix to date
    *
    * @access public              
    * @param  mixed $input - unix time stamp, string, 0 or null
    * @return mixed
    */
    public static function unixToDate($input){
    //<editor-fold defaultstate="collapsed" desc="unixToDate"> 
        if (is_numeric($input) && $input > 0) {
            return self::getDateTime($input);
        }
        if (empty($input)) {
            return null;
        }
        
        return $input;        
    //</editor-fold>    
    } 

}