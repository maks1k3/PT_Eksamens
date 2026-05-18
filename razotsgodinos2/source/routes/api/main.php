<?php

use App\Http\Controllers\Api\Administration\CalculatorController;
use App\Http\Controllers\Api\Main\ContactFormController;
use App\Http\Controllers\Api\Main\CalculatorRequestsController;

use App\Http\Controllers\Api\Calculator\CalculatorPricingController;

Route::get('pricing', [CalculatorPricingController::class, 'index']);

//Route::group(['prefix' => 'calculator'], function () {
//    Route::get('pricing', [CalculatorController::class, 'pricing']);
//});

Route::prefix('contact_form')->group(function () {
    Route::post('send', [ContactFormController::class, 'send']);
});

Route::prefix('calculator_requests')->group(function () {
    Route::post('send', [CalculatorRequestsController::class, 'send']);
});

Route::post('search','SearchController@search');

Route::group(['prefix' => 'registration', 'middleware' => 'guest'], function () {
    
    Route::post('actions','RegistrationController@actions');
    
});

Route::group(['prefix' => 'users', 'middleware' => 'auth'], function () {
    
    Route::post('actions','UsersController@actions');
    
});

Route::group(['prefix' => 'cookies'], function () {
    
    Route::post('actions','CookiesController@actions');
    
});

# ========================================================================#
#
#                           Blog
#    
# ========================================================================# 

Route::group(['prefix' => 'blog'], function () {

    Route::post('search', 'BlogEntriesController@search');  
    
    
});

# ========================================================================#
#
#                           Expenses
#    
# ========================================================================# 

Route::group(['prefix' => 'expenses'], function () {

    Route::post('search', 'ExpensesController@search');  
    
});//ss


