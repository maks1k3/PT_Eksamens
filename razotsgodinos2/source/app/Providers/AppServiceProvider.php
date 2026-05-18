<?php

namespace App\Providers;


use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Arr;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        
        $request = request();

        $check_header = Arr::get($request->headers->all(), 'remote-dev-server', ['']);
        $check_header = head($check_header);

        if ($check_header === 'yes') {
            putenv("APP_URL=http://remote-dev-server:8080");        
            config(['app.url' => 'http://remote-dev-server:8080']);
            app('url')->forceRootUrl(config('app.url'));  
        }        
        
        $this->app->bind('path.public', function() {
            return base_path('public_html');
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    
}
