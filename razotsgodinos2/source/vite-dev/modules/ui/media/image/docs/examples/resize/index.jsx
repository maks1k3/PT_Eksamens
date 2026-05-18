import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Image from 'ui/media/image';

const title = 'Image: resize maintaining aspect ratio';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Resize image to fit containerWidth maintaining aspect ratio.',
	code: `
import Image from 'ui/media/image'

<Image
  src="http://img-fotki.yandex.ru/get/59115/110661898.1b/0_15bdda_df3bae41_orig.jpg"
  containerWidth={200}
  originalWidth={540}
  originalHeight={720}
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
				containerWidth={200}
				originalWidth={540}
				originalHeight={720}
			/>
		</ExampleHolder>
	);
};

export default Example;
