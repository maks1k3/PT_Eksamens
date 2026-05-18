import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Select from 'ui/inputs/select';

const title = 'Field: onChange';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Select from 'ui/inputs/select';

<Form
	action="actions/success"
	submit={{
		title: 'Save',
	}}>
	<Field
		label="Field 1"
		name="field_1"
		component={Input}
		onChange={({ value, debounce, Field }) => {
			console.log('Field 1 onChange', { value, debounce, Field });
		}}
	/>
	<Field
		label="Field 2"
		name="field_2"
		component={Select}
		componentProps={{
			options: [
				{
					value: 'option_1',
					label: 'Option 1',
				},
				{
					value: 'option_2',
					label: 'Option 2',
				},
			],
		}}
		onChange={({ value, debounce, Field }) => {
			console.log('Field 2 onChange', { value, debounce, Field });
		}}
	/>
</Form>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Form
				action="actions/success"
				submit={{
					title: 'Save',
				}}>
				<Field
					label="Field 1"
					name="field_1"
					component={Input}
					onChange={({ value, debounce, Field }) => {
						console.log('Field 1 onChange', { value, debounce, Field });
					}}
				/>
				<Field
					label="Field 2"
					name="field_2"
					component={Select}
					componentProps={{
						options: [
							{
								value: 'option_1',
								label: 'Option 1',
							},
							{
								value: 'option_2',
								label: 'Option 2',
							},
						],
					}}
					onChange={({ value, debounce, Field }) => {
						console.log('Field 2 onChange', { value, debounce, Field });
					}}
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
