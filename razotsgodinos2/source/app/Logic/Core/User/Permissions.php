<?php
namespace App\Logic\Core\User;

use App\Types\Core\Permission;
use App\Logic\Core\User\Groups;

class Permissions
{
    
        
    /**
     * Get all permissions
     *
     * @access public           
     * @return array
    */
    public static function getAll() {
    //<editor-fold defaultstate="collapsed" desc="getAll"> 
        array_column(Permission::cases(), 'value');
    //</editor-fold>
    }    
    
    /**
     * Check if given permissions are valid
     *
     * @access public           
     * @param  array $permissions - ['admin', 'super_admin']
     * @return bool
    */
    public static function areValid($permissions) {
    //<editor-fold defaultstate="collapsed" desc="areValid"> 
        $valid_permissions = self::getAll();
        
        foreach ($permissions as $permission) {
            if (!in_array($permission, $valid_permissions)) {
                return false;
            }
        }
        
        return true;
    //</editor-fold>
    }
    
    /**
     * Check if user has permission
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user 
     * @param  string $permission - permission 
     * @return boolean
    */
    public static function has($user, $permission) {
    //<editor-fold defaultstate="collapsed" desc="has"> 
        if (Groups::isSuperAdmin($user)) {
            return true;
        }
        
        return in_array($permission, $user->user_permissions); 
    //</editor-fold>
    }
    
    /**
     * Check if user has all given permissions
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user 
     * @param  array $permissions - ['permission1', 'permission2'] 
     * @return boolean
    */
    public static function hasAll($user, $permissions) {
    //<editor-fold defaultstate="collapsed" desc="hasAll"> 
        if (Groups::isSuperAdmin($user)) {
            return true;
        }
        
        foreach($permissions as $permission){
            if (!in_array($permission, $user->user_permissions)) {
                return false;
            }
        }
        
        return true;
    //</editor-fold>
    }
    
    /**
     * Check if user is has at least one permission
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user 
     * @param  array $permissions - ['permission1', 'permission2'] 
     * @return boolean
    */
    public static function hasAtLeastOne($user, $permissions) {
    //<editor-fold defaultstate="collapsed" desc="hasAtLeastOne"> 
        if (Groups::isSuperAdmin($user)) {
            return true;
        }
        
        $check = false;
        
        foreach ($permissions as $permission) {
            if (in_array($permission, $user->user_permissions)) {
                $check = true;
            }
        }
        
        return $check;
    //</editor-fold>
    }
}