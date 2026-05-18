import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'ConfirmationPopup: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
openPopup({
	name: 'confirmation',
	data: {
		onConfirm: () => {
			console.log('onConfirm');
		},
	},
});
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Button
				title="Show"
				onClick={() => {
					openPopup({
						name: 'confirmation',
						data: {
							onConfirm: () => {
								//console.log('onConfirm');
							},
						},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
