import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Select from 'ui/inputs/select';

const title = 'Select: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Select from 'ui/inputs/select';

<Select
	onChange={({ value, Select }) => {
		console.log('onChange:', { value, Select });
	}}
	onFocus={({ Select }) => {
		console.log('onFocus:', { Select });
	}}
	onBlur={({ Select }) => {
		console.log('onBlur:', { Select });
	}}
	onOpen={({ Select }) => {
		console.log('onOpen:', { Select });
	}}
	onClose={({ Select }) => {
		console.log('onClose:', { Select });
	}}
	onValueClick={({ value, event, Select }) => {
		console.log('onValueClick', { value, event, Select });
	}}
	multi={true}//toggle single/multi
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
			<h3>Single</h3>
			<Select
				onChange={({ value, Select }) => {
					console.log('onChange:', { value, Select });
				}}
				onFocus={({ Select }) => {
					console.log('onFocus:', { Select });
				}}
				onBlur={({ Select }) => {
					console.log('onBlur:', { Select });
				}}
				onOpen={({ Select }) => {
					console.log('onOpen:', { Select });
				}}
				onClose={({ Select }) => {
					console.log('onClose:', { Select });
				}}
				onValueClick={({ value, event, Select }) => {
					console.log('onValueClick', { value, event, Select });
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
			<h3>Mutli</h3>
			<Select
				onChange={({ value, Select }) => {
					console.log('onChange:', { value, Select });
				}}
				onFocus={({ Select }) => {
					console.log('onFocus:', { Select });
				}}
				onBlur={({ Select }) => {
					console.log('onBlur:', { Select });
				}}
				onOpen={({ Select }) => {
					console.log('onOpen:', { Select });
				}}
				onClose={({ Select }) => {
					console.log('onClose:', { Select });
				}}
				onValueClick={({ value, event, Select }) => {
					console.log('onValueClick', { value, event, Select });
				}}
				multi={true}
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
