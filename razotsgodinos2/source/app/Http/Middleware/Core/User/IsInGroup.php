<?php

namespace App\Http\Middleware\Core\User;

use Closure;

use App\Logic\Core\User\Groups;

class IsInGroup
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $group
     * @return mixed
     */
    public function handle($request, Closure $next, $group)
    {
        $auth_user = auth()->user();
        
        if (empty($auth_user)) {
            abort(404);
        }
        
        
        if(Groups::isIn($auth_user, $group)) {
            return $next($request);
        }
        
        abort(404);
    }
}
