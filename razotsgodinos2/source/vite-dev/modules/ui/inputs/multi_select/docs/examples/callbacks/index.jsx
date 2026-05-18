import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import MultiSelect from 'ui/inputs/multi_select';

const title = 'MultiSelect: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import MultiSelect from 'ui/inputs/multi_select';

<MultiSelect
	onSelect={({ value }) => {
		console.log('onSelect', value);
	}}
	onUnselect={({ value }) => {
		console.log('onUnselect', value);
	}}
	onChange={({ value }) => {
		console.log('onChange:', { value });
	}}
	options={[
		{
			value: 'option_1',
			label: 'Option 1',
		},
		{
			value: 'option_2',
			label: 'Option 2',
		},
		{
			value: 'option_3',
			label: 'Option 3',
		},
		{
			value: 'option_4',
			label: 'Option 4',
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
				onSelect={({ value }) => {
					console.log('onSelect', value);
				}}
				onUnselect={({ value }) => {
					console.log('onUnselect', value);
				}}
				onChange={({ value }) => {
					console.log('onChange:', { value });
				}}
				options={[
					{
						value: 'option_1',
						label: 'Option 1',
					},
					{
						value: 'option_2',
						label: 'Option 2',
					},
					{
						value: 'option_3',
						label: 'Option 3',
					},
					{
						value: 'option_4',
						label: 'Option 4',
					},
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
