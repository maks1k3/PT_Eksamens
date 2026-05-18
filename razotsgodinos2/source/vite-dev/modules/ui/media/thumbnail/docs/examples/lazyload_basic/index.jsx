import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Thumbnail from 'ui/media/thumbnail';

const title = 'Thumbnail: lazyload basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: "Image will be loaded when it enters browser's viewport.",
	code: `
import Thumbnail from 'ui/media/thumbnail';

<Thumbnail
	src="https://img-fotki.yandex.ru/get/4708/68701203.76/0_7cb46_f5bd974e_orig.jpg"
	width="200px"
	height="200px"
	lazyLoad={true}
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
			<Thumbnail
				src="https://img-fotki.yandex.ru/get/4708/68701203.76/0_7cb46_f5bd974e_orig.jpg"
				width="200px"
				height="200px"
				lazyLoad={true}
			/>
		</ExampleHolder>
	);
};

export default Example;
