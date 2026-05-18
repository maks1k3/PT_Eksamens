<?php

namespace App\Http\Middleware\Helpers;

use Illuminate\Support\Arr;
use Closure;

class ForceHttpsProtocol {

    public function handle($request, Closure $next)
    {
        $check_header = Arr::get($request->headers->all(), 'remote-dev-server', ['']);
        $check_header = head($check_header);

        if ($check_header === 'yes') {
            return $next($request); 
        }        
        
        if (!$request->secure()) {
            return redirect()->secure($request->getRequestUri());
        }

        return $next($request); 
    }
}
