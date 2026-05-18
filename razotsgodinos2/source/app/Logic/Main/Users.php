<?php
namespace App\Logic\Main;

use App\Models\Core\User;
use App\Models\Main\Profile;
use App\Helpers\Core\DateHelper;
use App\Types\Core\Group;

class Users
{

            
    /**
     * Create new user
     *
     * @access public           
     * @param  string $email - email name 
     * @param  array $user_data - user data from social provider
     * @return \App\Models\Core\User
    */
    public static function create($email, $user_data) {
    //<editor-fold defaultstate="collapsed" desc="create"> 
        $user = new User;
        
        $user->email = $email;
        $user->reg_date = DateHelper::getDateTime();
        $user->active = true;
        $user->user_groups = [Group::user->value];
        $user->save();
        
        \App\Logic\Core\Users::updateUserToken($user);
        
        $profile = new Profile;        
        $profile->user_id = $user->id; 
        $profile->completed = false;
        $profile->save();
        
        
        if (!empty($user_data)) {
            
            $profile->name = $user_data['name'];
            $profile->surname = $user_data['surname'];
            
            $profile->save();
        }
        
        return $user;        
    //</editor-fold>
    }
    
    /**
     * Get redirect url
     *
     * @access public           
     * @param  string $email - email name 
     * @return \App\Models\Core\User
    */
    public static function getRedirectAfterLogin($user) {
    //<editor-fold defaultstate="collapsed" desc="create"> 
        $intended = session()->pull('url.intended');
                
        if (!empty($intended)) {
            return removeHostnameFromUrl($intended);
        }
        else {
            return removeHostnameFromUrl(url('/'));  
        }     
    //</editor-fold>
    }
    
    
}