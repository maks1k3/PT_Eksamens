import React, { PureComponent as Component, Fragment } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CRUDList from 'ui/administration/crud_list';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import Icon from 'ui/misc/icon';
import Tabs from 'ui/controls/tabs';
import InfoTable from 'ui/tables/info_table';
import Button from 'ui/controls/button';
import MaxWidth from 'ui/layout/max_width';

import BackendCode from 'common/docs/ui/backend_code';

const title = 'CRUDList: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CRUDList from 'ui/administration/crud_list';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import Icon from 'ui/misc/icon';
import Tabs from 'ui/controls/tabs';
import InfoTable from 'ui/tables/info_table';
import Button from 'ui/controls/button';
import MaxWidth from 'ui/layout/max_width';

const name = 'crud_list_example_2';

const translations = {
	add: 'Add new game',
	edit: 'Edit game #',
};

const get = {
	action: 'administration_example/crud_list_example_2/actions',
	extraData: {
		action: 'get',
	},
	parseResponse: response => {
		return response;
	},
};

const create = {
	action: 'administration_example/crud_list_example_2/actions',
	extraData: {
		action: 'create',
	},
	parseResponse: response => {
		return response;
	},
	onBeforeSubmit: ({ data, Form }) => {
		data.extra = 'extra';
	},
};

const update = {
	action: 'administration_example/crud_list_example_2/actions',
	getExtraData: ({ item }) => {
		return {
			action: 'update',
			id: item.id,
		};
	},
	parseResponse: response => {
		return response;
	},
	onBeforeSubmit: ({ data, Form }) => {
		data.extra = 'extra';
	},
};

const _delete = {
	action: 'administration_example/crud_list_example_2/actions',
	getExtraData: ({ item }) => {
		return {
			action: 'delete',
			id: item.id,
		};
	},
};

