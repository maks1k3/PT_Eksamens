<?php
namespace App\Config;

use App\Logic\Main\Users;

class Authorization
{

            
    /**
     * Get authorization config
     *
     * @access public                
     * @param array $params - custom params                
     * @return array
    */
    public static function get() {
    //<editor-fold defaultstate="collapsed" desc="get"> 
        
        $config = [];
        
        //Login with email
        $config['email'] = [
            'enabled' => true,
            'emailConfirmation' => false,
            'resendEmailConfirmation' => false,
            'resetPassword' => false,             
            'maxAttempts' => 10,            
            //How long user won't be able to login with email if maximum number of login attempts exceeded
            'blockTime' => '1 hour',
            //Auth pages
            'loginPage' => 'Main\AuthPagesController@login',
            'accountMergePage' => 'Main\AuthPagesController@accountMerge',
            'emailConfirmationAction' => 'Main\AuthPagesController@emailConfirmation',
            'passwordResetAction' => 'Main\AuthPagesController@passwordReset',
        ];
        
        //Social logins
        $config['social'] = [
            'google' => false,
            'facebook' => false, 
            'linkedin' => false,
        ];
        
        return $config;
    //</editor-fold>
    }
    
}