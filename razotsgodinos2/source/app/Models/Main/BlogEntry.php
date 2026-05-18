<?php
//s
namespace App\Models\Main;
//sss
use Illuminate\Database\Eloquent\Model;

class BlogEntry extends Model
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
    protected $table = 'blog_entries';


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
        'active' => 'boolean',    
    ];    
    
    /**
    * Get categories
    *
    * @param  string $value
    * @return array
    */
    public function getCategoriesAttribute($value)
    {
        return extractTags($value);
    }
    
    /**
    * Set categories
    *
    * @param  array  $value
    * @return string
    */
    public function setCategoriesAttribute($value)
    {
        $this->attributes['categories'] = compressTags($value);        
    }
    
}