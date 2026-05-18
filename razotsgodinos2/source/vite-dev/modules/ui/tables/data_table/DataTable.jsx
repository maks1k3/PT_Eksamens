import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'ui/form';
import Table from './table';
import Pagination from './components/pagination';
import Info from './components/info';
import Search from './components/search';
import Length from './components/length';
import Controls from './components/controls';
import DataTableSyncWithUrl from './DataTableSyncWithUrl';

import styles from './DataTable.module.less';
import {
	isFunction,
	isUndefined,
	toString,
	get,
	map,
	has,
	forEach,
	defaultsDeep,
	toNumber,
} from 'lodash-es';

const propTypes = {
	id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	extraData: PropTypes.object,
	classNames: PropTypes.object,
	syncWithUrl: PropTypes.bool,
	columns: PropTypes.array,
	filters: PropTypes.array,
	columnRenderers: PropTypes.object,
	order: PropTypes.object,
	resultsPerPage: PropTypes.any,
	componentsProps: PropTypes.object,
	callbacks: PropTypes.object,
	render: PropTypes.func,
	rowIdKey: PropTypes.string,
	FormProps: PropTypes.object,
	preventColumnsCollapse: PropTypes.bool,
	initialState: PropTypes.object, //initial filter,search,order,page,columnsVisibility

	//custom ref
	getRef: PropTypes.func,

	//custom components
	Table: PropTypes.any,
	Pagination: PropTypes.any,
	Info: PropTypes.any,
	Search: PropTypes.any,
	Length: PropTypes.any,
	Controls: PropTypes.any,
	DataTableSyncWithUrl: PropTypes.any,
};

const defaultProps = {
	extraData: {},
	classNames: {},
	syncWithUrl: false,
	columns: [],
	filters: [],
	columnRenderers: {},
	order: {},
	resultsPerPage: 10,
	componentsProps: {},
	callbacks: {},
	rowIdKey: 'id',
	preventColumnsCollapse: false,
	initialState: {},

	//custom components
	Table: Table,
	Pagination: Pagination,
	Info: Info,
	Search: Search,
	Length: Length,
	Controls: Controls,
	DataTableSyncWithUrl: DataTableSyncWithUrl,
};

