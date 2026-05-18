import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import { Base64 } from 'js-base64';

const title = 'Form: onBeforeSubmit';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'With onBeforeSubmit you can modify form data before it will be submitted to server. For instance, you can convert form data to json or base64.',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import { Base64 } from 'js-base64'

<Form
	action="actions/echo"
	extraData={{
		id: 1,
		action: 'edit',
	}}
	onBeforeSubmit={({ data, Form }) => {
		console.log('onBeforeSubmit', { data, Form });
		//for wysiwyg editors you can base64 encode html, because server side script may strip out your html
		data.content = Base64.encode(data.content);
		data.extra = 'test';
		//or you can send data in json format
		data.in_json = JSON.stringify(data);
	}}
	submit={{
		theme: 'primary',
		title: 'Save',
	}}>
	<Field label="Title" name="title" component={Input} />
	<Field label="Content" name="content" component={TextArea} />
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
				action="actions/echo"
				extraData={{
					id: 1,
					action: 'edit',
				}}
				onBeforeSubmit={({ data, Form }) => {
					console.log('onBeforeSubmit', { data, Form });
					//for wysiwyg editors you can base64 encode html, because server side script may strip out your html
					data.content = Base64.encode(data.content);
					data.extra = 'test';
					//or you can send data in json format
					data.in_json = JSON.stringify(data);
				}}
				submit={{
					theme: 'primary',
					title: 'Save',
				}}>
				<Field label="Title" name="title" component={Input} />
				<Field label="Content" name="content" component={TextArea} />
			</Form>
		</ExampleHolder>
	);
};

export default Example;
