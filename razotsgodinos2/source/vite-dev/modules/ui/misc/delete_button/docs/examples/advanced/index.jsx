import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import DeleteButton from 'ui/misc/delete_button';

const title = 'DeleteButton: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import DeleteButton from 'ui/misc/delete_button';

<DeleteButton
	extraData={{
		action: 'delete',
		id: 1,
	}}
	title="Delete this post"
	icon={{
		provider: 'mdi',
		name: 'delete',
	}}
	confirmationTitle="Confirm action"
	confirmationText="Are you sure you want to delete this post?"
	confirmationTheme="primary"
	confirmationConfirm="Confirm"
	confirmationCancel="Cancel"
	onProcess={({ data, Form }) => {
		console.log('onProcess:', { data, Form });

		setTimeout(() => {
			Form.unLock();
		}, 2000);
	}}
	onSuccess={({ data, Form, response, DeleteButton }) => {
		console.log('onSuccess:', { data, Form, response, DeleteButton });
	}}
	onError={({ data, Form, response, DeleteButton }) => {
		console.log('onError:', { data, Form, response, DeleteButton });
	}}
	FormProps={{
		showSuccess: false,
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
				extraData={{
					action: 'delete',
					id: 1,
				}}
				title="Delete this post"
				icon={{
					provider: 'mdi',
					name: 'delete',
				}}
				confirmationTitle="Confirm action"
				confirmationText="Are you sure you want to delete this post?"
				confirmationTheme="primary"
				confirmationConfirm="Confirm"
				confirmationCancel="Cancel"
				onProcess={({ data, Form }) => {
					console.log('onProcess:', { data, Form });

					setTimeout(() => {
						Form.unLock();
					}, 2000);
				}}
				onSuccess={({ data, Form, response, DeleteButton }) => {
					console.log('onSuccess:', { data, Form, response, DeleteButton });
				}}
				onError={({ data, Form, response, DeleteButton }) => {
					console.log('onError:', { data, Form, response, DeleteButton });
				}}
				FormProps={{
					showSuccess: false,
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
