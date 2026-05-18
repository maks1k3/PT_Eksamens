import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RangeInput from 'ui/inputs/range_input';

const title = 'RangeInput: multiple values';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RangeInput from 'ui/inputs/range_input';

<RangeInput value="10,40,70" />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<RangeInput value="10,40,70" />
		</ExampleHolder>
	);
};

export default Example;
