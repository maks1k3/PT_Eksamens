import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RangeInput from 'ui/inputs/range_input';

const title = 'RangeInput: min, max, step';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RangeInput from 'ui/inputs/range_input';

<RangeInput min={50} max={500} step={50} valueLabelDisplay="on" />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<RangeInput min={50} max={500} step={50} valueLabelDisplay="on" />
		</ExampleHolder>
	);
};

export default Example;
