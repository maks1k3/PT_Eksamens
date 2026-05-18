<?php
namespace App\Config;

use App\Logic\Core\Users;

class User
{      
    /**
     * Get user info
     *
     * @access public                
     * @param array $params - custom params                
     * @return array
    */
    public static function get($params = []) {
    //<editor-fold defaultstate="collapsed" desc="get"> 
        
        $auth_user = auth()->user();
        
        if (empty($auth_user)) {
            return null;
        }

        $defaults = [
            'id' => $auth_user->id,
            'email' => $auth_user->email,
            'name' => $auth_user->profile->name,
            'surname' => $auth_user->profile->surname,
            'groups' => $auth_user->user_groups,
            'permissions' => $auth_user->user_permissions,
            'isAdmin' => Users::isCMSAdmin($auth_user),
        ];
        
        $merged = collect($defaults)->merge($params);

        return $merged->all();
    //</editor-fold>
    }
    
}