<?php
namespace App\Logic\Core;

use App\Models\Core\User;
use Hash;

use App\Logic\Core\User\Groups;
use App\Helpers\Misc\GenerateToken;

class Users
{

    
    /**
     * Check password
     *
     * @access public           
     * @param  string $password - plain-text
     * @param  string $hash - hashed password
     * @return bool
    */
    public static function checkPassword($password, $hash) {
    //<editor-fold defaultstate="collapsed" desc="checkPassword"> 
        return Hash::check($password, $hash);
    //</editor-fold>
    }
    
    /**
     * Update password
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user
     * @param  string $new_password - palin-text       
     * @return bool
    */
    public static function updatePassword($user, $new_password) {
    //<editor-fold defaultstate="collapsed" desc="updatePassword"> 
        $user->password = bcrypt($new_password);
        $user->save();        
    //</editor-fold>
    }    
    
    # ========================================================================#
    #
    #                            Tokens
    #    
    # ========================================================================#
    
    /**
     * Generate new token
     *
     * @access public           
     * @param  integer $length - token length     
     * @return string
    */
    public static function generateToken($length = 30) {
    //<editor-fold defaultstate="collapsed" desc="generateToken">       
        return GenerateToken::generateToken($length);
    //</editor-fold>
    }    
    
    /**
     * Check if token is valid
     *
     * @access public           
     * @param  integer $length - token length     
     * @return string
    */
    public static function isValidToken($token) {
    //<editor-fold defaultstate="collapsed" desc="isValidToken">       
        $regex = '/^[a-zA-Z0-9_\*]{30}$/';
        
        return preg_match($regex, $token);
    //</editor-fold>
    }    
    
    /**
     * Get user by token
     *
     * @access public           
     * @param  string $token - token authorization   
     * @return mixed \App\Models\Core\User or null
    */
    public static function getUserByToken($token) {
    //<editor-fold defaultstate="collapsed" desc="getUserByToken">       
       
       $user = User::whereTokenAndActive($token, 1)->first();
       
       if (empty($user)) {
           return null;
       }
       else {
           return $user;
       }
       
    //</editor-fold>
    }    
        
    /**
     * Update user token
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user   
     * @return string
    */
    public static function updateUserToken($user) {
    //<editor-fold defaultstate="collapsed" desc="updateUserToken">       
       
        do {
            $token = self::generateToken();
            
            $check = User::whereToken($token)->count();
            
            if ($check === 0) {
                $user->token = $token;
                $user->save();
            }
            
            
        } while ($check !== 0);
       
    //</editor-fold>
    }    
    
    # ========================================================================#
    #
    #                            Permissions
    #    
    # ========================================================================#
        
    /**
     * Is cms admin
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user          
     * @return bool
    */
    public static function isCMSAdmin($user) {
    //<editor-fold defaultstate="collapsed" desc="isCMSAdmin"> 
        if (empty($user)) {
            return false;
        }
        
        return Groups::isCMSAdmin($user);
    //</editor-fold>
    }
    
    
}