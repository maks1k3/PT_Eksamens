<?php

namespace App\Http\Middleware\Helpers;

use Illuminate\Routing\Middleware\ThrottleRequests;

class ApiRateLimit extends ThrottleRequests
{
   /**
     * Resolve request signature.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function resolveRequestSignature($request)
    {
       
        if (! $request->route()) { 
            throw new RuntimeException('Unable to generate fingerprint. Route unavailable.');
        }

        return sha1(

            implode('|', $request->route()->methods()).

            '|'.$request->route()->domain().

            '|'.$request->route()->uri().

            '|'.$request->session()->getId()

        );
    }
}
