<?php
    
# ========================================================================#
#
#                           Actions
#    
# ========================================================================#    

Route::group(['prefix' => 'actions'], function () {
    
    Route::post('ping','ActionsController@ping');  
    Route::post('echo','ActionsController@echoRequest');    
    Route::post('success','ActionsController@success');
    Route::post('error','ActionsController@error');
    Route::post('fail','ActionsController@fail');
});


# ========================================================================#
#
#                            Authorization 
#    
# ========================================================================# 

Route::group(['prefix' => 'authorization', 'middleware' => 'app_guest'], function () {

    Route::post('login_with_email','AuthorizationController@loginWithEmail'); 
         
    Route::post('actions','AuthorizationController@actions');
    
});






