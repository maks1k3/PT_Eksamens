<?php

Route::group(['namespace' => 'Core'], function () {
    
    require(base_path() . '/routes/web/core.php');
    
});

Route::group(['namespace' => 'CMS'], function () {

    require(base_path() . '/routes/web/cms.php');
    
});

Route::group(['namespace' => 'Media'], function () {   

    require(base_path() . '/routes/web/media.php');
    
});    

Route::group(['namespace' => 'Dev', 'middleware' => 'is_dev'], function () {
    
    require(base_path() . '/routes/web/dev.php');
    
});

Route::group(['namespace' => 'Main', 'prefix' => 'administration', 'middleware' =>  ['auth', 'is_cms_admin']], function () {
    
    require(base_path() . '/routes/web/administration.php');
    
});

Route::group(['namespace' => 'Main'], function () {

    require(base_path() . '/routes/web/main.php');

});
