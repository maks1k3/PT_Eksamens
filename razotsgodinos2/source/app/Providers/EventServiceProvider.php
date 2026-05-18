<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
	Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        'App\Events\UserRegisteredEvent' => [
            'App\Listeners\UserRegisteredListener',
        ],
        'App\Events\UserBeforeLoginEvent' => [
            'App\Listeners\UserBeforeLoginListener',
        ],
        'App\Events\UserLoggedInEvent' => [
            'App\Listeners\UserLoggedInListener',
        ],
        'App\Events\UserBeforeLogoutEvent' => [
            'App\Listeners\UserBeforeLogoutEventListener',
        ],
        'App\Events\UserLoggedOutEvent' => [
            'App\Listeners\UserLoggedOutListener',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
