<?php

namespace App\Http\Controllers\Api\Dev;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;    
use DB;
use App\Helpers\Core\DateHelper;
use App\Helpers\Core\SearchHelper;
use App\Models\Core\Session;
use Jenssegers\Agent\Agent;
use App\Models\Core\User;

class SessionController extends Controller
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
        $query = DB::connection('main')->table('sessions as r');

        //columns       
        $columns = [
            'r.id' => 'id',
            'r.last_activity' => 'last_activity',
            'r.user_id' => 'user_id',
            'u.email' => 'user_name',
            'r.user_agent' => 'browser',
            'r.payload' => 'payload',
            'r.ip_address' => 'ip',
        ];

        $query->leftJoin('users as u','u.id', '=', 'r.user_id');

        # ========================================================================#
        #
        #                           Formatters
        #    
        # ========================================================================#    

        $formatters = [];

        $formatters['last_activity'] = function($value, $row) {            
           return DateHelper::getDateTime($value);
        };
        
        $formatters['browser'] = function($value, $row) {  
            $result = '';
            $agent = new Agent();
            $agent->setUserAgent($value);

            $browser = $agent->browser();
            $version = $agent->version($browser);        
            $result .= $browser.' '.$version; 

            $platform = $agent->platform();
            $version = $agent->version($platform);
            $result .= ' '.$platform.' '.$version;   
            
            return $result;
        };
        
        $formatters['payload'] = function($value, $row) {            
           return SearchHelper::getSearchIndex(base64_decode($value), false, 100);
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
            $query->where('r.ip_address', '=' ,$value);
        };
        
        $filters['user_id'] = function($query, $value) {
            $query->where('r.user_id', '=' ,$value);
        };

        //special filters
        $filters['date_from'] = function($query, $value) {
            $query->where('r.last_activity', '>=' , $value.' 00:00:00');
        };    

        $filters['date_to'] = function($query, $value) {
            $query->where('r.last_activity', '<=' , $value.' 23:59:59');
        }; 
        
        $filters['select_user'] = function($query, $value) {
            $query->where('r.user_id', '=', $value);
        };    

        $options = [
            'results_per_page' => 10,
            'order' => [
                'r.last_activity' => 'desc',                
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

            //get
            'get' => [        
                'rules' => [
                    'id' => 'required|string',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get"> 
                    $session = Session::find($request->id);
                    if (empty($session)) {
                        return Response::error("Session with id {$request->id} doesn't exist!");                        
                    }
                    
                    $result = $session->toArray();
                    
                    $agent = new Agent();
                    $agent->setUserAgent($session->user_agent);
                    
                    $result['email'] = optional(User::find($result['user_id']))->email;

                    $result['browser'] = $agent->browser();
                    $result['browser_version'] = $agent->version($agent->browser()); 
                    
                    $result['os'] = $agent->platform();
                    $result['os_version'] = $agent->version($agent->platform()); 

                    return Response::success([
                        'session' => $result,
                    ]);                   
                //</editor-fold>     
                },
            ],      
                        
            //delete
            'delete' => [        
                'rules' => [
                    'id' => 'required|string',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="delete"> 
                    $session = Session::find($request->id);
                    if (empty($session)) {
                        return Response::error("Session with id {$request->id} doesn't exist!");                        
                    }
                    
                    $session->delete();
                    
                    return Response::success([
                        'msg' => 'Session is deleted!',
                    ]);                    
                //</editor-fold>     
                },
            ],      

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }

}