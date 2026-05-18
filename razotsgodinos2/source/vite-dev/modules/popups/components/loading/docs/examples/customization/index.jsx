import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'LoadingPopup: customization';

import styles from './styles.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
openPopup({
	name: 'loading',
	data: {
		title: 'Processing data...',
		message: "Are you sure you don't want to wait?",
		classNames: styles,
		ProgressBarProps: {
			percent: 65,
			theme: 'danger',
		},
	},
	settings: {
		verticalAlign: 'bottom',
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
						name: 'loading',
						data: {
							title: 'Processing data...',
							message: "Are you sure you don't want to wait?",
							classNames: styles,
							ProgressBarProps: {
								percent: 65,
								theme: 'danger',
							},
						},
						settings: {
							verticalAlign: 'bottom',
						},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
