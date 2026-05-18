import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import Checkbox from 'ui/inputs/checkbox';
import RadioGroup from 'ui/inputs/radio_group';
import DateTimePicker from 'ui/inputs/datetime_picker';
import Select from 'ui/inputs/select';

const title = 'Form: onChange';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Onchange event fires when any form input is changed.',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import Checkbox from 'ui/inputs/checkbox';
import RadioGroup from 'ui/inputs/radio_group';
import DateTimePicker from 'ui/inputs/datetime_picker';
import Select from 'ui/inputs/select';

<Form
	action="actions/success"
	submit={{
		title: 'Send',
	}}
	onChange={({ data, Form, changed, value }) => {
		//data - all inputs values
		//changed - name of the changed field
		//value - changed field value
		console.log('onChange:', { data, Form, changed, value });
	}}>
	<Field label="Title" name="title" component={Input} />
	<Field label="Desciption" name="description" component={TextArea} />
	<Field label="Checkbox" name="active" component={Checkbox} />
	<Field label="Date" name="date" component={DateTimePicker} />
	<Field
		label="RadioGroup"
		name="radio_group"
		component={RadioGroup}
		componentProps={{
			options: [
				{
					value: 'male',
					label: 'Male',
				},
				{
					value: 'female',
					label: 'Female',
				},
			],
		}}
	/>
	<Field
		label="Select"
		name="select"
		component={Select}
		componentProps={{
			options: [
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
			],
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
					title: 'Send',
				}}
				onChange={({ data, Form, changed, value }) => {
					//data - all inputs values
					//changed - name of the changed field
					//value - changed field value
					console.log('onChange:', { data, Form, changed, value });
				}}>
				<Field label="Title" name="title" component={Input} />
				<Field label="Desciption" name="description" component={TextArea} />
				<Field label="Checkbox" name="active" component={Checkbox} />
				<Field label="Date" name="date" component={DateTimePicker} />
				<Field
					label="RadioGroup"
					name="radio_group"
					component={RadioGroup}
					componentProps={{
						options: [
							{
								value: 'male',
								label: 'Male',
							},
							{
								value: 'female',
								label: 'Female',
							},
						],
					}}
				/>
				<Field
					label="Select"
					name="select"
					component={Select}
					componentProps={{
						options: [
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
						],
					}}
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
