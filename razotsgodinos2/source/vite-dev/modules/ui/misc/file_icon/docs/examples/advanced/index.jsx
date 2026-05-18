import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FileIcon from 'ui/misc/file_icon';

const title = 'FileIcon: advanced';

import styles from './styles.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FileIcon from 'ui/misc/file_icon';

<FileIcon
	extension="pdf"
	title="This is file"
	className={styles['icon']}
	style={{ padding: '30px' }}
	onClick={() => {
		console.log('onClick');
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
			<FileIcon
				extension="pdf"
				title="This is file"
				className={styles['icon']}
				style={{ padding: '30px' }}
				onClick={() => {
					console.log('onClick');
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
