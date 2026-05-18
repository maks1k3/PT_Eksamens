<?php
namespace App\Logic\Core;

use App\Models\Core\Log as LogModel;
use Jenssegers\Agent\Agent;

use App\Helpers\Core\DateHelper;

class Log
{

        
    /**
     * Save error log
     *
     * @access public           
     * @param  string $event - log event name
     * @param  array  $description - log details     
     * @param  bool   $trace - add stack trace to this log 
     * @return void
    */
    public static function error($event, $description = [], $trace = true) {
    //<editor-fold defaultstate="collapsed" desc="error"> 
        self::save('error', $event, $description, $trace);
    //</editor-fold>
    }
    
    /**
     * Save debug log
     *
     * @access public           
     * @param  string $event - log event name
     * @param  array  $description - log details     
     * @param  bool   $trace - add stack trace to this log 
     * @return void
    */
    public static function debug($event, $description = [], $trace = false) {
    //<editor-fold defaultstate="collapsed" desc="debug"> 
        self::save('debug', $event, $description, $trace);
    //</editor-fold>
    }
    
    /**
     * Save security log
     *
     * @access public           
     * @param  string $event - log event name
     * @param  array  $description - log details     
     * @param  bool   $trace - add stack trace to this log 
     * @return void
    */
    public static function security($event, $description = [], $trace = false) {
    //<editor-fold defaultstate="collapsed" desc="security"> 
        self::save('security', $event, $description, $trace);
    //</editor-fold>
    }
    
    
     /**
     * Save security log
     *
     * @access public           
     * @param  string $type - log type
     * @param  string $event - log event name
     * @param  array  $description - log details     
     * @param  bool   $trace - add stack trace to this log 
     * @return void
    */
    private static function save($type, $event, $description = [], $trace = false) {
    //<editor-fold defaultstate="collapsed" desc="save"> 
        
        $log = new LogModel;
        $log->type = $type;
        
        if ($trace) {
             $stack_trace_limit = 10;
        
            //save stack trace
            if (!isset($description['stack_trace'])) {
                
                $debug_backtrace = debug_backtrace();
                $parsed_backtrace = [];
                $counter = 0;
                
                foreach ($debug_backtrace as $backtrace) {
                    if (isset($backtrace['file']) && isset($backtrace['line'])) {
                        if ($counter >= $stack_trace_limit) {
                            break;
                        }

                        $parsed_backtrace[] = [
                            'file' => $backtrace['file'],
                            'line' => $backtrace['line'],
                        ];
                        $counter++;
                    }
                }

                $description['stack_trace'] = $parsed_backtrace;
            }
        }
        
       
        
        $user = auth()->user();
        
        if ($user != null) {
            $log->user_id = $user->id;
            $log->user_name = $user->email;
        }
        
        $log->event = $event;
        $log->time = DateHelper::getDateTime();
        $log->ip = request()->ip();
        
        $agent = new Agent();
        $log->device = ($agent->isMobile() ? ($agent->isTablet() ? 'tablet' : 'phone') : 'computer');
        
        $browser = $agent->browser();
        $version = $agent->version($browser);        
        $log->browser = $browser.' '.$version;  
        
        $platform = $agent->platform();
        $version = $agent->version($platform);
        $log->operating_system = $platform.' '.$version;   
        
        $log->user_agent = request()->header('User-Agent');
        $log->description = $description;
        
        $log->save();
    //</editor-fold>
    }
    
}