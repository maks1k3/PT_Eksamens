import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AutoComplete from 'ui/inputs/autocomplete';

const title = 'AutoComplete: readonly';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AutoComplete from 'ui/inputs/autocomplete';

<AutoComplete
	readonly={true}
	value="StarCraft"
	options={[
		{
			value: 'age_of_mythology',
			label: 'Age of Mythology',
		},
		{
			value: 'starcraft',
			label: 'StarCraft',
		},
		{
			value: 'counter_strike',
			label: 'Counter strike',
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
			<AutoComplete
				readonly={true}
				value="StarCraft"
				options={[
					{
						value: 'age_of_mythology',
						label: 'Age of Mythology',
					},
					{
						value: 'starcraft',
						label: 'StarCraft',
					},
					{
						value: 'counter_strike',
						label: 'Counter strike',
					},
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
