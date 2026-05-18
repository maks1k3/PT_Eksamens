import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Image from 'ui/media/image';

const title = 'Image: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Image from 'ui/media/image'

<Image
  src="http://img-fotki.yandex.ru/get/59115/110661898.1b/0_15bdda_df3bae41_orig.jpg"
  title="Cat"
  alt="Image of cat in the fridge"
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
				src="http://img-fotki.yandex.ru/get/59115/110661898.1b/0_15bdda_df3bae41_orig.jpg"
				title="Cat"
				alt="Image of a cat in the fridge."
			/>
		</ExampleHolder>
	);
};

export default Example;
