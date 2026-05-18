import React, { PureComponent as Component, Fragment } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import MaxWidth from 'ui/layout/max_width';
import EditForm from 'ui/administration/edit_form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import DateTimePicker from 'ui/inputs/datetime_picker';
import BackendCode from 'common/docs/ui/backend_code';

const title = 'EditForm: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import MaxWidth from 'ui/layout/max_width';
import EditForm from 'ui/administration/edit_form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import DateTimePicker from 'ui/inputs/datetime_picker';

const get = {
	action: 'administration_example/edit_form/actions',
	extraData: {
		action: 'get',
	},
};

const update = {
	action: 'administration_example/edit_form/actions',
	extraData: {
		action: 'update',
	},
};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	renderForm = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const {
			name,
			enabled,
			discount,
			price,
			date_time,
			date,
			time,
		} = data.settings;

		return (
			<Fragment>
				<Field
					label="Name"
					name="name"
					component={Input}
					value={name}
					isRequired={true}
				/>
				<Field
					label="Enabled"
					name="enabled"
					component={Checkbox}
					value={enabled}
				/>
				<Field
					label="Discount"
					name="discount"
					component={Input}
					componentProps={{
						number: {
							allowNegative: false,
							allowDecimal: false,
						},
					}}
					isRequired={true}
					value={discount}
				/>
				<Field
					label="Price"
					name="price"
					component={Input}
					componentProps={{
						number: {
							allowNegative: false,
							allowDecimal: true,
						},
					}}
					isRequired={true}
					value={price}
				/>
				<Field
					label="Date time"
					name="date_time"
					component={DateTimePicker}
					isRequired={true}
					value={date_time}
				/>
				<Field
					label="Date"
					name="date"
					component={DateTimePicker}
					componentProps={{
						timeFormat: false,
					}}
					isRequired={true}
					value={date}
				/>
				<Field
					label="Time"
					name="time"
					component={DateTimePicker}
					componentProps={{
						dateFormat: false,
					}}
					isRequired={true}
					value={time}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<MaxWidth>
				<EditForm get={get} update={update} render={this.renderForm} />
			</MaxWidth>
		);
	}
}
  `,
};

const get = {
	action: 'administration_example/edit_form/actions',
	extraData: {
		action: 'get',
	},
};

const update = {
	action: 'administration_example/edit_form/actions',
	extraData: {
		action: 'update',
	},
};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	renderForm = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const {
			name,
			enabled,
			discount,
			price,
			date_time,
			date,
			time,
		} = data.settings;

		return (
			<Fragment>
				<Field
					label="Name"
					name="name"
					component={Input}
					value={name}
					isRequired={true}
				/>
				<Field
					label="Enabled"
					name="enabled"
					component={Checkbox}
					value={enabled}
				/>
				<Field
					label="Discount"
					name="discount"
					component={Input}
					componentProps={{
						number: {
							allowNegative: false,
							allowDecimal: false,
						},
					}}
					isRequired={true}
					value={discount}
				/>
				<Field
					label="Price"
					name="price"
					component={Input}
					componentProps={{
						number: {
							allowNegative: false,
							allowDecimal: true,
						},
					}}
					isRequired={true}
					value={price}
				/>
				<Field
					label="Date time"
					name="date_time"
					component={DateTimePicker}
					isRequired={true}
					value={date_time}
				/>
				<Field
					label="Date"
					name="date"
					component={DateTimePicker}
					componentProps={{
						timeFormat: false,
					}}
					isRequired={true}
					value={date}
				/>
				<Field
					label="Time"
					name="time"
					component={DateTimePicker}
					componentProps={{
						dateFormat: false,
					}}
					isRequired={true}
					value={time}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<MaxWidth>
				<EditForm get={get} update={update} render={this.renderForm} />
			</MaxWidth>
		);
	}
}

//<editor-fold defaultstate="collapsed" desc="backendCode">
let backendCode = `
//table

/*
|--------------------------------------------------------------------------
|                             example_settings
|--------------------------------------------------------------------------|
*/
//<editor-fold defaultstate="collapsed" desc="example_settings">
$table = $schema->createTable('example_settings');
$table->addOption('comment','Example settings');
$table->addOption('collate','utf8_unicode_ci');//utf8mb4_unicode_ci
$table->addOption('engine','InnoDB');
$table->addOption('charset','utf8');//utf8mb4

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
$table->addColumn('created_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);

$table->addColumn('name', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Name']);
$table->addColumn('enabled', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Toggle on/off']);
$table->addColumn('discount', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'Discount in percentage from 1 to 99']);
$table->addColumn('price', 'decimal', ['precision' => 10, 'scale' => 2, 'notnull' => true, 'default' => 0, 'comment' => 'Price']);
$table->addColumn('date_time', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Date time']);
$table->addColumn('date', 'date', [ 'notnull' => false, 'default' => null, 'comment' => 'Date']);
$table->addColumn('time', 'time', [ 'notnull' => false, 'default' => null, 'comment' => 'Time']);

$table->setPrimaryKey(['id']);
//</editor-fold>

//model

namespace App\\Models\\Example;

use Illuminate\\Database\\Eloquent\\Model;


class ExampleSettings extends Model
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
    protected $table = 'example_settings';


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
        'enabled' => 'boolean',
    ];

}

//routes

Route::group(['prefix' => 'edit_form'], function (){

    Route::post('actions', 'EditFormController@actions');

});

//controller

namespace App\\Http\\Controllers\\Api\\Main\\AdministrationExample;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;

use App\\Logic\\Core\\Response;

use App\\Models\\Example\\ExampleSettings;

class EditFormController extends Controller
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
                    $settings = ExampleSettings::find(1);

                    return Response::success([
                        'settings' => $settings,
                    ]);
                //</editor-fold>
                },
            ],

            'update' => [
                'rules' => [
                    'name' => 'required|string',
                    'enabled' => 'required|boolean',
                    'discount' => 'required|integer|between:1,99',
                    'price' => 'required|numeric',
                    'date_time' => 'required|date_format:Y-m-d H:i:s',
                    'date' => 'required|date_format:Y-m-d',
                    'time' => 'required|date_format:H:i:s',

                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update">
                    $settings = ExampleSettings::find(1);

                    $settings->name = $request->name;
                    $settings->enabled = $request->enabled;
                    $settings->discount = $request->discount;
                    $settings->price = (double)$request->price;
                    $settings->date_time = $request->date_time;
                    $settings->date = $request->date;
                    $settings->time = $request->time;

                    $settings->save();

                    return Response::success([
                        'msg' => 'Settings saved!',
                        'settings' => $settings,
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
