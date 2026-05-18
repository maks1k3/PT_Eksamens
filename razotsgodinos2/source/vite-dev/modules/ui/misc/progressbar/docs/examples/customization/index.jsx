import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ProgressBar from 'ui/misc/progressbar';

import styles from './styles.less';

const title = 'ProgressBar: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ProgressBar from 'ui/misc/progressbar';

<ProgressBar
	classNames={styles}
	showPercent={true}
	percent={100}
	theme="success"
	animate={true}
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
			<ProgressBar
				classNames={styles}
				showPercent={true}
				percent={100}
				theme="success"
				animate={true}
			/>
		</ExampleHolder>
	);
};

export default Example;
