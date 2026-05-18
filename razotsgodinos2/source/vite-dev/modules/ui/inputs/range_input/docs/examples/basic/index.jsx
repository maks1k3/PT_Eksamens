import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RangeInput from 'ui/inputs/range_input';

const title = 'RangeInput: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RangeInput from 'ui/inputs/range_input';

<RangeInput  />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<RangeInput />
		</ExampleHolder>
	);
};

export default Example;
