<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
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
    protected $table = 'logs';
    
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
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [        
        'description' => 'array',//json
    ];   
    
    /**
     * Get the user.
     */
    public function user()
    {
        return $this->belongsTo('App\Models\Main\User','user_id');
    }
}
