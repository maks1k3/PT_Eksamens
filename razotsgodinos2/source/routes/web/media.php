<?php

Route::group(['prefix' => 'media'], function () {

    Route::group(['prefix' => 'file'], function () {

        Route::get('download/{file_id}', 'FilesController@download');
        Route::get('preview/{file_id}', 'FilesController@preview');
        
    }); 
    
});
