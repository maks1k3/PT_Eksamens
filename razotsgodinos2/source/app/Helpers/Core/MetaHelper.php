<?php
namespace App\Helpers\Core;


class MetaHelper
{
    
    static $title;
    static $description;
    static $image;
    
           
    /**
     * Set title
     *
     * @access public           
     * @param  string $title - title
     * @return void
    */
    public static function setTitle($title) {
    //<editor-fold defaultstate="collapsed" desc="setTitle"> 
        self::$title = $title;
    //</editor-fold>
    }
    
    /**
     * Get title
     *
     * @access public           
     * @return string
    */
    public static function getTitle() {
    //<editor-fold defaultstate="collapsed" desc="getTitle"> 
        $title = self::$title;
        
        if (empty($title)) {
            $title = '';
        }
        
        return $title;
        
    //</editor-fold>
    }    
    
    /**
     * Set description
     *
     * @access public           
     * @param  string $description - description 
     * @return void
    */
    public static function setDescription($description) {
    //<editor-fold defaultstate="collapsed" desc="setDescription"> 
        self::$description = $description;
    //</editor-fold>
    }
    
    /**
     * Get description
     *
     * @access public           
     * @return string
    */
    public static function getDescription() {
    //<editor-fold defaultstate="collapsed" desc="setDescription"> 
        $description = self::$description;
        
        if (empty($description)) {
            $description = '';
        }
        
        $description = SearchHelper::getSearchIndex($description, false, 200);
        
        return $description;
    //</editor-fold>
    }
    
    /**
     * Set image
     *
     * @access public           
     * @param  string $image - image url
     * @return void
    */
    public static function setImage($image) {
    //<editor-fold defaultstate="collapsed" desc="setImage"> 
        self::$image = $image;
    //</editor-fold>
    }
    
    /**
     * Get image
     *
     * @access public           
     * @return string
    */
    public static function getImage() {
    //<editor-fold defaultstate="collapsed" desc="getImage"> 
        $image = self::$image;
        
        if (empty($image)) {
            $image = '';
        }
        
        return $image;
        
    //</editor-fold>
    }    

}