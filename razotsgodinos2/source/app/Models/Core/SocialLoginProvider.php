<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Model;


class SocialLoginProvider extends Model
{
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
    protected $table = 'social_login_providers';


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
    protected $hidden = [];


    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [      
        'extra_data' => 'array',//json
    ];    
    
    /**
     * Get user
     */
    public function user()
    {
        return $this->belongsTo('App\Models\Core\User', 'user_id', 'id');
    }

}