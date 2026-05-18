import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import SortableList, { SortableHandle, arrayMove } from 'ui/list/sortable_list';
import Icon from 'ui/misc/icon';

export { SortableHandle, arrayMove };

import styles from './EditableSortableGrid.module.less';
import { isFunction } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	sortable: PropTypes.bool,
	items: PropTypes.array.isRequired,

	getGridProps: PropTypes.func,

	renderItem: PropTypes.func.isRequired,
	renderCell: PropTypes.func,
	renderBottom: PropTypes.func,
	render: PropTypes.func,

	SortableListProps: PropTypes.object,

	onSortEnd: PropTypes.func,
	onEditClick: PropTypes.func,
	onDeleteClick: PropTypes.func,
	onViewClick: PropTypes.func,
};

const defaultProps = {
	classNames: {},
	sortable: true,
};

const SortableDragHandle = SortableHandle(() => (
	<Icon className={styles['sorting-control']} provider="fa" name="arrows" />
));

class EditableSortableGrid extends Component {
	constructor(props) {
		super(props);
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		//<editor-fold defaultstate="collapsed" desc="onSortEnd">
		const { onSortEnd } = this.props;

		if (isFunction(onSortEnd)) {
			onSortEnd({ oldIndex, newIndex, EditableSortableGrid: this });
		}
		//</editor-fold>
	};

	getGridProps = ({ containerWidth, browserDevice, browserWindowWidth }) => {
		//<editor-fold defaultstate="collapsed" desc="getGridProps">
		const { getGridProps } = this.props;

		if (isFunction(getGridProps)) {
			const { minWidth, gutter } = getGridProps({
				containerWidth,
				browserDevice,
				browserWindowWidth,
			});

			const gridItemWidth = _g.getGridItemWidth(
				minWidth,
				gutter,
				containerWidth,
			);
			this.gridItemWidth = gridItemWidth;
			this.gutter = gutter;

			return {
				minWidth,
				gutter,
			};
		}

		const minWidth = 200;
		const gutter = 10;

		const gridItemWidth = _g.getGridItemWidth(minWidth, gutter, containerWidth);
		this.gridItemWidth = gridItemWidth;
		this.gutter = gutter;

		return {
			minWidth,
			gutter,
		};
		//</editor-fold>
	};

	renderItem = ({
		containerWidth,
		browserWindowWidth,
		browserDevice,
		gridItemWidth,
		item,
		index,
		minWidth,
		gutter,
	}) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const classNames = this.classNames;
		const { renderItem, renderCell } = this.props;

		const content = renderItem({
			classNames,
			containerWidth,
			browserWindowWidth,
			browserDevice,
			gridItemWidth,
			item,
			index,
			minWidth,
			gutter,
			EditableSortableGrid: this,
		});

		const bottom = this.renderBottom({ item, index });

		if (isFunction(renderCell)) {
			return renderCell({
				containerWidth,
				browserWindowWidth,
				browserDevice,
				gridItemWidth,
				item,
				index,
				minWidth,
				gutter,
				content,
				bottom,
				classNames,
				EditableSortableGrid: this,
			});
		}

		const className = _g.classNames(
			classNames['item'],
			{ [classNames['item_full']]: gridItemWidth === '100%' },
			{ [classNames['item_grid']]: gridItemWidth !== '100%' },
		);

		const style = {
			width: gridItemWidth,
		};

