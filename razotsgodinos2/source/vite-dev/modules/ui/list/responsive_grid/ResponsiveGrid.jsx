import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Responsive from 'hoc/responsive';

import styles from './ResponsiveGrid.module.less';
import { get, isFunction, map } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	getGridProps: PropTypes.func.isRequired,
	type: PropTypes.oneOf(['flex', 'float']),
	items: PropTypes.array.isRequired,

	renderItem: PropTypes.func.isRequired,
	render: PropTypes.func,

	//from hoc
	containerWidth: PropTypes.number,
	browserWindowWidth: PropTypes.number,
	browserDevice: PropTypes.string,
};

const defaultProps = {
	classNames: {},
	type: 'float',
};

class ResponsiveGrid extends Component {
	constructor(props) {
		super(props);

		this.extra = {
			columns: 0,
		};
	}

	getGridProps = () => {
		//<editor-fold defaultstate="collapsed" desc="getGridProps">
		const { containerWidth, browserDevice, browserWindowWidth, getGridProps } =
			this.props;

		return getGridProps({ containerWidth, browserDevice, browserWindowWidth });
		//</editor-fold>
	};

	renderItem = (item, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const gridItemWidth = this.gridItemWidth;
		const gridItemHeight = this.gridItemHeight;
		const { renderItem, containerWidth, browserWindowWidth, browserDevice } =
			this.props;

		return renderItem({
			containerWidth,
			browserWindowWidth,
			browserDevice,
			gridItemWidth,
			gridItemHeight,
			item,
			index,
			gutter: this.gutter,
			minWidth: this.minWidth,
			columns: get(this.extra, 'columns', 0),
			ResponsiveGrid: this,
		});
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		const { render, type, items, containerWidth } = this.props;
		const { gutter, minWidth } = this.getGridProps();
		this.gutter = gutter;
		this.minWidth = minWidth;

		const gridItemWidth = _g.getGridItemWidth(
			minWidth,
			gutter,
			containerWidth,
			this.extra,
		);
		this.gridItemWidth = gridItemWidth;
		this.gridItemHeight = _g.getGridItemHeight(
			minWidth,
			gutter,
			containerWidth,
		);

		const _items = map(items, this.renderItem);

		const className = _g.classNames(
			{ ['clearfix']: type === 'float' },
			{ [classNames['wrapper']]: type === 'flex' },
		);

		const style = {};

		if (gridItemWidth !== '100%' && gutter > 0) {
			const margin = gutter / 2;

			style.marginLeft = `-${margin}px`;
			style.marginRight = `-${margin}px`;
		}

		if (isFunction(render)) {
			return render({
				classNames,
				wrapperClassName: className,
				wrapperStyle: style,
				items: _items,
				ResponsiveGrid: this,
			});
		}

		return (
			<div className={className} style={style}>
				{_items}
			</div>
		);
	}
}

ResponsiveGrid.propTypes = propTypes;

ResponsiveGrid.defaultProps = defaultProps;

ResponsiveGrid = Responsive()(ResponsiveGrid);

export default ResponsiveGrid;
