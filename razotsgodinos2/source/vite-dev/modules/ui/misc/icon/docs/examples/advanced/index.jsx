import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Icon from 'ui/misc/icon';

const title = 'Icon: advanced';
import styles from './styles.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Icon from 'ui/misc/icon';


<Icon
	provider="mdi"
	name="react"
	className={styles['icon']}
	style={{ padding: '30px' }}
	onClick={() => {
		console.log('On icon click');
	}}
	title="This is title"
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
			<Icon
				provider="mdi"
				name="react"
				className={styles['icon']}
				style={{ padding: '30px' }}
				onClick={() => {
					console.log('On icon click');
				}}
				title="This is title"
			/>
		</ExampleHolder>
	);
};

export default Example;
