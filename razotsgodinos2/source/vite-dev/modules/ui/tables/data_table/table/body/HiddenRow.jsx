import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import styles from './HiddenRow.module.less';

const propTypes = {
	id: PropTypes.string.isRequired,
	rowId: PropTypes.any.isRequired,
	columns: PropTypes.array,
	columnRenderers: PropTypes.object,
	classNames: PropTypes.object,

	//from ui
	row: PropTypes.object,
	columnsVisibility: PropTypes.object,
	responsiveColumnsToHide: PropTypes.array,
};

const defaultProps = {
	columns: [],
	columnRenderers: {},
	classNames: {},

	//from ui
	row: {},
	columnsVisibility: {},
	responsiveColumnsToHide: [],
};

const uiProps = (ownProps) => {
	return {
		[ownProps.id]: {
			columnsVisibility: 'columnsVisibility',
			responsiveColumnsToHide: 'responsiveColumnsToHide',
			rows: {
				[ownProps.rowId]: 'row',
			},
		},
	};
};

class HiddenRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
		this.mounted = false;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		ee.on(events.datatable.refresh, this.onRefresh);
		ee.on(events.datatable.firstColumnClick, this.onFirstColumnClick);
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		ee.off(events.datatable.refresh, this.onRefresh);
		ee.off(events.datatable.firstColumnClick, this.onFirstColumnClick);
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onRefresh = ({ id }) => {
		//<editor-fold defaultstate="collapsed" desc="onRefresh">
		if (id !== this.props.id) {
			return;
		}

		if (!this.mounted) {
			return;
		}

		if (this.state.show) {
			this.setState({
				show: false,
			});
		}
		//</editor-fold>
	};

	onFirstColumnClick = ({ id, rowId }) => {
		//<editor-fold defaultstate="collapsed" desc="onFirstColumnClick">
		if (id != this.props.id || rowId != this.props.rowId) {
			return;
		}

		if (!this.mounted) {
			return;
		}

		this.setState({
			show: !this.state.show,
		});
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	renderList = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderList">
		const { columns, columnsVisibility, responsiveColumnsToHide } = this.props;

		const items = [];

		_.forEachRight(responsiveColumnsToHide, (column) => {
			const { name, title } = _.find(columns, ['name', column]);

			if (_.get(columnsVisibility, name, '1') === '0') {
				return null;
			}

			items.push(
				<li key={name} className={classNames['item']}>
					<span className={classNames['title']}>{title}</span>
					<span className={classNames['value']}>
						{this.renderListItem(name)}
					</span>
				</li>,
			);
		});

		return <ul className={classNames['list']}>{items}</ul>;
		//</editor-fold>
	};

	renderListItem = (name) => {
		//<editor-fold defaultstate="collapsed" desc="renderListItem">
		const { row, columnRenderers } = this.props;

		const id = _.get(row, 'id', 0);
		const cell = _.get(row, name, '');
		const render = _.get(columnRenderers, name);

		if (_.isFunction(render)) {
			return render({ id, cell, row });
		}

		return cell;
		//</editor-fold>
	};

	render() {
		const { show } = this.state;

		if (!show) {
			return null;
		}

		const classNames = _g.getClassNames(styles, this.props.classNames);

		const { columns, responsiveColumnsToHide } = this.props;

		let colSpan = columns.length - responsiveColumnsToHide.length;

		if (colSpan <= 0) {
			colSpan = 1;
		}

		return (
			<tr>
				<td className={classNames['cell']} colSpan={colSpan}>
					{this.renderList(classNames)}
				</td>
			</tr>
		);
	}
}

HiddenRow.propTypes = propTypes;

HiddenRow.defaultProps = defaultProps;

HiddenRow = WithUi(uiProps)(HiddenRow);

export default HiddenRow;
