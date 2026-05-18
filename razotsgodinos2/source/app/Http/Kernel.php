<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    protected $middleware = [
        \App\Http\Middleware\TrustProxies::class,
        \App\Http\Middleware\CheckForMaintenanceMode::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            // \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \App\Http\Middleware\Core\SanitizeRequest::class,
            \App\Http\Middleware\Core\UserActive::class,
            \App\Http\Middleware\Helpers\ForceHttpsProtocol::class,
        ],
        
        'app' => [                        
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \App\Http\Middleware\Core\SanitizeRequest::class,   
            \App\Http\Middleware\Core\ApplicationToken::class,
            \App\Http\Middleware\Core\ApiLocale::class, 
            \App\Http\Middleware\Helpers\ForceHttpsProtocol::class
        ],        

//        'api' => [
//            'throttle:60,1',
//            'bindings',
//        ],
    ];

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'token_auth' => \App\Http\Middleware\Core\TokenAuth::class,
        'app_guest' => \App\Http\Middleware\Core\AppGuest::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        'is_dev' => \App\Http\Middleware\Dev\IsDev::class,
        'is_cms_admin' => \App\Http\Middleware\CMS\IsCMSAdmin::class,
        'is_in_group' => \App\Http\Middleware\Core\User\IsInGroup::class,
        'api_rate_limit' => \App\Http\Middleware\Helpers\ApiRateLimit::class,
        'check_lang' => \App\Http\Middleware\Helpers\CheckLang::class,
        'api_locale' => \App\Http\Middleware\Core\ApiLocale::class,
        'is_profile_completed' => \App\Http\Middleware\Main\IsProfileCompleted::class,
        
    ];

    /**
     * The priority-sorted list of middleware.
     *
     * This forces non-global middleware to always be in the given order.
     *
     * @var array
     */
    protected $middlewarePriority = [
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\Authenticate::class,
        \Illuminate\Routing\Middleware\ThrottleRequests::class,
        \Illuminate\Session\Middleware\AuthenticateSession::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        \Illuminate\Auth\Middleware\Authorize::class,
    ];
}
