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
import AutoComplete from 'ui/inputs/autocomplete';
import TagsInput from 'ui/inputs/tags_input';

const title = 'Field: component';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
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
	action="actions/echo"
	submit={{
		title: 'Save',
	}}>
	<Field label="Name" name="name" component={Input} />
	<Field label="Text" name="text" component={TextArea} />
	<Field label="Checkbox" name="active" component={Checkbox} />
	<Field
		label="RadioGroup"
		name="gender"
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
	<Field label="Date" name="date" component={DateTimePicker} />
	<Field
		label="Select single"
		name="game"
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
	<Field
		label="Select multiple"
		name="game_multi"
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
			multi: true,
		}}
	/>
	<Field
		label="AutoComplete"
		name="autocomplete"
		component={AutoComplete}
		componentProps={{
			optionsUrl: 'example_api/autocomplete',
			valueKey: 'id',
			labelKey: 'name',
		}}
	/>
	<Field label="TagsInput" name="tags_input" component={TagsInput} />
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
				action="actions/echo"
				submit={{
					title: 'Save',
				}}>
				<Field label="Name" name="name" component={Input} />
				<Field label="Text" name="text" component={TextArea} />
				<Field label="Checkbox" name="active" component={Checkbox} />
				<Field
					label="RadioGroup"
					name="gender"
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
				<Field label="Date" name="date" component={DateTimePicker} />
				<Field
					label="Select single"
					name="game"
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
				<Field
					label="Select multiple"
					name="game_multi"
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
						multi: true,
					}}
				/>
				<Field
					label="AutoComplete"
					name="autocomplete"
					component={AutoComplete}
					componentProps={{
						optionsUrl: 'example_api/autocomplete',
						valueKey: 'id',
						labelKey: 'name',
					}}
				/>
				<Field label="TagsInput" name="tags_input" component={TagsInput} />
			</Form>
		</ExampleHolder>
	);
};

export default Example;
