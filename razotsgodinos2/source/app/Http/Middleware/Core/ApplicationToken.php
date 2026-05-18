<?php
namespace App\Http\Middleware\Core;

use Illuminate\Support\Arr;
use Closure;

use App\Logic\Core\Users;

class ApplicationToken
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
        
        $token = trim(head(Arr::get($request->headers->all(), 'application-token', [''])));   
               
        if (empty($token) || !Users::isValidToken($token) || $token !== env('APP_TOKEN')) {
            $passed = false;
        }            
        
        if(!$passed){
            abort(404);
        }

        return $next($request);
    }
}