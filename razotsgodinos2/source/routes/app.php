<?php

Route::group([],function () {

    Route::group(['namespace' => 'Core'], function () {

        require(base_path() . '/routes/app/core.php');

    });
    
    Route::group(['namespace' => 'Dev', 'middleware' => 'is_dev'], function () {

        require(base_path() . '/routes/app/dev.php');

    });

});