class DataTable extends Component {
	constructor(props) {
		super(props);
		this.form = React.createRef();

		this.state = {
			mounted: false,
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { syncWithUrl, getRef } = this.props;

		if (isFunction(getRef)) {
			getRef(this);
		}

		this.setState({
			mounted: true,
		});

		if (!syncWithUrl) {
			this.init();
			this.getData();
		}

		ee.on(events.datatable.search, this.externalSearch);
		ee.on(events.datatable.refresh, this.refresh);
		ee.on(events.datatable.reset, this.reset);
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillMount">
		const { id } = this.props;

		uiStore.remove(id);
		ee.off(events.datatable.setState, this.externalSearch);
		ee.off(events.datatable.refresh, this.refresh);
		ee.off(events.datatable.reset, this.reset);
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Events
	 *
	 * ========================================================================*/

	externalSearch = ({
		id,
		order,
		page,
		isFiltered,
		isColumnsHidden,
		columnsVisibility,
		search,
		resultsPerPage,
		filters,
	}) => {
		//<editor-fold defaultstate="collapsed" desc="externalSearch">
		if (id !== this.props.id) {
			return;
		}

		const newState = [];

		if (!isUndefined(order)) {
			newState.push({
				path: `${id}.order`,
				value: order,
			});
		}
		if (!isUndefined(isFiltered)) {
			newState.push({
				path: `${id}.isFiltered`,
				value: isFiltered,
			});
		}
		if (!isUndefined(isColumnsHidden)) {
			newState.push({
				path: `${id}.isColumnsHidden`,
				value: isColumnsHidden,
			});
		}
		if (!isUndefined(columnsVisibility)) {
			newState.push({
				path: `${id}.columnsVisibility`,
				value: columnsVisibility,
			});
		}
		if (!isUndefined(search)) {
			newState.push({
				path: `${id}.search`,
				value: search,
			});

			this.form.current.update({
				search: toString(search),
			});
		}
		if (!isUndefined(page)) {
			newState.push({
				path: `${id}.page`,
				value: page,
			});
		}
		if (!isUndefined(resultsPerPage)) {
			newState.push({
				path: `${id}.resultsPerPage`,
				value: resultsPerPage,
			});

			this.form.current.update({
				length: toString(resultsPerPage),
			});
		}
		if (!isUndefined(filters)) {
			newState.push({
				path: `${id}.filters`,
				value: filters,
			});
			newState.filters = filters;
		}

		uiStore.multiSet(newState);

		ee.trigger(events.datatable.updateUrl, { id: id });
		this.getData();
		//</editor-fold>
	};

	refresh = ({ id }) => {
		//<editor-fold defaultstate="collapsed" desc="refresh">
		if (id !== this.props.id) {
			return;
		}

		const onRefresh = get(this.props.callbacks, 'onRefresh');

		if (isFunction(onRefresh)) {
			onRefresh({ id, DataTable: this });
			return;
		}

		this.getData();
		//</editor-fold>
	};

	reset = ({ id }) => {
		//<editor-fold defaultstate="collapsed" desc="reset">
		if (id !== this.props.id) {
			return;
		}

		const onReset = get(this.props.callbacks, 'onReset');

		if (isFunction(onReset)) {
			onReset({ id, DataTable: this });
			return;
		}

		this.init(true);
		ee.trigger(events.datatable.updateUrl, { id: id });
		this.getData();
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	getData = () => {
		//<editor-fold defaultstate="collapsed" desc="getData">
		const onGetData = get(this.props.callbacks, 'onGetData');

		const { url, id, extraData } = this.props;

		if (isFunction(onGetData)) {
			onGetData({ url, id, extraData, DataTable: this });
			return;
		}

		const data = {};

		const state = uiStore.get(id);

		data.search = get(state, 'search');
		data.filters = get(state, 'filters');
		data.results_per_page = get(state, 'resultsPerPage');
		data.order = get(state, 'order', {});
		data.page = get(state, 'page', 1);

		uiStore.set(`${id}.loading`, true);

		remoteRequest({
			url: url,
			data: { ...extraData, ...data },
			onSuccess: (response) => {
				this.parseResponse(response);
			},
		});
		//</editor-fold>
	};

	parseResponse = (response) => {
		//<editor-fold defaultstate="collapsed" desc="parseResponse">
		const onParseResponse = get(this.props.callbacks, 'onParseResponse');

		const { id, rowIdKey } = this.props;

		if (isFunction(onParseResponse)) {
			onParseResponse({ response, id, rowIdKey, DataTable: this });
			return;
		}

		const state = {};
		state.loading = false;
		state.responsiveColumnsToHide = [];
		state.count = get(response, 'count', 0);
		state.lastPage = get(response, 'lastPage', 0);
		state.page = get(response, 'page', 1);
		state.total = get(response, 'total', 0);

		if (has(response, 'summary')) {
			state.summary = get(response, 'summary', {});
		}

		const response_rows = get(response, 'rows', []);

		state.ids = map(response_rows, (row) => {
			return row[rowIdKey];
		});
		const rows = {};

		forEach(response_rows, (row) => {
			rows[row[rowIdKey]] = row;
		});
		state.rows = rows;

		uiStore.update(id, state);
		ee.trigger(events.datatable.resize, { id: id });
		//</editor-fold>
	};

	init = (reset = false) => {
		//<editor-fold defaultstate="collapsed" desc="init">
		const onInit = get(this.props.callbacks, 'onInit');

		const { id, order, resultsPerPage, initialState } = this.props;

		if (isFunction(onInit)) {
			onInit({
				id,
				order,
				resultsPerPage,
				initialState,
				reset,
				DataTable: this,
			});
			return;
		}

		let state = {};

		state.order = {};
		state.options = {};
		state.isFiltered = false;
		state.isColumnsHidden = false;
		state.columnsVisibility = {};

		state.resultsPerPage = resultsPerPage;
		state.search = '';

		if (!reset) {
			state = defaultsDeep(_g.cloneDeep(initialState), _g.cloneDeep(state));
		}

		this.form.current.update({
			search: toString(state.search),
			length: toString(state.resultsPerPage),
		});

		forEach(order, (direction, name) => {
			state.order[name] = direction;
		});

		uiStore.set(id, state);
		//</editor-fold>
	};

	onChange = ({ changed, value }) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">
		if (changed === 'search') {
			this.onSearch(value);
		} else if (changed === 'length') {
			this.onLengthChange(value);
		}
		//</editor-fold>
	};

	onSearch = (value) => {
		//<editor-fold defaultstate="collapsed" desc="onSearch">
		const onSearch = get(this.props.callbacks, 'onSearch');

		const { id } = this.props;

		if (isFunction(onSearch)) {
			onSearch({ value, id, DataTable: this });
			return;
		}

		uiStore.update(id, { page: 1, search: value });
		ee.trigger(events.datatable.updateUrl, { id: id });
		ee.trigger(events.datatable.refresh, { id: id });
		//</editor-fold>
	};

	onLengthChange = (value) => {
		//<editor-fold defaultstate="collapsed" desc="onLengthChange">
		const onLengthChange = get(this.props.callbacks, 'onLengthChange');

		const { id } = this.props;

		if (isFunction(onLengthChange)) {
			onLengthChange({ value, id, DataTable: this });
			return;
		}

		uiStore.update(id, { page: 1, resultsPerPage: toNumber(value) });
		ee.trigger(events.datatable.updateUrl, { id: id });
		ee.trigger(events.datatable.refresh, { id: id });
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderTop = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderTop">

		return (
			<div className={classNames['top-wrapper']}>
				<div className={classNames['top-left-wrapper']}>
					{this.renderSearch()}
					{this.renderLength()}
					{this.renderControls()}
				</div>
				<div className={classNames['top-right-wrapper']}>
					{this.renderPagination()}
				</div>
			</div>
		);
		//</editor-fold>
	};

	renderBottom = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderBottom">

		return (
			<div className={classNames['bottom-wrapper']}>
				<div className={classNames['bottom-left-wrapper']}>
					{this.renderInfo()}
				</div>
				<div className={classNames['bottom-right-wrapper']}>
					{this.renderPagination()}
				</div>
			</div>
		);
		//</editor-fold>
	};

	renderTable = () => {
		//<editor-fold defaultstate="collapsed" desc="renderTable">
		const {
			id,
			columns,
			columnRenderers,
			componentsProps,
			preventColumnsCollapse,
			Table,
		} = this.props;

		const tableProps = get(componentsProps, 'table', {});
		const headerCellProps = get(componentsProps, 'headerCell', {});
		const rowProps = get(componentsProps, 'row', {});
		const hiddenRowProps = get(componentsProps, 'hiddenRow', {});
		const loaderProps = get(componentsProps, 'loader', {});
		const bodyProps = get(componentsProps, 'body', {});

		tableProps.id = id;
		tableProps.preventColumnsCollapse = preventColumnsCollapse;
		tableProps.columns = columns;
		tableProps.columnRenderers = columnRenderers;
		tableProps.headerCellProps = headerCellProps;
		tableProps.rowProps = rowProps;
		tableProps.hiddenRowProps = hiddenRowProps;
		tableProps.loaderProps = loaderProps;
		tableProps.bodyProps = bodyProps;

		return <Table {...tableProps} />;
		//</editor-fold>
	};

	renderInfo = () => {
		//<editor-fold defaultstate="collapsed" desc="renderInfo">
		const { id, componentsProps } = this.props;

		const infoProps = get(componentsProps, 'info', {});
		infoProps.id = id;

		return <Info {...infoProps} />;
		//</editor-fold>
	};

	renderPagination = () => {
		//<editor-fold defaultstate="collapsed" desc="renderPagination">
		const { id, componentsProps, callbacks, Pagination } = this.props;

		const paginationProps = get(componentsProps, 'pagination', {});
		paginationProps.id = id;
		paginationProps.callbacks = callbacks;

		return <Pagination {...paginationProps} />;
		//</editor-fold>
	};

	renderSearch = () => {
		//<editor-fold defaultstate="collapsed" desc="renderSearch">
		const { id, componentsProps, Search } = this.props;

		const searchProps = get(componentsProps, 'search', {});
		searchProps.id = id;

		return <Search {...searchProps} />;
		//</editor-fold>
	};

	renderLength = () => {
		//<editor-fold defaultstate="collapsed" desc="renderLength">
		const { id, componentsProps, Length } = this.props;

		const lengthProps = get(componentsProps, 'length', {});
		lengthProps.id = id;

		return <Length {...lengthProps} />;
		//</editor-fold>
	};

	renderControls = () => {
		//<editor-fold defaultstate="collapsed" desc="renderControls">
		const { id, componentsProps, columns, filters, callbacks, Controls } =
			this.props;

		const controlsProps = get(componentsProps, 'controls', {});
		controlsProps.id = id;
		controlsProps.columns = columns;
		controlsProps.filters = filters;
		controlsProps.callbacks = callbacks;

		return <Controls {...controlsProps} />;
		//</editor-fold>
	};

	renderDataTableSyncWithUrl = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDataTableSyncWithUrl">
		const { mounted } = this.state;
		const {
			id,
			order,
			resultsPerPage,
			columns,
			filters,
			syncWithUrl,
			callbacks,
			initialState,
			DataTableSyncWithUrl,
		} = this.props;

		if (!syncWithUrl || !mounted) {
			return null;
		}

		return (
			<DataTableSyncWithUrl
				id={id}
				order={order}
				resultsPerPage={resultsPerPage}
				columns={columns}
				filters={filters}
				callbacks={callbacks}
				form={this.form}
				initialState={initialState}
			/>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { render, FormProps } = this.props;

		if (isFunction(render)) {
			return (
				<Form ref={this.form} onChange={this.onChange} {...FormProps}>
					{render({
						classNames,
						table: this.renderTable(),
						search: this.renderSearch(),
						length: this.renderLength(),
						controls: this.renderControls(),
						info: this.renderInfo(),
						pagination: this.renderPagination(),
						syncWithUrl: this.renderDataTableSyncWithUrl(),
					})}
				</Form>
			);
		}

		return (
			<Form ref={this.form} onChange={this.onChange} {...FormProps}>
				{this.renderTop(classNames)}
				{this.renderTable()}
				{this.renderBottom(classNames)}
				{this.renderDataTableSyncWithUrl()}
			</Form>
		);
	}
}

DataTable.propTypes = propTypes;

DataTable.defaultProps = defaultProps;

export default DataTable;
