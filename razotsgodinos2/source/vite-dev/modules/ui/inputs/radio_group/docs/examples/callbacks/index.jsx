import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RadioGroup from 'ui/inputs/radio_group';

const title = 'RadioGroup: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RadioGroup from 'ui/inputs/radio_group';

<RadioGroup
	onChange={({ value, RadioGroup }) => {
		console.log('onChange:', { value, RadioGroup });
	}}
	onFocus={({ value, event, RadioGroup }) => {
		console.log('onFocus:', { value, event, RadioGroup });
	}}
	onBlur={({ value, event, RadioGroup }) => {
		console.log('onBlur:', { value, event, RadioGroup });
	}}
	value="en"
	options={[
		{
			value: 'en',
			label: 'English',
		},
		{
			value: 'lv',
			label: 'Latvian',
		},
		{
			value: 'ru',
			label: 'Russian',
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
			<RadioGroup
				onChange={({ value, RadioGroup }) => {
					console.log('onChange:', { value, RadioGroup });
				}}
				onFocus={({ value, event, RadioGroup }) => {
					console.log('onFocus:', { value, event, RadioGroup });
				}}
				onBlur={({ value, event, RadioGroup }) => {
					console.log('onBlur:', { value, event, RadioGroup });
				}}
				value="en"
				options={[
					{
						value: 'en',
						label: 'English',
					},
					{
						value: 'lv',
						label: 'Latvian',
					},
					{
						value: 'ru',
						label: 'Russian',
					},
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
