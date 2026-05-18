<?php

namespace App\Http\Middleware\Core;

use Closure;

class SanitizeRequest
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
        
        $request->replace($this->sanitizeArrayRecursive($request->all()));        

        return $next($request);
    }
    
    protected function sanitizeArrayRecursive($input) {
        if (!is_array($input)) {
            return sanitize_string($input);
        }

        return array_map([$this, 'sanitizeArrayRecursive'], $input);
    }
}
