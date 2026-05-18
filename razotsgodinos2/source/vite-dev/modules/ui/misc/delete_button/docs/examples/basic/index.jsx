import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import DeleteButton from 'ui/misc/delete_button';

const title = 'DeleteButton: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import DeleteButton from 'ui/misc/delete_button';

<DeleteButton
	action="actions/success"
	extraData={{
		action: 'delete',
		id: 1,
	}}
	onSuccess={({ data, Form, response, DeleteButton }) => {
		console.log('onSuccess:', { data, Form, response, DeleteButton });
	}}
/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<DeleteButton
				action="actions/success"
				extraData={{
					action: 'delete',
					id: 1,
				}}
				onSuccess={({ data, Form, response, DeleteButton }) => {
					console.log('onSuccess:', { data, Form, response, DeleteButton });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
