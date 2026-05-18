import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

import styles from './styles.less';

const title = 'ConfirmationPopup: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
openPopup({
	name: 'confirmation',
	data: {
		classNames: styles,
		title: 'Confirm note deletion',
		text: 'Are you sure you want to delete this note?',
		confirm: 'Confirm text',
		cancel: 'Cancel text',
		theme: 'success',
		onConfirm: () => {
			console.log('onConfirm');
		},
		onCancel: () => {
			console.log('onCancel');
		},
	},
	settings: {
		verticalAlign: 'middle',
		level: 1,
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
							classNames: styles,
							title: 'Confirm note deletion',
							text: 'Are you sure you want to delete this note?',
							confirm: 'Confirm text',
							cancel: 'Cancel text',
							theme: 'success',
							onConfirm: () => {
								//console.log('onConfirm');
							},
							onCancel: () => {
								//console.log('onCancel');
							},
						},
						settings: {
							verticalAlign: 'middle',
							level: 1,
						},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
