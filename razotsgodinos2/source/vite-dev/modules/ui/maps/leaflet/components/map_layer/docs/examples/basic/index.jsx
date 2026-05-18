import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'NewComponent: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import NewComponent from 'path';

<NewComponent />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}
		/>
	);
};

export default Example;
