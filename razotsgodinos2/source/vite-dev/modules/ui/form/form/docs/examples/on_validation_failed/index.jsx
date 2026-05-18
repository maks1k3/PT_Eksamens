import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title = 'Form: onValidationFailed';

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
	onValidationFailed={({ Form }) => {
		console.log('onValidationFailed:', { Form });
		//scroll to the first invalid field
		setTimeout(() => {
			$('html, body').animate(
				{
					scrollTop:
						$('div[data-name="form-error"]:first').offset().top - 100, //header and field height
				},
				200,
			);
		}, 200);
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
	<div style={{ height: '500px' }} />
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
				onValidationFailed={({ Form }) => {
					console.log('onValidationFailed:', { Form });
					//scroll to the first invalid field
					setTimeout(() => {
						$('html, body').animate(
							{
								scrollTop:
									$('div[data-name="form-error"]:first').offset().top - 100, //header and field height
							},
							200,
						);
					}, 200);
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
				<div style={{ height: '500px' }} />
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
