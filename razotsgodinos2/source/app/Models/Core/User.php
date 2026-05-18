<?php

namespace App\Models\Core;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\ResetPassword as ResetPasswordNotification;
use App\Notifications\ConfirmEmail as ConfirmEmailNotification;

class User extends Authenticatable
           
{
    use Notifiable;
    
    /**
     * Database connection.
     *
     * @var string
     */
    protected $connection = 'main';
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';
    
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];
    
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password','remember_token'];
    
    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [       
        'can_login_with_email' => 'boolean',
        'email_confirmed' => 'boolean',
        'active' => 'boolean',
        'blocked' => 'boolean',               
        'extra_data' => 'array',//json
    ];    
    
    /**
    * Get groups
    *
    * @param  string $value
    * @return array
    */
    public function getUserGroupsAttribute($value)
    {
        return extractTags($value);
    }
    
    /**
    * Set groups
    *
    * @param  array  $value
    * @return string
    */
    public function setUserGroupsAttribute($value)
    {
        $this->attributes['user_groups'] = compressTags($value);        
    }
    
    /**
    * Get permissions
    *
    * @param  string $value
    * @return array
    */
    public function getUserPermissionsAttribute($value)
    {
        return extractTags($value);
    }
    
    /**
    * Set permissions
    *
    * @param  array  $value
    * @return string
    */
    public function setUserPermissionsAttribute($value)
    {
        $this->attributes['user_permissions'] = compressTags($value);        
    }
    
    /**
     * Get user's profile
     */
    public function profile()
    {
        return $this->hasOne('App\Models\Main\Profile', 'user_id', 'id');
    }
    
    /**
     * Get social providers
     */
    public function socialProviders()
    {
        return $this->hasMany('App\Models\Core\SocialLoginProvider', 'user_id', 'id');
    }
    
    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
    
    /**
     * Send the email verification notification.
     *
     * @param  string  $confirmationCode
     * @return void
     */
    public function sendConfirmEmailNotification($confirmationCode)
    {
        $this->notify(new ConfirmEmailNotification($confirmationCode));
    }    
   
}
