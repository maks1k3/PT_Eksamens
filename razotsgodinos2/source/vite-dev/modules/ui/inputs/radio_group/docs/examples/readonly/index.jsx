import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RadioGroup from 'ui/inputs/radio_group';

const title = 'RadioGroup: readonly';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RadioGroup from 'ui/inputs/radio_group';

<RadioGroup
	value="male"
	options={[
		{
			value: 'male',
			label: 'Male',
		},
		{
			value: 'female',
			label: 'Female',
		},
	]}
	readonly={true}
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
			<RadioGroup
				value="male"
				options={[
					{
						value: 'male',
						label: 'Male',
					},
					{
						value: 'female',
						label: 'Female',
					},
				]}
				readonly={true}
			/>
		</ExampleHolder>
	);
};

export default Example;
