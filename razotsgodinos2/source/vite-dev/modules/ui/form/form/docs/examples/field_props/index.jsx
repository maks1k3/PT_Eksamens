import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title = 'Form: FieldProps';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		"Properties for every Field component inside this form. If some Field has properties listed in FieldProps then Field's properties will be used instead of FieldProps.",
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

<Form
	action="actions/success"
	submit={{
		title: 'Save',
	}}
	FieldProps={{
		labelWidth: '30%',
		inputWidth: '70%',
		displayType: 'row',
	}}>
	<Field label="Field 1" name="field_1" component={Input} />
	<Field
		label="Field 2"
		name="field_2"
		component={Input}
		displayType="column"
	/>
	<Field label="Field 3" name="field_3" component={Input} />
	<Field
		label="Field 4"
		name="field_4"
		component={Input}
		labelWidth="20%"
		inputWidth="80%"
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
				}}
				FieldProps={{
					labelWidth: '30%',
					inputWidth: '70%',
					displayType: 'row',
				}}>
				<Field label="Field 1" name="field_1" component={Input} />
				<Field
					label="Field 2"
					name="field_2"
					component={Input}
					displayType="column"
				/>
				<Field label="Field 3" name="field_3" component={Input} />
				<Field
					label="Field 4"
					name="field_4"
					component={Input}
					labelWidth="20%"
					inputWidth="80%"
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
