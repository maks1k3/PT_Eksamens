import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import HeaderCell from './header_cell';
import Loader from './loader';
import Body from './body';

import styles from './Table.module.less';
import { forEachRight, get, has, isFunction, map, round } from 'lodash-es';

const propTypes = {
	id: PropTypes.string.isRequired,
	preventColumnsCollapse: PropTypes.bool,
	columns: PropTypes.array,
	columnRenderers: PropTypes.object,
	classNames: PropTypes.object,
	headerCellProps: PropTypes.object,
	rowProps: PropTypes.object,
	hiddenRowProps: PropTypes.object,
	loaderProps: PropTypes.object,
	bodyProps: PropTypes.object,
	customFooterRenderer: PropTypes.object,
	showHeader: PropTypes.bool,
	showFooter: PropTypes.bool,

	//from ui
	columnsVisibility: PropTypes.object,
	responsiveColumnsToHide: PropTypes.array,
};

const defaultProps = {
	columns: [],
	classNames: {},
	headerCellProps: {},
	rowProps: {},
	hiddenRowProps: {},
	loaderProps: {},
	bodyProps: {},
	customFooterRenderer: {},
	showHeader: true,
	showFooter: true,
	preventColumnsCollapse: false,

	//from ui
	columnsVisibility: {},
	responsiveColumnsToHide: [],
};

const uiProps = (ownProps) => {
	return {
		[ownProps.id]: {
			columnsVisibility: 'columnsVisibility',
			responsiveColumnsToHide: 'responsiveColumnsToHide',
		},
	};
};

class Table extends Component {
	constructor(props) {
		super(props);
		this.container = React.createRef();
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">

		const { id } = this.props;

		const selector = `table[data-id=${id}] tbody tr[data-type=row] td[data-type=cell]`;

		$(document).on('click.' + id, selector, function () {
			const position = $(this).index();
			if (position !== 0) {
				return;
			}

			const rowId = $(this).closest('tr').attr('data-id');

			ee.trigger(events.datatable.firstColumnClick, { id, rowId: rowId });
		});

		ee.on(events.datatable.resize, this.onResize);
		ee.on(events.browserWindow.widthChange, this.onBrowserWindowResize);
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		const { id } = this.props;
		ee.off(events.datatable.resize, this.onResize);
		ee.off(events.browserWindow.widthChange, this.onBrowserWindowResize);
		$(document).off('click.' + id);
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	resize = () => {
		//<editor-fold defaultstate="collapsed" desc="resize">
		const { id, preventColumnsCollapse } = this.props;

		if (preventColumnsCollapse) {
			return;
		}

		if (!this.container.current) {
			return;
		}

		const { columns } = this.props;

		const classNames = _g.getClassNames(styles, this.props.classNames);

		const containerWidth = round($(this.container.current).width());

		const footer = $(this.container.current).find(
			`.${classNames['footer-cell']}`,
		);
		let columnsWidth = 0;
		const columnsWidths = {};

		footer.each(function () {
			let name = $(this).attr('data-name');
			let width = $(this).outerWidth();

			columnsWidth = columnsWidth + width;
			columnsWidths[name] = width;
		});

		columnsWidth = round(columnsWidth);

		let remainingWidth = columnsWidth;
		const columnsToHide = [];
		const extraSpace = 16; //close icon width
		let first = true;
		if (containerWidth < columnsWidth) {
			forEachRight(columns, (column) => {
				if (
					get(column, 'isHidable', true) &&
					has(columnsWidths, column.name) &&
					containerWidth < remainingWidth
				) {
					columnsToHide.push(column.name);
					if (first) {
						first = false;
						remainingWidth = remainingWidth + extraSpace;
					}
					remainingWidth = remainingWidth - columnsWidths[column.name];
				}
			});
		}

		uiStore.set(`${id}.responsiveColumnsToHide`, columnsToHide);
		//</editor-fold>
	};

	onResize = ({ id }) => {
		//<editor-fold defaultstate="collapsed" desc="onResize">
		if (id !== this.props.id) {
			return;
		}

		this.resize();
		//</editor-fold>
	};

	onBrowserWindowResize = () => {
		//<editor-fold defaultstate="collapsed" desc="onBrowserWindowResize">
		const { id } = this.props;
		uiStore.set(`${id}.responsiveColumnsToHide`, []);

		setTimeout(() => {
			this.resize();
		}, 100);
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderHeader = () => {
		//<editor-fold defaultstate="collapsed" desc="renderHeader">
		const {
			columns,
			id,
			headerCellProps,
			columnsVisibility,
			responsiveColumnsToHide,
		} = this.props;

		return map(columns, (column) => {
			const { name } = column;

			if (get(columnsVisibility, name, '1') === '0') {
				return null;
			}

			if (_g.inArray(name, responsiveColumnsToHide)) {
				return null;
			}

			return <HeaderCell key={name} {...column} id={id} {...headerCellProps} />;
		});
		//</editor-fold>
	};

	renderFooter = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderFooter">
		const {
			columns,
			columnsVisibility,
			responsiveColumnsToHide,
			customFooterRenderer,
			showFooter,
		} = this.props;
		return map(columns, (column) => {
			const { name, title, style } = column;
			const render = get(customFooterRenderer, name);

			if (get(columnsVisibility, name, '1') === '0') {
				return null;
			}

			if (_g.inArray(name, responsiveColumnsToHide)) {
				return null;
			}

			let content = '';

			if (showFooter) {
				content = title;
			}

			if (isFunction(render)) {
				content = render();
			}

			let className = _g.classNames(classNames['footer-cell'], {
				[classNames['footer-cell_invisible']]: !showFooter,
			});

			return (
				<th key={name} data-name={name} className={className} style={style}>
					{content}
				</th>
			);
		});
		//</editor-fold>
	};

	renderBody = () => {
		//<editor-fold defaultstate="collapsed" desc="renderBody">
		const {
			columns,
			columnRenderers,
			id,
			bodyProps,
			rowProps,
			hiddenRowProps,
		} = this.props;
		return (
			<Body
				id={id}
				columns={columns}
				columnRenderers={columnRenderers}
				rowProps={rowProps}
				hiddenRowProps={hiddenRowProps}
				{...bodyProps}
			/>
		);
		//</editor-fold>
	};

	renderLoader = () => {
		//<editor-fold defaultstate="collapsed" desc="renderLoader">
		const { id, loaderProps } = this.props;
		return <Loader id={id} {...loaderProps} />;
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { id, showHeader, showFooter, preventColumnsCollapse } = this.props;

		let footerClassName = _g.classNames({
			[classNames['invisible-footer']]: !showFooter,
		});

		if (_g.isEmpty(footerClassName)) {
			footerClassName = undefined;
		}

		const className = _g.classNames(classNames['wrapper'], {
			[classNames['wrapper_overflow-scroll']]: preventColumnsCollapse,
		});

		return (
			<div ref={this.container} className={className}>
				<table className={classNames['table']} data-id={id}>
					{showHeader && (
						<thead>
							<tr>{this.renderHeader()}</tr>
						</thead>
					)}
					<tfoot className={footerClassName}>
						<tr>{this.renderFooter(classNames)}</tr>
					</tfoot>

					{this.renderBody()}
				</table>
				{this.renderLoader()}
			</div>
		);
	}
}

Table.propTypes = propTypes;

Table.defaultProps = defaultProps;

export default WithUi(uiProps)(Table);
