import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Table.module.less';
import { isFunction, map } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,

	bordered: PropTypes.bool,
	hover: PropTypes.bool,

	header: PropTypes.array,
	renderHeader: PropTypes.func,

	footer: PropTypes.array,
	renderFooter: PropTypes.func,

	rows: PropTypes.array,
	renderRows: PropTypes.func,
	renderRow: PropTypes.func,
	renderCell: PropTypes.func,
};

const defaultProps = {
	classNames: {},

	bordered: false,
	hover: false,
};

class Table extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderHeader = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderHeader">
		const { header, renderHeader } = this.props;

		if (_g.isEmpty(header)) {
			return null;
		}

		if (isFunction(renderHeader)) {
			return renderHeader({
				classNames,
				header,
				Table: this,
			});
		}

		const rows = map(header, (item, index) => {
			return <th key={index}>{item}</th>;
		});

		return (
			<thead>
				<tr className={classNames['header']}>{rows}</tr>
			</thead>
		);
		//</editor-fold>
	};

	renderFooter = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderFooter">
		const { footer, renderFooter } = this.props;

		if (_g.isEmpty(footer)) {
			return null;
		}

		if (isFunction(renderFooter)) {
			return renderFooter({
				classNames,
				footer,
				Table: this,
			});
		}

		const rows = map(footer, (item, index) => {
			return <th key={index}>{item}</th>;
		});

		return (
			<tfoot>
				<tr className={classNames['footer']}>{rows}</tr>
			</tfoot>
		);
		//</editor-fold>
	};

	renderRows = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderRows">
		const { rows, renderRows } = this.props;

		if (_g.isEmpty(rows)) {
			return null;
		}

		if (isFunction(renderRows)) {
			return renderRows({
				classNames,
				rows,
				renderRow: this.renderRow,
				Table: this,
			});
		}

		const _rows = map(rows, (row, index) => {
			return this.renderRow({ classNames, row, index });
		});

		return <tbody>{_rows}</tbody>;
		//</editor-fold>
	};

	renderRow = ({ classNames, row, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderRow">
		const { renderRow } = this.props;

		if (isFunction(renderRow)) {
			return renderRow({
				classNames,
				row,
				index,
				renderCell: this.renderCell,
				Table: this,
			});
		}

		const cells = map(row, (cell, index) => {
			return this.renderCell({ classNames, cell, index });
		});

		return (
			<tr key={index} className={classNames['row']}>
				{cells}
			</tr>
		);
		//</editor-fold>
	};

	renderCell = ({ classNames, cell, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderCell">
		const { renderCell } = this.props;

		if (isFunction(renderCell)) {
			return renderCell({
				classNames,
				cell,
				index,
				Table: this,
			});
		}

		return <td key={index}>{cell}</td>;
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		const { bordered, hover } = this.props;

		const className = _g.classNames(
			classNames['table'],
			{ [classNames['table_bordered']]: bordered },
			{ [classNames['table_hover']]: hover },
		);

		return (
			<div className={classNames['wrapper']}>
				<table className={className}>
					{this.renderHeader(classNames)}
					{this.renderFooter(classNames)}
					{this.renderRows(classNames)}
				</table>
			</div>
		);
	}
}

Table.propTypes = propTypes;

Table.defaultProps = defaultProps;

export default Table;
