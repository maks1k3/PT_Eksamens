import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title = 'Form: refresh';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Reset form after submit.',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

<Form
	action="actions/success"
	refresh={true}
	submit={{
		title: 'Save',
	}}>
	<Field
		label="Field 1"
		name="field_1"
		component={Input}
		value="This is first line"
	/>
	<Field
		label="Field 2"
		name="field_2"
		component={Input}
		value="This is second line"
		defaultValue="This is second line default value"
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
				refresh={true}
				submit={{
					title: 'Save',
				}}>
				<Field
					label="Field 1"
					name="field_1"
					component={Input}
					value="This is first line"
				/>
				<Field
					label="Field 2"
					name="field_2"
					component={Input}
					value="This is second line"
					defaultValue="This is second line default value"
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
