import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Images from 'ui/media/images';

import images from '../images';

const title = 'ViewerJs: Images';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Images from 'ui/media/images';

<Images
  type="viewerJs"
  items={
    {
      image: 'http://img-fotki.yandex.ru/get/59572/110661898.1b/0_15d8c0_2c9c766b_orig.jpg',
      thumbnail: 'http://img-fotki.yandex.ru/get/59572/110661898.1b/0_15d8c0_2c9c766b_orig.jpg',
    },
    {
      image: 'http://img-fotki.yandex.ru/get/194503/110661898.1b/0_16d43b_2acff364_orig.jpg',
      thumbnail: 'http://img-fotki.yandex.ru/get/194503/110661898.1b/0_16d43b_2acff364_orig.jpg',
    },
    ...
  }
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
			<Images type="viewerJs" items={_images} />
		</ExampleHolder>
	);
};

export default Example;
