import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Content from 'templates/administration/administration_example_3/page';

import BackendCode from 'common/docs/ui/backend_code';

const title = 'Administration example 3';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Administration with add form.',
	code: `
import Example from 'templates/administration/administration_example_3';

  `,
};

//<editor-fold defaultstate="collapsed" desc="backendCode">
let backendCode = `
//table

/*
|--------------------------------------------------------------------------
|                             administration_example3
|--------------------------------------------------------------------------|
*/
//<editor-fold defaultstate="collapsed" desc="administration_example3">
$table = $schema->createTable('administration_example3');
$table->addOption('comment','Administration example 3');
$table->addOption('collate','utf8_unicode_ci');//utf8mb4_unicode_ci
$table->addOption('engine','InnoDB');
$table->addOption('charset','utf8');//utf8mb4

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
$table->addColumn('created_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);

$table->addColumn('image_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'Image id']);
$table->addColumn('price', 'decimal', ['precision' => 10, 'scale' => 2, 'notnull' => true, 'default' => 0, 'comment' => 'Price']);
$table->addColumn('active', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Active']);
$table->addColumn('discount', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'Discount in %']);
$table->addColumn('address', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Address']);
$table->addColumn('content_type', 'string', ['length' => 10, 'notnull' => false, 'default' => null, 'comment' => 'image,video,note']);
$table->addColumn('date_time', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Datetime']);
$table->addColumn('date', 'date', [ 'notnull' => false, 'default' => null, 'comment' => 'Date']);
$table->addColumn('time', 'time', [ 'notnull' => false, 'default' => null, 'comment' => 'Time']);

$table->addIndex(['image_id'], 'idx_image_id');
$table->addIndex(['content_type'], 'idx_content_type');
$table->setPrimaryKey(['id']);
//</editor-fold>

//model

<?php

namespace App\\Models\\Example;

use Illuminate\\Database\\Eloquent\\Model;


class AdministrationExample3 extends Model
{
    /**
     * Database connection.
     *
     * @var string
     */
    protected $connection = 'main';


    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'administration_example3';


    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;


    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];


    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'active' => 'boolean',
    ];

}

//routes

Route::group(['prefix' => 'administration_example_3'], function (){

    Route::post('search', 'AdministrationExample3Controller@search');
    Route::post('actions', 'AdministrationExample3Controller@actions');

});

//controller

<?php

namespace App\\Http\\Controllers\\Api\\Administration;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;

use App\\Logic\\Core\\Response;
use App\\Logic\\Core\\DataSource;
use DB;
use App\\Models\\Example\\AdministrationExample3;
use App\\Logic\\Media\\Images;
use App\\Logic\\Core\\ContentTranslations;
use App\\Logic\\Core\\Langs;
use App\\Types\\Main\\ContentTranslations as ContentTranslationsTypes;
use App\\Types\\Main\\Images as ImagesTypes;
use App\\Helpers\\Core\\SearchHelper;

class AdministrationExample3Controller extends Controller
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
        $query = DB::connection('main')->table('administration_example3 as r');

        //columns
        $columns = [
            'r.id' => 'id',
            'r.created_at' => 'created_at',
            'r.updated_at' => 'updated_at',
            'r.price' => 'price',
            'r.active' => 'active',
            'r.discount' => 'discount',
            'r.address' => 'address',
            'r.content_type' => 'content_type',
            'r.date_time' => 'date_time',
            'r.date' => 'date',
            'r.time' => 'time',
            'r.image_id' => 'image',
            'i.file_name' => 'image_filename',
            'i.extension' => 'image_extension',
        ];

        $langs = Langs::getAll();

        foreach($langs as $lang) {
            $columns[$lang.'.title'] = $lang.'_title';
        }

        $query->leftJoin('images as i', 'i.id', '=', 'r.image_id');

        ContentTranslations::leftJoin($query, $langs, 'r.id', ContentTranslationsTypes::administration_example_3);

        # ========================================================================#
        #
        #                           Formatters
        #
        # ========================================================================#

        $formatters = [];

        $formatters['image'] = function($value, $row) {
           return Images::getThumbnailUrl(ImagesTypes::administration_example3_image, $row->image_filename, $row->image_extension);
        };

        # ========================================================================#
        #
        #                           Filters
        #
        # ========================================================================#

        $filters = [];

        $filters['id'] = function($query, $value) {
            $query->where('r.id', '=', $value);
        };

        $filters['price'] = function($query, $value) {
            $query->where('r.price', '=', $value);
        };

        $filters['discount'] = function($query, $value) {
            $query->where('r.discount', '=', $value);
        };

        $filters['active'] = function($query, $value) {
            $query->where('r.active', '=', $value);
        };

        $filters['date_from'] = function($query, $value) {
            $query->where('r.date', '>=', $value.' 00:00:00');
        };

        $filters['date_to'] = function($query, $value) {
            $query->where('r.date', '<=', $value.' 23:59:59');
        };

        $filters['select_content_type'] = function($query, $value) {
            $query->where('r.content_type', '=', $value);
        };

        $filters['select_address'] = function($query, $value) {
            $query->where('r.id', '=', $value);
        };

        $filters['with_image'] = function($query, $value) {

            if (intval($value) === 1) {
                $query->where('i.size', '>', 0);
            }
            else {
                $query->whereNull('i.size');
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

        $actions = [

            'get' => [
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get">
                    $item = AdministrationExample3::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    $image = Images::getImageById($item->image_id);

                    $langs = Langs::getAll();
                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::administration_example_3, $item->id);

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
                    'price' => 'present|numeric',
                    'active' => 'present|boolean',
                    'discount' => 'required|integer|between:1,99',
                    'address' => 'present|string',
                    'content_type' => 'required|in:image,video,note',
                    'date_time' => 'required|date_format:Y-m-d H:i:s',
                    'date' => 'required|date_format:Y-m-d',
                    'time' => 'required|date_format:H:i:s',
                    'image' => 'required|file|image'
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="create">
                    //images validation
                    $images = [];
                    $rules = [];

                    if (!empty($request->images)) {

                        if (is_array($request->images)) {
                            $nbr = count($request->images) - 1;

                            foreach(range(0, $nbr) as $index) {
                                $rules['images.' . $index] = 'required|file|image';
                            }

                            $images = $request->images;
                        }
                        else {
                            $rules['images'] = 'required|file|image';
                            $images[] = $request->images;
                        }

                        $validate = Response::validate($request->all(), $rules);
                        if ($validate) return $validate;
                    }

                    $item = new AdministrationExample3;

                    $item->price = (double)$request->price;
                    $item->active = $request->active;
                    $item->discount = $request->discount;
                    $item->address = $request->address;
                    $item->content_type = $request->content_type;
                    $item->date_time = $request->date_time;
                    $item->date = $request->date;
                    $item->time = $request->time;

                    $item->save();

                    $image = Images::createEmpty(ImagesTypes::administration_example3_image, $item->id);

                    $item->image_id = $image->id;
                    $item->save();

                    //preview image
                    Images::save($request->image->getRealPath(), $image);

                    //image gallery
                    foreach ($images as $image) {
                        Images::create($image->getRealPath(), ImagesTypes::administration_example3_images, $item->id);
                    }

                    $langs = Langs::getAll();

                    foreach($langs as $lang) {
                        $content_translation = ContentTranslations::getContainer(ContentTranslationsTypes::administration_example_3, $item->id, $lang);
                        $content_translation->title = $request[$lang.'_title'];
                        $content_translation->content = base64_decode($request[$lang.'_content']);
                        $content_translation->search_index = SearchHelper::getSearchIndex($content_translation->content);
                        $content_translation->save();
                    }

                    return Response::success([
                        'msg' => 'Item is created!',
                        'item' => $item,
                    ]);
                //</editor-fold>
                },
            ],

            'update' => [
                'rules' => [
                    'id' => 'required|integer',
                    'price' => 'present|numeric',
                    'active' => 'present|boolean',
                    'discount' => 'required|integer|between:1,99',
                    'address' => 'present|string',
                    'content_type' => 'required|in:image,video,note',
                    'date_time' => 'required|date_format:Y-m-d H:i:s',
                    'date' => 'required|date_format:Y-m-d',
                    'time' => 'required|date_format:H:i:s',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update">
                    $item = AdministrationExample3::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    $item->price = (double)$request->price;
                    $item->active = $request->active;
                    $item->discount = $request->discount;
                    $item->address = $request->address;
                    $item->content_type = $request->content_type;
                    $item->date_time = $request->date_time;
                    $item->date = $request->date;
                    $item->time = $request->time;

                    $item->save();

                    $langs = Langs::getAll();

                    foreach($langs as $lang) {
                        $content_translation = ContentTranslations::getContainer(ContentTranslationsTypes::administration_example_3, $item->id, $lang);
                        $content_translation->title = $request[$lang.'_title'];
                        $content_translation->content = base64_decode($request[$lang.'_content']);
                        $content_translation->search_index = SearchHelper::getSearchIndex($content_translation->content);
                        $content_translation->save();
                    }

                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::administration_example_3, $item->id);

                    return Response::success([
                        'msg' => 'Item is saved!',
                        'item' => AdministrationExample3::find($item->id),
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
                    $item = AdministrationExample3::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    ContentTranslations::delete(ContentTranslationsTypes::administration_example_3, $item->id);
                    Images::deleteImageById($item->image_id);
                    Images::deleteImages(ImagesTypes::administration_example3_images, $item->id);

                    $item->delete();

                    return Response::success([
                        'msg' => 'Item is deleted!',
                    ]);
                //</editor-fold>
                },
            ],

            'address_autocomplete' => [
                'rules' => [
                    'term' => 'present|string|min:2',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="address_autocomplete">
                    $query = DB::connection('main')->table('administration_example3 as r');

                    //columns
                    $columns = [
                        'r.id' => 'value',
                        'r.address' => 'label',
                    ];

                    foreach($columns as $column => $alias) {
                        $query->addSelect(DB::raw("{$column} as {$alias}"));
                    }

                    $term = $request->term;
                    $term = "%{$term}%";

                    $query->where('r.address', 'like', $term);

                    $data = $query->take(10)->get();

                    return Response::success([
                        'options' => $data,
                    ]);
                //</editor-fold>
                },
            ],

        ];

        return Response::parse($request, $actions);
    //</editor-fold>
    }

}
`;
//</editor-fold>

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Content />
			<div style={{ paddingTop: '20px' }}>
				<BackendCode code={backendCode} />
			</div>
		</ExampleHolder>
	);
};

export default Example;
