import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Content from 'templates/administration/administration_example_2/page';

import BackendCode from 'common/docs/ui/backend_code';

const title = 'Administration example 2';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Administration with add form.',
	code: `
import Example from 'templates/administration/administration_example_2';

  `,
};

//<editor-fold defaultstate="collapsed" desc="backendCode">
let backendCode = `
//table

/*
|--------------------------------------------------------------------------
|                             administration_example2
|--------------------------------------------------------------------------|
*/
//<editor-fold defaultstate="collapsed" desc="administration_example2">
$table = $schema->createTable('administration_example2');
$table->addOption('comment','Administration example 2');
$table->addOption('collate','utf8_unicode_ci');//utf8mb4_unicode_ci
$table->addOption('engine','InnoDB');
$table->addOption('charset','utf8');//utf8mb4

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
$table->addColumn('created_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);

$table->addColumn('name', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Name']);
$table->addColumn('surname', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Surname']);
$table->addColumn('city', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'City']);

$table->setPrimaryKey(['id']);
//</editor-fold>

//model

<?php

namespace App\\Models\\Example;

use Illuminate\\Database\\Eloquent\\Model;


class AdministrationExample2 extends Model
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
    protected $table = 'administration_example2';


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
    ];

}

//routes

Route::group(['prefix' => 'administration_example_2'], function (){

    Route::post('search', 'AdministrationExample2Controller@search');
    Route::post('actions', 'AdministrationExample2Controller@actions');

});

//controller

<?php

namespace App\\Http\\Controllers\\Api\\Administration;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;

use App\\Logic\\Core\\Response;
use App\\Logic\\Core\\DataSource;
use DB;
use App\\Models\\Example\\AdministrationExample2;
use App\\Helpers\\Core\\FormatHelper;

class AdministrationExample2Controller extends Controller
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
        $query = DB::connection('main')->table('administration_example2 as r');

        //columns
        $columns = [
            'r.id' => 'id',
            'r.created_at' => 'created_at',
            'r.updated_at' => 'updated_at',
            'r.name' => 'name',
            'r.surname' => 'surname',
            'r.city' => 'city',
            'r.distance' => 'distance',
        ];

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

        $filters['id'] = function($query, $value) {
            $query->where('r.id', '=', $value);
        };

        $filters['date_from'] = function($query, $value) {
            $query->where('r.created_at', '>=', $value.' 00:00:00');
        };

        $filters['date_to'] = function($query, $value) {
            $query->where('r.created_at', '<=', $value.' 23:59:59');
        };

        $options = [
            'results_per_page' => 10,
            'order' => [
                'r.id' => 'desc',
            ]
        ];

        $params = DataSource::parseRequest($request);
        $response = DataSource::get($params, $query, $columns, $filters, $formatters, $options);

        $response['summary'] = [
            'distance' => FormatHelper::money($query->sum('r.distance'), 2),
        ];

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
                    $item = AdministrationExample2::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    return Response::success([
                        'item' => $item,
                    ]);
                //</editor-fold>
                },
            ],

            'create' => [
                'rules' => [
                    'name' => 'present|string',
                    'surname' => 'present|string',
                    'city' => 'present|string',
                    'distance' => 'present|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="create">
                    $item = new AdministrationExample2;

                    $item->name = $request->name;
                    $item->surname = $request->surname;
                    $item->city = $request->city;
                    $item->distance = $request->distance;

                    $item->save();

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
                    'name' => 'present|string',
                    'surname' => 'present|string',
                    'city' => 'present|string',
                    'distance' => 'present|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update">
                    $item = AdministrationExample2::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    $item->name = $request->name;
                    $item->surname = $request->surname;
                    $item->city = $request->city;
                    $item->distance = $request->distance;

                    $item->save();

                    return Response::success([
                        'msg' => 'Item is saved!',
                        'item' => $item,
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
                    $item = AdministrationExample2::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    $item->delete();

                    return Response::success([
                        'msg' => 'Item is deleted!',
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
