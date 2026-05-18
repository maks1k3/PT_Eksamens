import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';

const title = 'Field: validation';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';

<Form
	action="actions/success"
	submit={{
		title: 'Send',
	}}
	FieldProps={{
		errorMsg: {
			isRequired: 'This field is required.',
			isEmail: 'Please enter a valid email address.',
			isEqualTo: 'Please enter the same value again.',
			isValidUrl: 'Please enter a valid url.',
			min: 'Please enter at least :min characters.',
			mustAccept: 'The :title must be accepted.',
		},
	}}>
	<Field
		label="isRequired"
		name="field_1"
		component={Input}
		componentProps={{
			placeholder: 'isRequired={true}',
		}}
		isRequired={true}
	/>
	<Field
		label="isEqualTo"
		name="field_2"
		component={Input}
		componentProps={{
			placeholder: 'isEqualTo="field_1"',
		}}
		isEqualTo="field_1"
	/>
	<Field
		label="isEmail"
		name="field_3"
		component={Input}
		componentProps={{
			placeholder: 'isEmail={true}',
		}}
		isEmail={true}
	/>
	<Field
		label="isValidUrl"
		name="field_4"
		component={Input}
		componentProps={{
			placeholder: 'isValidUrl={true}',
		}}
		isValidUrl={true}
	/>
	<Field
		label="min"
		name="field_5"
		component={Input}
		componentProps={{
			placeholder: 'min={3}',
		}}
		min={3}
	/>
	<Field
		label="mustAccept"
		name="terms"
		component={Checkbox}
		mustAccept={true}
	/>
	<Field
		label="customValidation"
		name="custom"
		component={Input}
		customValidation={({ value, Field, Form }) => {
			console.log('customValidation:', { value, Field, Form });

			const min = 2;
			if (value.length < min) {
				return {
					passed: false,
					msg: \`Please enter at least \${min} characters.\`,
				};
			} else {
				return {
					passed: true,
				};
			}
		}}
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
					title: 'Send',
				}}
				FieldProps={{
					errorMsg: {
						isRequired: 'This field is required.',
						isEmail: 'Please enter a valid email address.',
						isEqualTo: 'Please enter the same value again.',
						isValidUrl: 'Please enter a valid url.',
						min: 'Please enter at least :min characters.',
						mustAccept: 'The :title must be accepted.',
					},
				}}>
				<Field
					label="isRequired"
					name="field_1"
					component={Input}
					componentProps={{
						placeholder: 'isRequired={true}',
					}}
					isRequired={true}
				/>
				<Field
					label="isEqualTo"
					name="field_2"
					component={Input}
					componentProps={{
						placeholder: 'isEqualTo="field_1"',
					}}
					isEqualTo="field_1"
				/>
				<Field
					label="isEmail"
					name="field_3"
					component={Input}
					componentProps={{
						placeholder: 'isEmail={true}',
					}}
					isEmail={true}
				/>
				<Field
					label="isValidUrl"
					name="field_4"
					component={Input}
					componentProps={{
						placeholder: 'isValidUrl={true}',
					}}
					isValidUrl={true}
				/>
				<Field
					label="min"
					name="field_5"
					component={Input}
					componentProps={{
						placeholder: 'min={3}',
					}}
					min={3}
				/>
				<Field
					label="mustAccept"
					name="terms"
					component={Checkbox}
					mustAccept={true}
				/>
				<Field
					label="customValidation"
					name="custom"
					component={Input}
					customValidation={({ value, Field, Form }) => {
						console.log('customValidation:', { value, Field, Form });

						const min = 2;
						if (value.length < min) {
							return {
								passed: false,
								msg: `Please enter at least ${min} characters.`,
							};
						} else {
							return {
								passed: true,
							};
						}
					}}
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
