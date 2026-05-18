import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Images from 'ui/media/images';
import Thumbnail from 'ui/media/thumbnail';

const title = 'Images: advanced';

import images from '../images';

import styles from './styles.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Images from 'ui/media/images';
import Thumbnail from 'ui/media/thumbnail';

<Images
	classNames={styles}
	items={images}
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
	onItemClick={({ item, index, items, Images }) => {
		const _items = _.map(items, item => {
			const { image } = item;
			const title = _.get(item, 'title', '');
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
				onGalleryFinish: 'loop', //'loop','close' or function(gallery){ gallery.close()}
				items: _items,
			},
		});
	}}
	renderItem={({
		classNames,
		item,
		index,
		containerWidth,
		gridItemWidth,
		masonry,
		onItemClick,
		Images,
	}) => {
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
				height="250px"
				onClick={() => {
					onItemClick({ item, index });
				}}
			/>
		);
	}}
/>
  `,
};

const Example = () => {
	const _images = _.map(images, image => {
		const { src } = image;
		return {
			image: src,
			thumbnail: src,
		};
	});

	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Images
				classNames={styles}
				items={_images}
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
				onItemClick={({ item, index, items, Images }) => {
					const _items = _.map(items, item => {
						const { image } = item;
						const title = _.get(item, 'title', '');
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
							onGalleryFinish: 'loop', //'loop','close' or function(gallery){ gallery.close()}
							items: _items,
						},
					});
				}}
				renderItem={({
					classNames,
					item,
					index,
					containerWidth,
					gridItemWidth,
					masonry,
					onItemClick,
					Images,
				}) => {
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
							height="250px"
							onClick={() => {
								onItemClick({ item, index });
							}}
						/>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
