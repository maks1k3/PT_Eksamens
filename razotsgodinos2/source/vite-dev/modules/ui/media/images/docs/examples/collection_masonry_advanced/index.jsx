import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import { ImagesCollection } from 'ui/media/images';
import Image from 'ui/media/image';

const title = 'ImagesCollection: masonry advanced';

import styles from './styles.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { ImagesCollection } from 'ui/media/images';
import Image from 'ui/media/image';

<ImagesCollection
	classNames={styles}
	masonry={true}
	collectionName="example_images_collection"
	collectionId={0}
	getGridProps={({
		containerWidth,
		browserWindowWidth,
		browserDevice,
	}) => {
		return {
			gutter: 20,
			minWidth: 250,
		};
	}}
	onItemClick={({ id, ids, index, Images }) => {
		const _collectionItems = _.pick(uiStore.get('collectionItems'), ids);

		const collectionItems = [];

		_.forEach(ids, id => {
			const item = _.find(_collectionItems, i => i.id === id);
			collectionItems.push(item);
		});

		const images = [];

		_.forEach(collectionItems, collectionItem => {
			const imageId = _.head(collectionItem.media.images);
			const image = uiStore.get(\`images.\${imageId}\`);
			const title = _.get(image, 'title', '');
			images.push({
				src: image.image,
				title: title,
			});
		});

		openPopup({
			name: 'image',
			data: {
				current: _.findIndex(ids, i => i === id),
				showTitle: false, //bool
				showNumbers: false, //bool
				onGalleryFinish: 'close', //'loop','close' or function(gallery){ gallery.close()}
				items: images,
			},
		});
	}}
	renderItem={({
		id,
		index,
		classNames,
		containerWidth,
		gridItemWidth,
		onItemClick,
		ImagesCollection,
		masonry,
		imageData,
	}) => {
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
				containerWidth={_.toNumber(
					_.replace(itemContainerWidth, 'px', ''),
				)}
				originalWidth={_.toInteger(width)}
				originalHeight={_.toInteger(height)}
			/>
		);
	}}
/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<ImagesCollection
				classNames={styles}
				masonry={true}
				collectionName="example_images_collection"
				collectionId={0}
				getGridProps={({
					containerWidth,
					browserWindowWidth,
					browserDevice,
				}) => {
					return {
						gutter: 20,
						minWidth: 250,
					};
				}}
				onItemClick={({ id, ids, index, Images }) => {
					const _collectionItems = _.pick(uiStore.get('collectionItems'), ids);

					const collectionItems = [];

					_.forEach(ids, id => {
						const item = _.find(_collectionItems, i => i.id === id);
						collectionItems.push(item);
					});

					const images = [];

					_.forEach(collectionItems, collectionItem => {
						const imageId = _.head(collectionItem.media.images);
						const image = uiStore.get(`images.${imageId}`);
						const title = _.get(image, 'title', '');
						images.push({
							src: image.image,
							title: title,
						});
					});

					openPopup({
						name: 'image',
						data: {
							current: _.findIndex(ids, i => i === id),
							showTitle: false, //bool
							showNumbers: false, //bool
							onGalleryFinish: 'close', //'loop','close' or function(gallery){ gallery.close()}
							items: images,
						},
					});
				}}
				renderItem={({
					id,
					index,
					classNames,
					containerWidth,
					gridItemWidth,
					onItemClick,
					ImagesCollection,
					masonry,
					imageData,
				}) => {
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
							containerWidth={_.toNumber(
								_.replace(itemContainerWidth, 'px', ''),
							)}
							originalWidth={_.toInteger(width)}
							originalHeight={_.toInteger(height)}
						/>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
