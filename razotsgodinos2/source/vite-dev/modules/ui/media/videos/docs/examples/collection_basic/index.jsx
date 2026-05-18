import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import { VideosCollection } from 'ui/media/videos';

const title = 'VideosCollection: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import { VideosCollection } from 'ui/media/videos';

<VideosCollection
	collectionName="example_videos_collection"
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
			<VideosCollection
				collectionName="example_videos_collection"
				collectionId={0}
			/>
		</ExampleHolder>
	);
};

export default Example;
