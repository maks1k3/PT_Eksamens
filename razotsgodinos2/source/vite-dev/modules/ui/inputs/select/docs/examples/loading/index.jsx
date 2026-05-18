import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Select from 'ui/inputs/select';

const title = 'Select: loading';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Select from 'ui/inputs/select';

<Select
	loading={true}
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
			<Select loading={true} />
		</ExampleHolder>
	);
};

export default Example;
