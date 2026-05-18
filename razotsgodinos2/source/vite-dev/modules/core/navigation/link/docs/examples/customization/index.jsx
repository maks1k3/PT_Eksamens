import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Link from 'core/navigation/link';

import styles from './styles.less';

const title = 'Link: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Link from 'core/navigation/link';

<Link
	classNames={styles}
	to="#"
	style={{ outline: '1px solid red' }}
	replace={true}
	scrollTop={false}>
	This is link
</Link>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Link
				classNames={styles}
				to="#"
				style={{ outline: '1px solid red' }}
				replace={true}
				scrollTop={false}>
				This is link
			</Link>
		</ExampleHolder>
	);
};

export default Example;
