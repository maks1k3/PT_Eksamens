import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Card from 'ui/common/card';

import styles from './styles.less';

const title = 'Card: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Card from 'ui/common/card';

<Card classNames={styles} withPadding={false}>
	<div>This is some content</div>
</Card>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Card classNames={styles} withPadding={false}>
				<div>This is some content</div>
			</Card>
		</ExampleHolder>
	);
};

export default Example;
