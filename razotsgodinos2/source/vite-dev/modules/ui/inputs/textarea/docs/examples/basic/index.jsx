import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TextArea from 'ui/inputs/textarea';

const title = 'TextArea: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import TextArea from 'ui/inputs/textarea';

<TextArea value="This is text" placeholder="Type something..." />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<TextArea value="This is text" placeholder="Type something..." />
		</ExampleHolder>
	);
};

export default Example;
