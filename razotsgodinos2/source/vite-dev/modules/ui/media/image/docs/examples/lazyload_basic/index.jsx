import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Image from 'ui/media/image';

const title = 'Image: lazyload basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		"Image will be loaded when it enters browser's viewport. To avoid scroll jumping add correct height to image itself or image container.",
	code: `
import Image from 'ui/media/image';

<Image
	src="https://img-fotki.yandex.ru/get/4708/68701203.76/0_7cb46_f5bd974e_orig.jpg"
	lazyLoad={true}
	containerWidth={250}
	originalWidth={990}
	originalHeight={724}
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
			<Image
				src="https://img-fotki.yandex.ru/get/4708/68701203.76/0_7cb46_f5bd974e_orig.jpg"
				lazyLoad={true}
				containerWidth={250}
				originalWidth={990}
				originalHeight={724}
			/>
		</ExampleHolder>
	);
};

export default Example;
