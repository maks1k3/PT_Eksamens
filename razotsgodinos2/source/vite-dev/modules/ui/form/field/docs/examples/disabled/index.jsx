import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title = 'Field: disabled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'Disable input. Use this to manually disable/enable specific inputs.',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

<Form
	action="actions/success"
	submit={{
		title: 'Save',
	}}>
	<Field label="Field 1" name="field_1" component={Input} />
	<Field label="Field 2" name="field_2" component={Input} />
	<Field
		label="Field 3"
		name="field_3"
		component={Input}
		disabled={true}
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
				<Field label="Field 1" name="field_1" component={Input} />
				<Field label="Field 2" name="field_2" component={Input} />
				<Field
					label="Field 3"
					name="field_3"
					component={Input}
					disabled={true}
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
