import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import SortableList, { SortableHandle, arrayMove } from 'ui/list/sortable_list';
import Icon from 'ui/misc/icon';

export { SortableHandle, arrayMove };

import styles from './EditableSortableList.module.less';
import { isFunction } from 'lodash-es';
import Image from 'ui/media/image';

const propTypes = {
	classNames: PropTypes.object,
	sortable: PropTypes.bool,
	items: PropTypes.array.isRequired,

	renderItem: PropTypes.func.isRequired,
	renderLeft: PropTypes.func,
	renderRight: PropTypes.func,
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
	<Image
		style={{ height: 34, color: 'black' }}
		className={styles['sorting-control']}
		src={_g.getMainUrl() + 'assets/icons/list_black.svg'}
	/>
));

class EditableSortableList extends Component {
	constructor(props) {
		super(props);
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		//<editor-fold defaultstate="collapsed" desc="onSortEnd">
		const { onSortEnd } = this.props;

		if (isFunction(onSortEnd)) {
			onSortEnd({ oldIndex, newIndex, EditableSortableList: this });
		}
		//</editor-fold>
	};

	renderItem = ({ item, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const classNames = this.classNames;
		return (
			<div className={classNames['item']}>
				<div className={classNames['left']}>
					{this.renderLeft({ classNames, item, index })}
				</div>
				<div className={classNames['center']}>
					{this.renderCenter({ classNames, item, index })}
				</div>
				<div className={classNames['right']}>
					{this.renderRight({ classNames, item, index })}
				</div>
			</div>
		);
		//</editor-fold>
	};

	renderLeft = ({ classNames, item, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderLeft">
		const { sortable, renderLeft } = this.props;

		if (isFunction(renderLeft)) {
			return renderLeft({
				classNames,
				item,
				index,
				sortable,
				SortableDragHandle: SortableDragHandle,
				EditableSortableList: this,
			});
		}

		if (sortable) {
			return <SortableDragHandle />;
		}

		return <div className={classNames['left-empty']} />;
		//</editor-fold>
	};

	renderCenter = ({ classNames, item, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderCenter">
		const { renderItem } = this.props;

		return renderItem({ classNames, item, index, EditableSortableList: this });
		//</editor-fold>
	};

	renderRight = ({ classNames, item, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderRight">
		const { renderRight, onEditClick, onDeleteClick, onViewClick } = this.props;

		if (isFunction(renderRight)) {
			return renderRight({
				classNames,
				item,
				index,
				EditableSortableList: this,
			});
		}

		return (
			<Fragment>
				{isFunction(onViewClick) && (
					<Icon
						className={classNames['icon']}
						provider="icomoon"
						name="file-text"
						onClick={() => {
							onViewClick({ item, index, EditableSortableList: this });
						}}
					/>
				)}
				{isFunction(onEditClick) && (
					<Icon
						className={classNames['icon']}
						provider="icomoon"
						name="pencil"
						onClick={() => {
							onEditClick({ item, index, EditableSortableList: this });
						}}
					/>
				)}
				{isFunction(onDeleteClick) && (
					<Icon
						className={classNames['icon']}
						provider="icomoon"
						name="trash"
						onClick={() => {
							onDeleteClick({ item, index, EditableSortableList: this });
						}}
					/>
				)}
			</Fragment>
		);

		//</editor-fold>
	};

	renderList = ({ items }) => {
		//<editor-fold defaultstate="collapsed" desc="renderList">
		const classNames = this.classNames;
		const { render } = this.props;

		if (isFunction(render)) {
			return render({ classNames, items, EditableSortableList: this });
		}

		return <div className={classNames['wrapper']}>{items}</div>;
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const { items, SortableListProps } = this.props;

		if (_g.isEmpty(items)) {
			return null;
		}

		return (
			<SortableList
				items={items}
				onSortEnd={this.onSortEnd}
				renderItem={this.renderItem}
				render={this.renderList}
				lockAxis="y"
				useDragHandle={true}
				{...SortableListProps}
			/>
		);
	}
}

EditableSortableList.propTypes = propTypes;

EditableSortableList.defaultProps = defaultProps;

export default EditableSortableList;
