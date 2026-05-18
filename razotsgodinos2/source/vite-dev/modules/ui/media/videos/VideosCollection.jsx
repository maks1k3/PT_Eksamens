import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import getCollectionName from 'helpers/collections/getCollectionName';

import WithUi from 'hoc/store/ui';

import ResponsiveGrid from 'ui/list/responsive_grid';
import CollectionItem from './CollectionItem';

import styles from './Videos.less';

const propTypes = {
	classNames: PropTypes.object,

	collectionName: PropTypes.string.isRequired,
	collectionId: PropTypes.number.isRequired,

	getGridProps: PropTypes.func,

	onItemClick: PropTypes.func,
	renderItem: PropTypes.func,

	//from ui
	ids: PropTypes.array,
};

const defaultProps = {
	classNames: {},
	getGridProps: () => {
		return {
			minWidth: 200,
			gutter: 10,
		};
	},

	//from ui
	ids: [],
};

const uiProps = ownProps => {
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

class VideosCollection extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
  *
  *                     Methods
  *
  * ========================================================================*/

	onItemClick = ({ id, index }) => {
		//<editor-fold defaultstate="collapsed" desc="onItemClick">
		const { ids, onItemClick } = this.props;

		if (_.isFunction(onItemClick)) {
			onItemClick({
				id,
				ids,
				index,
				Videos: this,
			});
		}

		const _collectionItems = _.pick(uiStore.get('collectionItems'), ids);

		const collectionItems = [];

		_.forEach(ids, id => {
			const item = _.find(_collectionItems, i => i.id === id);
			collectionItems.push(item);
		});

		const videos = [];

		_.forEach(collectionItems, collectionItem => {
			const videoId = _.head(collectionItem.media.videos);
			const video = uiStore.get(`videos.${videoId}`);
			videos.push({
				src: video.player,
				provider: video.provider,
			});
		});

		openPopup({
			name: 'video',
			data: {
				current: _.findIndex(ids, i => i === id),
				hideOnOverlayClick: false,
				autoPlay: true,
				onGalleryFinish: 'loop', //'loop','close' or function(gallery){ gallery.close()}
				items: videos,
			},
		});
		//</editor-fold>
	};

	/* ========================================================================*
  *
  *                     Renderers
  *
  * ========================================================================*/

	renderItem = ({ gridItemWidth, item: id, index }) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const classNames = this.classNames;
		const { renderItem } = this.props;

		return (
			<CollectionItem
				key={id}
				id={id}
				index={index}
				classNames={classNames}
				gridItemWidth={gridItemWidth}
				onItemClick={() => {
					this.onItemClick({ id, index });
				}}
				VideosCollection={this}
				renderItem={renderItem}
			/>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const { ids, getGridProps } = this.props;

		return (
			<ResponsiveGrid
				items={ids}
				getGridProps={getGridProps}
				renderItem={this.renderItem}
			/>
		);
	}
}

VideosCollection.propTypes = propTypes;

VideosCollection.defaultProps = defaultProps;

VideosCollection = WithUi(uiProps)(VideosCollection);

export default VideosCollection;
