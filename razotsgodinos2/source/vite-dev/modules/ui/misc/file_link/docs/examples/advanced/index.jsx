import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FileLink from 'ui/misc/file_link';

const title = 'FileLink: advanced';

import styles from './styles.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FileLink from 'ui/misc/file_link';

<FileLink
	classNames={styles}
	to="some url"
	title="image.jpg"
	extension="jpg"
	LinkProps={{
		target: '_blank',
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
			<FileLink
				classNames={styles}
				to="some url"
				title="image.jpg"
				extension="jpg"
				LinkProps={{
					target: '_blank',
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
