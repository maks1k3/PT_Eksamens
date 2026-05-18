<?php

use App\Http\Controllers\Api\Administration\Calculator\CalculatorCategoriesController;
use App\Http\Controllers\Api\Administration\Calculator\CalculatorWorkTypesController;
use App\Http\Controllers\Api\Administration\Calculator\CalculatorOptionsController;
use App\Http\Controllers\Api\Administration\Calculator\CalculatorPricesController;
use App\Http\Controllers\Api\Administration\CalculatorRequestsController;
use App\Http\Controllers\Api\Calculator\CalculatorPricingController;


// ...


Route::get('pricing', [CalculatorPricingController::class, 'index']);

Route::post('calculator_categories/search', [CalculatorCategoriesController::class, 'search']);
Route::post('calculator_categories/actions', [CalculatorCategoriesController::class, 'actions']);

Route::post('calculator_work_types/search', [CalculatorWorkTypesController::class, 'search']);
Route::post('calculator_work_types/actions', [CalculatorWorkTypesController::class, 'actions']);

Route::post('calculator_options/search', [CalculatorOptionsController::class, 'search']);
Route::post('calculator_options/actions', [CalculatorOptionsController::class, 'actions']);

Route::post('calculator_prices/search', [CalculatorPricesController::class, 'search']);
Route::post('calculator_prices/actions', [CalculatorPricesController::class, 'actions']);
Route::group(['prefix' => 'users'], function (){

    Route::post('search', 'UsersController@search');
    Route::post('actions', 'UsersController@actions');

});

Route::group(['prefix' => 'calculator_requests'], function () {

    Route::post('search', [CalculatorRequestsController::class, 'search']);

    Route::post('actions', [CalculatorRequestsController::class, 'actions']);

});

//
//Route::group(['prefix' => 'calculator'], function () {
//
//    Route::post('search', 'CalculatorPricesController@search');
//    Route::post('actions', 'CalculatorPricesController@actions');
//
//   Route::get('pricing', [CalculatorPricesController::class, 'pricing']);
//
//});

Route::group(['prefix' => 'contact_form'], function () {

    Route::post('search', 'ContactFormController@search');
    Route::post('actions', 'ContactFormController@actions');

});
//s
Route::group(['prefix' => 'meta_data'], function () {
    
    Route::post('search','MetaDataController@search');
    Route::post('actions','MetaDataController@actions');
    
});

Route::group(['prefix' => 'translations'], function () {
    
    Route::post('search','TranslationsController@search');
    Route::post('actions','TranslationsController@actions');
    
});

Route::group(['prefix' => 'settings'], function () {
    
    Route::post('actions','SettingsController@actions');
    
});

# ========================================================================#
#
#                           Blogs
#    
# ========================================================================#    

Route::group(['namespace' => 'BlogEntries', 'prefix' => 'blog'], function () {
 
    Route::post('search', 'BlogEntriesController@search');
    Route::post('actions', 'BlogEntriesController@actions');
    
    Route::group(['prefix' => 'categories'], function () {

        Route::post('search', 'BlogCategoriesController@search');
        Route::post('actions', 'BlogCategoriesController@actions');
        

    });
});

# ========================================================================#
#
#                           Blogs
#    
# ========================================================================#    

Route::group(['namespace' => 'Expenses', 'prefix' => 'expenses'], function () {
 
    Route::post('search', 'ExpensesController@search');
    Route::post('actions', 'ExpensesController@actions');
    
    Route::group(['prefix' => 'expenses_items'], function () {

        Route::post('search', 'ExpensesItemsController@search');
        Route::post('actions', 'ExpensesItemsController@actions');

    });
});

# ========================================================================#
#
#                           ExpensesRecords
#    
# ========================================================================#    

Route::group(['prefix' => 'expenses_records'], function () {
 
    Route::post('search', 'ExpensesRecordsController@search');
    Route::post('actions', 'ExpensesRecordsController@actions');
});//s