import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import WithVideo from 'hoc/media/with_video';

import Thumbnail from 'ui/media/thumbnail';

const propTypes = {
	id: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	classNames: PropTypes.object.isRequired,
	gridItemWidth: PropTypes.string.isRequired,
	onItemClick: PropTypes.func.isRequired,
	VideosCollection: PropTypes.object.isRequired,
	renderItem: PropTypes.func,

	//form ui
	videos: PropTypes.array,
};

const defaultProps = {};

const uiProps = ownProps => {
	return {
		collectionItems: {
			[ownProps.id]: {
				media: {
					videos: 'videos',
				},
			},
		},
	};
};

class Comp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { videos } = this.props;

		return <CollectionItem {...this.props} videoId={_.head(videos)} />;
	}
}

Comp.propTypes = propTypes;

Comp.defaultProps = defaultProps;

Comp = WithUi(uiProps)(Comp);

class CollectionItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			id,
			index,
			classNames,
			gridItemWidth,
			onItemClick,
			VideosCollection,
			renderItem,
			videoData,
		} = this.props;

		if (_.isFunction(renderItem)) {
			return renderItem({
				id,
				index,
				classNames,
				gridItemWidth,
				onItemClick,
				VideosCollection,
				videoData,
			});
		}

		const className = _g.classNames(
			classNames['item'],
			{ [classNames['item-full']]: gridItemWidth === '100%' },
			{ [classNames['item-grid']]: gridItemWidth !== '100%' },
		);

		const { thumbnail } = videoData;

		return (
			<Thumbnail
				className={className}
				src={thumbnail}
				width={gridItemWidth}
				height="200px"
				showPlayIcon={true}
				onClick={onItemClick}
			/>
		);
	}
}

CollectionItem = WithVideo(CollectionItem);

CollectionItem.propTypes = {
	id: PropTypes.number,
	index: PropTypes.number,
	classNames: PropTypes.object,
	gridItemWidth: PropTypes.string,
	onItemClick: PropTypes.func,
	VideosCollection: PropTypes.any,
	renderItem: PropTypes.func,
	videoData: PropTypes.object,
};

export default Comp;
