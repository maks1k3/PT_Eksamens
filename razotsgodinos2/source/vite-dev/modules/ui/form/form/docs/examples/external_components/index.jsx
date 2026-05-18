import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import FormResponse from 'ui/form/form_response';
import FormSubmitButton from 'ui/form/form_submit_button';
import FormResetButton from 'ui/form/form_reset_button';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title =
	'Form: external components - FormResponse, FormSubmitButton, FormResetButton';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import FormResponse from 'ui/form/form_response';
import FormSubmitButton from 'ui/form/form_submit_button';
import FormResetButton from 'ui/form/form_reset_button';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

<Form action="actions/success" showResponse={false}>
	<div>
		<FormResponse />
		<div>
			<FormSubmitButton ButtonProps={{ title: 'Submit' }} />
			<FormResetButton
				ButtonProps={{ title: 'Reset', theme: 'primary' }}
			/>
		</div>
	</div>
	<div>
		<Field
			name="field_1"
			component={Input}
			componentProps={{ placeholder: 'Field 1' }}
		/>
	</div>
	<div>
		<Field
			name="field_2"
			component={Input}
			componentProps={{ placeholder: 'Field 2' }}
			value="Some value"
		/>
	</div>
	<div>
		<FormResponse />
		<div>
			<FormSubmitButton ButtonProps={{ title: 'Submit' }} />
			<FormResetButton
				ButtonProps={{ title: 'Reset', theme: 'primary' }}
			/>
		</div>
	</div>
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
			<Form action="actions/success" showResponse={false}>
				<div>
					<FormResponse />
					<div>
						<FormSubmitButton ButtonProps={{ title: 'Submit' }} />
						<FormResetButton
							ButtonProps={{ title: 'Reset', theme: 'primary' }}
						/>
					</div>
				</div>
				<div>
					<Field
						name="field_1"
						component={Input}
						componentProps={{ placeholder: 'Field 1' }}
					/>
				</div>
				<div>
					<Field
						name="field_2"
						component={Input}
						componentProps={{ placeholder: 'Field 2' }}
						value="Some value"
					/>
				</div>
				<div>
					<FormResponse />
					<div>
						<FormSubmitButton ButtonProps={{ title: 'Submit' }} />
						<FormResetButton
							ButtonProps={{ title: 'Reset', theme: 'primary' }}
						/>
					</div>
				</div>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
