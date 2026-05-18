<?php

namespace App\Http\Controllers\Api\Dev;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;    
use DB;
use App\Helpers\Core\SearchHelper;
use File;
use App\Models\Core\Log;


class LogsController extends Controller
{
    /**
    * Constructor
    *
    * @return void
    */
    public function __construct()
    {


    }
    
    /**
    * Search
    *
    * @access public
    * @return json
    */
    public function search(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="search">    
        $auth_user = auth()->user();  

        //validation
        $rules = [
            'type' => 'required|in:error,debug,security',
        ];
        $validate = Response::validate($request->all(), $rules);
        if ($validate) return $validate;

        $query = DB::connection('main')->table('logs as r');
        
        //permanent filters
        $query->where('r.type', '=', $request->type);
        
        //columns       
        $columns = [
            'r.id' => 'id',
            'r.created_at' => 'created_at',
            'r.updated_at' => 'updated_at',           
            'r.user_id' => 'user_id',
            'r.user_name' => 'user_name',
            'r.event' => 'event',
            'r.time' => 'time',
            'r.ip' => 'ip',
            'r.browser' => 'browser',
            'r.device' => 'device',
            'r.operating_system' => 'operating_system',
            'r.description' => 'description',
        ];

        # ========================================================================#
        #
        #                           Formatters
        #    
        # ========================================================================#    

        $formatters = [];

        $formatters['description'] = function($value, $row) {            
           return SearchHelper::getSearchIndex($value, false, 100);
        };


        # ========================================================================#
        #
        #                           Filters
        #    
        # ========================================================================#  
        $filters = [];

        //override multi column search
        $filters['id'] = function($query, $value) {
            $query->where('r.id', '=' ,$value);
        };
        
        $filters['ip'] = function($query, $value) {
            $query->where('r.ip', '=' , $value);
        };
        
        $filters['event'] = function($query, $value) {
            $query->where('r.event', '=' , $value);
        };

        //special filters
        $filters['date_from'] = function($query, $value) {
            $query->where('r.time', '>=', $value.' 00:00:00');
        };    

        $filters['date_to'] = function($query, $value) {
            $query->where('r.time', '<=', $value.' 23:59:59');
        }; 
        
        $filters['select_user'] = function($query, $value) {
            $query->where('r.user_id', '=', $value);
        };    

        $options = [
            'results_per_page' => 10,
            'order' => [
                'r.id' => 'desc',                
            ]
        ];        

        $params = DataSource::parseRequest($request);
        $response = DataSource::get($params, $query, $columns, $filters, $formatters, $options);

        return Response::success($response);  
    //</editor-fold>
    }
    
    /**
    * Actions
    *
    * @access public
    * @return json 
    */
    public function actions(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="actions"> 
        $auth_user = auth()->user(); 

        $actions = [
            //get_laravel_logs
            'get_laravel_logs' => [        
                'rules' => [
                   
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get_laravel_logs"> 
                    $files = File::allFiles(storage_path('logs'));                   
                    arsort($files);
                    $files = array_values($files);
                    
                    $logs = collect($files)
                        ->filter(function($file) {
                            $dateArray = preg_match("/(\d{4}-\d{2}-\d{2})/", $file, $match);
                            
                            return isset($match[0]);
                        })                              
                        ->map(function($file) {
                        $dateArray = preg_match("/(\d{4}-\d{2}-\d{2})/", $file, $match);
                        $date = date('Y-m-d', strtotime($match[0]));
                        $url = action('Dev\DevController@viewLogsByDate', ['date' => $date]);

                        return [
                            'date' => $date,
                            'url' => $url,
                        ];                  
                    })->all();
                    
                    return Response::success([
                        'logs' => $logs,
                    ]);                    
                //</editor-fold>     
                },
            ], 
                        
            //get
            'get' => [        
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get"> 
                    $log = Log::find($request->id);
                    if (empty($log)) {
                        return Response::error("Log with id {$request->id} doesn't exist!");                        
                    }
                    
                    return Response::success([
                        'log' => $log,
                    ]);                    
                //</editor-fold>     
                },
            ], 
                        
            //delete
            'delete' => [        
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="delete"> 
                    $log = Log::find($request->id);
                    if (empty($log)) {
                        return Response::error("Log with id {$request->id} doesn't exist!");                        
                    }
                    
                    $log->delete();
                    
                    return Response::success([
                        'msg' => 'Log is deleted!',
                    ]);                     
                //</editor-fold>     
                },
            ],       
                        
            //clear_logs
            'clear_logs' => [        
                'rules' => [
                    'type' => 'required|in:error,debug,security',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="clear_logs"> 
                     Log::whereType($request->type)->delete();
                    
                    return Response::success([
                        'msg' => 'Logs are cleared!',
                    ]);                     
                //</editor-fold>     
                },
            ],                   

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }
}