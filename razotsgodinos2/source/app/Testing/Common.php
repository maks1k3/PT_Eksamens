<?php
namespace App\Testing;

use App\Models\Core\User;
use App\Models\Main\Profile;
use App\Logic\Core\Users;
use App\Helpers\Core\DateHelper;
use App\Types\Core\Group;

class Common
{

    /**
     * Get default user
     *
     * @access public           
     * @return \App\Models\Core\User
    */
    public static function getUser() {
    //<editor-fold defaultstate="collapsed" desc="getUser"> 
        $user = new User;
        $user->email = 'admin@dobinnovations.lv';   
        $user->password = bcrypt('123456');
        $user->can_login_with_email = true;
        $user->email_confirmed = true;
        $user->reg_date = DateHelper::getDateTime();
        $user->active = true;
        $user->user_groups = [Group::admin->value];
        $user->save();    

        Users::updateUserToken($user);

        $profile = new Profile;      
        $profile->user_id = $user->id; 
        $profile->completed = true;
        $profile->name = 'John';
        $profile->surname = 'Doe';
        $profile->save();
        
        return $user;
    //</editor-fold>
    }
    
    

}