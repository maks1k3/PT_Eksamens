import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import WithLocale from './WithLocale';

import Row from './Row';
import HiddenRow from './HiddenRow';

import styles from './Body.module.less';
import { forEach } from 'lodash-es';

const propTypes = {
	id: PropTypes.string.isRequired,
	classNames: PropTypes.object,
	columns: PropTypes.array,
	columnRenderers: PropTypes.object,
	noResultsText: PropTypes.string,
	rowProps: PropTypes.object,
	hiddenRowProps: PropTypes.object,

	//from ui
	rows: PropTypes.array,
	responsiveColumnsToHide: PropTypes.array,
};

const defaultProps = {
	columns: [],
	columnRenderers: {},
	classNames: {},
	noResultsText: 'No results',
	rowProps: {},
	hiddenRowProps: {},

	//from ui
	rows: [],
	responsiveColumnsToHide: [],
};

const uiProps = (ownProps) => {
	return {
		[ownProps.id]: {
			responsiveColumnsToHide: 'responsiveColumnsToHide',
			ids: 'rows',
		},
	};
};

class Body extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderRows = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderRows">
		const {
			id,
			rows,
			columns,
			columnRenderers,
			responsiveColumnsToHide,
			rowProps,
			hiddenRowProps,
		} = this.props;

		if (rows.length === 0) {
			return this.renderNoResults(classNames);
		}

		const hasHiddenRows = responsiveColumnsToHide.length > 0;

		const result = [];

		forEach(rows, (row, index) => {
			result.push(
				<Row
					key={row}
					id={id}
					rowId={row}
					columns={columns}
					columnRenderers={columnRenderers}
					{...rowProps}
				/>,
			);

			if (hasHiddenRows) {
				result.push(
					<HiddenRow
						key={`${row}-${index}`}
						id={id}
						rowId={row}
						columns={columns}
						columnRenderers={columnRenderers}
						{...hiddenRowProps}
					/>,
				);
			}
		});

		return result;
		//</editor-fold>
	};

	renderNoResults = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderNoResults">
		const { noResultsText, columns } = this.props;

		const className = _g.classNames(
			classNames['cell'],
			classNames['no-results'],
		);
		return (
			<tr className={classNames.odd}>
				<td className={className} colSpan={columns.length}>
					{noResultsText}
				</td>
			</tr>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		return <tbody>{this.renderRows(classNames)}</tbody>;
	}
}

Body.propTypes = propTypes;

Body.defaultProps = defaultProps;

Body = WithLocale(Body);

Body = WithUi(uiProps)(Body);

export default Body;
