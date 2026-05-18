<?php

namespace App\Http\Middleware\CMS;

use Closure;

use App\Logic\Core\Users;

class IsCMSAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $auth_user = auth()->user();               
        if (Users::isCMSAdmin($auth_user)) {
            return $next($request);
        }

        abort(404);
    }
}
