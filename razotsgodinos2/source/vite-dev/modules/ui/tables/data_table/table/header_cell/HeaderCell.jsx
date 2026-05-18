import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import styles from './HeaderCell.module.less';
import { get, isFunction, isUndefined } from 'lodash-es';

const propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	classNames: PropTypes.object,
	title: PropTypes.string,
	sortable: PropTypes.bool,
	style: PropTypes.object,
	customRenderer: PropTypes.object,

	//from ui
	sort: PropTypes.oneOf(['asc', 'desc']),
};

const defaultProps = {
	classNames: {},
	sortable: true,
	customRenderer: {},
};

const uiProps = (ownProps) => {
	return {
		[ownProps.id]: {
			order: {
				[ownProps.name]: 'sort',
			},
		},
	};
};

class HeaderCell extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Events
	 *
	 * ========================================================================*/

	onClick = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		const { id, name, sortable, sort } = this.props;
		if (!sortable) {
			return;
		}
		uiStore.set(`${id}.page`, 1);
		if (e.ctrlKey || e.shiftKey) {
			uiStore.update(`${id}.order`, {
				[name]: sort === 'asc' ? 'desc' : 'asc',
			});
		} else {
			uiStore.set(`${id}.order`, {
				[name]: sort === 'asc' ? 'desc' : 'asc',
			});
		}
		ee.trigger(events.datatable.updateUrl, { id: id });
		ee.trigger(events.datatable.refresh, { id: id });
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { title, sortable, sort, style, customRenderer, name } = this.props;

		const className = _g.classNames(
			classNames['wrapper'],
			{ [classNames['sortable']]: sortable },
			{ [classNames['sort']]: sortable && isUndefined(sort) },
			{ [classNames['sort_asc']]: sortable && sort === 'asc' },
			{ [classNames['sort_desc']]: sortable && sort === 'desc' },
		);

		let content = title;
		const render = get(customRenderer, name);

		if (isFunction(render)) {
			content = render();
		}

		return (
			<th className={className} onClick={this.onClick} style={style}>
				{content}
			</th>
		);
	}
}

HeaderCell.propTypes = propTypes;

HeaderCell.defaultProps = defaultProps;

export default WithUi(uiProps)(HeaderCell);
