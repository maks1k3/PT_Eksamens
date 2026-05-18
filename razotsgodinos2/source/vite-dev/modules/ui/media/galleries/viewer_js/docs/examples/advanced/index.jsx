import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Images from 'ui/media/images';

import images from '../images';

const title = 'ViewerJs: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Images from 'ui/media/images';

<Images
	items={images}
	masonry={true}
	onItemClick={({ item, index, items, event }) => {
		const _items = _.map(items, item => {
			const { image } = item;
			const title = _.get(item, 'title', '');
			return {
				image: image,
				title: title,
			};
		});

		_g.gallery('viewerJs', 'open', {
			items: _items,
			current: index,
			options: {
				button: true,
				navbar: false,
				title: false,
				toolbar: false,
				tooltip: false,
				movable: false,
				zoomable: false,
				rotatable: false,
				scalable: false,
				transition: false,
				fullscreen: false,
				keyboard: true,
				zIndex: 2015,
			},
		});
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
				items={_images}
				masonry={true}
				onItemClick={({ item, index, items, event }) => {
					const _items = _.map(items, item => {
						const { image } = item;
						const title = _.get(item, 'title', '');
						return {
							image: image,
							title: title,
						};
					});

					_g.gallery('viewerJs', 'open', {
						items: _items,
						current: index,
						options: {
							button: true,
							navbar: false,
							title: false,
							toolbar: false,
							tooltip: false,
							movable: false,
							zoomable: false,
							rotatable: false,
							scalable: false,
							transition: false,
							fullscreen: false,
							keyboard: true,
							zIndex: 2015,
						},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
