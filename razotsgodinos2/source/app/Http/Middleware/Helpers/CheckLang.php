<?php
namespace App\Http\Middleware\Helpers;

use Closure;

use App\Logic\Core\Langs;
use App\Helpers\Core\UrlHelper;

class CheckLang
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
        $lang = $request->segment(1);
        app()->setLocale($lang);        
        
        if (!Langs::isValidLang($lang)) {            
            
            $default_lang = 'lv';
            app()->setLocale($default_lang);
            
            $full_url = $request->fullUrl();
            
            $parsed_url = UrlHelper::parse($full_url);
        
            $parsed_url = UrlHelper::replaceSegments($parsed_url, [0 => $default_lang]);

            $url = UrlHelper::build($parsed_url, ['scheme', 'host']);
            
            $url = ltrim($url, '/');
            
            return redirect($url);
        }
        
       
        return $next($request);
    }
}