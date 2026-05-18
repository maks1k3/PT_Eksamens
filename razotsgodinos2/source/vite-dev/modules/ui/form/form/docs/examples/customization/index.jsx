import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title = 'Form: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

//Do not show success response
<Form
	action="actions/success"
	showSuccess={false}
	submitPosition="left"
	submit={{
		title: 'Save',
	}}>
	<Field label="Field 1" name="field_1" component={Input} />
</Form>

//Do not show error response
<Form
	action="actions/error"
	showError={false}
	submitPosition="right"
	submit={{
		title: 'Save',
	}}>
	<Field label="Field 1" name="field_1" component={Input} />
</Form>

//Do not show any response
<Form
	action="actions/success"
	showResponse={false}
	submitPosition="center"
	submit={{
		title: 'Save',
	}}>
	<Field label="Field 1" name="field_1" component={Input} />
</Form>

//Do not submit on Enter press
<Form
	action="actions/success"
	preventSubmitEvent={true}
	submitPosition="left"
	submit={{
		title: 'Save',
	}}>
	<Field label="Field 1" name="field_1" component={Input} />
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
			<h3>Do not show success response</h3>
			<Form
				action="actions/success"
				showSuccess={false}
				submitPosition="left"
				submit={{
					title: 'Save',
				}}>
				<Field label="Field 1" name="field_1" component={Input} />
			</Form>
			<h3>Do not show error response</h3>
			<Form
				action="actions/error"
				showError={false}
				submitPosition="right"
				submit={{
					title: 'Save',
				}}>
				<Field label="Field 1" name="field_1" component={Input} />
			</Form>
			<h3>Do not show any response</h3>
			<Form
				action="actions/success"
				showResponse={false}
				submitPosition="center"
				submit={{
					title: 'Save',
				}}>
				<Field label="Field 1" name="field_1" component={Input} />
			</Form>
			<h3>Do not submit on Enter press</h3>
			<Form
				action="actions/success"
				preventSubmitEvent={true}
				submitPosition="left"
				submit={{
					title: 'Save',
				}}>
				<Field label="Field 1" name="field_1" component={Input} />
			</Form>
		</ExampleHolder>
	);
};

export default Example;
