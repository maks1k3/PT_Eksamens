<?php

namespace App\Models\Main;

use Illuminate\Database\Eloquent\Model;

class CalculatorPrice extends Model
{
    protected $connection = 'main';
    protected $table = 'calculator_prices';
    public $timestamps = false;

    protected $fillable = ['category_id', 'work_type_id', 'option_id', 'price'];
}