import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AlertBox from 'ui/misc/alertbox';

import styles from './styles.less';

const title = 'AlertBox: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AlertBox from 'ui/misc/alertbox';

<AlertBox
	classNames={styles}
	theme="success"
	content="This is success!"
	showClose={true}
	icon={{
		provider: 'icomoon',
		name: 'atom',
	}}
	onClose={({ AlertBox }) => {
		console.log({
			onClose: {
				AlertBox,
			},
		});
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
			<AlertBox
				classNames={styles}
				theme="success"
				content="This is success!"
				showClose={true}
				icon={{
					provider: 'icomoon',
					name: 'atom',
				}}
				onClose={({ AlertBox }) => {
					console.log({
						onClose: {
							AlertBox,
						},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
