<?php
namespace App\Helpers\Core;
use Illuminate\Support\Arr;


class UrlHelper
{

    /**
    * Get all url parts
    *
    * @access public  
    * @param  string $url - url
    * @return array
    */
    public static function parse($url){    
    //<editor-fold defaultstate="collapsed" desc="parse">
        $result = [];
        $parsed_url = parse_url($url);
        
        $result['scheme'] = Arr::get($parsed_url, 'scheme', null);
        $result['host'] = Arr::get($parsed_url, 'host', null);
        $result['path'] = Arr::get($parsed_url, 'path', null);
        $result['query'] = Arr::get($parsed_url, 'query', null);
        $result['fragment'] = Arr::get($parsed_url, 'fragment', null);
        
        $result['query_params'] = null;
        
        if (!empty($result['query'])) {                                            
            parse_str($result['query'], $result['query_params']);
        }
        
        
        $result['path'] = ltrim($result['path'], '/');
        $result['path'] = rtrim($result['path'], '/');
        
        $result['segments'] = null;
        
        if (!empty($result['path'])) {
            $path = $result['path'];
                                
            $result['segments'] = explode('/', $path);
        }
        
        return $result;
    //</editor-fold>      
    }
    
    /**
    * Create url from parsed url
    *
    * @access public  
    * @param  array $parsed_url - parsed url parts
    * @param  array $ignored - ignore this url parts
    * @return string
    */
    public static function build($parsed_url, $ignored = []){    
    //<editor-fold defaultstate="collapsed" desc="build">
        $result = '';
        
        if (!empty($parsed_url['scheme']) && !in_array('scheme', $ignored)) {
            $result .= $parsed_url['scheme'].'://';
        }
        
        if (!empty($parsed_url['host']) && !in_array('host', $ignored)) {
            $result .= $parsed_url['host'];
        }
        
        if (!empty($parsed_url['segments']) && !in_array('path', $ignored)) {
            $result .= '/'.implode('/',$parsed_url['segments']);
        }
        
        if (!empty($parsed_url['query_params']) && !in_array('query', $ignored)) {
            $result .= '?'.http_build_query($parsed_url['query_params']);
        }
        
        if (!empty($parsed_url['fragment']) && !in_array('fragment', $ignored)) {
            $result .= '#'.$parsed_url['fragment'];
        }
        
        return $result;
    //</editor-fold>      
    }

    /**
    * Replace segments
    *
    * @access public  
    * @param  array $url - url to modify
    * @param  array $new_segments - [0 => 'new_segment', 2 => 'new_segment']   
    * @return array
    */
    public static function replaceSegments($parsed_url, $new_segments){    
    //<editor-fold defaultstate="collapsed" desc="modifySegments">
                
        foreach($parsed_url['segments'] as $key => $value) {
            foreach ($new_segments as $new_key => $new_value) {
                if ($key === $new_key) {
                    $parsed_url['segments'][$key] = $new_value;
                }
            }
        }
        
        return $parsed_url;
    //</editor-fold>      
    }
    
    
   
}
