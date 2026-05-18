<?php

Route::get('/', 'AdministrationPagesController@main');
Route::get('{segment1}', 'AdministrationPagesController@main');
Route::get('{segment1}/{segment2}', 'AdministrationPagesController@main');
Route::get('{segment1}/{segment2}/{segment3}', 'AdministrationPagesController@main');
Route::get('{segment1}/{segment2}/{segment3}/{segment4}', 'AdministrationPagesController@main');
