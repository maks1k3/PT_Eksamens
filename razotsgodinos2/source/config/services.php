<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],
    
    'google_maps' => [
        'lang' => 'en',
        'key' => 'AIzaSyBHR_rBqvRa0zeCifKTyIn24g4g2vYiLuw',         
    ],
    
    'recaptcha' => [       
        'key' => '6LcpSmYUAAAAANgDzqvogAskCgWxx4DSVXo2i6kT', 
        'secret' => '6LcpSmYUAAAAAHS5AdERC-a7Fw26GrsA6heFwGnG',
    ],
    
//    'facebook' => [
//        'client_id' => "697960637070470",
//        'client_secret' => "b54dbd73d74d85be479d65f21ca4decc",
//        'redirect' =>  config('app.url')."/api/authorization/login_with_facebook",
//    ],
//    
//    'google' => [
//        'client_id' => "187758267223-r0d89aggvscd9ooju3sl44eg4pq96qaa.apps.googleusercontent.com",
//        'client_secret' => "EA9PmuiuNQhFkOjmAxa9hL3A",
//        'redirect' =>  config('app.url')."/api/authorization/login_with_google",
//    ],
//    'linkedin' => [
//        'client_id' => "78udg20hstrzk9",
//        'client_secret' => "F0slLIcWwx2JTZQN",
//        'redirect' =>  config('app.url')."/api/authorization/login_with_linkedin",
//    ],    

];
