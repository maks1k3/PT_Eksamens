<?php
namespace App\Logic\Core\User;

use App\Types\Core\Group;

class Groups
{
    
    /**
     * Check if user is super admin
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user 
     * @return boolean
    */
    public static function isSuperAdmin($user) {
    //<editor-fold defaultstate="collapsed" desc="isSuperAdmin"> 
        return in_array(Group::super_admin->value, $user->user_groups);
    //</editor-fold>
    } 
    
    /**
     * Check if user is CMS admin
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user 
     * @return boolean
    */
    public static function isCMSAdmin($user) {
    //<editor-fold defaultstate="collapsed" desc="isCMSAdmin"> 
        if (self::isSuperAdmin($user)) {
            return true;
        }
        
        return in_array(Group::admin->value, $user->user_groups); 
    //</editor-fold>
    }
        
    /**
     * Get all groups
     *
     * @access public           
     * @return array
    */
    public static function getAll() {
    //<editor-fold defaultstate="collapsed" desc="getAll"> 
        return array_column(Group::cases(), 'value');
    //</editor-fold>
    }    
    
    /**
     * Check if given groups are valid
     *
     * @access public           
     * @param  array $groups - ['admin', 'super_admin']
     * @return bool
    */
    public static function areValid($groups) {
    //<editor-fold defaultstate="collapsed" desc="areValid"> 
        $valid_groups = self::getAll();
        
        foreach ($groups as $group){
            if (!in_array($group, $valid_groups)) {
                return false;
            }
        }
        
        return true;
    //</editor-fold>
    }
    
    /**
     * Check if user is in group
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user 
     * @param  string $group - group 
     * @return boolean
    */
    public static function isIn($user, $group) {
    //<editor-fold defaultstate="collapsed" desc="isIn"> 
        if (self::isSuperAdmin($user)) {
            return true;
        }
        
        return in_array($group, $user->user_groups); 
    //</editor-fold>
    }
    
    /**
     * Check if user is in all given groups
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user 
     * @param  array $groups - ['admin', 'super_admin'] 
     * @return boolean
    */
    public static function isInAll($user, $groups) {
    //<editor-fold defaultstate="collapsed" desc="isInAll"> 
        if (self::isSuperAdmin($user)) {
            return true;
        }
        
        foreach($groups as $group){
            if (!in_array($group, $user->user_groups)) {
                return false;
            }
        }
        
        return true;
    //</editor-fold>
    }
    
    /**
     * Check if user is in at least one group
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user 
     * @param  array $groups - ['admin', 'user'] 
     * @return boolean
    */
    public static function isAtLeastInOne($user, $groups) {
    //<editor-fold defaultstate="collapsed" desc="isAtLeastInOne"> 
        if (self::isSuperAdmin($user)) {
            return true;
        }
        
        $check = false;
        
        foreach ($groups as $group) {
            if (in_array($group, $user->user_groups)) {
                $check = true;
            }
        }
        
        return $check;
    //</editor-fold>
    }
}