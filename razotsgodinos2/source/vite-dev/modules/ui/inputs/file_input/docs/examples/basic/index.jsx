import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import FileInput from 'ui/inputs/file_input';

const title = 'FileInput: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import FileInput from 'ui/inputs/file_input';

<Form
	action="actions/success"
	refresh={true}
	submit={{
		title: 'Save',
	}}>
	<Field label="Field 1" name="field_1" component={Input} />
	<Field label="File" name="some_file_name" component={FileInput} />
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
				refresh={true}
				submit={{
					title: 'Save',
				}}>
				<Field label="Field 1" name="field_1" component={Input} />
				<Field label="File" name="some_file_name" component={FileInput} />
			</Form>
		</ExampleHolder>
	);
};

export default Example;
