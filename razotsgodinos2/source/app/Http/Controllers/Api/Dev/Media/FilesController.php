<?php

namespace App\Http\Controllers\Api\Dev\Media;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Helpers\Media\FileHelper;
use App\Logic\Core\DataSource;    
use DB;
use App\Logic\Media\Files;

class FilesController extends Controller
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
        $query = DB::connection('main')->table('files as r');
                
        //columns       
        $columns = [
            'r.id' => 'id',
            'r.created_at' => 'created_at',
            'r.updated_at' => 'updated_at',   
            'r.display_name' => 'display_name',      
            'r.container_id' => 'container_id',      
            'r.container_name' => 'container_name',
            'r.original_name' => 'original_name',
            'r.mime' => 'mime',          
            'r.extension' => 'extension',  
            'r.size' => 'size',  
            'r.position' => 'position',          
        ];

        # ========================================================================#
        #
        #                           Formatters
        #    
        # ========================================================================#    

        $formatters = [];

        $formatters['size'] = function($value, $row) {            
            return FileHelper::getReadableSize($value);
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
        
        $filters['container_id'] = function($query, $value) {
            $query->where('r.container_id', '=' , $value);
        };
        
        $filters['container_name'] = function($query, $value) {
            $query->where('r.container_name', '=' , $value);
        };
        
        $filters['extension'] = function($query, $value) {
            $query->where('r.extension', '=' , $value);
        };
        
        $filters['position'] = function($query, $value) {
            $query->where('r.position', '=' , $value);
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

            'get' => [        
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get"> 
                    $file = Files::getFileById($request->id);
                    
                    if (empty($file)) {
                        return Response::error("File with id {$request->id} doesn't exist!");                        
                    }

                    return Response::success([                        
                        'file' => $file,
                    ]);
                //</editor-fold>     
                },
            ],      

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    
    
    
}