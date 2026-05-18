import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import { ImagesCollection } from 'ui/media/images';

const title = 'ImagesCollection: masonry';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { ImagesCollection } from 'ui/media/images';

<ImagesCollection
	masonry={true}
	collectionName="example_images_collection"
	collectionId={0}
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
			<ImagesCollection
				masonry={true}
				collectionName="example_images_collection"
				collectionId={0}
			/>
		</ExampleHolder>
	);
};

export default Example;
