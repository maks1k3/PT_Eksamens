import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import ResponsiveGrid from 'ui/list/responsive_grid';
import MasonryList from 'ui/list/masonry_list';
import Image from 'ui/media/image';
import Thumbnail from 'ui/media/thumbnail';

import styles from './Images.module.less';
import { get, isFunction, map, replace, toInteger, toNumber } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	getGridProps: PropTypes.func,

	type: PropTypes.oneOf(['default', 'photoSwipe', 'viewerJs']),
	masonry: PropTypes.bool,

	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			image: PropTypes.string,
			thumbnail: PropTypes.string,
			width: PropTypes.number,
			height: PropTypes.number,
			title: PropTypes.string,
		}),
	).isRequired,

	onItemClick: PropTypes.func,
	renderItem: PropTypes.func,
};

const defaultProps = {
	classNames: {},
	type: 'default',
	masonry: false,
	getGridProps: () => {
		return {
			minWidth: 200,
			gutter: 10,
		};
	},
};

class Images extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onItemClick = ({ item, index, event }) => {
		//<editor-fold defaultstate="collapsed" desc="onItemClick">
		const { items, onItemClick, type } = this.props;

		if (isFunction(onItemClick)) {
			onItemClick({
				item,
				index,
				items,
				type,
				event,
				Images: this,
			});
			return;
		}

		if (type === 'default') {
			const _items = map(items, (item) => {
				const { image } = item;
				const title = get(item, 'title', '');
				return {
					src: image,
					title: title,
				};
			});

			openPopup({
				name: 'image',
				data: {
					current: index,
					showTitle: true, //bool
					showNumbers: true, //bool
					onGalleryFinish: 'loop',
					items: _items,
				},
			});
		} else if (type === 'photoSwipe') {
			const _items = map(items, (item) => {
				const { image, thumbnail, width, height } = item;
				const title = get(item, 'title', '');
				return {
					src: image,
					msrc: thumbnail,
					w: width,
					h: height,
					title: title,
				};
			});

			_g.gallery('photoSwipe', 'open', {
				items: _items,
				current: index,
				target: event.target,
			});
		} else if (type === 'viewerJs') {
			const _items = map(items, (item) => {
				const { image, thumbnail } = item;
				const title = get(item, 'title', '');
				return {
					image: image,
					thumbnail: thumbnail,
					title: title,
				};
			});

			_g.gallery('viewerJs', 'open', {
				items: _items,
				current: index,
			});
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderItem = ({ containerWidth, gridItemWidth, item, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const classNames = this.classNames;
		const { renderItem, masonry } = this.props;

		if (isFunction(renderItem)) {
			return renderItem({
				classNames,
				item,
				index,
				containerWidth,
				gridItemWidth,
				masonry,
				onItemClick: ({ event }) => {
					this.onItemClick({ item, index, event });
				},
				Images: this,
			});
		}

		const className = _g.classNames(
			classNames['item'],
			{ [classNames['item-full']]: gridItemWidth === '100%' },
			{ [classNames['item-grid']]: gridItemWidth !== '100%' },
		);

		const { thumbnail } = item;

		return (
			<Thumbnail
				key={index}
				className={className}
				src={thumbnail}
				width={gridItemWidth}
				height="200px"
				onClick={({ event }) => {
					this.onItemClick({ item, index, event });
				}}
			/>
		);
		//</editor-fold>
	};

	renderMasonryItem = ({ containerWidth, gridItemWidth, item, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderMasonryItem">
		const classNames = this.classNames;
		const { renderItem, masonry } = this.props;

		if (isFunction(renderItem)) {
			return renderItem({
				classNames,
				item,
				index,
				containerWidth,
				gridItemWidth,
				masonry,
				onItemClick: ({ event }) => {
					this.onItemClick({ item, index, event });
				},
				Images: this,
			});
		}

		const style = {
			width: gridItemWidth,
		};

		const className = _g.classNames(classNames['item'], {
			[classNames['item-full']]: gridItemWidth === '100%',
		});

		let itemContainerWidth =
			gridItemWidth === '100%' ? containerWidth : gridItemWidth;

		const { thumbnail, width, height } = item;
		return (
			<Image
				key={index}
				style={style}
				src={thumbnail}
				className={className}
				onClick={({ event }) => {
					this.onItemClick({ item, index, event });
				}}
				containerWidth={toNumber(replace(itemContainerWidth, 'px', ''))}
				originalWidth={toInteger(width)}
				originalHeight={toInteger(height)}
			/>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const { items, getGridProps, masonry } = this.props;

		if (masonry) {
			return (
				<MasonryList
					getGridProps={getGridProps}
					items={items}
					renderItem={this.renderMasonryItem}
				/>
			);
		} else {
			return (
				<ResponsiveGrid
					items={items}
					getGridProps={getGridProps}
					renderItem={this.renderItem}
				/>
			);
		}
	}
}

Images.propTypes = propTypes;

Images.defaultProps = defaultProps;

export default Images;
