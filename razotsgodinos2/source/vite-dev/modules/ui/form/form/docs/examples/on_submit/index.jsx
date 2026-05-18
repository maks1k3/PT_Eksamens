import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title = 'Form: onSubmit';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Do something after form is submitted.',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

<Form
	onSubmit={({ data, Form }) => {
		console.log('onSubmit', { data, Form });
	}}
	submit={{
		title: 'Go',
	}}>
	<Field label="Field 1" name="field_1" component={Input} />
	<Field
		label="Field 2"
		name="field_2"
		component={Input}
		value="Some data"
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
				onSubmit={({ data, Form }) => {
					console.log('onSubmit', { data, Form });
				}}
				submit={{
					title: 'Go',
				}}>
				<Field label="Field 1" name="field_1" component={Input} />
				<Field
					label="Field 2"
					name="field_2"
					component={Input}
					value="Some data"
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
