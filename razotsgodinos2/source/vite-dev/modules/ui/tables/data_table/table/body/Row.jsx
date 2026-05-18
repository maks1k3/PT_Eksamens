import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import styles from './Row.module.less';
import { get, isFunction, map } from 'lodash-es';

const propTypes = {
	id: PropTypes.string.isRequired,
	rowId: PropTypes.any.isRequired,
	columns: PropTypes.array,
	columnRenderers: PropTypes.object,
	classNames: PropTypes.object,
	customStyling: PropTypes.func,

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

class Row extends Component {
	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.mounted = false;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;

		ee.on(events.datatable.firstColumnClick, this.onFirstColumnClick);
		ee.on(events.datatable.closeHiddenRows, this.onCloseHiddenRows);
		ee.on(events.datatable.refresh, this.onRefresh);
		ee.on(events.browserWindow.widthChange, this.onBrowserWindowResize);
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;

		ee.off(events.datatable.firstColumnClick, this.onFirstColumnClick);
		ee.off(events.datatable.closeHiddenRows, this.onCloseHiddenRows);
		ee.off(events.datatable.refresh, this.onRefresh);
		ee.off(events.browserWindow.widthChange, this.onBrowserWindowResize);
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onBrowserWindowResize = () => {
		//<editor-fold defaultstate="collapsed" desc="onBrowserWindowResize">
		if (!this.mounted) {
			return;
		}

		if (this.state.opened) {
			this.setState({
				opened: false,
			});
		}
		//</editor-fold>
	};

	onRefresh = ({ id }) => {
		//<editor-fold defaultstate="collapsed" desc="onRefresh">
		if (id !== this.props.id) {
			return;
		}

		if (!this.mounted) {
			return;
		}

		if (this.state.opened) {
			this.setState({
				opened: false,
			});
		}
		//</editor-fold>
	};

	onCloseHiddenRows = ({ id }) => {
		//<editor-fold defaultstate="collapsed" desc="onCloseHiddenRows">
		if (id !== this.props.id) {
			return;
		}

		if (!this.mounted) {
			return;
		}

		if (this.state.opened) {
			this.setState({
				opened: false,
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
			opened: !this.state.opened,
		});

		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderCell = (name) => {
		//<editor-fold defaultstate="collapsed" desc="renderCell">
		const { row, columnRenderers } = this.props;

		const id = get(row, 'id', 0);
		const cell = get(row, name, '');
		const render = get(columnRenderers, name);

		if (isFunction(render)) {
			return render({ id, cell, row });
		}

		return cell;
		//</editor-fold>
	};

	renderRows = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderRows">
		const { columns, columnsVisibility, responsiveColumnsToHide } = this.props;

		return map(columns, (column) => {
			const { name, style } = column;

			if (get(columnsVisibility, name, '1') === '0') {
				return null;
			}

			if (_g.inArray(name, responsiveColumnsToHide)) {
				return null;
			}

			return (
				<td
					key={name}
					className={classNames['cell']}
					style={style}
					data-type="cell">
					{this.renderCell(name)}
				</td>
			);
		});
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { row, responsiveColumnsToHide, customStyling } = this.props;
		const id = get(row, 'id', 0);

		const hasHiddenColumns = responsiveColumnsToHide.length > 0;
		const { opened } = this.state;

		let className = _g.classNames(
			{ [classNames['has-collapsed']]: hasHiddenColumns },
			{ [classNames['collapsed']]: hasHiddenColumns && !opened },
			{ [classNames['opened']]: hasHiddenColumns && opened },
		);

		let extra = {};

		if (isFunction(customStyling)) {
			extra = customStyling({ row, Row: this });
		}

		return (
			<tr className={className} data-id={id} data-type="row" {...extra}>
				{this.renderRows(classNames)}
			</tr>
		);
	}
}

Row.propTypes = propTypes;

Row.defaultProps = defaultProps;

export default WithUi(uiProps)(Row);
