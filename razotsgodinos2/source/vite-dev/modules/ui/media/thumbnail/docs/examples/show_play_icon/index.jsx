import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Thumbnail from 'ui/media/thumbnail';

const title = 'Thumbnail: showPlayIcon';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Thumbnail from 'ui/media/thumbnail';

<Thumbnail
	src="http://img-fotki.yandex.ru/get/42925/110661898.1b/0_16272e_32166b40_orig.jpg"
	width="200px"
	height="200px"
	showPlayIcon={true}
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
				src="http://img-fotki.yandex.ru/get/42925/110661898.1b/0_16272e_32166b40_orig.jpg"
				width="200px"
				height="200px"
				showPlayIcon={true}
			/>
		</ExampleHolder>
	);
};

export default Example;
