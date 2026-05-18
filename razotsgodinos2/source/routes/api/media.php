<?php
//s
Route::group(['prefix' => 'media'], function () {

    Route::post('images','ImagesController@actions');  
    Route::post('videos','VideosController@actions');
    Route::post('files','FilesController@actions');
    
});
