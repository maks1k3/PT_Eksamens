import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RangeInput from 'ui/inputs/range_input';
import Title from 'ui/common/title';

const title = 'RangeInput: marks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RangeInput from 'ui/inputs/range_input';

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

<Title>Marks match steps</Title>
<RangeInput
	step={10}
	value={30}
	marks={true}
	min={10}
	max={110}
	valueLabelDisplay="on"
/>
<Title>Custom marks</Title>
<RangeInput value={20} marks={marks} valueLabelDisplay="on" />
<Title>Restrict only marked values with step=null</Title>
<RangeInput step={null} value={20} marks={marks} valueLabelDisplay="on" />
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
			<div className="margin-bottom">
				<Title>Marks match steps</Title>
				<RangeInput
					step={10}
					value={30}
					marks={true}
					min={10}
					max={110}
					valueLabelDisplay="on"
				/>
			</div>
			<div className="margin-bottom">
				<Title>Custom marks</Title>
				<RangeInput value={20} marks={marks} valueLabelDisplay="on" />
			</div>
			<div className="margin-bottom">
				<Title>Restrict only marked values with step=null</Title>
				<RangeInput
					step={null}
					value={20}
					marks={marks}
					valueLabelDisplay="on"
				/>
			</div>
		</ExampleHolder>
	);
};

export default Example;
