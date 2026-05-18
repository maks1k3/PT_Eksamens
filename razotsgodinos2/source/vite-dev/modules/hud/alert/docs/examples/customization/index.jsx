import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

import styles from './styles.less';

const title = 'Alert: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
showAlert({
	theme: 'success',
	content: (
		<span>
			This <b>is</b> content!
		</span>
	),
	classNames: styles,
	AlertBoxProps: {
		icon: {
			provider: 'icomoon',
			name: 'atom',
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
				title="Customization"
				onClick={() => {
					showAlert({
						theme: 'success',
						content: (
							<span>
								This <b>is</b> content!
							</span>
						),
						classNames: styles,
						AlertBoxProps: {
							icon: {
								provider: 'icomoon',
								name: 'atom',
							},
						},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
