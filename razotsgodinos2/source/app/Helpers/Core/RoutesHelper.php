<?php
namespace App\Helpers\Core;
use Illuminate\Support\Str;
use Route;
use Illuminate\Support\Arr;

class RoutesHelper
{

        
    /**
     * Get all routes
     *
     * @access public           
     * @return collection
    */
    public static function getAllRoutes() {
    //<editor-fold defaultstate="collapsed" desc="getAllRoutes"> 
        $result = collect([]);
        $routes = Route::getRoutes()->getRoutes();
        
        $id = 0;
        foreach ($routes as $route) {
            $id++;
            $item = [];
            
            $action = $route->action;
           
            $item['id'] = $id;
            $item['uri'] = Str::replaceFirst('api/', '', $route->uri);  
            $item['methods'] = $route->methods;
            $item['action'] = Arr::get($action, 'controller', '');
            $item['middleware'] = Arr::get($action, 'middleware', []);
            
            $result->push((object)$item);
        }
        
        $result = $result->sortBy('uri');
        
        return $result;
    //</editor-fold>
    }
    
    
}