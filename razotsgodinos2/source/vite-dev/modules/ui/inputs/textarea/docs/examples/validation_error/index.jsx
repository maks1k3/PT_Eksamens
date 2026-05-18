import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TextArea from 'ui/inputs/textarea';

const title = 'TextArea: showValidationError';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import TextArea from 'ui/inputs/textarea';

<TextArea showValidationError={true} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<TextArea showValidationError={true} />
		</ExampleHolder>
	);
};

export default Example;
