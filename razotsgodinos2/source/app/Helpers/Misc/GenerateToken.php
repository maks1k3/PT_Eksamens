<?php
namespace App\Helpers\Misc;

class GenerateToken {
    
    public static function crypto_rand_secure($min, $max) {
        $range = $max - $min;
        if ($range < 0 ) { return $min; }
        $log = log($range, 2);
        $bytes = (int) ( $log / 8 ) + 1;
        $bits = (int) $log + 1;
        $filter = (int) ( 1 << $bits ) -1;
        do {
            $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
            $rnd = $rnd & $filter;
        } while ( $rnd >= $range );
        return $min + $rnd;
    }
    
    public static function generateToken($length) {
        $token = '';
        $codeAlphabet = "abcdefghijklmnopqrstuvwxyz";
        $codeAlphabet .= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $codeAlphabet .= "0123456789";
        $codeAlphabet .= "_*";
        for ($i=0; $i < $length; $i++) {
            $token .= $codeAlphabet[self::crypto_rand_secure(0, strlen($codeAlphabet))];
        }
        return $token;
    }
}