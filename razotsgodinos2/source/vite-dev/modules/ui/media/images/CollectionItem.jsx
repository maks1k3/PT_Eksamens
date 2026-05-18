import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import WithImage from 'hoc/media/with_image';

import Thumbnail from 'ui/media/thumbnail';
import Image from 'ui/media/image';

const propTypes = {
	id: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	classNames: PropTypes.object.isRequired,
	containerWidth: PropTypes.number.isRequired,
	gridItemWidth: PropTypes.string.isRequired,
	onItemClick: PropTypes.func.isRequired,
	ImagesCollection: PropTypes.object.isRequired,
	masonry: PropTypes.bool,
	renderItem: PropTypes.func,

	//form ui
	images: PropTypes.array,
};

const defaultProps = {
	masonry: false,
};

const uiProps = ownProps => {
	return {
		collectionItems: {
			[ownProps.id]: {
				media: {
					images: 'images',
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
		const { images } = this.props;

		return <CollectionItem {...this.props} imageId={_.head(images)} />;
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
			containerWidth,
			gridItemWidth,
			onItemClick,
			ImagesCollection,
			masonry,
			renderItem,
			imageData,
		} = this.props;

		if (_.isFunction(renderItem)) {
			return renderItem({
				id,
				index,
				classNames,
				containerWidth,
				gridItemWidth,
				onItemClick,
				ImagesCollection,
				masonry,
				imageData,
			});
		}

		if (masonry) {
			const style = {
				width: gridItemWidth,
			};

			const className = _g.classNames(classNames['item'], {
				[classNames['item-full']]: gridItemWidth === '100%',
			});

			let itemContainerWidth =
				gridItemWidth === '100%' ? containerWidth : gridItemWidth;

			const { thumbnail, width, height } = imageData;

			return (
				<Image
					style={style}
					src={thumbnail}
					className={className}
					onClick={onItemClick}
					containerWidth={_.toNumber(_.replace(itemContainerWidth, 'px', ''))}
					originalWidth={_.toInteger(width)}
					originalHeight={_.toInteger(height)}
				/>
			);
		} else {
			const className = _g.classNames(
				classNames['item'],
				{ [classNames['item-full']]: gridItemWidth === '100%' },
				{ [classNames['item-grid']]: gridItemWidth !== '100%' },
			);

			const { thumbnail } = imageData;

			return (
				<Thumbnail
					className={className}
					src={thumbnail}
					width={gridItemWidth}
					height="200px"
					onClick={onItemClick}
				/>
			);
		}
	}
}

CollectionItem = WithImage(CollectionItem);

CollectionItem.propTypes = {
	id: PropTypes.number,
	index: PropTypes.number,
	classNames: PropTypes.object,
	containerWidth: PropTypes.number,
	gridItemWidth: PropTypes.string,
	onItemClick: PropTypes.func,
	ImagesCollection: PropTypes.any,
	masonry: PropTypes.bool,
	renderItem: PropTypes.func,
	imageData: PropTypes.object,
};

export default Comp;
