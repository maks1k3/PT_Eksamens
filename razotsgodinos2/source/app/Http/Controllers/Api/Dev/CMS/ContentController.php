<?php

namespace App\Http\Controllers\Api\Dev\CMS;

use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

use App\Logic\Core\DataSource;    
use DB;
use App\Helpers\Core\SearchHelper;
use App\Logic\CMS\Content;
use App\Models\CMS\Content as ContentModel;
use App\Models\Core\Lang;
use App\Logic\CMS\Media;

class ContentController extends Controller
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
        $query = DB::connection('main')->table('content as r');
                
        //columns       
        $columns = [
            'r.id' => 'id',
            'r.created_at' => 'created_at',
            'r.updated_at' => 'updated_at',           
            'r.name' => 'name',
            'r.data' => 'data',
            'r.media' => 'media',           
        ];

        # ========================================================================#
        #
        #                           Formatters
        #    
        # ========================================================================#    

        $formatters = [];

        $formatters['data'] = function($value, $row) {            
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
        
        $filters['name'] = function($query, $value) {
            $query->where('r.name', '=' , $value);
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
                    $content = ContentModel::find($request->id);
                    
                    if (empty($content)) {
                        return Response::error("Content with id {$request->id} doesn't exist!");                        
                    }
                    
                    $langs = Lang::orderBy('position','asc')->get(['name'])->pluck('name')->toArray();
                    
                    $data = Content::get($langs, $content->name);
                                        
                    $media = null;
                    
                    if (!empty($data['media'])) {
                        $media = [
                            'images' => Arr::get($data, 'media.images', []),
                            'videos' => Arr::get($data, 'media.videos', []),
                            'files' => Arr::get($data, 'media.files', []),
                        ];
                        Media::getMedia($media);
                    }                              

                    return Response::success([
                        'content' => $data,
                        'langs' => $langs,
                        'media' => $media,
                    ]);
                //</editor-fold>     
                },
            ],                
                        
            'delete' => [        
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="delete"> 
                    $content = ContentModel::find($request->id);
                    
                    if (empty($content)) {
                        return Response::error("Content with id {$request->id} doesn't exist!");                        
                    }
                    
                    Content::delete($content);

                    return Response::success([                        
                        'msg' => 'Content is deleted!',
                    ]);  
                //</editor-fold>     
                },
            ],       

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    
    
    
}