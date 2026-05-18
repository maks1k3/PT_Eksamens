import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import WithLocale from './WithLocale';

import Icon from 'ui/misc/icon';
import FiltersForm from './FiltersForm';
import ColumnsVisibilityForm from './ColumnsVisibilityForm';

import styles from './Controls.module.less';
import { defaults, every, forEach, get, isFunction, omitBy } from 'lodash-es';
import Image from 'ui/media/image';

const propTypes = {
	id: PropTypes.string.isRequired,
	classNames: PropTypes.object,
	enabled: PropTypes.bool,
	options: PropTypes.object,
	columns: PropTypes.array,
	filters: PropTypes.array,
	callbacks: PropTypes.object,
	translations: PropTypes.object,

	//from ui
	isFiltered: PropTypes.bool,
	isColumnsHidden: PropTypes.bool,

	//from locale
	locale: PropTypes.string,
};

const defaultProps = {
	classNames: {},
	enabled: true,
	options: {
		filters: {
			show: true,
			icon: _g.getMainUrl() + 'assets/icons/filter.svg',
			maxWidth: '600px',
			level: 10,
		},
		columnVisibility: {
			show: true,
			icon: _g.getMainUrl() + 'assets/icons/eye.svg',
			maxWidth: '400px',
			level: 10,
		},
		reset: {
			show: true,
			icon: _g.getMainUrl() + 'assets/icons/close.svg',
		},
		refresh: {
			show: true,
			icon: _g.getMainUrl() + 'assets/icons/refresh.svg',
		},
	},
	columns: [],
	filters: [],
	callbacks: {},
	translations: {
		filtersTitle: 'Filters',
		filtersSubmit: 'Filter',
		columnVisibilityTitle: 'Column visibility',
		columnVisibilitySubmit: 'Apply',
		toggleAll: 'Toggle all',
		reset: 'Reset',
		refresh: 'Refresh',
	},

	//from ui
	isFiltered: false,
	isColumnsHidden: false,

	locale: 'en',
};

const uiProps = (ownProps) => {
	return {
		[ownProps.id]: {
			isFiltered: 'isFiltered',
			isColumnsHidden: 'isColumnsHidden',
		},
	};
};

