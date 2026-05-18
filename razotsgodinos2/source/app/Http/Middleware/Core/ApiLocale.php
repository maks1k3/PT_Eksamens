<?php
namespace App\Http\Middleware\Core;

use Illuminate\Support\Arr;
use Closure;
use App\Logic\Core\Langs;

class ApiLocale
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
        
        $locale = trim(head(Arr::get($request->headers->all(), 'locale', [''])));       
        $lang = Langs::getValidLang($locale);
        
        app()->setLocale($lang);

        return $next($request);
    }
}