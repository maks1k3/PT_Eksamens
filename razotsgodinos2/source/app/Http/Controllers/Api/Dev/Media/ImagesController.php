<?php

namespace App\Http\Controllers\Api\Dev\Media;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Media\Images;
use App\Helpers\Media\FileHelper;
use App\Logic\Core\DataSource;    
use DB;

class ImagesController extends Controller
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
        $query = DB::connection('main')->table('images as r');
                
        //columns       
        $columns = [
            'r.id' => 'id',
            'r.created_at' => 'created_at',
            'r.updated_at' => 'updated_at',   
            'r.file_name' => 'thumbnail',      
            'r.container_id' => 'container_id',      
            'r.container_name' => 'container_name',           
            'r.width' => 'width',          
            'r.height' => 'height',          
            'r.mime' => 'mime',          
            'r.extension' => 'extension',          
            'r.size' => 'size',          
            'r.resized' => 'resized',          
            'r.position' => 'position',          
        ];

        # ========================================================================#
        #
        #                           Formatters
        #    
        # ========================================================================#    

        $formatters = [];

        $formatters['thumbnail'] = function($value, $row) {            
            return Images::getThumbnailUrl($row->container_name, $row->thumbnail, $row->extension);
        };
        
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
        
        $filters['width'] = function($query, $value) {
            $query->where('r.width', '=' , $value);
        };
        
        $filters['height'] = function($query, $value) {
            $query->where('r.height', '=' , $value);
        };
        
        $filters['extension'] = function($query, $value) {
            $query->where('r.extension', '=' , $value);
        };
        
        $filters['position'] = function($query, $value) {
            $query->where('r.position', '=' , $value);
        };
        
        //special filters        
        
        $filters['select_resized'] = function($query, $value) {
            $query->where('r.resized', '=' , $value);
        };        
        
        $filters['with_image'] = function($query, $value) {

            if (intval($value) === 1) {
                $query->where('r.size', '>', 0);
            }
            else {
                $query->whereNull('r.size');
            }

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
                    $image = Images::getImageById($request->id);
                    
                    if (empty($image)) {
                        return Response::error("Image with id {$request->id} doesn't exist!");                        
                    }

                    return Response::success([                        
                        'image' => $image,
                    ]);
                //</editor-fold>     
                },
            ],      

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    
    
    
}