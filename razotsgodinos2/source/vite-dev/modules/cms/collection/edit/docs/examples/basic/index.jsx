import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import EditCollectionItem from 'cms/collection/edit';

const title = 'EditCollectionItem: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import EditCollectionItem from 'cms/collection/edit';

<EditCollectionItem
	id={1}
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
</EditCollectionItem>
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
