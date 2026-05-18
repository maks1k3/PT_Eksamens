import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Loading from 'ui/misc/loading';

const title = 'Loading: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Loading from 'ui/misc/loading';

<Loading />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Loading />
		</ExampleHolder>
	);
};

export default Example;
