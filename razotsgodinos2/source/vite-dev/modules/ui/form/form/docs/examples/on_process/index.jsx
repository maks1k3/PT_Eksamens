import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title = 'Form: onProcess';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		"Can be used to lock form and do some async operations with form's inputs data.",
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

<Form
	onProcess={({ data, Form }) => {
		console.log('onProcess:', { data, Form });

		//emulating async action
		setTimeout(() => {
			//if successful
			Form.showSuccess('Saved!');

			//if error
			//Form.showError('Something went wrong!');

			//you can just unLock form
			//Form.unLock();
		}, 2000);
	}}
	submit={{
		title: 'Save',
	}}>
	<Field label="Field 1" name="field_1" component={Input} />
	<Field
		label="Field 2"
		name="field_2"
		component={Input}
		value="Some value"
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
				onProcess={({ data, Form }) => {
					console.log('onProcess:', { data, Form });

					//emulating async action
					setTimeout(() => {
						//if successful
						Form.showSuccess('Saved!');

						//if error
						//Form.showError('Something went wrong!');

						//you can just unLock form
						//Form.unLock();
					}, 2000);
				}}
				submit={{
					title: 'Save',
				}}>
				<Field label="Field 1" name="field_1" component={Input} />
				<Field
					label="Field 2"
					name="field_2"
					component={Input}
					value="Some value"
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
