<?php
namespace App\Http\Middleware\Main;

use Closure;

class IsProfileCompleted
{
    /**
     * Check if auth user completed his profile
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        
        $auth_user = auth()->user();
        
        if (!empty($auth_user)) {
            
            if (!$auth_user->profile->completed) {
                $lang = app()->getLocale();
                
                return redirect($lang.'/profile');
            }
        }

        return $next($request);
    }
}