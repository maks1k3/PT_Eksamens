<?php

namespace App\Helpers\Misc\Rison;

require_once __DIR__ . DIRECTORY_SEPARATOR . 'RisonDecoder.php';
require_once __DIR__ . DIRECTORY_SEPARATOR . 'RisonEncoder.php';


class RisonFunctions
{

        
    /**
     * Rison encode
     *
     * @access public           
     * @param  string $string - string 
     * @return string
    */
    public static function risonDecode($string) {
    //<editor-fold defaultstate="collapsed" desc="risonDecode"> 
        try {
		$r = new RisonDecoder($string);
		return $r->decode();
	} catch (\InvalidArgumentException $e) {
		trigger_error($e->getMessage(), E_USER_WARNING);
		return false;
	} catch (RisonParseErrorException $e) {
		trigger_error(sprintf('%s (in "%s")', $e->getMessage(), $e->getRison()), E_USER_WARNING);
		return false;
	}
    //</editor-fold>
    }
    
    
    /**
     * Method2
     *
     * @access public           
     * @param  string $value - string 
     * @return array
    */
    public static function risonEncode($value) {
    //<editor-fold defaultstate="collapsed" desc="risonEncode"> 
        try {
		$r = new RisonEncoder($value);
		return $r->encode();
	} catch (\InvalidArgumentException $e) {
		trigger_error($e->getMessage(), E_USER_WARNING);
		return false;
	}
    //</editor-fold>
    }
}
