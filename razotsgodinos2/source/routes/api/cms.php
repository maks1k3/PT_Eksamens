<?php

Route::group(['prefix' => 'cms'], function () {

    Route::group(['prefix' => 'administration', 'middleware' => 'is_cms_admin', 'namespace' => 'Administration'], function () {
        
        Route::post('content', 'ContentController@actions');
        Route::post('collection', 'CollectionsController@actions'); 
        Route::post('collection_item', 'CollectionItemController@actions');
               
        Route::post('settings', 'SettingsController@actions');
        

    });
    
    Route::post('content', 'ContentController@actions');
    Route::post('collection', 'CollectionsController@actions');
    Route::post('collection_item', 'CollectionItemController@actions');
    
});