		return (
			<div className={className} style={style}>
				<div className={classNames['content']}>{content}</div>
				{bottom}
			</div>
		);
		//</editor-fold>
	};

	renderBottom = ({ item, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderBottom">
		const classNames = this.classNames;
		const { renderBottom } = this.props;

		if (isFunction(renderBottom)) {
			return renderBottom({
				classNames,
				item,
				index,
				EditableSortableGrid: this,
			});
		}

		return (
			<div className={classNames['bottom']}>
				{this.renderSortingControl()}
				{this.renderControls({ classNames, item, index })}
			</div>
		);
		//</editor-fold>
	};

	renderSortingControl = () => {
		//<editor-fold defaultstate="collapsed" desc="renderSortingControl">
		const classNames = this.classNames;
		const { sortable } = this.props;

		let content = null;

		if (sortable) {
			content = <SortableDragHandle />;
		}

		return (
			<div className={classNames['sorting-control-wrapper']}>{content}</div>
		);
		//</editor-fold>
	};

	renderControls = ({ classNames, item, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderControls">
		const { onEditClick, onDeleteClick, onViewClick } = this.props;

		return (
			<div className={classNames['controls']}>
				{isFunction(onViewClick) && (
					<svg
						style={{ cursor: 'pointer' }}
						onClick={() => {
							onViewClick({ item, index, EditableSortableGrid: this });
						}}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none">
						<path
							d="M21 15.344L18.879 17.465L15.707 14.293L14.293 15.707L17.465 18.879L15.344 21H21V15.344ZM3 8.656L5.121 6.535L8.293 9.707L9.707 8.293L6.535 5.121L8.656 3H3V8.656ZM21 3H15.344L17.465 5.121L14.293 8.293L15.707 9.707L18.879 6.535L21 8.656V3ZM3 21H8.656L6.535 18.879L9.707 15.707L8.293 14.293L5.121 17.465L3 15.344V21Z"
							fill="#363439"
						/>
					</svg>
				)}
				{isFunction(onEditClick) && (
					<svg
						style={{ cursor: 'pointer' }}
						onClick={() => {
							onEditClick({ item, index, EditableSortableGrid: this });
						}}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none">
						<path
							d="M7 17.0129L11.413 16.9979L21.045 7.4579C21.423 7.0799 21.631 6.5779 21.631 6.0439C21.631 5.5099 21.423 5.0079 21.045 4.6299L19.459 3.0439C18.703 2.2879 17.384 2.2919 16.634 3.0409L7 12.5829V17.0129ZM18.045 4.4579L19.634 6.0409L18.037 7.6229L16.451 6.0379L18.045 4.4579ZM9 13.4169L15.03 7.4439L16.616 9.0299L10.587 15.0009L9 15.0059V13.4169Z"
							fill="#363439"
						/>
						<path
							d="M5 20.9999H19C20.103 20.9999 21 20.1029 21 18.9999V10.3319L19 12.3319V18.9999H8.158C8.132 18.9999 8.105 19.0099 8.079 19.0099C8.046 19.0099 8.013 19.0009 7.979 18.9999H5V4.99988H11.847L13.847 2.99988H5C3.897 2.99988 3 3.89688 3 4.99988V18.9999C3 20.1029 3.897 20.9999 5 20.9999Z"
							fill="#363439"
						/>
					</svg>
				)}
				{isFunction(onDeleteClick) && (
					<svg
						style={{ cursor: 'pointer' }}
						onClick={() => {
							onDeleteClick({ item, index, EditableSortableGrid: this });
						}}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none">
						<path
							d="M21.706 5.292L18.707 2.293C18.6143 2.19996 18.5041 2.12617 18.3828 2.07589C18.2614 2.0256 18.1313 1.99981 18 2H6C5.86866 1.99981 5.73857 2.0256 5.61724 2.07589C5.4959 2.12617 5.38571 2.19996 5.293 2.293L2.294 5.292C2.20057 5.38468 2.12647 5.49498 2.076 5.61652C2.02553 5.73805 1.9997 5.8684 2 6V19C2 20.103 2.897 21 4 21H20C21.103 21 22 20.103 22 19V6C22.0003 5.8684 21.9745 5.73805 21.924 5.61652C21.8735 5.49498 21.7994 5.38468 21.706 5.292ZM6.414 4H17.586L18.586 5H5.414L6.414 4ZM4 19V7H20L20.002 19H4Z"
							fill="#363439"
						/>
						<path d="M14 9H10V12H7L12 17L17 12H14V9Z" fill="#363439" />
					</svg>
				)}
			</div>
		);
		//</editor-fold>
	};

	renderGrid = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="renderGrid">
		const classNames = this.classNames;
		const { render } = this.props;

		let style = {};

		if (this.gridItemWidth !== '100%' && this.gutter > 0) {
			const margin = this.gutter / 2;

			style.marginLeft = `-${margin}px`;
			style.marginRight = `-${margin}px`;
		}

		if (isFunction(render)) {
			return render({
				classNames,
				items,
				style: style,
				EditableSortableGrid: this,
			});
		}
		style = { ...style, clear: 'right', display: 'flex' };

		return <div style={style}>{items}</div>;
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const { items, SortableListProps } = this.props;

		return (
			<SortableList
				items={items}
				onSortEnd={this.onSortEnd}
				getGridProps={this.getGridProps}
				renderItem={this.renderItem}
				render={this.renderGrid}
				axis="xy"
				useDragHandle={true}
				{...SortableListProps}
			/>
		);
	}
}

EditableSortableGrid.propTypes = propTypes;

EditableSortableGrid.defaultProps = defaultProps;

export default EditableSortableGrid;
