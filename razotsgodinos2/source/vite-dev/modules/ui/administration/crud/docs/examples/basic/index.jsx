import React, { Fragment, PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Crud from 'ui/administration/crud';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import DateTimePicker from 'ui/inputs/datetime_picker';
import Button from 'ui/controls/button';

const title = 'Crud: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Crud from 'ui/administration/crud';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import DateTimePicker from 'ui/inputs/datetime_picker';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);
	}

	getColumns = () => {
		//<editor-fold defaultstate="collapsed" desc="getColumns">
		const columns = [];

		columns.push({
			name: 'id',
			title: 'ID',
			isHidable: false,
		});

		columns.push({
			name: 'created_at',
			title: 'Created at',
		});

		columns.push({
			name: 'updated_at',
			title: 'Updated at',
		});

		columns.push({
			name: 'name',
			title: 'Name',
		});

		columns.push({
			name: 'surname',
			title: 'Surname',
		});

		columns.push({
			name: 'city',
			title: 'City',
		});

		columns.push({
			name: 'action',
			title: 'Action',
			isHidable: false,
			sortable: false,
			style: {
				width: '70px',
			},
		});

		return columns;
		//</editor-fold>
	};

	getFilters = () => {
		//<editor-fold defaultstate="collapsed" desc="getFilters">
		const filters = [];

		filters.push({
			label: 'Id',
			name: 'id',
			component: Input,
			componentProps: {
				placeholder: 'Id',
				clearable: true,
			},
		});

		filters.push({
			label: 'Name',
			name: 'name',
			component: Input,
			componentProps: {
				placeholder: 'Name',
				clearable: true,
			},
		});

		filters.push({
			label: 'Surname',
			name: 'surname',
			component: Input,
			componentProps: {
				placeholder: 'Surname',
				clearable: true,
			},
		});

		filters.push({
			label: 'City',
			name: 'city',
			component: Input,
			componentProps: {
				placeholder: 'City',
				clearable: true,
			},
		});

		filters.push({
			label: 'Date from',
			name: 'date_from',
			component: DateTimePicker,
			componentProps: {
				placeholder: 'Date from',
				timeFormat: false,
				clearable: true,
			},
		});

		filters.push({
			label: 'Date to',
			name: 'date_to',
			component: DateTimePicker,
			componentProps: {
				placeholder: 'Date to',
				timeFormat: false,
				clearable: true,
			},
		});

		return filters;
		//</editor-fold>
	};

	getColumnRenderers = ({ openPopup }) => {
		//<editor-fold defaultstate="collapsed" desc="getColumnRenderers">
		const columnRenderers = {};

		columnRenderers.created_at = ({ cell }) => {
			return <span className="no-wrap">{cell}</span>;
		};

		columnRenderers.updated_at = ({ cell }) => {
			return <span className="no-wrap">{cell}</span>;
		};

		columnRenderers.action = ({ id }) => {
			return (
				<Button
					title="Edit"
					icon={{ provider: 'icomoon', name: 'pencil' }}
					onClick={() => {
						openPopup({ id, tab: 'edit' });
					}}
				/>
			);
		};

		return columnRenderers;
		//</editor-fold>
	};

	renderAddForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderAddForm">
		return (
			<Fragment>
				<Field label="Name" name="name" component={Input} />
				<Field label="Surname" name="surname" component={Input} />
				<Field label="City" name="city" component={Input} />
			</Fragment>
		);
		//</editor-fold>
	};

	renderEditForm = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="renderEditForm">
		const { name, surname, city } = data.item;

		return (
			<Fragment>
				<Field label="Name" name="name" component={Input} value={name} />
				<Field
					label="Surname"
					name="surname"
					component={Input}
					value={surname}
				/>
				<Field label="City" name="city" component={Input} value={city} />
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Crud
				translations={{
					add: 'Add new item',
					edit: 'Item #',
				}}
				containerName="CrudAdministrationBasic"
				tableName="dt_crud_administration_basic"
				action="administration_example/administration_example_2/actions"
				search="administration_example/administration_example_2/search"
				getColumns={this.getColumns}
				getFilters={this.getFilters}
				getColumnRenderers={this.getColumnRenderers}
				showAdd={true}
				showEdit={true}
				showDelete={true}
				renderAddForm={this.renderAddForm}
				renderEditForm={this.renderEditForm}
			/>
		);
	}
}
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);
	}

	getColumns = () => {
		//<editor-fold defaultstate="collapsed" desc="getColumns">
		const columns = [];

		columns.push({
			name: 'id',
			title: 'ID',
			isHidable: false,
		});

		columns.push({
			name: 'created_at',
			title: 'Created at',
		});

		columns.push({
			name: 'updated_at',
			title: 'Updated at',
		});

		columns.push({
			name: 'name',
			title: 'Name',
		});

		columns.push({
			name: 'surname',
			title: 'Surname',
		});

		columns.push({
			name: 'city',
			title: 'City',
		});

		columns.push({
			name: 'action',
			title: 'Action',
			isHidable: false,
			sortable: false,
			style: {
				width: '70px',
			},
		});

		return columns;
		//</editor-fold>
	};

	getFilters = () => {
		//<editor-fold defaultstate="collapsed" desc="getFilters">
		const filters = [];

		filters.push({
			label: 'Id',
			name: 'id',
			component: Input,
			componentProps: {
				placeholder: 'Id',
				clearable: true,
			},
		});

		filters.push({
			label: 'Name',
			name: 'name',
			component: Input,
			componentProps: {
				placeholder: 'Name',
				clearable: true,
			},
		});

		filters.push({
			label: 'Surname',
			name: 'surname',
			component: Input,
			componentProps: {
				placeholder: 'Surname',
				clearable: true,
			},
		});

		filters.push({
			label: 'City',
			name: 'city',
			component: Input,
			componentProps: {
				placeholder: 'City',
				clearable: true,
			},
		});

		filters.push({
			label: 'Date from',
			name: 'date_from',
			component: DateTimePicker,
			componentProps: {
				placeholder: 'Date from',
				timeFormat: false,
				clearable: true,
			},
		});

		filters.push({
			label: 'Date to',
			name: 'date_to',
			component: DateTimePicker,
			componentProps: {
				placeholder: 'Date to',
				timeFormat: false,
				clearable: true,
			},
		});

		return filters;
		//</editor-fold>
	};

	getColumnRenderers = ({ openPopup }) => {
		//<editor-fold defaultstate="collapsed" desc="getColumnRenderers">
		const columnRenderers = {};

		columnRenderers.created_at = ({ cell }) => {
			return <span className="no-wrap">{cell}</span>;
		};

		columnRenderers.updated_at = ({ cell }) => {
			return <span className="no-wrap">{cell}</span>;
		};

		columnRenderers.action = ({ id }) => {
			return (
				<Button
					title="Edit"
					icon={{ provider: 'icomoon', name: 'pencil' }}
					onClick={() => {
						openPopup({ id, tab: 'edit' });
					}}
				/>
			);
		};

		return columnRenderers;
		//</editor-fold>
	};

	renderAddForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderAddForm">
		return (
			<Fragment>
				<Field label="Name" name="name" component={Input} />
				<Field label="Surname" name="surname" component={Input} />
				<Field label="City" name="city" component={Input} />
			</Fragment>
		);
		//</editor-fold>
	};

	renderEditForm = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="renderEditForm">
		const { name, surname, city } = data.item;

		return (
			<Fragment>
				<Field label="Name" name="name" component={Input} value={name} />
				<Field
					label="Surname"
					name="surname"
					component={Input}
					value={surname}
				/>
				<Field label="City" name="city" component={Input} value={city} />
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Crud
				translations={{
					add: 'Add new item',
					edit: 'Item #',
				}}
				containerName="CrudAdministrationBasic"
				tableName="dt_crud_administration_basic"
				action="administration_example/administration_example_2/actions"
				search="administration_example/administration_example_2/search"
				getColumns={this.getColumns}
				getFilters={this.getFilters}
				getColumnRenderers={this.getColumnRenderers}
				showAdd={true}
				showEdit={true}
				showDelete={true}
				renderAddForm={this.renderAddForm}
				renderEditForm={this.renderEditForm}
			/>
		);
	}
}

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Test />
		</ExampleHolder>
	);
};

export default Example;
