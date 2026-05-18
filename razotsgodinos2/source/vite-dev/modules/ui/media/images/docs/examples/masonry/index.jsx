import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Images from 'ui/media/images';

const title = 'Images: masonry';

import images from '../images';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Images from 'ui/media/images';

<Images
  masonry={true}
  items={
    {
      image: 'http://img-fotki.yandex.ru/get/59572/110661898.1b/0_15d8c0_2c9c766b_orig.jpg',
      thumbnail: 'http://img-fotki.yandex.ru/get/59572/110661898.1b/0_15d8c0_2c9c766b_orig.jpg',
      width: 889,
      height: 960,
    },
    {
      image: 'http://img-fotki.yandex.ru/get/194503/110661898.1b/0_16d43b_2acff364_orig.jpg',
      thumbnail: 'http://img-fotki.yandex.ru/get/194503/110661898.1b/0_16d43b_2acff364_orig.jpg',
      width: 1159,
      height: 950,
    },
    ...
  }
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
			<Images masonry={true} items={_images} />
		</ExampleHolder>
	);
};

export default Example;
