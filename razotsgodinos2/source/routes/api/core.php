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

Route::group(['prefix' => 'authorization', 'middleware' => 'guest'], function () {

    Route::post('login_with_email','AuthorizationController@loginWithEmail'); 
    Route::get('login_with_google','AuthorizationController@loginWithGoogle'); 
    Route::get('login_with_facebook','AuthorizationController@loginWithFacebook');
    Route::get('login_with_linkedin','AuthorizationController@loginWithLinkedin');
    Route::post('actions','AuthorizationController@actions');
    
});






