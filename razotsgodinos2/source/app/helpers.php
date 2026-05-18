<?php

if(!function_exists('init_long_operation')) {
    /** 
    * Remove all limits to perform long operation
    *
    * @access public    
    * @return void
    */
    function init_long_operation() {
        ini_set('memory_limit', '2560M');
        ini_set('max_execution_time', 0);
        ignore_user_abort(1); // run script in background 
        set_time_limit(0); 
    }
}

if(!function_exists('mdump')) {
    /** 
    * Dump any object
    *
    * @access public
    * @param obj $obj - any object,array,string
    * @param string $note - dump description
    * @param boolean $return - return this object as string
    * @return mixed
    */
    function mdump($obj, $note='',$return=false) {

        $result='';  

        $result.='<div style="border:1px solid gray; text-align: left">
        <div onClick=\'
            try {
              if (document.all) {
                      nodenr=1;
              } else {
                      nodenr=2;
              };
              if (navigator.userAgent.indexOf("Opera")!=-1) {
                      nodenr=2;
              }
              this.parentNode.childNodes[nodenr].style.display = (this.parentNode.childNodes[nodenr].style.display != "")?"":"none";
            } catch(e) {
              alert(e.description)
            }\'
        style="background-color: yellow; color:black; font: bold 12px Tahoma; padding:5px;">DEBUG '. $note. '</div>';
        $result.='<div style="display:none;"><pre style="font:normal 12px Tahoma; padding:5px; margin:0; background-color:lightyellow; color:black;">';
        $result.=print_r($obj,true);

        $result.='</pre></div></div>';

        if($return){
            return $result;
        }
        else{
            echo $result;
        }
    } 
}

if(!function_exists('_dump')) {
    /** 
    * Dump any object
    *
    * @access public
    * @param obj $obj - any object,array,string   
    * @return string
    */
    function _dump($obj) {

        print_r($obj);
    } 
}

if(!function_exists('_dd')) {
    /** 
    * Dump any object and stop execution
    *
    * @access public
    * @param obj $obj - any object,array,string   
    * @return string
    */
    function _dd($obj) {

        print_r($obj); die();
    } 
}

