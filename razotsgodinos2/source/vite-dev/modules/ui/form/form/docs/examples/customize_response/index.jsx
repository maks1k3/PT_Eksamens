import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import FormResponse from 'ui/form/form_response';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import AlertBox from 'ui/misc/alertbox';

const title = 'Form: customize response';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import FormResponse from 'ui/form/form_response';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import AlertBox from 'ui/misc/alertbox';

<Form
	action="actions/success"
	showResponse={false}
	submit={{
		title: 'Save',
	}}>
	<FormResponse
		AlertBoxProps={{
			icon: {
				provider: 'icomoon',
				name: 'atom',
			},
		}}
		render={({ AlertBoxProps, type, content, onClose, FormResponse }) => {
			const theme = type === 'success' ? 'success' : 'danger';

			return (
				<AlertBox
					{...AlertBoxProps}
					content={content}
					theme={theme}
					onClose={onClose}
				/>
			);
		}}
	/>
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
				action="actions/success"
				showResponse={false}
				submit={{
					title: 'Save',
				}}>
				<FormResponse
					AlertBoxProps={{
						icon: {
							provider: 'icomoon',
							name: 'atom',
						},
					}}
					render={({ AlertBoxProps, type, content, onClose, FormResponse }) => {
						const theme = type === 'success' ? 'success' : 'danger';

						return (
							<AlertBox
								{...AlertBoxProps}
								content={content}
								theme={theme}
								onClose={onClose}
							/>
						);
					}}
				/>
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
