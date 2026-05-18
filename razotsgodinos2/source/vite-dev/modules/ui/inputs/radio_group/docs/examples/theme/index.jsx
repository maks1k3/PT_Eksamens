import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RadioGroup from 'ui/inputs/radio_group';

const title = 'RadioGroup: theme';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RadioGroup from 'ui/inputs/radio_group';

<RadioGroup
  theme="main" //main, primary, success, info, warning, danger, custom
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
			<h3>Main</h3>
			<RadioGroup
				theme="main"
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
			/>
			<h3>Primary</h3>
			<RadioGroup
				theme="primary"
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
			/>
			<h3>Success</h3>
			<RadioGroup
				theme="success"
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
			/>
			<h3>Info</h3>
			<RadioGroup
				theme="info"
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
			/>
			<h3>Warning</h3>
			<RadioGroup
				theme="warning"
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
			/>
			<h3>Danger</h3>
			<RadioGroup
				theme="danger"
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
			/>
			<h3>Custom</h3>
			<RadioGroup
				theme="custom"
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
			/>
		</ExampleHolder>
	);
};

export default Example;
