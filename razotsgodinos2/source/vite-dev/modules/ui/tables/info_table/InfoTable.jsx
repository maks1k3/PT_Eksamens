import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Responsive from 'hoc/responsive';

import isJson from 'vendor/misc/isJson';

import styles from './InfoTable.module.less';
import {
	capitalize,
	isArray,
	isFunction,
	isObject,
	isString,
	map,
	toString,
	trim,
} from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	firstColumnWidth: PropTypes.number,
	rows: PropTypes.any,
	// rows: PropTypes.arrayOf(
	// 	PropTypes.shape({
	// 		title: PropTypes.any,
	// 		value: PropTypes.any,
	// 		renderTitle: PropTypes.func,
	// 		renderValue: PropTypes.func,
	// 	}),
	// ).isRequired,

	recursive: PropTypes.bool, //use InfoTable instead of code

	//from hoc
	containerWidth: PropTypes.number,
};

const defaultProps = {
	className: {},
	firstColumnWidth: 200,
	recursive: false,
};

class InfoTable extends Component {
	constructor(props) {
		super(props);
	}

	renderTitle = (title) => {
		//<editor-fold defaultstate="collapsed" desc="renderTitle">
		if (!isString(title)) {
			return title;
		}

		return capitalize(trim(toString(title))).replace(/_/g, ' ');
		//</editor-fold>
	};

	renderValue = (value) => {
		//<editor-fold defaultstate="collapsed" desc="renderValue">
		const classNames = this.classNames;
		const { recursive } = this.props;

		if (isJson(value)) {
			value = JSON.parse(value);
		}

		if (!isString(value) && !React.isValidElement(value)) {
			if (isObject(value)) {
				if (!recursive) {
					value = (
						<pre className={classNames['code']}>
							{JSON.stringify(value, null, 2)}
						</pre>
					);
				} else {
					const rows = map(value, (value, key) => {
						return {
							title: key,
							value: value,
						};
					});
					value = <InfoTable recursive={true} rows={rows} />;
				}
			} else {
				value = toString(value);
			}
		}

		return value;
		//</editor-fold>
	};

	renderRows = () => {
		//<editor-fold defaultstate="collapsed" desc="renderRows">
		const { rows } = this.props;

		let _rows = rows;

		if (!isArray(rows)) {
			_rows = map(rows, (v, k) => {
				return {
					title: k,
					value: v,
				};
			});
		}

		return map(_rows, this.renderRow);
		//</editor-fold>
	};

	renderRow = (row) => {
		//<editor-fold defaultstate="collapsed" desc="renderRow">
		const { firstColumnWidth, containerWidth } = this.props;
		let { title, value } = row;
		const { renderTitle, renderValue } = row;

		title = isFunction(renderTitle)
			? renderTitle(title)
			: this.renderTitle(title);
		value = isFunction(renderValue)
			? renderValue(value)
			: this.renderValue(value);

		if (containerWidth >= 500 || containerWidth === 0) {
			return this.renderDesktop({
				title,
				value,
				firstColumnWidth,
				containerWidth,
			});
		} else {
			return this.renderMobile({ title, value, containerWidth });
		}
		//</editor-fold>
	};

	renderDesktop = ({ title, value, firstColumnWidth, containerWidth }) => {
		//<editor-fold defaultstate="collapsed" desc="renderDesktop">
		const classNames = this.classNames;

		containerWidth = containerWidth - 8 * 4; //remove paddings
		let title_style = {
			width: firstColumnWidth + 'px',
		};

		let value_style = {
			width: containerWidth - firstColumnWidth + 'px',
		};

		return (
			<tr key={title}>
				<td>
					<div style={title_style} className={classNames['title']}>
						{title}
					</div>
				</td>
				<td>
					<div style={value_style} className={classNames['value']}>
						{value}
					</div>
				</td>
			</tr>
		);
		//</editor-fold>
	};

	renderMobile = ({ title, value, containerWidth }) => {
		//<editor-fold defaultstate="collapsed" desc="renderDesktop">
		const classNames = this.classNames;

		containerWidth = containerWidth - 8 * 2; //remove paddings
		let style = {
			width: containerWidth + 'px',
		};
		let rows = [];
		rows.push(
			<tr key="title">
				<td>
					<div style={style} className={classNames['title']}>
						{title}
					</div>
				</td>
			</tr>,
		);
		rows.push(
			<tr key="value">
				<td>
					<div style={style} className={classNames['value']}>
						{value}
					</div>
				</td>
			</tr>,
		);

		return rows;
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		return (
			<table className={classNames['wrapper']}>
				<tbody>{this.renderRows()}</tbody>
			</table>
		);
	}
}

InfoTable.propTypes = propTypes;

InfoTable.defaultProps = defaultProps;

InfoTable = Responsive()(InfoTable);

export default InfoTable;
