<?php

namespace App\Http\Controllers\Dev;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Core\User;
use Auth;
use Validator;
use File;

use DB;
use App\Schema\Config as SchemaConfig;
use App\Helpers\Core\SchemaHelper;


class DevController extends Controller
{
    /**
     * Create a new AdminController instance.
     *
     * @return void
     */
    public function __construct()
    {

    }
    
# ========================================================================#
#
#                            Testing
#    
# ========================================================================# 
 
    /**
    * Testing
    *
    * @access public        
    * @return void 
    */
    public function test(Request $request) {  
    //<editor-fold defaultstate="collapsed" desc="test"> 
        init_long_operation();
        $auth_user = auth()->user(); 
        DB::connection('main')->enableQueryLog();
            
        mdump(DB::connection('main')->getQueryLog(), 'getQueryLog()');        
    //</editor-fold>     
    }
  
    
# ========================================================================#
#
#                            Server info 
#    
# ========================================================================# 

    /**
    * Php info
    *
    * @access public       
    * @return void 
    */
    public function phpInfo() {  
    //<editor-fold defaultstate="collapsed" desc="phpInfo">     
        phpinfo();
    //</editor-fold>       
    }
 
    
# ========================================================================#
#
#                            Server time  
#    
# ========================================================================# 

    /**
    * Server time
    *
    * @access public       
    * @return void 
    */
    public function serverTime() { 
    //<editor-fold defaultstate="collapsed" desc="serverTime">     
        $time_stamp = date("Y-m-d H:i:s");
        echo $time_stamp." time zone: ".config('app.timezone')." miliseconds:".  strtotime($time_stamp)*1000;  
    //</editor-fold>      
    }
  
    
# ========================================================================#
#
#                            Session data 
#    
# ========================================================================# 

    /**
    * Session data
    *
    * @access public       
    * @return void 
    */
    public function session() { 
    //<editor-fold defaultstate="collapsed" desc="session">     
        mdump(session()->all());
    //</editor-fold>      
    }    
   
    
# ========================================================================#
#
#                            Current user data 
#    
# ========================================================================# 

    /**
    * Current user data
    *
    * @access public       
    * @return void 
    */
    public function userData() {
    //<editor-fold defaultstate="collapsed" desc="Current user data">     
        $auth_user = auth()->user();        
   
        dump(optional($auth_user)->toArray());
    //</editor-fold>     
    }
       
# ========================================================================#
#
#                           Switch user
#    
# ========================================================================#    

    /**
    * Switch user
    *
    * @access public    
    * @return void
    */
    public function switchUser() {
    //<editor-fold defaultstate="collapsed" desc="Switch user">    
        $user_id = null;
        $user = User::find($user_id);
        
        if (!empty($user)) {
            Auth::login($user);
           
            return redirect('/');
        }
        else{            
            mdump('',"No user with id:{$user_id}");
        }        
    //</editor-fold>      
    }
  
    
# ========================================================================#
#
#                           view logs 
#    
# ========================================================================#    
    
    /**
    * View logs
    *
    * @access public    
    * @return void
    */
    public function viewLogs(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="viewLogs">  
        $files = File::allFiles(base_path()."/storage/logs");
        asort($files);
        
        foreach ($files as $file)
        {
            $dateArray = preg_match("/(\d{4}-\d{2}-\d{2})/", $file, $match);
            $date = date('Y-m-d',strtotime($match[0]));
            $url = action('Dev\DevController@viewLogsByDate', ['date' => $date]);
            echo '<a href="'.$url.'">'.$url.'</a><br/>';
        }        
    //</editor-fold>      
    }  
    
    /**
    * View logs by date
    *
    * @access public    
    * @return void
    */
    public function viewLogsByDate(Request $request, $date) {
    //<editor-fold defaultstate="collapsed" desc="viewLogsByDate"> 
        $validator = Validator::make(['date' => $date],[
            'date' => 'required|date_format:Y-m-d',
                        
        ]);  
        
        if ($validator->fails()){
            die($validator->messages()->first());                  
        }
        
        try
        {
            $contents = File::get(base_path()."/storage/logs/laravel-".$date.".log");
        }
        catch (\Exception $exception)
        {
            die("The file doesn't exist");
        }
        
        header('Content-Type: text/plain; charset=utf-8');
        echo $contents;
    //</editor-fold>      
    }  
    
    /**
    * Schema
    *
    * @access public    
    * @return void
    */
    public function schema($action) {
    //<editor-fold defaultstate="collapsed" desc="schema">  
        $db = DB::connection('main');
        $config_schema = SchemaConfig::get();
        $platform = SchemaHelper::getPlatform($db);
        
        if ($action === 'create') {
                                              
            $create_sql = $config_schema->toSql($platform);
          
            dump($create_sql);

            foreach($create_sql as $key => $value){
                echo \App\Helpers\Misc\SqlFormatter::format($value.";");                
            }      
                       
        }
        else if ($action === 'diff') {
           
            $current_schema = SchemaHelper::getSchema($db);
            

            $create_sql = $config_schema->toSql($platform);
            $schema_diff = SchemaHelper::getDiff($current_schema, $config_schema);
            $diff_sql = $schema_diff->toSql($platform);
           
            dump($diff_sql);
            
            foreach($diff_sql as $key => $value){
                echo \App\Helpers\Misc\SqlFormatter::format($value.";");                
            }
        }
    //</editor-fold>      
    } 
    
}
