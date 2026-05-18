<?php

Route::group(['middleware' => 'guest'], function () {   

    Route::get('login', 'AuthorizationPagesController@login')->name('login');
    Route::get('user_login', 'AuthorizationPagesController@userLogin');
    Route::get('login_with_google', 'AuthorizationPagesController@loginWithGoogle');
    Route::get('login_with_facebook', 'AuthorizationPagesController@loginWithFacebook');
    Route::get('login_with_linkedin', 'AuthorizationPagesController@loginWithLinkedin');

}); 

Route::get('admin', 'AuthorizationPagesController@admin');

//Route::group(['middleware' => 'auth'], function () {   
    Route::any('logout', 'AuthorizationPagesController@logout'); 
//});