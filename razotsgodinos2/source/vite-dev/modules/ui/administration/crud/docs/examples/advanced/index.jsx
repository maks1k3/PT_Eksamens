import React, { Fragment, PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Crud from 'ui/administration/crud';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import DateTimePicker from 'ui/inputs/datetime_picker';
import Button from 'ui/controls/button';
import InfoTable from 'ui/tables/info_table';

const title = 'Crud: advanced';

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
import InfoTable from 'ui/tables/info_table';

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

	renderView = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="renderView">
		return (
			<div>
				This is view
				<InfoTable rows={data.item} />
			</div>
		);
		//</editor-fold>
	};

	render() {
		const containerName = 'CrudAdministrationAdvanced';
		const tableName = 'dt_crud_administration_advanced';

		return (
			<Crud
				translations={{
					add: 'Add new item',
					edit: 'Item #',
				}}
				autoCreate={false}
				containerName={containerName}
				tableName={tableName}
				action="administration_example/administration_example_2/actions"
				search="administration_example/administration_example_2/search"
				getColumns={this.getColumns}
				getFilters={this.getFilters}
				getColumnRenderers={this.getColumnRenderers}
				showAdd={true}
				showEdit={true}
				showDelete={true}
				showView={true}
				addFormProps={{
					confirmation: {
						title: 'Confirm action',
						text: 'Are you sure?',
						theme: 'danger',
						confirm: 'Confirm',
						cancel: 'Cancel',
						settings: {
							verticalAlign: 'top',
						},
					},
					onSuccess: () => {
						console.log('Custom create onSuccess');
						ee.trigger(events.datatable.refresh, { id: tableName });
					},
				}}
				renderAddButton={({ addButton }) => {
					return <div>{addButton}</div>;
				}}
				renderAddForm={this.renderAddForm}
				editFormProps={{
					confirmation: {
						title: 'Confirm action',
						text: 'Are you sure?',
						theme: 'danger',
						confirm: 'Confirm',
						cancel: 'Cancel',
						settings: {
							verticalAlign: 'top',
						},
					},
					onSuccess: ({ response }) => {
						console.log('Custom edit onSuccess');
						ee.trigger(events.datatable.refresh, { id: tableName });

						if (uiStore.get(\`$\{containerName}.mounted\`, false)) {
							uiStore.set(\`$\{containerName}.data.item\`, response.item);
						}
					},
				}}
				renderEditForm={this.renderEditForm}
				renderView={this.renderView}
				deleteFormProps={{
					onSuccess: () => {
						console.log('Custom delete onSuccess');
						closePopup({ name: 'universal', level: 2 });
						ee.trigger(events.datatable.refresh, { id: tableName });
					},
				}}
				popupSettings={{
					level: 2,
					maxWidth: '600px',
					hideOnOverlayClick: false,
				}}
				DataTableProps={{
					order: {
						id: 'desc',
					},
				}}
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

	renderView = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="renderView">
		return (
			<div>
				This is view
				<InfoTable rows={data.item} />
			</div>
		);
		//</editor-fold>
	};

	render() {
		const containerName = 'CrudAdministrationAdvanced';
		const tableName = 'dt_crud_administration_advanced';

		return (
			<Crud
				translations={{
					add: 'Add new item',
					edit: 'Item #',
				}}
				autoCreate={false}
				containerName={containerName}
				tableName={tableName}
				action="administration_example/administration_example_2/actions"
				search="administration_example/administration_example_2/search"
				getColumns={this.getColumns}
				getFilters={this.getFilters}
				getColumnRenderers={this.getColumnRenderers}
				showAdd={true}
				showEdit={true}
				showDelete={true}
				showView={true}
				addFormProps={{
					confirmation: {
						title: 'Confirm action',
						text: 'Are you sure?',
						theme: 'danger',
						confirm: 'Confirm',
						cancel: 'Cancel',
						settings: {
							verticalAlign: 'top',
						},
					},
					onSuccess: () => {
						console.log('Custom create onSuccess');
						ee.trigger(events.datatable.refresh, { id: tableName });
					},
				}}
				renderAddButton={({ addButton }) => {
					return <div>{addButton}</div>;
				}}
				renderAddForm={this.renderAddForm}
				editFormProps={{
					confirmation: {
						title: 'Confirm action',
						text: 'Are you sure?',
						theme: 'danger',
						confirm: 'Confirm',
						cancel: 'Cancel',
						settings: {
							verticalAlign: 'top',
						},
					},
					onSuccess: ({ response }) => {
						console.log('Custom edit onSuccess');
						ee.trigger(events.datatable.refresh, { id: tableName });

						if (uiStore.get(`${containerName}.mounted`, false)) {
							uiStore.set(`${containerName}.data.item`, response.item);
						}
					},
				}}
				renderEditForm={this.renderEditForm}
				renderView={this.renderView}
				deleteFormProps={{
					onSuccess: () => {
						console.log('Custom delete onSuccess');
						closePopup({ name: 'universal', level: 2 });
						ee.trigger(events.datatable.refresh, { id: tableName });
					},
				}}
				popupSettings={{
					level: 2,
					maxWidth: '600px',
					hideOnOverlayClick: false,
				}}
				DataTableProps={{
					order: {
						id: 'desc',
					},
				}}
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
