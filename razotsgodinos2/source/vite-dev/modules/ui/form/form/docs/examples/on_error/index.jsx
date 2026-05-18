import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title = 'Form: onError';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Fires on error response from server.',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

<Form
	action="actions/error"
	onError={({ data, Form, response }) => {
		console.log('onError', { data, Form, response });
	}}
	submit={{
		title: 'Save',
	}}>
	<Field label="Field 1" name="field_1" component={Input} />
	<Field label="Field 2" name="field_2" component={Input} />
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
				action="actions/error"
				onError={({ data, Form, response }) => {
					console.log('onError', { data, Form, response });
				}}
				submit={{
					title: 'Save',
				}}>
				<Field label="Field 1" name="field_1" component={Input} />
				<Field label="Field 2" name="field_2" component={Input} />
			</Form>
		</ExampleHolder>
	);
};

export default Example;
