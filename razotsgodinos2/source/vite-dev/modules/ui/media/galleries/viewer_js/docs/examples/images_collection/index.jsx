import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import { ImagesCollection } from 'ui/media/images';

const title = 'ViewerJs: ImagesCollection';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { ImagesCollection } from 'ui/media/images';

<ImagesCollection
	type="viewerJs"
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
				type="viewerJs"
				collectionName="example_images_collection"
				collectionId={0}
			/>
		</ExampleHolder>
	);
};

export default Example;
