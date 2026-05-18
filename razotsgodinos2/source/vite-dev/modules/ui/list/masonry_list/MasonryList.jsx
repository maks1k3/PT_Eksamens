import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import { fill, isFunction, map, toArray } from 'lodash-es';

const propTypes = {
	getGridProps: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	renderItem: PropTypes.func.isRequired,
	render: PropTypes.func,
	pack: PropTypes.bool, // Flag to force pack on every update
};

const defaultProps = {
	pack: false,
};

class MasonryList extends Component {
	constructor(props) {
		super(props);

		this.container = React.createRef();

		this.containerWidth = 0;
		this.browserWindowWidth = browser_window.width;
		this.browserDevice = browser_window.device;

		this.state = {
			mounted: false,
			containerWidth: 0,
		};

		this.mounted = false;
		this.columns = 1;
		this.gridItemWidth = '100%';
		this.columnHeights = [];
		this.nodes = [];
		this.nodesWidths = [];
		this.nodesHeights = [];
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		const width = this.getContainerWidth();

		this.setState(
			{
				mounted: true,
				containerWidth: width,
			},
			this.init,
		);

		ee.on(events.browserWindow.widthChange, this.onResize);
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		const { items, pack } = this.props;

		if (prevProps.items.length === 0 && items.length === 0) {
			return;
		}

		if (prevProps.items.length === 0 && items.length > 0) {
			return this.pack();
		}

		if (prevProps.items.length > items.length) {
			return this.pack();
		}

		if (prevProps.items.length !== items.length) {
			if (pack) {
				return this.pack();
			} else {
				return this.update();
			}
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		ee.off(events.browserWindow.widthChange, this.onResize);
		//</editor-fold>
	}

	getGridProps = () => {
		//<editor-fold defaultstate="collapsed" desc="getGridProps">
		const { getGridProps } = this.props;

		return getGridProps({
			containerWidth: this.containerWidth,
			browserDevice: this.browserDevice,
			browserWindowWidth: this.browserWindowWidth,
		});
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	init = () => {
		//<editor-fold defaultstate="collapsed" desc="init">
		const { items } = this.props;

		if (items.length > 0) {
			this.pack();
		}
		//</editor-fold>
	};

	pack = () => {
		//<editor-fold defaultstate="collapsed" desc="pack">
		const { containerWidth } = this.state;
		const { gutter, minWidth } = this.getGridProps();

		//pack all nodes
		const columns = this.getGridItemWidth(
			minWidth,
			gutter,
			containerWidth,
		).columns;

		this.columnHeights = fill(new Array(columns), 0);
		this.nodes = toArray(this.container.current.children);
		this.updateLayout();
		//</editor-fold>
	};

	update = () => {
		//<editor-fold defaultstate="collapsed" desc="update">
		//pack only new nodes
		this.nodes = toArray(this.container.current.children).filter(
			(node) => !node.hasAttribute('data-packed'),
		);
		this.updateLayout();
		//</editor-fold>
	};

	getContainerWidth = () => {
		//<editor-fold defaultstate="collapsed" desc="getContainerWidth">
		if (!this.mounted) {
			return this.containerWidth;
		}

		return $(this.container.current).width();
		//</editor-fold>
	};

	getGridItemWidth = (minWidth, gutter, containerWidth) => {
		//<editor-fold defaultstate="collapsed" desc="getGridItemWidth">

		let gridItemWidth = '';
		if (containerWidth <= (minWidth + gutter) * 2) {
			gridItemWidth = '100%';
			this.gridItemWidth = gridItemWidth;
			this.columns = 1;
		} else {
			let columns = Math.floor(containerWidth / minWidth);

			if (gutter === 0) {
				gridItemWidth = Math.round(containerWidth / columns);
			} else {
				gridItemWidth = Math.round(
					(containerWidth - (columns - 1) * gutter) / columns,
				);
			}

			if (gridItemWidth * columns > containerWidth) {
				columns = columns - 1;

				if (gutter === 0) {
					gridItemWidth = Math.round(containerWidth / columns);
				} else {
					gridItemWidth = Math.round(
						(containerWidth - (columns - 1) * gutter) / columns,
					);
				}
			}

			if (gridItemWidth < minWidth) {
				columns = columns - 1;

				if (gutter === 0) {
					gridItemWidth = Math.round(containerWidth / columns);
				} else {
					gridItemWidth = Math.round(
						(containerWidth - (columns - 1) * gutter) / columns,
					);
				}
			}

			gridItemWidth = gridItemWidth + 'px';
			this.gridItemWidth = gridItemWidth;
			this.columns = columns;
		}

		return {
			gridItemWidth,
			columns: this.columns,
		};
		//</editor-fold>
	};

	onResize = ({ width, device }) => {
		//<editor-fold defaultstate="collapsed" desc="onResize">
		if (this.mounted) {
			this.containerWidth = this.getContainerWidth();
			this.browserWindowWidth = width;
			this.browserDevice = device;

			if (this.state.containerWidth !== this.containerWidth) {
				this.setState(
					{
						containerWidth: this.containerWidth,
					},
					this.pack,
				);
			}
		}
		//</editor-fold>
	};

	updateLayout = () => {
		//<editor-fold defaultstate="collapsed" desc="updateLayout">
		if (this.nodes.length === 0) {
			return;
		}

		const { gutter } = this.getGridProps();

		this.nodesWidths = this.nodes.map((element) => element.offsetWidth);
		this.nodesHeights = this.nodes.map((element) => element.offsetHeight);

		let columnTarget, nodeTop, nodeLeft, nodeWidth, nodeHeight;
		this.nodes.forEach((element, index) => {
			if (this.columnHeights.length === 1) {
				element.style.position = '';
				element.style.transform = '';
				element.removeAttribute('data-packed');
				return;
			}

			columnTarget = this.columnHeights.indexOf(
				Math.min.apply(Math, this.columnHeights),
			);

			element.style.position = 'absolute';

			nodeTop = `${this.columnHeights[columnTarget]}px`;
			nodeLeft = `${
				columnTarget * this.nodesWidths[index] + columnTarget * gutter
			}px`;

			element.style.transform = `translate3d(${nodeLeft}, ${nodeTop}, 0)`;

			element.setAttribute('data-packed', '');

			// ignore nodes with no width and/or height
			nodeWidth = this.nodesWidths[index];
			nodeHeight = this.nodesHeights[index];

			if (nodeWidth && nodeHeight) {
				this.columnHeights[columnTarget] += nodeHeight + gutter;
			}
		});

		if (this.columnHeights.length > 1) {
			this.container.current.style.position = 'relative';
			this.container.current.style.width = '100%';
			this.container.current.style.height = `${
				Math.max.apply(Math, this.columnHeights) - gutter
			}px`;
		}

		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderItems = () => {
		//<editor-fold defaultstate="collapsed" desc="renderItems">
		const { items } = this.props;
		const { containerWidth } = this.state;
		const { gutter, minWidth } = this.getGridProps();

		this.gutter = gutter;
		this.minWidth = minWidth;

		this.gridItemWidth = this.getGridItemWidth(
			minWidth,
			gutter,
			containerWidth,
		).gridItemWidth;

		return map(items, this.renderItem);
		//</editor-fold>
	};

	renderItem = (item, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const gridItemWidth = this.gridItemWidth;
		const { renderItem } = this.props;
		const { containerWidth } = this.state;

		return renderItem({
			containerWidth,
			browserWindowWidth: this.browserWindowWidth,
			browserDevice: this.browserDevice,
			gridItemWidth,
			item,
			index,
			gutter: this.gutter,
			minWidth: this.minWidth,
			MasonryList: this,
		});
		//</editor-fold>
	};

	render() {
		const { mounted } = this.state;
		const { render } = this.props;

		let items = null;

		if (mounted) {
			items = this.renderItems();
		}

		if (isFunction(render)) {
			return render({
				ref: this.container,
				items: items,
				MasonryList: this,
			});
		}

		return <div ref={this.container}>{items}</div>;
	}
}

MasonryList.propTypes = propTypes;

MasonryList.defaultProps = defaultProps;

export default MasonryList;