if(!function_exists('is_ajax')) {
    /** 
    * Check if current request is from ajax
    *
    * @access public    
    * @return bool
    */
    function is_ajax() {
        if(request()->wantsJson() || (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')){
            return true;
        }
        else{
            return false;
        }
    }
}

if (!function_exists('sanitize_string')){
    /** 
    * Prevent xss or too large inserts to database
    *
    * @access public
    * @param string $data - user input data
    * @return string
    */
    function sanitize_string($value){        
        
        $value = trim(preg_replace('/\t/', '', $value));//remove tabulation
        $value = strip_tags($value);        
        return $value;
    }
}

if (!function_exists('isValidEmail')){
    /** 
    * Check if given string is valid email
    *
    * @access public
    * @param string $email - email  
    * @return boolean
    */
    function isValidEmail($email){ 
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }
}

if (!function_exists('array_iunique')){
    //<editor-fold defaultstate="collapsed" desc="Usage"> 
    /**
        Filter user tags example 

        $tags=array("pov","Pov","pov","","test","tEst");
        dump($tags,"before");
        $tags=array_iunique($tags);
        $tags = array_filter($tags);//remove empty elements
        dump($tags,"after");
         * 
         * 
         DEBUG before
        Array
        (
            [0] => pov
            [1] => Pov
            [2] => pov
            [3] => 
            [4] => test
            [5] => tEst
        )
        DEBUG after
        Array
        (
            [0] => pov
            [4] => test
        )
    */
    //</editor-fold> 
    /**
    * Case-insensitive array_unique() wrapper.
    *
    * @param  mixed $needle   Value to seek.
    * @param  array $haystack Array to seek in.
    *
    * @return bool
    */
    function array_iunique($array) {
        return array_intersect_key(
            $array,
            array_unique(array_map('strtolower', $array))
        );
    }    
}

if (!function_exists('in_arrayi')){
    /**
     * Case-insensitive in_array() wrapper.
     *
     * @param  mixed $needle   Value to seek.
     * @param  array $haystack Array to seek in.
     *
     * @return bool
     */
    function in_arrayi($needle, $haystack)
    {
            return in_array(strtolower($needle), array_map('strtolower', $haystack));
    }
}

if (!function_exists('preview_text')){
    /**
     * Generate text preview
     *
     * @param  string $text - text from which to generate preview
     * @param  int $limit - number of chars in text
     *
     * @return bool
     */
    function preview_text($text, $limit = 100)
    {
        $text = trim($text);
        
        if ($limit > 0) {
            $previous = $text;       
            $text = mb_substr($text, 0, $limit);
            if($text !== $previous){
                $text .= "...";
            }
        }
        
        return $text;
    }
}

if (!function_exists('reorder')){
    /**
     * Reorder rows
     * 
     * reorder('1,2,3', Model::class);
     * 
     * @param  string $ids - ids to reorder
     * @param  object $model - table model
     * @param  string $field - field name
     *
     * @return void
     */
    function reorder($ids, $model, $field = 'position')
    {
        
        $ids = explode(',', $ids);
        $ids = array_map('intval', $ids);
        $start_position = $model::whereIn('id', $ids)->get(['id', $field])->min($field);

        foreach($ids as $position => $id) {
            $new_position = $start_position + $position;
            $item = $model::find($id);
            if (!empty($item)) {
                $item->{$field} = $new_position;
                $item->save();
            }
        }
    }
}

if (!function_exists('compressTags')){
    /** 
    * Structurize tags
    * 
    * [tag1],[tag2],[tag3]
    * @param array tags  
    * @return string with tags
    */  		
    function compressTags($tags) {
        $result = '';
               
        $tags = array_map(function($value) { return str_replace(['[',']'], '', $value); }, $tags);        
        $tags = array_unique($tags);
        asort($tags);
        
        foreach($tags as $tag) {
            $tag = trim($tag);
            if(empty($tag)){
                continue;
            }
            $tag = str_replace(['[',']'], '', $tag);
            $result.= "[$tag],";
        }
        $result = rtrim($result, ',');

        return $result;
    }      
}


if (!function_exists('extractTags')){    
    /** 
    * Extracts tags from string
    * 
    * [tag1],[tag2],[tag3]
    * @param string - tags  
    * @return array of tags
    */    
    function extractTags($tags){
        $result = [];
        $tags = explode(',', $tags);
        foreach($tags as $tag){            
            $tag = str_replace(['[',']'], '', $tag);
            if(empty($tag)){
                continue;
            }
            $result[] = $tag;
        }

        return $result;
    }  
}


if (!function_exists('removeHostnameFromUrl')){    
    /** 
    * Remove hostname from url
    * 
    * 
    * @param string - url  
    * @return string
    */    
    function removeHostnameFromUrl($url){
        $components = parse_url($url); 
        $result = (!empty($components['path']) ? '' . $components['path'] : '') . (!empty($components['query']) ? '?' . $components['query'] : '') . (!empty($components['fragment']) ? '#' . $components['fragment'] : '');

        return $result;
    }  
}

if(!function_exists('units')) {
    /** 
    * Get correct unit name
        $days = [
            'nom' => 'день',
            'gen' => 'дня',
            'plu' => 'дней',
        ];


    *   units(1.2, days);//дня
    *   units(1,days);//день
    *   units(2,days);//дня
    *   units(25,days);//дней
    *
    * @param number  num - needle
    * @param array  cases - haystack
    */
    function units($num, $cases) {

        $num = abs($num);

        $word = '';
        
	if (!is_int($num)) {
            $word = $cases['gen'];
            
	} else {
            
            
            if ($num % 10 == 1 && $num % 100 != 11) {
                $word = $cases['nom'];
            }
            else if ($num % 10 >= 2 && $num % 10 <= 4 && ($num % 100 < 10 || $num % 100 >= 20)) {
                $word = $cases['gen'];
            }
            else {
                $word = $cases['plu'];
            }
	}

	return $word;
    } 
}

if(!function_exists('generate_password')) {
     /** 
    * Generate password
    *
    * @param number $length - password's length
    * @param string 
    */
    function generate_password($length = 12){
        $chars =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.
        '0123456789';
        $str = '';
        $max = strlen($chars) - 1;

        for ($i=0; $i < $length; $i++) {
            $str .= $chars[random_int(0, $max)];
        }
        
        return $str;
    }
}