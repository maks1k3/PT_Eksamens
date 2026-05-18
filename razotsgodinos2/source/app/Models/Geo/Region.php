<?php

namespace App\Models\Geo;

use Illuminate\Database\Eloquent\Model;


class Region extends Model
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
    protected $table = 'regions';


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
     * Get country.
     */
    public function country()
    {
        return $this->belongsTo('App\Models\Geo\Country', 'country_id', 'id');
    }   

}