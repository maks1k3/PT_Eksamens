import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Responsive from 'hoc/responsive';

import {
	SortableContainer,
	SortableElement,
	SortableHandle,
	arrayMove,
} from 'hoc/sortable';

export { SortableHandle, arrayMove };

import styles from './SortableList.module.less';
import { has, isFunction, isNumber, map } from 'lodash-es';

const propTypes = {
	items: PropTypes.array.isRequired,
	renderItem: PropTypes.func.isRequired,
	render: PropTypes.func,

	onSortEnd: PropTypes.func.isRequired, //callback that will be fired onSortEnd
	getGridProps: PropTypes.func,
	keyExtractor: PropTypes.func,

	useDragHandle: PropTypes.bool,
	axis: PropTypes.oneOf(['x', 'y', 'xy']),
	lockAxis: PropTypes.oneOf(['x', 'y']),

	//from hoc
	containerWidth: PropTypes.number,
	browserWindowWidth: PropTypes.number,
	browserDevice: PropTypes.string,
};

const defaultProps = {
	useDragHandle: false,
	axis: 'y',
};

const SortableItem = SortableElement(({ _content }) => _content);
const SortableListUi = SortableContainer(({ _content }) => _content);

class SortableList extends Component {
	constructor(props) {
		super(props);
	}

	keyExtractor = (item, index) => {
		//<editor-fold defaultstate="collapsed" desc="keyExtractor">
		const { keyExtractor } = this.props;

		if (isFunction(keyExtractor)) {
			return keyExtractor(item, index);
		}

		if (isNumber(item)) {
			return item;
		} else if (has(item, 'id')) {
			return item.id;
		}

		return index;
		//</editor-fold>
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		//<editor-fold defaultstate="collapsed" desc="onSortEnd">
		const { onSortEnd } = this.props;

		onSortEnd({ oldIndex, newIndex, SortableList: this });
		//</editor-fold>
	};

	getGridProps = () => {
		//<editor-fold defaultstate="collapsed" desc="getGridProps">
		const { containerWidth, browserDevice, browserWindowWidth, getGridProps } =
			this.props;

		if (isFunction(getGridProps)) {
			return getGridProps({
				containerWidth,
				browserDevice,
				browserWindowWidth,
			});
		} else {
			return {
				minWidth: 0,
				gutter: 0,
			};
		}
		//</editor-fold>
	};

	renderItem = (item, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const { renderItem, containerWidth, browserWindowWidth, browserDevice } =
			this.props;
		const gridItemWidth = this.gridItemWidth;
		const key = this.keyExtractor(item, index);

		const content = renderItem({
			containerWidth,
			browserWindowWidth,
			browserDevice,
			gridItemWidth,
			item,
			index,
			gutter: this.gutter,
			minWidth: this.minWidth,
			SortableList: this,
		});

		return <SortableItem key={key} index={index} _content={content} />;
		//</editor-fold>
	};

	render() {
		const { items, useDragHandle, axis, lockAxis, containerWidth, render } =
			this.props;

		const { minWidth, gutter } = this.getGridProps();
		const gridItemWidth = _g.getGridItemWidth(minWidth, gutter, containerWidth);
		this.gridItemWidth = gridItemWidth;
		this.minWidth = minWidth;
		this.gutter = gutter;

		const _items = map(items, this.renderItem);

		let content = <div className={styles['wrapper']}>{_items}</div>;

		if (isFunction(render)) {
			content = render({
				gridItemWidth: this.gridItemWidth,
				minWidth: this.minWidth,
				gutter: this.gutter,
				items: _items,
				SortableList: SortableList,
			});
		}

		return (
			<SortableListUi
				axis={axis}
				lockAxis={lockAxis}
				onSortEnd={this.onSortEnd}
				useDragHandle={useDragHandle}
				helperClass={styles.helper}
				disableAutoscroll={true}
				_content={content}
			/>
		);
	}
}

SortableList.propTypes = propTypes;

SortableList.defaultProps = defaultProps;

SortableList = Responsive()(SortableList);

export default SortableList;
