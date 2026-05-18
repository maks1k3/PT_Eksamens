<?php

namespace App\Models\Main;

use Illuminate\Database\Eloquent\Model;

class CalculatorRequest extends Model
{
    protected $connection = 'main';
    protected $table = 'calculator_requests';
    public $timestamps = false; 

    protected $fillable = [
        'category_id', 'calc', 'total',
        'nickname', 'phone', 'email', 'message', 'privacy'
    ];

    protected $casts = [
        'calc' => 'array',
        'privacy' => 'boolean',
    ];
}