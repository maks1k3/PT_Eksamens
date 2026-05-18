<?php
namespace App\Helpers\Core;

use NumberToWords\NumberToWords;

class FormatHelper
{

    /**
    * Convert to money format
    *
    * @access public  
    * @param  mixed $input - input
    * @param  number $precision - input
    * @return string
    */
    public static function money($input, $precision = 2){    
    //<editor-fold defaultstate="collapsed" desc="money">    
       $input = round($input, $precision);
       
       return number_format($input, $precision, '.', ' ');
    //</editor-fold>      
    }
    
    /**
    * Convert money to words
    *
    * @access public  
    * @param  mixed $money - money
    * @param  string $lang - language
    * @param  array $currency - whole part (euro)
    * @param  string $divider - whole and fraction divider
    * @param  array  $cents - fration part (cents)
    * @return string
    */
    public static function moneyToWords($money,  $lang = 'lv', $currency = ['nom' => 'eiro', 'gen' => 'eiro', 'plu' => 'eiro'], $divider = 'un', $cents = ['nom' => 'cents', 'gen' => 'centi', 'plu' => 'centi']){    
    //<editor-fold defaultstate="collapsed" desc="moneyToWords">    
        $result = '';
        $money = abs(round($money, 2));
       
        $whole = floor($money);      
        $whole = (int) $whole;
        $fraction = round($money - $whole, 2); 
        
        if ($fraction > 0) {
            $fraction = (int)round($fraction * 100);
        }
        
        $numberToWords = new NumberToWords();
        $numberTransformer = $numberToWords->getNumberTransformer($lang);
                                
        $result = $numberTransformer->toWords($whole).' '.units((int)round($whole), $currency);
        
        if ($fraction < 10) {
            $fraction = str_pad($fraction, 2, '0', STR_PAD_LEFT);
        }
        
        $result .= ' '.$divider.' '.$fraction.' '.units($fraction, $cents);
        
        return mb_strtoupper(mb_substr($result, 0, 1)).mb_substr($result, 1);
    //</editor-fold>      
    }
    
   
}
