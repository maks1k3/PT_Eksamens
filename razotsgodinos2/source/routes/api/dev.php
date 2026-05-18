<?php

Route::group(['prefix' => 'dev_admin'], function () {
    
    Route::post('test','ApiTestingController@test');  
    
    
# ========================================================================#
#
#                            Logs
#    
# ========================================================================# 

Route::group(['prefix' => 'logs'], function () {

    Route::post('search','LogsController@search');  
    Route::post('actions','LogsController@actions');
    
});

# ========================================================================#
#
#                            Users
#    
# ========================================================================# 

Route::group(['prefix' => 'users'], function () {

    Route::post('search','UsersController@search');  
    Route::post('actions','UsersController@actions');
    
});

Route::group(['prefix' => 'calculator_prices'], function (){

    Route::post('search', 'CalculatorPricesController@search');
    Route::post('actions', 'CalculatorPricesController@actions');

});
# ========================================================================#
#
#                            Session
#    
# ========================================================================# 

Route::group(['prefix' => 'session'], function () {

    Route::post('search','SessionController@search');  
    Route::post('actions','SessionController@actions');
    
});

# ========================================================================#
#
#                            Langs
#    
# ========================================================================# 

Route::group(['prefix' => 'langs'], function () {
 
    Route::post('actions','LangsController@actions');
    
});

# ========================================================================#
#
#                            Metadata
#    
# ========================================================================#

Route::group(['prefix' => 'meta_data'], function () {
    
    Route::post('search','MetaDataController@search');
    Route::post('actions','MetaDataController@actions');
    
});

# ========================================================================#
#
#                            Settings
#    
# ========================================================================# 

Route::group(['prefix' => 'settings'], function () {
    
    Route::post('actions','SettingsController@actions');
    
});

# ========================================================================#
#
#                            Translations
#    
# ========================================================================# 

Route::group(['prefix' => 'translations'], function () {
    
    Route::post('search','TranslationsController@search');
    Route::post('actions','TranslationsController@actions');
    
});

# ========================================================================#
#
#                            Databse administration
#    
# ========================================================================# 

Route::group(['prefix' => 'databse_administration'], function () {
    
    Route::post('search','DatabaseAdministrationController@search');
    Route::post('actions','DatabaseAdministrationController@actions');
    
});


# ========================================================================#
#
#                            CMS
#    
# ========================================================================# 

Route::group(['prefix' => 'cms', 'namespace' => 'CMS'], function () {
    
    Route::group(['prefix' => 'content'], function () {
    
        Route::post('search','ContentController@search');
        Route::post('actions','ContentController@actions');

    });
    
    Route::group(['prefix' => 'collections'], function () {
    
        Route::post('search','CollectionsController@search');
        Route::post('actions','CollectionsController@actions');

    });    
    
});

# ========================================================================#
#
#                            Media
#    
# ========================================================================# 

Route::group(['prefix' => 'media', 'namespace' => 'Media'], function () {
    
    Route::group(['prefix' => 'images'], function () {
    
        Route::post('search','ImagesController@search');
        Route::post('actions','ImagesController@actions');

    });
    
    Route::group(['prefix' => 'videos'], function () {
    
        Route::post('search','VideosController@search');
        Route::post('actions','VideosController@actions');

    });    
    
    Route::group(['prefix' => 'files'], function () {
    
        Route::post('search','FilesController@search');
        Route::post('actions','FilesController@actions');

    });    
    
});


# ========================================================================#
#
#                            Long task
#    
# ========================================================================# 

Route::group(['prefix' => 'long_task'], function () {
    
    Route::post('start', 'LongTaskController@start');
    
});

# ========================================================================#
#
#                            Routes
#    
# ========================================================================# 

Route::group(['prefix' => 'routes'], function () {
    
    Route::post('search', 'RoutesController@search');
    Route::post('autocomplete', 'RoutesController@autocomplete');
    
});

# ========================================================================#
#
#                            Testing
#    
# ========================================================================# 

Route::group(['prefix' => 'testing'], function () {
    
    Route::post('actions', 'TestingController@actions');
    
});


});