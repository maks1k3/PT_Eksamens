import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import getCollectionName from 'helpers/collections/getCollectionName';

import WithUi from 'hoc/store/ui';

import ResponsiveGrid from 'ui/list/responsive_grid';
import CollectionItem from './CollectionItem';
import MasonryList from 'ui/list/masonry_list';

import styles from './Images.module.less';

const propTypes = {
	classNames: PropTypes.object,

	type: PropTypes.oneOf(['default', 'photoSwipe', 'viewerJs']),
	masonry: PropTypes.bool,
	getGridProps: PropTypes.func,

	collectionName: PropTypes.string.isRequired,
	collectionId: PropTypes.number.isRequired,

	onItemClick: PropTypes.func,
	renderItem: PropTypes.func,

	//from ui
	ids: PropTypes.array,
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

	//from ui
	ids: [],
};

const uiProps = (ownProps) => {
	const name = getCollectionName(
		ownProps.collectionName,
		ownProps.collectionId,
	);

	return {
		collections: {
			[name]: {
				ids: 'ids',
			},
		},
	};
};

class ImagesCollection extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onItemClick = ({ id, index, e }) => {
		//<editor-fold defaultstate="collapsed" desc="onItemClick">
		const { ids, onItemClick, type } = this.props;

		if (_.isFunction(onItemClick)) {
			onItemClick({
				id,
				ids,
				index,
				type,
				e,
				Images: this,
			});
			return;
		}

		const _collectionItems = _.pick(uiStore.get('collectionItems'), ids);

		const collectionItems = [];

		_.forEach(ids, (id) => {
			const item = _.find(_collectionItems, (i) => i.id === id);
			collectionItems.push(item);
		});

		const images = [];

		_.forEach(collectionItems, (collectionItem) => {
			const imageId = _.head(collectionItem.media.images);
			const image = uiStore.get(`images.${imageId}`);
			const title = _.get(image, 'title', '');
			images.push({
				image: image.image,
				thumbnail: image.thumbnail,
				width: image.width,
				height: image.height,
				title: title,
			});
		});

		const _index = _.findIndex(ids, (i) => i === id);

		if (type === 'default') {
			const _items = _.map(images, (item) => {
				const { image } = item;
				const title = _.get(item, 'title', '');
				return {
					src: image,
					caption: title,
				};
			});

			openPopup({
				name: 'image',
				data: {
					current: _index,
					showTitle: true, //bool
					showNumbers: true, //bool
					onGalleryFinish: 'loop', //'loop','close' or function(gallery){ gallery.close()}
					items: _items,
				},
			});
		} else if (type === 'photoSwipe') {
			const _items = _.map(images, (item) => {
				const { image, thumbnail, width, height } = item;
				const title = _.get(item, 'title', '');
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
				current: _index,
				target: e.target,
			});
		} else if (type === 'viewerJs') {
			const _items = _.map(images, (item) => {
				const { image, thumbnail } = item;
				const title = _.get(item, 'title', '');
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

	renderItem = ({ containerWidth, gridItemWidth, item: id, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const classNames = this.classNames;
		const { renderItem } = this.props;

		return (
			<CollectionItem
				key={id}
				id={id}
				index={index}
				classNames={classNames}
				containerWidth={containerWidth}
				gridItemWidth={gridItemWidth}
				onItemClick={(e) => {
					this.onItemClick({ id, index, e });
				}}
				ImagesCollection={this}
				masonry={false}
				renderItem={renderItem}
			/>
		);
		//</editor-fold>
	};

	renderMasonryItem = ({ containerWidth, gridItemWidth, item: id, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderMasonryItem">
		const classNames = this.classNames;
		const { renderItem } = this.props;

		return (
			<CollectionItem
				key={id}
				id={id}
				index={index}
				classNames={classNames}
				containerWidth={containerWidth}
				gridItemWidth={gridItemWidth}
				onItemClick={(e) => {
					this.onItemClick({ id, index, e });
				}}
				ImagesCollection={this}
				masonry={true}
				renderItem={renderItem}
			/>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const { ids, getGridProps, masonry } = this.props;

		if (masonry) {
			return (
				<MasonryList
					getGridProps={getGridProps}
					items={ids}
					renderItem={this.renderMasonryItem}
				/>
			);
		} else {
			return (
				<ResponsiveGrid
					items={ids}
					getGridProps={getGridProps}
					renderItem={this.renderItem}
				/>
			);
		}
	}
}

ImagesCollection.propTypes = propTypes;

ImagesCollection.defaultProps = defaultProps;

ImagesCollection = WithUi(uiProps)(ImagesCollection);

export default ImagesCollection;
