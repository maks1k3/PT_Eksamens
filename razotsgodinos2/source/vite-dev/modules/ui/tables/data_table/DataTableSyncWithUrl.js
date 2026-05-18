import { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import rison from 'rison';
import WithStore from 'hoc/store';
import { defaultsDeep, forEach, get, isFunction, toString } from 'lodash-es';

const propTypes = {
	id: PropTypes.string.isRequired,
	columns: PropTypes.array,
	filters: PropTypes.array,
	order: PropTypes.object,
	resultsPerPage: PropTypes.number,
	callbacks: PropTypes.object,
	form: PropTypes.any,
	initialState: PropTypes.object,

	//from store
	currentFromUrl: PropTypes.string,
	action: PropTypes.string,
};

const defaultProps = {
	columns: [],
	filters: [],
	resultsPerPage: 10,
	order: {},
	callbacks: {},
	initialState: {},

	//from store
	currentFromUrl: '',
};

const storeProps = (ownProps) => {
	return {
		navigation: {
			current: {
				action: 'action',
				params: {
					[ownProps.id]: 'currentFromUrl',
				},
			},
		},
	};
};

class DataTableSyncWithUrl extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { currentFromUrl } = this.props;

		if (!_g.isEmpty(currentFromUrl)) {
			this.updateFromUrl(rison.decode(currentFromUrl));
		} else {
			this.init();
		}

		ee.on(events.datatable.updateUrl, this.onUrlUpdate);
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (
			prevProps.currentFromUrl !== this.props.currentFromUrl &&
			this.props.action === 'POP'
		) {
			if (!_g.isEmpty(this.props.currentFromUrl)) {
				this.updateFromUrl(rison.decode(this.props.currentFromUrl));
			}
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		ee.off(events.datatable.updateUrl, this.onUrlUpdate);
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Events
	 *
	 * ========================================================================*/

	onUrlUpdate = ({ id }) => {
		//<editor-fold defaultstate="collapsed" desc="onUrlUpdate">
		if (id !== this.props.id) {
			return;
		}

		this.updateUrl();
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	init = () => {
		//<editor-fold defaultstate="collapsed" desc="init">
		const onSyncWithUrlInit = get(this.props.callbacks, 'onSyncWithUrlInit');

		const { id, order, resultsPerPage, form, initialState } = this.props;

		if (isFunction(onSyncWithUrlInit)) {
			onSyncWithUrlInit({
				id,
				order,
				resultsPerPage,
				form,
				initialState,
				DataTableSyncWithUrl: this,
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

		state = defaultsDeep(_g.cloneDeep(initialState), _g.cloneDeep(state));

		form.current.update({
			search: '',
			length: toString(resultsPerPage),
		});

		forEach(order, (direction, name) => {
			state.order[name] = direction;
		});

		uiStore.set(id, state);
		this.updateUrl();
		ee.trigger(events.datatable.refresh, { id: id });
		//</editor-fold>
	};

	updateFromUrl = (params) => {
		//<editor-fold defaultstate="collapsed" desc="updateFromUrl">
		const onUpdateFromUrl = get(this.props.callbacks, 'onUpdateFromUrl');

		const { id, form } = this.props;

		if (isFunction(onUpdateFromUrl)) {
			onUpdateFromUrl({ params, id, form, DataTableSyncWithUrl: this });
			return;
		}

		const state = {};
		state.search = get(params, 'search', '');
		state.page = get(params, 'page', 1);
		state.filters = get(params, 'filters', {});
		state.columnsVisibility = get(params, 'columnsVisibility', {});
		state.order = get(params, 'order', {});
		state.isFiltered = get(params, 'isFiltered', false);
		state.isColumnsHidden = get(params, 'isColumnsHidden', false);
		state.resultsPerPage = get(params, 'resultsPerPage', 10);
		state.options = get(params, 'options', {});

		form.current.update({
			search: toString(state.search),
			length: toString(state.resultsPerPage),
		});

		uiStore.update(id, state);
		ee.trigger(events.datatable.refresh, { id: id });
		//</editor-fold>
	};

	updateUrl = () => {
		//<editor-fold defaultstate="collapsed" desc="updateUrl">
		const onUpdateUrl = get(this.props.callbacks, 'onUpdateUrl');

		const { id } = this.props;

		if (isFunction(onUpdateUrl)) {
			onUpdateUrl({ id, DataTableSyncWithUrl: this });
			return;
		}

		const store = uiStore.get(id);

		const state = {};

		const search = get(store, 'search', '');

		if (!_g.isEmpty(search)) {
			state.search = search;
		}

		const page = get(store, 'page', 1);

		if (page !== 1) {
			state.page = page;
		}

		const filters = get(store, 'filters', {});

		if (!_g.isEmpty(filters)) {
			state.filters = filters;
		}

		const columnsVisibility = get(store, 'columnsVisibility', {});

		if (!_g.isEmpty(columnsVisibility)) {
			state.columnsVisibility = columnsVisibility;
		}

		const order = get(store, 'order', {});

		if (!_g.isEmpty(order)) {
			state.order = order;
		}

		const isFiltered = get(store, 'isFiltered', {});

		if (!_g.isEmpty(isFiltered)) {
			state.isFiltered = isFiltered;
		}

		const isColumnsHidden = get(store, 'isColumnsHidden', false);

		if (isColumnsHidden !== false) {
			state.isColumnsHidden = isColumnsHidden;
		}

		const resultsPerPage = get(store, 'resultsPerPage', 10);

		if (resultsPerPage !== 10) {
			state.resultsPerPage = resultsPerPage;
		}

		const options = get(store, 'options', {});

		if (options !== {}) {
			state.options = options;
		}

		navigation.updateParamKey(id, rison.encode(state));
		//</editor-fold>
	};

	render() {
		return null;
	}
}

DataTableSyncWithUrl.propTypes = propTypes;

DataTableSyncWithUrl.defaultProps = defaultProps;

export default WithStore(storeProps)(DataTableSyncWithUrl);
