import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title = 'Form: onValidate';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'Perform some extra validation after all main validations are done.',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

<Form
	action="actions/success"
	onValidate={({ Form }) => {
		console.log('onValidate:', { Form, validated: Form.validated });

		const field_1 = Form.fields.field_1.getValue();
		const field_2 = Form.fields.field_2.getValue();

		let passed = true;

		if (field_1 != 1) {
			passed = false;

			Form.fields.field_1.setState({
				showError: true,
				errorMsg: 'This should be 1!',
			});
		} else {
			Form.fields.field_1.setState({
				showError: false,
				errorMsg: '',
			});
		}

		if (field_2 != 3) {
			passed = false;

			Form.fields.field_2.setState({
				showError: true,
				errorMsg: 'This should be 3!',
			});
		} else {
			Form.fields.field_2.setState({
				showError: false,
				errorMsg: '',
			});
		}

		if (passed) {
			Form.validated = true;
			Form.submit();
		}
	}}
	submit={{
		title: 'Save',
	}}>
	<Field
		label="Field 1"
		name="field_1"
		component={Input}
		isRequired={true}
	/>
	<Field
		label="Field 2"
		name="field_2"
		component={Input}
		isRequired={true}
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
				onValidate={({ Form }) => {
					console.log('onValidate:', { Form, validated: Form.validated });

					const field_1 = Form.fields.field_1.getValue();
					const field_2 = Form.fields.field_2.getValue();

					let passed = true;

					if (field_1 != 1) {
						passed = false;

						Form.fields.field_1.setState({
							showError: true,
							errorMsg: 'This should be 1!',
						});
					} else {
						Form.fields.field_1.setState({
							showError: false,
							errorMsg: '',
						});
					}

					if (field_2 != 3) {
						passed = false;

						Form.fields.field_2.setState({
							showError: true,
							errorMsg: 'This should be 3!',
						});
					} else {
						Form.fields.field_2.setState({
							showError: false,
							errorMsg: '',
						});
					}

					if (passed) {
						Form.validated = true;
						Form.submit();
					}
				}}
				submit={{
					title: 'Save',
				}}>
				<Field
					label="Field 1"
					name="field_1"
					component={Input}
					isRequired={true}
				/>
				<Field
					label="Field 2"
					name="field_2"
					component={Input}
					isRequired={true}
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
