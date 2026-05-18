<?php

namespace App\Http\Middleware\Dev;

use Closure;

class IsDev
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
        if(!env("DEV_TOOLS")){
            abort(404);
        }
        
        if (in_array($request->ip(), config('configuration.dev_ip_addresses'))) {
            return $next($request);
        }

//        return redirect('/');
        abort(404);
    }
}
