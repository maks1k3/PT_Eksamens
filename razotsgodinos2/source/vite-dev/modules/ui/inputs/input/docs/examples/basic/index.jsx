import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Input from 'ui/inputs/input';

const title = 'Input: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Input from 'ui/inputs/input';

<Input value="This is text" placeholder="Type something..." />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Input value="This is text" placeholder="Type something..." />
		</ExampleHolder>
	);
};

export default Example;
