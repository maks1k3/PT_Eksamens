import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import ColorPicker from 'ui/inputs/color_picker';

const title = 'ColorPicker: inside Form';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ColorPicker from 'ui/inputs/color_picker';

<Form
	action="actions/success"
	submit={{
		title: 'Save',
	}}>
	<Field label="Title" name="title" component={Input} />
	<Field
		label="Color"
		name="color"
		component={ColorPicker}
		value="#60c411"
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
					title: 'Save',
				}}>
				<Field label="Title" name="title" component={Input} />
				<Field
					label="Color"
					name="color"
					component={ColorPicker}
					value="#60c411"
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
