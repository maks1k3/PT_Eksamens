<?php
namespace App\Logic\Core;

use Illuminate\Support\Arr;
use App\Helpers\Core\RemoteRequestHelper;

class ReCaptcha
{

    /**
    * Check token
    * 
    * @access public
    * @param string $token - response token
    * @return mixed
    */
    public static function isValid($token) {
    //<editor-fold defaultstate="collapsed" desc="isValid">    
        $result = RemoteRequestHelper::get([
            'url' => 'https://www.google.com/recaptcha/api/siteverify',
            'data' => [
                'secret' => config('services.recaptcha.secret'),
                'response' => $token,
            ],
            'type' => 'post',
        ]);
        
        $status = $result['status'];        
        $body = $result['body'];
                
        
        if ($status === 200) {
            $response = json_decode($body, true);
            
            $success = Arr::get($response, 'success', false);
            
            return !!$success;
        }
        
        return false;
    //</editor-fold>      
    }
    
    
}