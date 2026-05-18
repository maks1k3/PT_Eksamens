<?php
namespace App\Http\Middleware\Core;

use Illuminate\Support\Arr;
use Closure;


class AppGuest
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
        
        $passed = true;
                
        if (!empty(auth()->user())) {
            $passed = false;
        }
        
        $auth_header = Arr::get($request->headers->all(), 'authorization', ['']);
        $auth_header = head($auth_header);
        $token = trim(ltrim($auth_header, 'Bearer '));
                
        if (!empty($token)) {
            $passed = false;
        }
        
        if(!$passed){
            abort(404);
        }

        return $next($request);
    }
}