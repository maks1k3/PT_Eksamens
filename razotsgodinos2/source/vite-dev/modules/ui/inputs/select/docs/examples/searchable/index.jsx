import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Select from 'ui/inputs/select';

const title = 'Select: searchable';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Select from 'ui/inputs/select';

<Select
	searchable={true}
	options={[
		{
			value: 'option_1',
			label: 'Option 1',
		},
		{
			value: 'cat',
			label: 'Cat',
		},
		{
			value: 'option_3',
			label: 'Option 3',
		},
		{
			value: 'dog',
			label: 'Dog',
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
			<Select
				searchable={true}
				options={[
					{
						value: 'option_1',
						label: 'Option 1',
					},
					{
						value: 'cat',
						label: 'Cat',
					},
					{
						value: 'option_3',
						label: 'Option 3',
					},
					{
						value: 'dog',
						label: 'Dog',
					},
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
