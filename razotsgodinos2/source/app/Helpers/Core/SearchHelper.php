<?php
namespace App\Helpers\Core;

class SearchHelper
{
    
    
    /** 
    * Generate search index
    *
    * @param string $text - text for index 
    * @param boolean $lower - if true than lower index
    * @param integer $limit - number of chars
    * @return string 
    */ 
    public static function getSearchIndex($text, $lower = false, $limit = 0){
    //<editor-fold defaultstate="collapsed" desc="getSearchIndex"> 
        $text = trim($text);
        //trick to save spaces for words in seprate html tags 
        //example: <p>Hello</p><p>teacher</p> will be 'Hello teacher' and not 'Helloteacher' in search index
        $text = str_replace( '<', ' <',$text );
        $text = strip_tags( $text );
        $text = str_replace( '  ', ' ', $text );

        if ($lower) {
            $text= mb_strtolower($text);
        }
        $text = html_entity_decode($text);

        if ($limit > 0) {
            $previous = $text;       
            $text = mb_substr($text, 0,$limit);
            if ($text != $previous){
                $text.= "...";
            }
        }

        //remove all not utf-8 chars
        $text = preg_replace('/[\x00-\x08\x10\x0B\x0C\x0E-\x19\x7F]'.
                            '|[\x00-\x7F][\x80-\xBF]+'.
                            '|([\xC0\xC1]|[\xF0-\xFF])[\x80-\xBF]*'.
                            '|[\xC2-\xDF]((?![\x80-\xBF])|[\x80-\xBF]{2,})'.
                            '|[\xE0-\xEF](([\x80-\xBF](?![\x80-\xBF]))|(?![\x80-\xBF]{2})|[\x80-\xBF]{3,})/S',
        ' ', $text );

        //save some common html entites so you can use them in search queries
        $text = str_replace('&apos;', "'", $text);
        $text = str_replace('&quot;', '"', $text);
        $text = str_replace('&ndash;', '–', $text);

        //remove all others html entities
        $text = preg_replace('/&(?:[a-z\d]+|#\d+|#x[a-f\d]+);/i', '', $text);
        $text = trim($text);
        return $text;
    //</editor-fold>
    }
        
    /** 
    * Generate search snippet
    *
    * @param array $keywords - search terms  
    * @param string $text - text where to search  
    * @param string $limit - number of sentences in search snippet   
    * @param boolean $found_whole_phrase - if true do not split keywords   
    * @param string $term - search term
    * @param boolean $highlight - if true wrap keywords with <em></em>
    * @return string
    */ 
    public static function getSearchSnippet($keywords, $text, $limit, $found_whole_phrase, $term, $highlight = false) {
    //<editor-fold defaultstate="collapsed" desc="getSearchSnippet">
        $result = '';
        $snippet_current = 0;
        $radius = 15;
        if (empty($keywords) || empty($text)) {
            return '';
        }

        if (!$found_whole_phrase) {
            $new_keywords = [];

            foreach($keywords as $keyword){
                $words = explode(' ',$keyword);
                foreach ($words as $word) {
                    if (mb_strlen($word) < 2) continue;
                    $new_keywords[] = $word;
                }
            }
            $keywords = $new_keywords;
        }
        else{
            $keywords = [$term];
        }

        foreach ($keywords as $keyword) {
            $matches = [];
            //escape / slash
            $keyword = str_replace('/', '\/', $keyword);
            $_keyword = preg_quote($keyword);
            preg_match_all("/(.{0,$radius})($_keyword)(.{0,$radius})/iu", $text, $matches);

            
            foreach ($matches[0] as $match) {
                $match = trim($match);
                
                if (empty($match)) {
                    continue;
                }
                
                if($snippet_current >= $limit){
                    break 2;
                }
                $result.= "$match...";
                
                if ($highlight) {
                    $result = preg_replace("/($keyword)/iu", '<em>${0}</em>', $result);
                }
                                

                $snippet_current++;
            }          
        }
                
        return $result;
    //</editor-fold>     
    }
    
