<?php

namespace App\Http\Controllers\Api\Administration\BlogEntries;
//ss
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Main\BlogCategory;
use App\Models\Main\BlogEntry;

use App\Logic\Core\ContentTranslations;
use App\Logic\Core\Langs;
use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use App\Logic\Main\Blog\BlogCategories; //

use App\Types\Main\ContentTranslations as ContentTranslationsTypes;

use DB;

class BlogCategoriesController extends Controller
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
        $query = DB::connection('main')->table('blog_categories as b');

        //columns
        $columns = [
            'b.id' => 'id',
            'b.created_at' => 'created_at',
            'b.updated_at' => 'updated_at',
            'b.position' => 'position',
        ];

        $langs = Langs::getAll();

        foreach($langs as $lang) {
            $columns[$lang.'.title'] = $lang.'_title';
        }

        ContentTranslations::leftJoin($query, $langs, 'b.id', ContentTranslationsTypes::blog_category->value);

        # ========================================================================#
        #
        #                           Formatters
        #
        # ========================================================================#

        $formatters = [];

        # ========================================================================#
        #
        #                           Filters
        #
        # ========================================================================#

        $filters = [];

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

        $actions = [

            'get' => [
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get">
                    $item = BlogCategory::find($request->id);

                    if (empty($item)) {
                        return Response::error("Blog Category with id {$request->id} doesn't exist!");
                    }

                    $langs = Langs::getAll();
                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::blog_category, $item->id);

                    return Response::success([
                        'item' => $item,
                        'translations' => $translations,
                    ]);
                //</editor-fold>
                },
            ],

            'create' => [
                'rules' => [
                  //Add rules  
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="create">
                    $item = new BlogCategory;
                    $tmp = BlogCategory::orderBy('position', 'desc')->first();

                    if (empty($tmp)) {
                        $position = 0;
                    }
                    else {
                        $position = $tmp->position;
                        $position++;
                    }

                    $item->position = $position;  

                    $item->save();

                    $langs = Langs::getAll();

                    foreach($langs as $lang) {
                        $content_translation = ContentTranslations::getContainer(ContentTranslationsTypes::blog_category, $item->id, $lang);
                        $content_translation->title = $request[$lang.'_title'];
                        $content_translation->save();
                    }
                    
                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::blog_category, $item->id);

                    return Response::success([
                        'msg' => 'Jauns ieraksts ir pievienots!',
                        'item' => $item,
                        'translations' => $translations,
                    ]);
                //</editor-fold>
                },
            ],

            'update' => [
                'rules' => [
                    'id' => 'required|integer',                    
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update">
                    $item = BlogCategory::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    $langs = Langs::getAll();

                    foreach($langs as $lang) {
                        $content_translation = ContentTranslations::getContainer(ContentTranslationsTypes::blog_category, $item->id, $lang);
                        $content_translation->title = $request[$lang.'_title'];                       
                        $content_translation->save();
                    }

                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::blog_category, $item->id);

                    return Response::success([
                        'msg' => 'Izmaiņas ir saglabātas!',
                        'item' => $item,
                        'translations' => $translations,
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
                    $item = BlogCategory::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }
                    
                    if (BlogEntry::where('category_id', $item->id)->exists()) {
                        return Response::error("Ieraksts tiek izmantots!");
                    }

                    ContentTranslations::delete(ContentTranslationsTypes::blog_category, $item->id);
                    BlogCategory::where('position', '>', $item->position)->decrement('position');
                    
                    $item->delete();

                    return Response::success([
                        'msg' => 'Item is deleted!',
                        'blogCategories' => BlogCategory::getOptions(),
                    ]);
                //</editor-fold>
                },
            ],
                        
            'reorder' => [
                'rules' => [
                    'ids' => 'required|string',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="reorder">
                    reorder($request->ids, BlogCategory::class);

                    return Response::success([
                        'msg' => 'Jaunās pozīcijas samainītas veiksmīgi',
                    ]);
                //</editor-fold>
                },
            ],

            'get_options' => [
                'rules' => [
                ],
                'action' => function($request) {
                    //<editor-fold defaultstate="collapsed" desc="get_options">
                    return Response::success([
                        'options' => BlogCategories::get('lv'),
                    ]);
                //</editor-fold>
                },
            ], 

        ];

        return Response::parse($request, $actions);
    //</editor-fold>
    }

}