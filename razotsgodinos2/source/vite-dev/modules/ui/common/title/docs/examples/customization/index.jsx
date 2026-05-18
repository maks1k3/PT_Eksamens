import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Title from 'ui/common/title';

import styles from './styles.less';

const title = 'Title: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Title from 'ui/common/title';

<Title classNames={styles} level={3}>This is title</Title>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Title classNames={styles} level={3}>
				This is title
			</Title>
		</ExampleHolder>
	);
};

export default Example;
