import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import DateTimePicker from 'ui/inputs/datetime_picker';
import Select from 'ui/inputs/select';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

const title = 'DataTable: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import DataTable from 'ui/tables/data_table';

<DataTable
	id="dt_callbacks_example"
	url="example_api/search"
	extraData={{
		some_data: 'test',
	}}
	syncWithUrl={false}
	resultsPerPage={10}
	order={{ id: 'desc' }}
	columns={this.getColumns()}
	filters={this.getFilters()}
	columnRenderers={this.getColumnRenderers()}
	callbacks={{
		onSyncWithUrlInit: ({
			id,
			order,
			resultsPerPage,
			form,
			initialState,
			DataTableSyncWithUrl,
		}) => {
			//<editor-fold defaultstate="collapsed" desc="onSyncWithUrlInit">
			console.log('onSyncWithUrlInit');

			let state = {};

			state.order = {};
			state.options = {};
			state.isFiltered = false;
			state.isColumnsHidden = false;
			state.columnsVisibility = {};

			state.resultsPerPage = resultsPerPage;

			state = _.defaultsDeep(_g.cloneDeep(initialState), _g.cloneDeep(state));

			form.current.update({
				search: '',
				length: _.toString(resultsPerPage),
			});

			_.forEach(order, (direction, name) => {
				state.order[name] = direction;
			});

			uiStore.set(id, state);
			DataTableSyncWithUrl.updateUrl();
			ee.trigger(events.datatable.refresh, { id: id });
			//</editor-fold>
		},
		onUpdateFromUrl: ({ params, id, form, DataTableSyncWithUrl }) => {
			//<editor-fold defaultstate="collapsed" desc="onUpdateFromUrl">
			console.log('onUpdateFromUrl');

			const state = {};
			state.search = _.get(params, 'search', '');
			state.page = _.get(params, 'page', 1);
			state.filters = _.get(params, 'filters', {});
			state.columnsVisibility = _.get(params, 'columnsVisibility', {});
			state.order = _.get(params, 'order', {});
			state.isFiltered = _.get(params, 'isFiltered', false);
			state.isColumnsHidden = _.get(params, 'isColumnsHidden', false);
			state.resultsPerPage = _.get(params, 'resultsPerPage', 10);
			state.options = _.get(params, 'options', {});

			form.current.update({
				search: _.toString(state.search),
				length: _.toString(state.resultsPerPage),
			});

			uiStore.update(id, state);
			ee.trigger(events.datatable.refresh, { id: id });
			//</editor-fold>
		},
		onUpdateUrl: ({ id, DataTableSyncWithUrl }) => {
			//<editor-fold defaultstate="collapsed" desc="onUpdateUrl">
			console.log('onUpdateUrl');

			const store = uiStore.get(id);

			const state = {};

			const search = _.get(store, 'search', '');

			if (!_g.isEmpty(search)) {
				state.search = search;
			}

			const page = _.get(store, 'page', 1);

			if (page !== 1) {
				state.page = page;
			}

			const filters = _.get(store, 'filters', {});

			if (!_g.isEmpty(filters)) {
				state.filters = filters;
			}

			const columnsVisibility = _.get(store, 'columnsVisibility', {});

			if (!_g.isEmpty(columnsVisibility)) {
				state.columnsVisibility = columnsVisibility;
			}

			const order = _.get(store, 'order', {});

			if (!_g.isEmpty(order)) {
				state.order = order;
			}

			const isFiltered = _.get(store, 'isFiltered', {});

			if (!_g.isEmpty(isFiltered)) {
				state.isFiltered = isFiltered;
			}

			const isColumnsHidden = _.get(store, 'isColumnsHidden', false);

			if (isColumnsHidden !== false) {
				state.isColumnsHidden = isColumnsHidden;
			}

			const resultsPerPage = _.get(store, 'resultsPerPage', 10);

			if (resultsPerPage !== 10) {
				state.resultsPerPage = resultsPerPage;
			}

			const options = _.get(store, 'options', {});

			if (options !== {}) {
				state.options = options;
			}

			navigation.updateParamKey(id, rison.encode(state));
			//</editor-fold>
		},
		onGetData: ({ url, id, extraData, DataTable }) => {
			//<editor-fold defaultstate="collapsed" desc="onGetData">
			console.log('onGetData');

			const data = {};

			const state = uiStore.get(id);

			data.search = _.get(state, 'search');
			data.filters = _.get(state, 'filters');
			data.results_per_page = _.get(state, 'resultsPerPage');
			data.order = _.get(state, 'order', {});
			data.page = _.get(state, 'page', 1);

			uiStore.set(\`\${id}.loading\`, true);

			remoteRequest({
				url: url,
				data: { ...extraData, ...data },
				onSuccess: response => {
					DataTable.parseResponse(response);
				},
			});
			//</editor-fold>
		},
		onParseResponse: ({ response, id, rowIdKey, DataTable }) => {
			//<editor-fold defaultstate="collapsed" desc="onParseResponse">
			console.log('onParseResponse');

			const state = {};
			state.loading = false;
			state.responsiveColumnsToHide = [];
			state.count = _.get(response, 'count', 0);
			state.lastPage = _.get(response, 'lastPage', 0);
			state.page = _.get(response, 'page', 1);
			state.total = _.get(response, 'total', 0);
			const response_rows = _.get(response, 'rows', []);

			state.ids = _.map(response_rows, row => {
				return row[rowIdKey];
			});
			const rows = {};

			_.forEach(response_rows, row => {
				rows[row[rowIdKey]] = row;
			});
			state.rows = rows;

			uiStore.update(id, state);
			ee.trigger(events.datatable.resize, { id: id });
			//</editor-fold>
		},
		onInit: ({ id, order, resultsPerPage, initialState, reset, DataTable }) => {
			//<editor-fold defaultstate="collapsed" desc="onInit">
			console.log('onInit');

			let state = {};

			state.order = {};
			state.options = {};
			state.isFiltered = false;
			state.isColumnsHidden = false;
			state.columnsVisibility = {};

			state.resultsPerPage = resultsPerPage;
			state.search = '';

			if (!reset) {
				state = _.defaultsDeep(_g.cloneDeep(initialState), _g.cloneDeep(state));
			}

			DataTable.form.current.update({
				search: '',
				length: _.toString(resultsPerPage),
			});

			_.forEach(order, (direction, name) => {
				state.order[name] = direction;
			});

			uiStore.set(id, state);
			//</editor-fold>
		},
		onReset: ({ id, DataTable }) => {
			//<editor-fold defaultstate="collapsed" desc="onReset">
			console.log('onReset');

			DataTable.init(true);
			ee.trigger(events.datatable.updateUrl, { id: id });
			DataTable.getData();
			//</editor-fold>
		},
		onRefresh: ({ id, DataTable }) => {
			//<editor-fold defaultstate="collapsed" desc="onRefresh">
			console.log('onRefresh');

			DataTable.getData();
			//</editor-fold>
		},
		onPageChange: ({ page, id, DataTable }) => {
			//<editor-fold defaultstate="collapsed" desc="onPageChange">
			console.log('onPageChange');

			uiStore.set(\`\${id}.page\`, page);

			ee.trigger(events.datatable.updateUrl, { id: id });
			ee.trigger(events.datatable.refresh, { id: id });
			//</editor-fold>
		},
		onFilterSubmit: ({ data, Form, id, filters, options, Controls }) => {
			//<editor-fold defaultstate="collapsed" desc="onFilterSubmit">
			console.log('onFilterSubmit');

			const state = {};

			_.forEach(filters, o => {
				if (_.get(o, 'optionsFromUrl')) {
					//<editor-fold defaultstate="collapsed" desc="save options">
					const options = Form.fields[o.name].input.getSelectedOptions();

					if (!_g.isEmpty(options)) {
						uiStore.set(\`\${id}.options.\${o.name}\`, options);
					}
					//</editor-fold>
				}
			});

			state.page = 1;
			state.isFiltered = !_.every(data, o => o.length === 0);
			state.filters = _.omitBy(data, o => o.length === 0);

			const filtersOptions = _.defaults(_.get(options, 'filters', {}), {
				level: 10,
			});

			closePopup({ name: 'universal', level: filtersOptions.level });
			uiStore.update(id, state);

			ee.trigger(events.datatable.updateUrl, { id: id });
			ee.trigger(events.datatable.refresh, { id: id });
			//</editor-fold>
		},
		onColumnVisibilitySubmit: ({ data, Form, id, options, Controls }) => {
			//<editor-fold defaultstate="collapsed" desc="onColumnVisibilitySubmit">
			console.log('onColumnVisibilitySubmit');

			const state = {};

			state.isColumnsHidden = !_.every(data, o => o === '1');
			state.columnsVisibility = _.omitBy(data, o => o === '1');
			state.responsiveColumnsToHide = [];

			const columnVisibilityOptions = _.defaults(
				_.get(options, 'columnVisibility', {}),
				{
					level: 10,
				},
			);

			closePopup({
				name: 'universal',
				level: columnVisibilityOptions.level,
			});
			uiStore.update(id, state);

			ee.trigger(events.datatable.updateUrl, { id: id });
			ee.trigger(events.datatable.closeHiddenRows, { id: id });

			setTimeout(() => {
				ee.trigger(events.datatable.resize, { id: id });
			}, 100);
			//</editor-fold>
		},
		onSearch: ({ value, id, DataTable }) => {
			//<editor-fold defaultstate="collapsed" desc="onSearch">
			console.log('onSearch');

			uiStore.update(id, { page: 1, search: value });
			ee.trigger(events.datatable.updateUrl, { id: id });
			ee.trigger(events.datatable.refresh, { id: id });
			//</editor-fold>
		},
		onLengthChange: ({ value, id, DataTable }) => {
			//<editor-fold defaultstate="collapsed" desc="onLengthChange">
			console.log('onLengthChange');

			uiStore.update(id, { page: 1, resultsPerPage: _.toNumber(value) });
			ee.trigger(events.datatable.updateUrl, { id: id });
			ee.trigger(events.datatable.refresh, { id: id });
			//</editor-fold>
		},
	}}
/>
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
				id="dt_callbacks_example"
				url="example_api/search"
				extraData={{
					some_data: 'test',
				}}
				syncWithUrl={true}
				resultsPerPage={10}
				order={{ id: 'desc' }}
				columns={this.getColumns()}
				filters={this.getFilters()}
				columnRenderers={this.getColumnRenderers()}
				callbacks={{
					onSyncWithUrlInit: ({
						id,
						order,
						resultsPerPage,
						form,
						initialState,
						DataTableSyncWithUrl,
					}) => {
						//<editor-fold defaultstate="collapsed" desc="onSyncWithUrlInit">
						console.log('onSyncWithUrlInit');

						let state = {};

						state.order = {};
						state.options = {};
						state.isFiltered = false;
						state.isColumnsHidden = false;
						state.columnsVisibility = {};

						state.resultsPerPage = resultsPerPage;

						state = _.defaultsDeep(
							_g.cloneDeep(initialState),
							_g.cloneDeep(state),
						);

						form.current.update({
							search: '',
							length: _.toString(resultsPerPage),
						});

						_.forEach(order, (direction, name) => {
							state.order[name] = direction;
						});

						uiStore.set(id, state);
						DataTableSyncWithUrl.updateUrl();
						ee.trigger(events.datatable.refresh, { id: id });
						//</editor-fold>
					},
					onUpdateFromUrl: ({ params, id, form, DataTableSyncWithUrl }) => {
						//<editor-fold defaultstate="collapsed" desc="onUpdateFromUrl">
						console.log('onUpdateFromUrl');

						const state = {};
						state.search = _.get(params, 'search', '');
						state.page = _.get(params, 'page', 1);
						state.filters = _.get(params, 'filters', {});
						state.columnsVisibility = _.get(params, 'columnsVisibility', {});
						state.order = _.get(params, 'order', {});
						state.isFiltered = _.get(params, 'isFiltered', false);
						state.isColumnsHidden = _.get(params, 'isColumnsHidden', false);
						state.resultsPerPage = _.get(params, 'resultsPerPage', 10);
						state.options = _.get(params, 'options', {});

						form.current.update({
							search: _.toString(state.search),
							length: _.toString(state.resultsPerPage),
						});

						uiStore.update(id, state);
						ee.trigger(events.datatable.refresh, { id: id });
						//</editor-fold>
					},
					onUpdateUrl: ({ id, DataTableSyncWithUrl }) => {
						//<editor-fold defaultstate="collapsed" desc="onUpdateUrl">
						console.log('onUpdateUrl');

						const store = uiStore.get(id);

						const state = {};

						const search = _.get(store, 'search', '');

						if (!_g.isEmpty(search)) {
							state.search = search;
						}

						const page = _.get(store, 'page', 1);

						if (page !== 1) {
							state.page = page;
						}

						const filters = _.get(store, 'filters', {});

						if (!_g.isEmpty(filters)) {
							state.filters = filters;
						}

						const columnsVisibility = _.get(store, 'columnsVisibility', {});

						if (!_g.isEmpty(columnsVisibility)) {
							state.columnsVisibility = columnsVisibility;
						}

						const order = _.get(store, 'order', {});

						if (!_g.isEmpty(order)) {
							state.order = order;
						}

						const isFiltered = _.get(store, 'isFiltered', {});

						if (!_g.isEmpty(isFiltered)) {
							state.isFiltered = isFiltered;
						}

						const isColumnsHidden = _.get(store, 'isColumnsHidden', false);

						if (isColumnsHidden !== false) {
							state.isColumnsHidden = isColumnsHidden;
						}

						const resultsPerPage = _.get(store, 'resultsPerPage', 10);

						if (resultsPerPage !== 10) {
							state.resultsPerPage = resultsPerPage;
						}

						const options = _.get(store, 'options', {});

						if (options !== {}) {
							state.options = options;
						}

						navigation.updateParamKey(id, rison.encode(state));
						//</editor-fold>
					},
					onGetData: ({ url, id, extraData, DataTable }) => {
						//<editor-fold defaultstate="collapsed" desc="onGetData">
						console.log('onGetData');

						const data = {};

						const state = uiStore.get(id);

						data.search = _.get(state, 'search');
						data.filters = _.get(state, 'filters');
						data.results_per_page = _.get(state, 'resultsPerPage');
						data.order = _.get(state, 'order', {});
						data.page = _.get(state, 'page', 1);

						uiStore.set(`${id}.loading`, true);

						remoteRequest({
							url: url,
							data: { ...extraData, ...data },
							onSuccess: response => {
								DataTable.parseResponse(response);
							},
						});
						//</editor-fold>
					},
					onParseResponse: ({ response, id, rowIdKey, DataTable }) => {
						//<editor-fold defaultstate="collapsed" desc="onParseResponse">
						console.log('onParseResponse');

						const state = {};
						state.loading = false;
						state.responsiveColumnsToHide = [];
						state.count = _.get(response, 'count', 0);
						state.lastPage = _.get(response, 'lastPage', 0);
						state.page = _.get(response, 'page', 1);
						state.total = _.get(response, 'total', 0);
						const response_rows = _.get(response, 'rows', []);

						state.ids = _.map(response_rows, row => {
							return row[rowIdKey];
						});
						const rows = {};

						_.forEach(response_rows, row => {
							rows[row[rowIdKey]] = row;
						});
						state.rows = rows;

						uiStore.update(id, state);
						ee.trigger(events.datatable.resize, { id: id });
						//</editor-fold>
					},
					onInit: ({
						id,
						order,
						resultsPerPage,
						initialState,
						reset,
						DataTable,
					}) => {
						//<editor-fold defaultstate="collapsed" desc="onInit">
						console.log('onInit');

						let state = {};

						state.order = {};
						state.options = {};
						state.isFiltered = false;
						state.isColumnsHidden = false;
						state.columnsVisibility = {};

						state.resultsPerPage = resultsPerPage;
						state.search = '';

						if (!reset) {
							state = _.defaultsDeep(
								_g.cloneDeep(initialState),
								_g.cloneDeep(state),
							);
						}

						DataTable.form.current.update({
							search: '',
							length: _.toString(resultsPerPage),
						});

						_.forEach(order, (direction, name) => {
							state.order[name] = direction;
						});

						uiStore.set(id, state);
						//</editor-fold>
					},
					onReset: ({ id, DataTable }) => {
						//<editor-fold defaultstate="collapsed" desc="onReset">
						console.log('onReset');

						DataTable.init(true);
						ee.trigger(events.datatable.updateUrl, { id: id });
						DataTable.getData();
						//</editor-fold>
					},
					onRefresh: ({ id, DataTable }) => {
						//<editor-fold defaultstate="collapsed" desc="onRefresh">
						console.log('onRefresh');

						DataTable.getData();
						//</editor-fold>
					},
					onPageChange: ({ page, id, DataTable }) => {
						//<editor-fold defaultstate="collapsed" desc="onPageChange">
						console.log('onPageChange');

						uiStore.set(`${id}.page`, page);

						ee.trigger(events.datatable.updateUrl, { id: id });
						ee.trigger(events.datatable.refresh, { id: id });
						//</editor-fold>
					},
					onFilterSubmit: ({ data, Form, id, filters, options, Controls }) => {
						//<editor-fold defaultstate="collapsed" desc="onFilterSubmit">
						console.log('onFilterSubmit');

						const state = {};

						_.forEach(filters, o => {
							if (_.get(o, 'optionsFromUrl')) {
								//<editor-fold defaultstate="collapsed" desc="save options">
								const options = Form.fields[o.name].input.getSelectedOptions();

								if (!_g.isEmpty(options)) {
									uiStore.set(`${id}.options.${o.name}`, options);
								}
								//</editor-fold>
							}
						});

						state.page = 1;
						state.isFiltered = !_.every(data, o => o.length === 0);
						state.filters = _.omitBy(data, o => o.length === 0);

						const filtersOptions = _.defaults(_.get(options, 'filters', {}), {
							level: 10,
						});

						closePopup({ name: 'universal', level: filtersOptions.level });
						uiStore.update(id, state);

						ee.trigger(events.datatable.updateUrl, { id: id });
						ee.trigger(events.datatable.refresh, { id: id });
						//</editor-fold>
					},
					onColumnVisibilitySubmit: ({ data, Form, id, options, Controls }) => {
						//<editor-fold defaultstate="collapsed" desc="onColumnVisibilitySubmit">
						console.log('onColumnVisibilitySubmit');

						const state = {};

						state.isColumnsHidden = !_.every(data, o => o === '1');
						state.columnsVisibility = _.omitBy(data, o => o === '1');
						state.responsiveColumnsToHide = [];

						const columnVisibilityOptions = _.defaults(
							_.get(options, 'columnVisibility', {}),
							{
								level: 10,
							},
						);

						closePopup({
							name: 'universal',
							level: columnVisibilityOptions.level,
						});
						uiStore.update(id, state);

						ee.trigger(events.datatable.updateUrl, { id: id });
						ee.trigger(events.datatable.closeHiddenRows, { id: id });

						setTimeout(() => {
							ee.trigger(events.datatable.resize, { id: id });
						}, 100);
						//</editor-fold>
					},
					onSearch: ({ value, id, DataTable }) => {
						//<editor-fold defaultstate="collapsed" desc="onSearch">
						console.log('onSearch');

						uiStore.update(id, { page: 1, search: value });
						ee.trigger(events.datatable.updateUrl, { id: id });
						ee.trigger(events.datatable.refresh, { id: id });
						//</editor-fold>
					},
					onLengthChange: ({ value, id, DataTable }) => {
						//<editor-fold defaultstate="collapsed" desc="onLengthChange">
						console.log('onLengthChange');

						uiStore.update(id, { page: 1, resultsPerPage: _.toNumber(value) });
						ee.trigger(events.datatable.updateUrl, { id: id });
						ee.trigger(events.datatable.refresh, { id: id });
						//</editor-fold>
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
