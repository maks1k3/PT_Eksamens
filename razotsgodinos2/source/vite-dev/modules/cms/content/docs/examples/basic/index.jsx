import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import EditContentForm from 'cms/content';

const title = 'EditContentForm: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import EditContentForm from 'cms/content';

<EditContentForm
	name="some_content_name"
	onBeforeSubmit={({ data, Form }) => {
		console.log('onBeforeSubmit:', { data, Form });
		data.extra_item = 'some data';
	}}
	onSuccess={({ data, Form, response }) => {
		console.log('onSuccess:', { data, Form, response });
	}}
	FormProps={{
		onError: ({ data, Form, response }) => {
			console.log('onError', { data, Form, response });
		},
	}}>
	{this.renderForm()}
</EditContentForm>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}
		/>
	);
};

export default Example;
