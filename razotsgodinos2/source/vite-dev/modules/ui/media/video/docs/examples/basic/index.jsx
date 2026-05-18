import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Video from 'ui/media/video';

const title = 'Video: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Video from 'ui/media/video';

<Video
  provider="youtube"
  src="https://www.youtube.com/embed/UprcpdwuwCg"
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
			<Video
				provider="youtube"
				src="https://www.youtube.com/embed/UprcpdwuwCg"
			/>
		</ExampleHolder>
	);
};

export default Example;
