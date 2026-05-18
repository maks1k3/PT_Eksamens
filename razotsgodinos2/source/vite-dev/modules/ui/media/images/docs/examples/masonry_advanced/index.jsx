import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Images from 'ui/media/images';
import Image from 'ui/media/image';

import styles from './styles.less';

const title = 'Images: masonry advanced';

import images from '../images';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Images from 'ui/media/images';

<Images
	classNames={styles}
	masonry={true}
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
				onClick={() => {
					onItemClick({ item, index });
				}}
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
	const _images = _.map(images, image => {
		const { src, width, height } = image;
		return {
			image: src,
			thumbnail: src,
			width: width,
			height: height,
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
				masonry={true}
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
							onClick={() => {
								onItemClick({ item, index });
							}}
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
