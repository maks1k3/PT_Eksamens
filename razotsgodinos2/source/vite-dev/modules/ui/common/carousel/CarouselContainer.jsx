import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import getDisplayName from 'helpers/getDisplayName';
import { size } from 'lodash-es';

const propTypes = {
	items: PropTypes.array,
	pageMode: PropTypes.bool,
	centerMode: PropTypes.bool,
	multiple: PropTypes.bool,
	getGridProps: PropTypes.func,
	infinite: PropTypes.bool,
	fade: PropTypes.bool,
};

const defaultProps = {
	items: [],
	pageMode: true,
	centerMode: false,
	multiple: false,
	getGridProps: () => {
		const minWidth = 200;
		const gutter = 10;

		return { minWidth, gutter };
	},
	infinite: false,
	fade: false,
};

const hoc = (WrappedComponent) => {
	class CarouselContainer extends Component {
		static displayName = `CarouselContainer(${getDisplayName(
			WrappedComponent,
		)})`;

		constructor(props) {
			super(props);
			this.container = React.createRef();
			this.fakeColumn = React.createRef();

			this.columns = 1;
			this.gridItemWidth = '100%';
			this.gutter = 0;

			this.browserWindowWidth = browser_window.width;
			this.browserDevice = browser_window.device;
			this.mounted = false;

			this.state = {
				mounted: false,
				columnWidth: 0,
				containerWidth: 0,
				browserWindowWidth: 0,
				browserDevice: 'mobile',
			};
		}

		componentDidMount() {
			//<editor-fold defaultstate="collapsed" desc="componentDidMount">
			this.mounted = true;
			this.updateDimensions();
			ee.on(events.browserWindow.resize, this.onResize);
			//</editor-fold>
		}

		componentDidUpdate(prevProps, prevState) {
			//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">

			let calculateColumnWidth = false;

			if (prevProps.multiple !== this.props.multiple) {
				calculateColumnWidth = true;
			}

			if (prevState.containerWidth !== this.state.containerWidth) {
				calculateColumnWidth = true;
			}

			if (calculateColumnWidth) {
				this.getColumnWidth();
			}
			//</editor-fold>
		}

		componentWillUnmount() {
			//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
			this.mounted = false;
			ee.off(events.browserWindow.resize, this.onResize);
			//</editor-fold>
		}

		onResize = ({ width, device }) => {
			//<editor-fold defaultstate="collapsed" desc="onResize">

			this.browserWindowWidth = width;
			this.browserDevice = device;
			if (this.mounted) {
				this.updateDimensions();
			}
			//</editor-fold>
		};

		updateDimensions = () => {
			//<editor-fold defaultstate="collapsed" desc="updateDimensions">
			setTimeout(() => {
				const containerWidth = $(this.container.current).width();

				if (this.mounted) {
					this.setState({
						mounted: true,
						containerWidth: containerWidth,
						browserWindowWidth: this.browserWindowWidth,
						browserDevice: this.browserDevice,
					});
				}
			}, 100);
			//</editor-fold>
		};

		getColumnWidth = () => {
			//<editor-fold defaultstate="collapsed" desc="getColumnWidth">
			if (this.fakeColumn.current) {
				const width = $(this.fakeColumn.current).width();

				if (this.state.width !== width) {
					if (this.mounted) {
						this.setState({
							columnWidth: width,
						});
					}
				}
			}
			//</editor-fold>
		};

		getGridProps = () => {
			//<editor-fold defaultstate="collapsed" desc="getGridProps">
			const { getGridProps } = this.props;

			const { containerWidth, browserDevice, browserWindowWidth } = this.state;

			return getGridProps({
				containerWidth,
				browserDevice,
				browserWindowWidth,
			});
			//</editor-fold>
		};

		getGridItemWidth = (minWidth, gutter, containerWidth) => {
			//<editor-fold defaultstate="collapsed" desc="getGridItemWidth">
			let gridItemWidth = '';
			let columns = 1;

			if (containerWidth <= (minWidth + gutter) * 2) {
				gridItemWidth = '100%';
			} else {
				columns = Math.floor(containerWidth / (minWidth + gutter));
				gridItemWidth = containerWidth / columns;

				if (gridItemWidth * columns > containerWidth) {
					gridItemWidth = minWidth;
				}

				if (gridItemWidth < minWidth) {
					gridItemWidth = minWidth;
				}

				columns = Math.floor(containerWidth / gridItemWidth);

				if (gutter > 0) {
					gridItemWidth = `calc((100% / ${columns}) - ${gutter}px)`;
				} else {
					gridItemWidth = `calc(100% / ${columns})`;
				}
			}

			this.columns = columns;

			return gridItemWidth;
			//</editor-fold>
		};

		getInfinite = () => {
			//<editor-fold defaultstate="collapsed" desc="getInfinite">
			const { infinite, centerMode, pageMode } = this.props;

			if (centerMode || !pageMode) {
				return true;
			}

			if (!infinite) {
				return false;
			} else {
				const columns = this.columns;
				const { items } = this.props;

				return size(items) > columns;
			}
			//</editor-fold>
		};

		getItemsWidth = () => {
			//<editor-fold defaultstate="collapsed" desc="getItemsWidth">
			const { items, fade } = this.props;
			const infinite = this.getInfinite();
			const columns = this.columns;
			const gutter = this.gutter;
			const { columnWidth } = this.state;

			let itemsWidth;

			let _columnWidth = columns > 1 ? columnWidth + gutter : columnWidth;

			let itemsSize = size(items);

			if (itemsSize < columns) {
				itemsSize = columns;
			}

			itemsWidth = itemsSize * _columnWidth;

			if (infinite && !fade) {
				itemsWidth = itemsWidth + columns * 2 * _columnWidth;
			}

			return itemsWidth;
			//</editor-fold>
		};

		getNumberOfDots = () => {
			//<editor-fold defaultstate="collapsed" desc="getNumberOfDots">
			const { items, pageMode } = this.props;
			const columns = this.columns;

			if (pageMode && columns > 1) {
				return Math.ceil(size(items) / columns);
			} else {
				return size(items);
			}
			//</editor-fold>
		};

		renderCarousel = () => {
			//<editor-fold defaultstate="collapsed" desc="renderCarousel">
			const columns = this.columns;
			const gutter = this.gutter;
			const gridItemWidth = this.gridItemWidth;
			const { columnWidth } = this.state;

			if (columnWidth === 0) {
				return null;
			}

			let _columnWidth = columns > 1 ? columnWidth + gutter : columnWidth;

			const itemsWidth = this.getItemsWidth();
			const numberOfDots = this.getNumberOfDots();

			const infinite = this.getInfinite();

			const { containerWidth } = this.state;

			return (
				<WrappedComponent
					{...this.props}
					infinite={infinite}
					columnWidth={_columnWidth}
					columns={columns}
					itemsWidth={itemsWidth}
					numberOfDots={numberOfDots}
					gridItemWidth={gridItemWidth}
					gutter={gutter}
					containerWidth={containerWidth}
				/>
			);
			//</editor-fold>
		};

		renderFakeColumn = () => {
			//<editor-fold defaultstate="collapsed" desc="renderFakeColumn">
			const gridItemWidth = this.gridItemWidth;
			return <div ref={this.fakeColumn} style={{ width: gridItemWidth }} />;
			//</editor-fold>
		};

		render() {
			const { mounted, containerWidth } = this.state;

			if (!mounted) {
				return <div ref={this.container} />;
			}

			const { multiple } = this.props;

			if (multiple) {
				const { gutter, minWidth } = this.getGridProps();
				this.gutter = gutter;
				const gridItemWidth = this.getGridItemWidth(
					minWidth,
					gutter,
					containerWidth,
				);
				this.gridItemWidth = gridItemWidth;
			}

			return (
				<div ref={this.container}>
					{this.renderCarousel()}
					{this.renderFakeColumn()}
				</div>
			);
		}
	}

	CarouselContainer.propTypes = propTypes;

	CarouselContainer.defaultProps = defaultProps;

	return CarouselContainer;
};

export default hoc;
