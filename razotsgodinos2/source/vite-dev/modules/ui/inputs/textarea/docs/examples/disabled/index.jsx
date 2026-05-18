import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TextArea from 'ui/inputs/textarea';

const title = 'TextArea: disabled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import TextArea from 'ui/inputs/textarea';

<TextArea disabled={true} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<TextArea disabled={true} />
		</ExampleHolder>
	);
};

export default Example;
