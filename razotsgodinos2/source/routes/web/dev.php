<?php
    
# ========================================================================#
#
#                            DEV action links
#    
# ========================================================================# 

Route::group(['prefix' => 'dev'], function () {    
    
    Route::get('test', 'DevController@test');
    Route::get('php_info', 'DevController@phpInfo');
    Route::get('server_time', 'DevController@serverTime');
    Route::get('session', 'DevController@session');
    Route::get('user_data', 'DevController@userData');  
    Route::get('switch_user', 'DevController@switchUser'); 
    Route::get('logs', 'DevController@viewLogs');
    Route::get('logs/{date}', 'DevController@viewLogsByDate');
    Route::get('schema/{action}', 'DevController@schema');
    
});  

Route::group(['prefix' => 'dev_admin'], function () {    
    
    Route::get('/', 'DevAdminController@main');
    Route::get('{segment1}', 'DevAdminController@main');
    Route::get('{segment1}/{segment2}', 'DevAdminController@main');
    Route::get('{segment1}/{segment2}/{segment3}', 'DevAdminController@main');
    Route::get('{segment1}/{segment2}/{segment3}/{segment4}', 'DevAdminController@main');
    
}); 
   







    
    