const reorder = {
	action: 'administration_example/crud_list_example_2/actions',
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

	onToggleClick = ({ item, CRUDList }) => {
		//<editor-fold defaultstate="collapsed" desc="onToggleClick">

		uiStore.set(\`crud_list_example_2.items.\${item.id}.active\`, !item.active);

		remoteRequest({
			url: 'administration_example/crud_list_example_2/actions',
			data: {
				action: 'toggle_active',
				id: item.id,
				active: _.toInteger(!item.active),
			},
			onSuccess: () => {
				if (!uiStore.get('crud_list_example_2.mounted', false)) {
					return;
				}

				CRUDList.onChange();
			},
		});
		//</editor-fold>
	};

	renderEditPopup = ({ item, currentTab, uiTranslations, CRUDList }) => {
		//<editor-fold defaultstate="collapsed" desc="renderEditPopup">
		const items = [];

		items.push({
			name: 'view',
			icon: {
				provider: 'icomoon',
				name: 'file-text',
			},
			title: _.get(uiTranslations, 'view', 'View'),
			content: CRUDList.renderView(item),
		});

		items.push({
			name: 'edit',
			icon: {
				provider: 'icomoon',
				name: 'pencil',
			},
			title: _.get(uiTranslations, 'edit', 'Edit'),
			content: CRUDList.renderEdit(item),
		});

		items.push({
			name: 'extra',
			icon: {
				provider: 'icomoon',
				name: 'power3',
			},
			title: 'Extra tab',
			content: <div>This is extra tab</div>,
		});

		return <Tabs items={items} lazyLoad={true} current={currentTab} />;
		//</editor-fold>
	};

	renderItem = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const { title, author } = item;
		return (
			<div style={{ height: '100px', background: '#82e212' }}>
				title:{title}, author:{author}
			</div>
		);
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
					addNewItemsTo="end" //start,end
					autoCreate={true}
					onChange={({ items, CRUDList }) => {
						console.log('onChange:', { items, CRUDList });
					}}
					onCreate={({ item, CRUDList }) => {
						console.log('onCreate:', { item, CRUDList });
					}}
					onUpdate={({ item, CRUDList }) => {
						console.log('onUpdate:', { item, CRUDList });
					}}
					onDelete={({ item, CRUDList }) => {
						console.log('onDelete:', { item, CRUDList });
					}}
					onSortEnd={({ ids, CRUDList }) => {
						console.log('onSortEnd:', { ids, CRUDList });
					}}
					showAdd={true}
					showEdit={true}
					showDelete={true}
					showView={true}
					sortable={true}
					idKey="id"
					get={get}
					create={create}
					update={update}
					delete={_delete}
					reorder={reorder}
					renderAddButton={({ translations, autoCreate, CRUDList }) => {
						const title = _.get(translations, 'add', 'Add new item');
						const icon = {
							provider: 'icomoon',
							name: 'plus-circle2',
						};

						let content;

						if (autoCreate) {
							content = CRUDList.renderAutoCreateForm(title, icon);
						} else {
							content = (
								<Button
									title={title}
									icon={icon}
									onClick={CRUDList.onAddNewClick}
								/>
							);
						}

						return <div className="margin-bottom">{content}</div>;
					}}
					renderItem={this.renderItem}
					renderAddForm={this.renderAddForm}
					renderEditForm={this.renderEditForm}
					renderView={({ item, CRUDList }) => {
						return <InfoTable rows={item} />;
					}}
					renderRight={({
						classNames,
						id,
						item,
						onViewClick,
						onEditClick,
						onDeleteClick,
						CRUDList,
					}) => {
						const { active } = item;

						return (
							<Fragment>
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="file-text"
									onClick={onViewClick}
								/>
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="pencil"
									onClick={onEditClick}
								/>
								<Icon
									className={classNames['icon']}
									provider="fa"
									name={active ? 'eye' : 'eye-slash'}
									onClick={() => {
										this.onToggleClick({ item, CRUDList });
									}}
								/>
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="trash"
									onClick={onDeleteClick}
								/>
							</Fragment>
						);
					}}
					renderEditPopup={this.renderEditPopup}
					addFormProps={{
						submit: {
							title: 'Custom add title',
						},
					}}
					updateFormProps={{
						submit: {
							title: 'Custom update title',
						},
					}}
					popupSettings={{
						level: 5,
						maxWidth: '1024px',
						hideOnOverlayClick: true,
					}}
					translations={translations}
				/>
			</MaxWidth>
		);
	}
}
  `,
};

const name = 'crud_list_example_2';

const translations = {
	add: 'Add new game',
	edit: 'Edit game #',
};

const get = {
	action: 'administration_example/crud_list_example_2/actions',
	extraData: {
		action: 'get',
	},
	parseResponse: response => {
		return response;
	},
};

const create = {
	action: 'administration_example/crud_list_example_2/actions',
	extraData: {
		action: 'create',
	},
	parseResponse: response => {
		return response;
	},
	onBeforeSubmit: ({ data, Form }) => {
		data.extra = 'extra';
	},
};

const update = {
	action: 'administration_example/crud_list_example_2/actions',
	getExtraData: ({ item }) => {
		return {
			action: 'update',
			id: item.id,
		};
	},
	parseResponse: response => {
		return response;
	},
	onBeforeSubmit: ({ data, Form }) => {
		data.extra = 'extra';
	},
};

const _delete = {
	action: 'administration_example/crud_list_example_2/actions',
	getExtraData: ({ item }) => {
		return {
			action: 'delete',
			id: item.id,
		};
	},
};

const reorder = {
	action: 'administration_example/crud_list_example_2/actions',
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

	onToggleClick = ({ item, CRUDList }) => {
		//<editor-fold defaultstate="collapsed" desc="onToggleClick">

		uiStore.set(`crud_list_example_2.items.${item.id}.active`, !item.active);

		remoteRequest({
			url: 'administration_example/crud_list_example_2/actions',
			data: {
				action: 'toggle_active',
				id: item.id,
				active: _.toInteger(!item.active),
			},
			onSuccess: () => {
				if (!uiStore.get('crud_list_example_2.mounted', false)) {
					return;
				}

				CRUDList.onChange();
			},
		});
		//</editor-fold>
	};

	renderEditPopup = ({ item, currentTab, uiTranslations, CRUDList }) => {
		//<editor-fold defaultstate="collapsed" desc="renderEditPopup">
		const items = [];

		items.push({
			name: 'view',
			icon: {
				provider: 'icomoon',
				name: 'file-text',
			},
			title: _.get(uiTranslations, 'view', 'View'),
			content: CRUDList.renderView(item),
		});

		items.push({
			name: 'edit',
			icon: {
				provider: 'icomoon',
				name: 'pencil',
			},
			title: _.get(uiTranslations, 'edit', 'Edit'),
			content: CRUDList.renderEdit(item),
		});

		items.push({
			name: 'extra',
			icon: {
				provider: 'icomoon',
				name: 'power3',
			},
			title: 'Extra tab',
			content: <div>This is extra tab</div>,
		});

		return <Tabs items={items} lazyLoad={true} current={currentTab} />;
		//</editor-fold>
	};

	renderItem = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const { title, author } = item;
		return (
			<div style={{ height: '100px', background: '#82e212' }}>
				title:{title}, author:{author}
			</div>
		);
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
					addNewItemsTo="end" //start,end
					autoCreate={true}
					onChange={({ items, CRUDList }) => {
						console.log('onChange:', { items, CRUDList });
					}}
					onCreate={({ item, CRUDList }) => {
						console.log('onCreate:', { item, CRUDList });
					}}
					onUpdate={({ item, CRUDList }) => {
						console.log('onUpdate:', { item, CRUDList });
					}}
					onDelete={({ item, CRUDList }) => {
						console.log('onDelete:', { item, CRUDList });
					}}
					onSortEnd={({ ids, CRUDList }) => {
						console.log('onSortEnd:', { ids, CRUDList });
					}}
					showAdd={true}
					showEdit={true}
					showDelete={true}
					showView={true}
					sortable={true}
					idKey="id"
					get={get}
					create={create}
					update={update}
					delete={_delete}
					reorder={reorder}
					renderAddButton={({ translations, autoCreate, CRUDList }) => {
						const title = _.get(translations, 'add', 'Add new item');
						const icon = {
							provider: 'icomoon',
							name: 'plus-circle2',
						};

						let content;

						if (autoCreate) {
							content = CRUDList.renderAutoCreateForm(title, icon);
						} else {
							content = (
								<Button
									title={title}
									icon={icon}
									onClick={CRUDList.onAddNewClick}
								/>
							);
						}

						return <div className="margin-bottom">{content}</div>;
					}}
					renderItem={this.renderItem}
					renderAddForm={this.renderAddForm}
					renderEditForm={this.renderEditForm}
					renderView={({ item, CRUDList }) => {
						return <InfoTable rows={item} />;
					}}
					renderRight={({
						classNames,
						id,
						item,
						onViewClick,
						onEditClick,
						onDeleteClick,
						CRUDList,
					}) => {
						const { active } = item;

						return (
							<Fragment>
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="file-text"
									onClick={onViewClick}
								/>
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="pencil"
									onClick={onEditClick}
								/>
								<Icon
									className={classNames['icon']}
									provider="fa"
									name={active ? 'eye' : 'eye-slash'}
									onClick={() => {
										this.onToggleClick({ item, CRUDList });
									}}
								/>
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="trash"
									onClick={onDeleteClick}
								/>
							</Fragment>
						);
					}}
					renderEditPopup={this.renderEditPopup}
					addFormProps={{
						submit: {
							title: 'Custom add title',
						},
					}}
					updateFormProps={{
						submit: {
							title: 'Custom update title',
						},
					}}
					popupSettings={{
						level: 5,
						maxWidth: '1024px',
						hideOnOverlayClick: true,
					}}
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
|                             crud_list_example2
|--------------------------------------------------------------------------|
*/
//<editor-fold defaultstate="collapsed" desc="crud_list_example2">
$table = $schema->createTable('crud_list_example2');
$table->addOption('comment','CRUDList example 2');
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
$table->addColumn('active', 'boolean', ['notnull'=>true, 'default' => 0, 'comment'=>'Is item visibled']);

$table->setPrimaryKey(['id']);
//</editor-fold>

//model

<?php

namespace App\\Models\\Example;

use Illuminate\\Database\\Eloquent\\Model;


class CRUDListExample2 extends Model
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
    protected $table = 'crud_list_example2';


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

Route::group(['prefix' => 'crud_list_example_2'], function (){

    Route::post('actions', 'CRUDListExample2Controller@actions');

});

//controller

<?php

namespace App\\Http\\Controllers\\Api\\Main\\AdministrationExample;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;

use App\\Logic\\Core\\Response;

use App\\Models\\Example\\CRUDListExample2;

class CRUDListExample2Controller extends Controller
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
                    $items = CRUDListExample2::orderBy('position', 'asc')->get();

                    return Response::success([
                        'items' => $items,
                    ]);
                //</editor-fold>
                },
            ],

            'create' => [
                'rules' => [

                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="create">
                    $item = new CRUDListExample2;
                    $item->active = true;

                    $tmp = CRUDListExample2::orderBy('position', 'desc')->first();

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
                        'item' => CRUDListExample2::find($item->id),
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
                    $item = CRUDListExample2::find($request->id);

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

            'toggle_active' => [
                'rules' => [
                    'id' => 'required|integer',
                    'active' => 'required|boolean',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="toggle_active">
                    $item = CRUDListExample2::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    $item->active = $request->active;
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
                    $item = CRUDListExample2::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    CRUDListExample2::where('position', '>', $item->position)->decrement('position');
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
                    reorder($request->ids, CRUDListExample2::class);

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
