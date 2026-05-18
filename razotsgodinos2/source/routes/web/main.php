<?php

Route::get('/', 'PublicPagesController@main');  



Route::group(['middleware' => 'check_lang'], function () {
    Route::get('{lang}', 'PublicPagesController@home');
    //Auth pages
//    Route::group(['middleware' => 'guest'],function () {
//        Route::get('{lang}/login', 'AuthPagesController@login');
//        Route::get('{lang}/registration', 'AuthPagesController@registration');
//        Route::get('{lang}/email_confirmation/{code}', 'AuthPagesController@emailConfirmation');
//        Route::get('{lang}/resend_email_confirmation', 'AuthPagesController@resendEmailConfirmation');
//        Route::get('{lang}/forgot_password', 'AuthPagesController@forgotPassword');
//        Route::get('{lang}/password_reset/{token}', 'AuthPagesController@passwordReset');
//        Route::get('{lang}/account_merge', 'AuthPagesController@accountMerge');
//    });    
    
    
    Route::get('{lang}/home', 'PublicPagesController@home');
    Route::get('{lang}/par-mums', 'PublicPagesController@about_us');
    Route::get('{lang}/buvnieciba', 'PublicPagesController@building');
    Route::get('{lang}/renovacija', 'PublicPagesController@renovation');
    Route::get('{lang}/cenu-kalkulators', 'PublicPagesController@priceCalculator');
    Route::get('{lang}/projekti', 'PublicPagesController@blog');
    Route::get('{lang}/kontakti', 'PublicPagesController@contacts');
    Route::get('{lang}/projekti/{blog_id}', 'PublicPagesController@blogEntry');
    Route::get('{lang}/privatumu-politika', 'PublicPagesController@privacyPolicy');
    Route::get('{lang}/tipveida-projekti', 'PublicPagesController@tipveidaBlog');
    



}); 
 
//Route::group(['middleware' => ['check_lang', 'auth']],function () {
//    Route::get('{lang}/profile', 'InternalPagesController@profile');
//});
