import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RangeInput from 'ui/inputs/range_input';

const title = 'RangeInput: orientation';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RangeInput from 'ui/inputs/range_input';

<div style={{ height: 300 }}>
	<RangeInput valueLabelDisplay="on" orientation="vertical" />
	<RangeInput disabled={true} orientation="vertical" />
	<RangeInput value="10,20" marks={marks} orientation="vertical" />
</div>
  `,
};

const Example = () => {
	const marks = [
		{
			value: 0,
			label: '0°C',
		},
		{
			value: 20,
			label: '20°C',
		},
		{
			value: 37,
			label: '37°C',
		},
		{
			value: 100,
			label: '100°C',
		},
	];
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div style={{ height: 300 }}>
				<RangeInput valueLabelDisplay="on" orientation="vertical" />
				<RangeInput disabled={true} orientation="vertical" />
				<RangeInput value="10,20" marks={marks} orientation="vertical" />
			</div>
		</ExampleHolder>
	);
};

export default Example;