    /** 
    * Generates search query
    * Check if search query returns any results and modifies it to get any results possible
    *    
    * @param object $query - search query    
    * @param array $search_columns - search columns
    * @param string $term - search term 
    * @param int $limit - search limit 
    * @param int $results_per_page - results per page
    * @param bool $use_fts - use full text search
    * @return array - updated query and params
    */ 
    public static function generateSearchQuery($query, $search_columns, $term, $limit, $results_per_page, $use_fts) {
    //<editor-fold defaultstate="collapsed" desc="generateSearchQuery">     
        $original_query = clone $query;
        $result = [];
        $result['keywords'][] = $term;
        $passed = false;

        //helper functions 
        //check search
        function check_search($query, $limit, $results_per_page) {
            $query = clone $query;
            $query->take($results_per_page);
            $query->skip($limit); 
//            return $query->count() > 0 ? true : false;
            
            $result = $query->get();
            if (!$result->isEmpty()) {
                return true;
            }
            else {
                return false;
            }
            
        }
        
        //full text search 
        function full_text_search($query, $search_columns, $search_terms) { 
            
            $query->where(function ($query) use ($search_columns, $search_terms) {   
                foreach($search_terms as $search_term){
                    $query->orWhereRaw("MATCH (".implode(",",$search_columns).") AGAINST(?)", [$search_term]);                   
                }              
            }); 
            
        }
        
        //like search
        function like_search($query, $search_columns, $search_terms) {      
            
            $query->where(function ($query) use ($search_columns, $search_terms) { 
                foreach($search_terms as $search_term){ 
                    foreach($search_columns as $search_column){
                        $query->orWhere($search_column, 'like', '%'.$search_term.'%');
                    }
                }           
            });            
        }

        //word shrink
        function word_shrink($query, $search_columns, $search_terms, $limit, $results_per_page, $use_fts) {
            $start_query = clone $query;
            $new_keywords = [];
            $passed = false;

            $result = [];


            foreach($search_terms as $search_term) {                
                $search_term .= ' ';//empty space to check if the whole word exists in search index

                $start = mb_strlen($search_term);            
                for( $i = $start; $i > 3; $i-- ) {           
                    $search_term = mb_substr($search_term, 0, -1);
                    
                    $tmp_search_keywords = [];
                    $tmp_search_keywords[] = $search_term;
                    $passed = false;    
                    //try full text search
                    if ($use_fts) {
                        $query = clone $start_query;
                        full_text_search($query, $search_columns, $tmp_search_keywords);
                        
                        //test 
                        $passed = check_search($query, $limit, $results_per_page);   
                    }

                    //try like search
                    if(!$passed){
                        $query = clone $start_query;
                        like_search($query, $search_columns, $tmp_search_keywords);

                        //test 
                        $passed = check_search($query, $limit, $results_per_page);
                    }

                    if ($passed) {
                        $new_keywords[] = $search_term;
                        break;
                    }

                }
            }

            if (empty($new_keywords)) {
                return [];
            }

            $passed = false; 
            if ($use_fts) {
                $query = clone $start_query;
                full_text_search($query, $search_columns, $new_keywords);
                
                //test 
                $passed = check_search($query, $limit, $results_per_page);
            }

            if (!$passed) {
                $query = clone $start_query;
                like_search($query, $search_columns, $new_keywords);
                
                $passed = check_search($query, $limit, $results_per_page);

            }

            $result['query'] = $query;            
            $result['keywords'] = $new_keywords;
        
            return $result;
        }


        //check if whole phrase was found
        $query = clone $original_query;
        like_search($query, $search_columns, [$term]);
       
        $whole_phrase_check = check_search($query, $limit, $results_per_page);        
        $result['found_whole_phrase'] = $whole_phrase_check;


        $passed = false;
        if ($use_fts) {
            $query = clone $original_query;
            //try full text search
            full_text_search($query, $search_columns, [$term]);
            
            //test 
            $passed = check_search($query, $limit, $results_per_page);            
        }

        //try like search
        if (!$passed) {
            $query = clone $original_query;
            like_search($query, $search_columns, [$term]);
            

            //test 
            $passed = check_search($query, $limit, $results_per_page);             

        }

        $result['query'] = $query;


        if (!$passed) {
            $words = explode(' ',$term);
            //try words split
            if (count($words) > 1) {//if there are more then one word
                //remove 2 symbol words
                foreach($words as $key => $word){
                    $word = trim($word);
                    if (mb_strlen($word) <= 2 ){
                        unset($words[$key]);
                    }
                }

                if (empty($words)) {
                    return $result;
                }            
                //try words shrink
                $query = clone $original_query;
                $tmp = word_shrink($query, $search_columns, $words, $limit, $results_per_page, $use_fts);
                if (!empty($tmp)) {
                    $result['query'] = $tmp['query'];                    
                    $result['keywords'] = $tmp['keywords'];
                }

            }
            //try word shrink
            else {
                $query = clone $original_query;
                $tmp = word_shrink($query, $search_columns, [$term], $limit, $results_per_page, $use_fts);
                if (!empty($tmp)) {
                    $result['query'] = $tmp['query'];                    
                    $result['keywords'] = $tmp['keywords'];
                }
            }


        }

        return $result;
    //</editor-fold>      
    }    
    
    
}