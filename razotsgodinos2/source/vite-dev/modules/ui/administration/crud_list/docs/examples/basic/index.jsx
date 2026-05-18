import React, { PureComponent as Component, Fragment } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CRUDList from 'ui/administration/crud_list';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import MaxWidth from 'ui/layout/max_width';

import BackendCode from 'common/docs/ui/backend_code';

const title = 'CRUDList: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CRUDList from 'ui/administration/crud_list';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import MaxWidth from 'ui/layout/max_width';

const name = 'crud_list_example_1';

const translations = {
	add: 'Add new book',
	edit: 'Edit book #',
};

const get = {
	action: 'administration_example/crud_list_example_1/actions',
	extraData: {
		action: 'get',
	},
};

const create = {
	action: 'administration_example/crud_list_example_1/actions',
	extraData: {
		action: 'create',
	},
};

const update = {
	action: 'administration_example/crud_list_example_1/actions',
	getExtraData: ({ item }) => {
		return {
			action: 'update',
			id: item.id,
		};
	},
};

const _delete = {
	action: 'administration_example/crud_list_example_1/actions',
	getExtraData: ({ item }) => {
		return {
			action: 'delete',
			id: item.id,
		};
	},
};

const reorder = {
	action: 'administration_example/crud_list_example_1/actions',
	getExtraData: ({ ids }) => {
		return {
			action: 'reorder',
			ids: ids.join(','),
		};
	},
};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	renderItem = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const { title } = item;
		return <div>{title}</div>;
		//</editor-fold>
	};

	renderAddForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderAddForm">
		return (
			<Fragment>
				<Field label="Title" name="title" component={Input} />
				<Field label="Author" name="author" component={Input} />
				<Field label="Description" name="description" component={TextArea} />
			</Fragment>
		);
		//</editor-fold>
	};

	renderEditForm = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="renderEditForm">
		const { title, author, description } = item;
		return (
			<Fragment>
				<Field label="Title" name="title" component={Input} value={title} />
				<Field label="Author" name="author" component={Input} value={author} />
				<Field
					label="Description"
					name="description"
					component={TextArea}
					value={description}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<MaxWidth>
				<CRUDList
					name={name}
					get={get}
					create={create}
					update={update}
					delete={_delete}
					reorder={reorder}
					renderItem={this.renderItem}
					renderAddForm={this.renderAddForm}
					renderEditForm={this.renderEditForm}
					translations={translations}
				/>
			</MaxWidth>
		);
	}
}
  `,
};

const name = 'crud_list_example_1';

const translations = {
	add: 'Add new book',
	edit: 'Edit book #',
};

const get = {
	action: 'administration_example/crud_list_example_1/actions',
	extraData: {
		action: 'get',
	},
};

const create = {
	action: 'administration_example/crud_list_example_1/actions',
	extraData: {
		action: 'create',
	},
};

const update = {
	action: 'administration_example/crud_list_example_1/actions',
	getExtraData: ({ item }) => {
		return {
			action: 'update',
			id: item.id,
		};
	},
};

const _delete = {
	action: 'administration_example/crud_list_example_1/actions',
	getExtraData: ({ item }) => {
		return {
			action: 'delete',
			id: item.id,
		};
	},
};

const reorder = {
	action: 'administration_example/crud_list_example_1/actions',
	getExtraData: ({ ids }) => {
		return {
			action: 'reorder',
			ids: ids.join(','),
		};
	},
};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	renderItem = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const { title } = item;
		return <div>{title}</div>;
		//</editor-fold>
	};

	renderAddForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderAddForm">
		return (
			<Fragment>
				<Field label="Title" name="title" component={Input} />
				<Field label="Author" name="author" component={Input} />
				<Field label="Description" name="description" component={TextArea} />
			</Fragment>
		);
		//</editor-fold>
	};

	renderEditForm = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="renderEditForm">
		const { title, author, description } = item;
		return (
			<Fragment>
				<Field label="Title" name="title" component={Input} value={title} />
				<Field label="Author" name="author" component={Input} value={author} />
				<Field
					label="Description"
					name="description"
					component={TextArea}
					value={description}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<MaxWidth>
				<CRUDList
					name={name}
					get={get}
					create={create}
					update={update}
					delete={_delete}
					reorder={reorder}
					renderItem={this.renderItem}
					renderAddForm={this.renderAddForm}
					renderEditForm={this.renderEditForm}
					translations={translations}
				/>
			</MaxWidth>
		);
	}
}

//<editor-fold defaultstate="collapsed" desc="backendCode">
let backendCode = `
//table

