import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import PaginationUi from 'ui/controls/pagination';

import styles from './Pagination.module.less';
import { get, isFunction } from 'lodash-es';

const propTypes = {
	id: PropTypes.string.isRequired,
	PaginationProps: PropTypes.object,
	classNames: PropTypes.object,
	callbacks: PropTypes.object,

	//from ui
	page: PropTypes.number,
	total: PropTypes.number,
	lastPage: PropTypes.number,
};

const defaultProps = {
	classNames: {},
	callbacks: {},

	//from ui
	page: 1,
	lastPage: 0,
};

const uiProps = (ownProps) => {
	return {
		[ownProps.id]: {
			page: 'page',
			lastPage: 'lastPage',
		},
	};
};

class Pagination extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onPageChange = ({ page }) => {
		//<editor-fold defaultstate="collapsed" desc="onPageChange">
		const onPageChange = get(this.props.callbacks, 'onPageChange');

		const { id } = this.props;

		if (isFunction(onPageChange)) {
			onPageChange({ page, id, DataTable: this });
			return;
		}

		uiStore.set(`${id}.page`, page);

		ee.trigger(events.datatable.updateUrl, { id: id });
		ee.trigger(events.datatable.refresh, { id: id });
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { page, lastPage, PaginationProps } = this.props;

		if (lastPage <= 1) {
			return null;
		}

		return (
			<div className={classNames.wrapper}>
				<PaginationUi
					controlled={true}
					onPageChange={this.onPageChange}
					pageCount={lastPage} //total number of pages
					pageRangeDisplayed={3} //range of pages displayed
					marginPagesDisplayed={2} //number of pages to display for margins
					page={page}
					{...PaginationProps}
				/>
			</div>
		);
	}
}

Pagination.propTypes = propTypes;

Pagination.defaultProps = defaultProps;

Pagination = WithUi(uiProps)(Pagination);

export default Pagination;
