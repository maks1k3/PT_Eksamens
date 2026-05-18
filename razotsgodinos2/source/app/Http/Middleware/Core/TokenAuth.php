<?php
namespace App\Http\Middleware\Core;

use Illuminate\Support\Arr;
use Closure;

use App\Logic\Core\Users;
use Auth;

class TokenAuth
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
        
        $auth_header = Arr::get($request->headers->all(), 'authorization', ['']);
        $auth_header = head($auth_header);
        $token = trim(ltrim($auth_header, 'Bearer '));
                
        if (empty($token)) {
            $passed = false;
        }
        else {
            $user = Users::getUserByToken($token);
                                    
            if (empty($user)) {
                $passed = false;
            }
            else {
                $passed = Auth::onceUsingId($user->id); 
            }
        }
        
        $auth_user = auth()->user();
        
        if (!empty($auth_user)) {
            $user->last_activity = date('Y-m-d H:i:s'); 
            $user->save();     
        }
        
        
        if(!$passed){
            return response('Unauthorized.', 401);
        }

        return $next($request);
    }
}