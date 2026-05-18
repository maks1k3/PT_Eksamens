import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import MultiSelect from 'ui/inputs/multi_select';

const title = 'MultiSelect: searchable';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import MultiSelect from 'ui/inputs/multi_select';

<MultiSelect
	searchable={true}
	options={[
		{
			value: 'elephant',
			label: 'Elephant',
		},
		{
			value: 'cat',
			label: 'Cat',
		},
		{
			value: 'giraffe',
			label: 'Giraffe',
		},
		{
			value: 'dog',
			label: 'Dog',
		},
		{
			value: 'mole',
			label: 'Mole',
		},
		{
			value: 'fish',
			label: 'Fish',
		},
	]}
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
			<MultiSelect
				searchable={true}
				options={[
					{
						value: 'elephant',
						label: 'Elephant',
					},
					{
						value: 'cat',
						label: 'Cat',
					},
					{
						value: 'giraffe',
						label: 'Giraffe',
					},
					{
						value: 'dog',
						label: 'Dog',
					},
					{
						value: 'mole',
						label: 'Mole',
					},
					{
						value: 'fish',
						label: 'Fish',
					},
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
