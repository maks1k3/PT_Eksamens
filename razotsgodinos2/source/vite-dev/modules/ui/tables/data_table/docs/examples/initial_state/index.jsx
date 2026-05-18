import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import DateTimePicker from 'ui/inputs/datetime_picker';
import Select from 'ui/inputs/select';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

const title = 'DataTable: initialState';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import DateTimePicker from 'ui/inputs/datetime_picker';
import Select from 'ui/inputs/select';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

class Test extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<DataTable
				id="dt_initial_state_example"
				url="example_api/search"
				syncWithUrl={false}
				resultsPerPage={10}
				order={{ id: 'desc' }}
				columns={this.getColumns()}
				filters={this.getFilters()}
				columnRenderers={this.getColumnRenderers()}
				initialState={{
					search: 'кот',
					page: 1,
					filters: {
						content_type: 'image',
						deleted: '0',
					},
					columnsVisibility: {
						updated_at: '0',
						content_type: '0',
						book: '0',
					},
					isFiltered: true,
					isColumnsHidden: true,
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
			name: 'title',
			title: 'Title ',
		});

		columns.push({
			name: 'content_type',
			title: 'Content type ',
		});

		columns.push({
			name: 'preview',
			title: 'Preview ',
		});

		columns.push({
			name: 'book',
			title: 'Book',
		});

		columns.push({
			name: 'tags',
			title: 'Tags',
		});

		columns.push({
			name: 'deleted',
			title: 'Deleted',
		});

		columns.push({
			name: 'action',
			title: 'Action',
			isHidable: false,
			sortable: false,
			style: {
				width: '50px',
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
			label: 'Title',
			name: 'title_id',
			component: Select,
			componentProps: {
				async: true,
				optionsUrl: 'example_api/title_autocomplete',
				clearable: true,
			},
			optionsFromUrl: true,
			fieldProps: {
				labelWidth: '30%',
				inputWidth: '70%',
			},
		});

		filters.push({
			label: 'Created at',
			name: 'created_at',
			component: DateTimePicker,
			componentProps: {
				placeholder: 'Created at',
				clearable: true,
			},
		});

		filters.push({
			label: 'Updated at',
			name: 'updated_at',
			component: DateTimePicker,
			componentProps: {
				placeholder: 'Updated at',
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

		filters.push({
			label: 'Content type',
			name: 'content_type',
			component: Select,
			componentProps: {
				placeholder: 'Content type',
				clearable: true,
				options: [
					{
						value: 'note',
						label: 'Note',
					},
					{
						value: 'image',
						label: 'Image',
					},
					{
						value: 'gif',
						label: 'Gif',
					},
					{
						value: 'video',
						label: 'Video',
					},
					{
						value: 'link',
						label: 'Link',
					},
				],
			},
		});

		filters.push({
			label: 'Deleted',
			name: 'deleted',
			component: Select,
			componentProps: {
				placeholder: 'Deleted',
				clearable: true,
				options: [
					{
						value: '1',
						label: 'Yes',
					},
					{
						value: '0',
						label: 'No',
					},
				],
			},
		});

		return filters;
		//</editor-fold>
	};

	getColumnRenderers = () => {
		//<editor-fold defaultstate="collapsed" desc="getColumnRenderers">

		const columnRenderers = {};

		columnRenderers.created_at = ({ id, cell, row }) => {
			return <span className="no-wrap">{cell}</span>;
		};

		columnRenderers.updated_at = ({ id, cell, row }) => {
			return <span className="no-wrap">{cell}</span>;
		};

		columnRenderers.deleted = ({ id, cell, row }) => {
			return <span>{_.toString(cell) === '1' ? 'Yes' : 'No'}</span>;
		};

		columnRenderers.action = ({ id, cell, row }) => {
			return (
				<ActionsMenu
					options={[
						{
							title: 'View',
							icon: {
								provider: 'icomoon',
								name: 'file-text',
							},
							onClick: () => {
								console.log({ View: { id, cell, row } });
							},
						},
						{
							title: 'Edit',
							icon: {
								provider: 'icomoon',
								name: 'pencil',
							},
							onClick: () => {
								console.log({ Edit: { id, cell, row } });
							},
						},
						{
							title: 'Delete',
							icon: {
								provider: 'icomoon',
								name: 'trash',
							},
							onClick: () => {
								console.log({ Delete: { id, cell, row } });
							},
						},
					]}
				/>
			);
		};

		return columnRenderers;
		//</editor-fold>
	};

	render() {
		return (
			<DataTable
				id="dt_initial_state_example"
				url="example_api/search"
				syncWithUrl={false}
				resultsPerPage={10}
				order={{ id: 'desc' }}
				columns={this.getColumns()}
				filters={this.getFilters()}
				columnRenderers={this.getColumnRenderers()}
				initialState={{
					search: 'кот',
					page: 1,
					filters: {
						content_type: 'image',
						deleted: '0',
					},
					columnsVisibility: {
						updated_at: '0',
						content_type: '0',
						book: '0',
					},
					isFiltered: true,
					isColumnsHidden: true,
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
