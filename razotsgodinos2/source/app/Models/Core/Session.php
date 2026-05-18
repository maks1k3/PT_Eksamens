<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Model;


class Session extends Model
{
    /**
     * Database connection.
     *
     * @var string
     */
    protected $connection = 'main';

    
    public $incrementing = false;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'sessions';


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
        
    ];    
    
    /**
    * Get last_activity
    *
    * @param  integer $value
    * @return array
    */
    public function getLastActivityAttribute($value)
    {
        return date('Y-m-d H:i:s', $value);
    }
    
    /**
    * Get payload
    *
    * @param  string $value
    * @return array
    */
    public function getPayloadAttribute($value)
    {
        return unserialize(base64_decode($value));
    }
    

}