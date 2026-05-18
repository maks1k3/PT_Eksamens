<?php

namespace App\Http\Middleware\Core;

use Closure;
use Auth;

class UserActive
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
        
        if (Auth::check()) {            
            $user = Auth::user();
            $user->last_activity = date('Y-m-d H:i:s'); 
            $user->save();           
        }
        return $next($request);
    }
} 