/*
|--------------------------------------------------------------------------
|                             crud_list_example1
|--------------------------------------------------------------------------|
*/
//<editor-fold defaultstate="collapsed" desc="crud_list_example1">
$table = $schema->createTable('crud_list_example1');
$table->addOption('comment','CRUDList example 1');
$table->addOption('collate','utf8_unicode_ci');//utf8mb4_unicode_ci
$table->addOption('engine','InnoDB');
$table->addOption('charset','utf8');//utf8mb4

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
$table->addColumn('created_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);

$table->addColumn('title', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Title']);
$table->addColumn('author', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Author']);
$table->addColumn('description', 'text', ['notnull' => false, 'default' => null, 'comment' => 'Description']);
$table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Item\'s position']);

$table->setPrimaryKey(['id']);
//</editor-fold>

//model

<?php

namespace App\\Models\\Example;

use Illuminate\\Database\\Eloquent\\Model;


class CRUDListExample1 extends Model
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
    protected $table = 'crud_list_example1';


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

Route::group(['prefix' => 'crud_list_example_1'], function (){

    Route::post('actions', 'CRUDListExample1Controller@actions');

});

//controller

<?php

namespace App\\Http\\Controllers\\Api\\Main\\AdministrationExample;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;

use App\\Logic\\Core\\Response;

use App\\Models\\Example\\CRUDListExample1;

class CRUDListExample1Controller extends Controller
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

                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get">
                    $items = CRUDListExample1::orderBy('position', 'asc')->get();

                    return Response::success([
                        'items' => $items,
                    ]);
                //</editor-fold>
                },
            ],

            'create' => [
                'rules' => [
                    'title' => 'present|string',
                    'author' => 'present|string',
                    'description' => 'present|string',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="create">
                    $item = new CRUDListExample1;

                    $item->title = $request->title;
                    $item->author = $request->author;
                    $item->description = $request->description;

                    $tmp = CRUDListExample1::orderBy('position', 'desc')->first();

                    if (empty($tmp)) {
                        $position = 0;
                    }
                    else {
                        $position = $tmp->position;
                        $position++;
                    }

                    $item->position = $position;

                    $item->save();

                    return Response::success([
                        'msg' => 'Item is created!',
                        'item' => CRUDListExample1::find($item->id),
                    ]);
                //</editor-fold>
                },
            ],

            'update' => [
                'rules' => [
                    'id' => 'required|integer',
                    'title' => 'present|string',
                    'author' => 'present|string',
                    'description' => 'present|string',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update">
                    $item = CRUDListExample1::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    $item->title = $request->title;
                    $item->author = $request->author;
                    $item->description = $request->description;

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
                    $item = CRUDListExample1::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    CRUDListExample1::where('position', '>', $item->position)->decrement('position');
                    $item->delete();

                    return Response::success([
                        'msg' => 'Item is deleted!',
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
                    reorder($request->ids, CRUDListExample1::class);

                    return Response::success([
                        'msg' => 'New order is saved!',
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
			<NewComponent />
			<div style={{ paddingTop: '20px' }}>
				<BackendCode code={backendCode} />
			</div>
		</ExampleHolder>
	);
};

export default Example;