class Controls extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Events
	 *
	 * ========================================================================*/

	onReset = () => {
		//<editor-fold defaultstate="collapsed" desc="onReset">
		const { id } = this.props;
		ee.trigger(events.datatable.reset, { id: id });
		//</editor-fold>
	};

	onRefresh = () => {
		//<editor-fold defaultstate="collapsed" desc="onRefresh">
		const { id } = this.props;
		ee.trigger(events.datatable.refresh, { id: id });
		//</editor-fold>
	};

	onFilterSubmit = ({ data, Form }) => {
		//<editor-fold defaultstate="collapsed" desc="onFilterSubmit">
		const onFilterSubmit = get(this.props.callbacks, 'onFilterSubmit');

		const { id, filters, options } = this.props;

		if (isFunction(onFilterSubmit)) {
			onFilterSubmit({ data, Form, id, filters, options, Controls: this });
			return;
		}

		const state = {};

		forEach(filters, (o) => {
			if (get(o, 'optionsFromUrl')) {
				//<editor-fold defaultstate="collapsed" desc="save options">
				const options = Form.fields[o.name].input.getSelectedOptions();

				if (!_g.isEmpty(options)) {
					uiStore.set(`${id}.options.${o.name}`, options);
				}
				//</editor-fold>
			}
		});

		state.page = 1;
		state.isFiltered = !every(data, (o) => o.length === 0);
		state.filters = omitBy(data, (o) => o.length === 0);

		const filtersOptions = defaults(get(options, 'filters', {}), {
			level: 10,
		});

		closePopup({ name: 'universal', level: filtersOptions.level });
		uiStore.update(id, state);

		ee.trigger(events.datatable.updateUrl, { id: id });
		ee.trigger(events.datatable.refresh, { id: id });
		//</editor-fold>
	};

	onColumnVisibilitySubmit = ({ data, Form }) => {
		//<editor-fold defaultstate="collapsed" desc="onColumnVisibilitySubmit">
		const onColumnVisibilitySubmit = get(
			this.props.callbacks,
			'onColumnVisibilitySubmit',
		);

		const { id, options } = this.props;

		if (isFunction(onColumnVisibilitySubmit)) {
			onColumnVisibilitySubmit({ data, Form, id, options, Controls: this });
			return;
		}

		const state = {};

		state.isColumnsHidden = !every(data, (o) => o === '1');
		state.columnsVisibility = omitBy(data, (o) => o === '1');
		state.responsiveColumnsToHide = [];

		const columnVisibilityOptions = defaults(
			get(options, 'columnVisibility', {}),
			{
				level: 10,
			},
		);

		closePopup({ name: 'universal', level: columnVisibilityOptions.level });
		uiStore.update(id, state);

		ee.trigger(events.datatable.updateUrl, { id: id });
		ee.trigger(events.datatable.closeHiddenRows, { id: id });

		setTimeout(() => {
			ee.trigger(events.datatable.resize, { id: id });
		}, 100);
		//</editor-fold>
	};

	onOpenFilter = () => {
		//<editor-fold defaultstate="collapsed" desc="onOpenFilter">
		const { id, options, filters, translations, locale } = this.props;

		const filtersOptions = defaults(get(options, 'filters', {}), {
			maxWidth: '600px',
			level: 10,
		});

		const filtersTitle = get(translations, 'filtersTitle', 'Filters');
		const filtersSubmit = get(translations, 'filtersSubmit', 'Filter');

		openPopup({
			name: 'universal',
			data: {
				id: id,
				filters: filters,
				onSubmit: this.onFilterSubmit,
				submit: filtersSubmit,
				locale: locale,
			},
			settings: {
				maxWidth: filtersOptions.maxWidth,
				title: filtersTitle,
				level: filtersOptions.level,
			},
			component: FiltersForm,
		});
		//</editor-fold>
	};

	onOpenColumnVisibility = () => {
		//<editor-fold defaultstate="collapsed" desc="onOpenColumnVisibility">
		const { id, options, columns, translations } = this.props;

		const columnVisibilityOptions = defaults(
			get(options, 'columnVisibility', {}),
			{
				maxWidth: '400px',
				level: 10,
			},
		);

		const columnVisibilityTitle = get(
			translations,
			'columnVisibilityTitle',
			'Column visibility',
		);
		const columnVisibilitySubmit = get(
			translations,
			'columnVisibilitySubmit',
			'Apply',
		);
		const toggleAll = get(translations, 'toggleAll', 'Toggle all');

		openPopup({
			name: 'universal',
			data: {
				id: id,
				columns: columns,
				submit: columnVisibilitySubmit,
				toggleAll: toggleAll,
				onSubmit: this.onColumnVisibilitySubmit,
			},
			settings: {
				maxWidth: columnVisibilityOptions.maxWidth,
				title: columnVisibilityTitle,
				level: columnVisibilityOptions.level,
			},
			component: ColumnsVisibilityForm,
		});
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderFilters = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderFilters">
		const { isFiltered, isColumnsHidden, options, translations } = this.props;

		const filtersOptions = get(options, 'filters', {
			show: true,
			icon: {
				provider: 'fa',
				name: 'filter',
			},
		});

		filtersOptions.title = get(translations, 'filtersTitle', 'Filters');
		filtersOptions.onClick = this.onOpenFilter;
		filtersOptions.active = isFiltered;
		filtersOptions.classNames = classNames;

		const columnVisibilityOptions = get(options, 'columnVisibility', {
			show: true,
			icon: {
				provider: 'fa',
				name: 'eye',
			},
		});
		columnVisibilityOptions.title = get(
			translations,
			'columnVisibilityTitle',
			'Column visibility',
		);
		columnVisibilityOptions.onClick = this.onOpenColumnVisibility;
		columnVisibilityOptions.active = isColumnsHidden;
		columnVisibilityOptions.classNames = classNames;

		const resetOptions = get(options, 'reset', {
			show: true,
			icon: {
				provider: 'fa',
				name: 'times',
			},
		});

		resetOptions.title = get(translations, 'reset', 'Reset');
		resetOptions.onClick = this.onReset;
		resetOptions.active = false;
		resetOptions.classNames = classNames;

		const refreshOptions = get(options, 'refresh', {
			show: true,
			icon: {
				provider: 'fa',
				name: 'refresh',
			},
		});

		refreshOptions.title = get(translations, 'refresh', 'Refresh');
		refreshOptions.onClick = this.onRefresh;
		refreshOptions.active = false;
		refreshOptions.classNames = classNames;

		return (
			<div className={`clearfix ${classNames['filters']}`}>
				{filtersOptions.show && this.renderFilterItem(filtersOptions)}

				{columnVisibilityOptions.show &&
					this.renderFilterItem(columnVisibilityOptions)}

				{resetOptions.show && this.renderFilterItem(resetOptions)}

				{refreshOptions.show && this.renderFilterItem(refreshOptions)}
			</div>
		);
		//</editor-fold>
	};

	renderFilterItem = ({ icon, title, onClick, active, classNames }) => {
		//<editor-fold defaultstate="collapsed" desc="renderFilterItem">
		const className = _g.classNames(classNames['item'], {
			[classNames['item_active']]: active,
		});

		return (
			<div className={`${className}`} title={title} onClick={onClick}>
				<Image className={classNames} style={{ width: '0.9rem' }} src={icon} />
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { enabled } = this.props;

		if (!enabled) {
			return null;
		}

		return (
			<div className={classNames['wrapper']}>
				{this.renderFilters(classNames)}
			</div>
		);
	}
}

Controls.propTypes = propTypes;

Controls.defaultProps = defaultProps;

Controls = WithLocale(Controls);

export default WithUi(uiProps)(Controls);
