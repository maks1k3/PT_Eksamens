import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import RadioGroup from 'ui/inputs/radio_group';
import Checkbox from 'ui/inputs/checkbox';
import Select from 'ui/inputs/select';

const title = 'Form: autoSubmit';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Submit form on every input change.',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import RadioGroup from 'ui/inputs/radio_group';
import Checkbox from 'ui/inputs/checkbox';
import Select from 'ui/inputs/select';

<Form action="actions/success" autoSubmit={true}>
	<Field
		label="Game"
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
		label="Language"
		name="lang"
		component={RadioGroup}
		componentProps={{
			options: [
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
			],
		}}
	/>
	<Field label="Active" name="active" component={Checkbox} />
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
			<Form action="actions/success" autoSubmit={true}>
				<Field
					label="Game"
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
					label="Language"
					name="lang"
					component={RadioGroup}
					componentProps={{
						options: [
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
						],
					}}
				/>
				<Field label="Active" name="active" component={Checkbox} />
			</Form>
		</ExampleHolder>
	);
};

export default Example;
