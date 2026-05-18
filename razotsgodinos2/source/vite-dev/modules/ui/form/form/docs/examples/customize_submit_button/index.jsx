import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import FormSubmitButton from 'ui/form/form_submit_button';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Button from 'ui/controls/button';

const title = 'Form: customize submit button';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import FormSubmitButton from 'ui/form/form_submit_button';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Button from 'ui/controls/button';

<Form action="actions/success">
	<Field label="Field 1" name="field_1" component={Input} />
	<Field
		label="Field 2"
		name="field_2"
		component={Input}
		value="Some value"
	/>
	<FormSubmitButton
		ButtonProps={{ title: 'Save', theme: 'success' }}
		render={({ ButtonProps, locked, onClick, FormSubmitButton }) => {
			return (
				<div style={{ textAlign: 'right' }}>
					<Button {...ButtonProps} loading={locked} onClick={onClick} />
				</div>
			);
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
			<Form action="actions/success">
				<Field label="Field 1" name="field_1" component={Input} />
				<Field
					label="Field 2"
					name="field_2"
					component={Input}
					value="Some value"
				/>
				<FormSubmitButton
					ButtonProps={{ title: 'Save', theme: 'success' }}
					render={({ ButtonProps, locked, onClick, FormSubmitButton }) => {
						return (
							<div style={{ textAlign: 'right' }}>
								<Button {...ButtonProps} loading={locked} onClick={onClick} />
							</div>
						);
					}}
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
