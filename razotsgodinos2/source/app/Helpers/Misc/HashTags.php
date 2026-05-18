<?php
namespace App\Helpers\Misc;



class HashTags
{
    
# ========================================================================#
#
#                           Get hashtags
#    
# ========================================================================#    

    /**
    * Get hashtags from string
    *
    * @access public  
    * @param  string $text - text with hashtags        
    * @return string
    */
    public static function getHashTags($text){    
    //<editor-fold defaultstate="collapsed" desc="Get hashtags">    
        $hashtags= FALSE;  
        preg_match_all("/(#\w+)/u", $text, $matches);  
        if ($matches) {
            $hashtagsArray = array_count_values($matches[0]);
            $hashtags = array_keys($hashtagsArray);
        }
        
        //prepare hashtags
        foreach($hashtags as &$hashtag){
            $hashtag=strtolower($hashtag);
            $hashtag=str_replace(array("#", "[", "]"), "", $hashtag);
            $hashtag=trim($hashtag);
        }
        
        $hashtags=array_unique($hashtags);//allow only unique values
        $hashtags=array_filter($hashtags);//remove empty elements
        
        return $hashtags;
    //</editor-fold>      
    }

    
# ========================================================================#
#
#                           Wrap hashtags
#    
# ========================================================================#    

    /**
    * Wrap hashtags in text
    *
    * @access public  
    * @param  string $text - text with hashtags        
    * @return string
    */
    public static function wrapHashtags($text){     
    //<editor-fold defaultstate="collapsed" desc="Wrap hashtags">    
        $text = preg_replace('/#(\S+)/', ' <a class="hashtag-link link" data-name="$1">#$1</a>', $text);
        
        return $text;
    //</editor-fold>      
    }

    
# ========================================================================#
#
#                           Pack hashtags
#    
# ========================================================================#    

    /** 
    * Structurize hashtags
    * 
    * [hashtag1],[hashtag2],[hashtag3]
    * @param array hashtags  
    * @return string with hashtags
    */  		
    public static function compress($hashtags){
    //<editor-fold defaultstate="collapsed" desc="compress">    
        $result="";
        asort($hashtags);
        foreach($hashtags as $hashtag){
            $hashtag=trim($hashtag);
            $result.="[$hashtag],";
        }
        $result=rtrim($result, ",");

        return $result;
    //</editor-fold>     
    }  
 
    
# ========================================================================#
#
#                           Unpack hashtags
#    
# ========================================================================#    

    /** 
    * Extracts hashtags from string
    * 
    * [hashtag1],[hashtag2],[hashtag3]
    * @param string - hashtags  
    * @return array of hashtags
    */    
    public static function extract($hashtags){
    //<editor-fold defaultstate="collapsed" desc="extract">    
        $result = array();
        $hashtags = explode(",",$hashtags);
        foreach($hashtags as $hashtag){
            $result[] = str_replace(array("[","]"), "", $hashtag);
        }

        return $result;
    }  
//</editor-fold>   

# ========================================================================#
#
#                           Generate SQL
#    
# ========================================================================#    
//<editor-fold defaultstate="collapsed" desc="Generate SQL">
    /** 
    * Generate SQL
    * 
    * 
    * @param array - hashtags  
    * @param strting - $table name  
    * @return string
    */  
    public static function generateSQL($hashtags,$table,&$sql_params){
        //<editor-fold defaultstate="collapsed" desc="extract"> 
        $result=null;
        
        $tmp="";
        foreach($hashtags as $hashtag){
            $tmp.=" and $table.hashtags LIKE ? ";
        }
        $tmp=ltrim($tmp, " and");

        foreach($hashtags as $hashtag){
            $sql_params[]="%[$hashtag]%";
        } 
        
        $result.=$tmp;
        $result.="";
        
        return $result;
    }
//</editor-fold>  
   
    
   
}
