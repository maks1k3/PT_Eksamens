<?php

Route::group(['middleware' => 'api_locale' ],function () {

    Route::group(['namespace' => 'Core'], function () {

        require(base_path() . '/routes/api/core.php');

    });

    Route::group(['namespace' => 'CMS'], function () {

        require(base_path() . '/routes/api/cms.php');

    });

    Route::group(['namespace' => 'Media'], function () {   

        require(base_path() . '/routes/api/media.php');

    });    

    Route::group(['namespace' => 'Dev', 'middleware' => 'is_dev'], function () {

        require(base_path() . '/routes/api/dev.php');

    });
    
    Route::group(['prefix' => 'administration', 'middleware' => 'is_cms_admin', 'namespace' => 'Administration'], function () {

        require(base_path() . '/routes/api/administration.php');

    });

    Route::group(['namespace' => 'Main'], function () {

        require(base_path() . '/routes/api/main.php');

    });

});