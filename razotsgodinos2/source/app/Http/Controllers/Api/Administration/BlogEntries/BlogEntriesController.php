<?php

namespace App\Http\Controllers\Api\Administration\BlogEntries;
//s
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Media\Video;
use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use DB;
use App\Models\Main\BlogEntry;
use App\Models\Main\BlogCategory;
use App\Logic\Media\Images;
use App\Logic\Core\ContentTranslations;
use App\Logic\Core\Langs;
use App\Types\Main\ContentTranslations as ContentTranslationsTypes;
use App\Types\Main\Images as ImagesTypes;

class BlogEntriesController extends Controller
{
    /**
    * Constructor
    *
    * @return void
    */
    public function __construct()
    {


    }
    
    public function videos()
{
    return $this->hasMany(Video::class, 'container_id')
        ->where('container_name', 'blog_entry')
        ->orderBy('position');
}

    /**
    * Search
    *
    * @access public
    * @return json
    */
    public function search(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="search">
        $query = DB::connection('main')->table('blog_entries as b');

        //columns
        $columns = [
            'b.id' => 'id',
            'b.created_at' => 'created_at',
            'b.updated_at' => 'updated_at',
            'blog_entry_lv.title' => 'blog_entry_name',
            'b.active' => 'active',
            'b.pinned' => 'pinned',
            'b.tip_projects' => 'tip_projects',
            'b.image_id' => 'image',
            'b.categories' => 'categories',
        ];

        ContentTranslations::leftJoin($query, ['lv'], 'b.id', ContentTranslationsTypes::blog_entry->value, 'blog_entry_');

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
                    $item = BlogEntry::find($request->id);

                    if (empty($item)) {
                        return Response::error("BlogEntry with id {$request->id} doesn't exist!");
                    }

                    $image = Images::getImageById($item->image_id);

                    $langs = Langs::getAll();
                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::blog_entry, $item->id);

                    return Response::success([
                        'item' => $item,
                        'image' => $image,
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
                    //s
                    $item = new BlogEntry;
                    
                    $tmp = BlogEntry::orderBy('position', 'desc')->first();
                    if (empty($tmp)) {
                        $position = 0;
                    }
                    else {
                        $position = $tmp->position;
                        $position++;
                    }
                    
                    $categories_ids = explode(',', $request->categories);
                    $categories_ids = array_map('intval', $categories_ids);
                    $categories = BlogCategory::whereIn('id', $categories_ids)->get();
                    $categories_ids = $categories->pluck('id')->all();
                    
                    $item->categories = $categories_ids;                     
                    $item->position = $position;  
                    $item->active = $request->active;
                    $item->pinned = $request->pinned;
                    $item->tip_projects = (int) $request->input('tip_projects', 0);

                    
                    $item->save();

                    $image = Images::createEmpty(ImagesTypes::single_image_optimized->value, $item->id);
                    $item->image_id = $image->id; 
                    $image->save();
                    $item->save();

                    $langs = Langs::getAll();

                    foreach($langs as $lang) {
                        $content_translation = ContentTranslations::getContainer(ContentTranslationsTypes::blog_entry, $item->id, $lang);
                        $content_translation->title = $request[$lang.'_title'];
                        $content_translation->data = [
                            'content' => base64_decode($request[$lang.'_content']),
                            'meta_title' => $request[$lang.'_meta_title'],
                            'meta_description' => $request[$lang.'_meta_description'],
                            'price' => $request[$lang.'_price'],
                            'size' => $request[$lang.'_size'],
                            'info' => base64_decode($request[$lang.'_info']),
                        ];
                        $content_translation->save();
                    }
                    
                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::blog_entry, $item->id);

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
                    //sd
                    $item = BlogEntry::find($request->id);

                    if (empty($item)) {
                        return Response::error("BlogEntry with id {$request->id} doesn't exist!");
                    }    
                    $categories_ids = explode(',', $request->categories);
                    $categories_ids = array_map('intval', $categories_ids);
                    $categories = BlogCategory::whereIn('id', $categories_ids)->get();
                    $categories_ids = $categories->pluck('id')->all();
                    
                    $item->categories = $categories_ids;                
                    $item->active = $request->active;
                    $item->pinned = $request->pinned;
                    $item->tip_projects = (int) $request->input('tip_projects', 0);

                    
                    $item->save();

                    $langs = Langs::getAll();

                    foreach($langs as $lang) {
                        $content_translation = ContentTranslations::getContainer(ContentTranslationsTypes::blog_entry, $item->id, $lang);
                        $content_translation->title = $request[$lang.'_title'];
                        $content_translation->data = [
                            'content' => base64_decode($request[$lang.'_content']),
                            'meta_title' => $request[$lang.'_meta_title'],
                            'meta_description' => $request[$lang.'_meta_description'],
                            'price' => $request[$lang.'_price'],
                            'size' => $request[$lang.'_size'],
                            'info' => base64_decode($request[$lang.'_info']),
                        ];
                        $content_translation->save();
                    }

                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::blog_entry, $item->id);

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
                    $item = BlogEntry::find($request->id);

                    if (empty($item)) {
                        return Response::error("BlogEntry with id {$request->id} doesn't exist!");
                    }

                    ContentTranslations::delete(ContentTranslationsTypes::blog_entry, $item->id);
                    
                    Images::deleteImageById($item->image_id);
                    Images::deleteImages(ImagesTypes::blog_entry_gallery_, $item->id);
                    
                    BlogEntry::where('position', '>', $item->position)->decrement('position');
                    
                    $item->delete();

                    return Response::success([
                        'msg' => 'Blogs ir izdzēsts veiksmīgi!',
                    ]);
                //</editor-fold>
                },
            ],

        ];

        return Response::parse($request, $actions);
    //</editor-fold>
    }
//qs
}