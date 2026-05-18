import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Videos from 'ui/media/videos';

const title = 'Videos: basic';

import videos from '../videos';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Videos from 'ui/media/videos';

<Videos
  items={
    {
      thumbnail:"https://img.youtube.com/vi/ifBM3SY3G-s/hqdefault.jpg",
      player:"https://www.youtube.com/embed/ifBM3SY3G-s",
      provider:"youtube",
    },
    {
      thumbnail:"https://img.youtube.com/vi/17KkX0lpHOo/hqdefault.jpg",
      player:"https://www.youtube.com/embed/17KkX0lpHOo",
      provider:"youtube",
    },
    ...
  }
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
			<Videos items={videos} />
		</ExampleHolder>
	);
};

export default Example;
