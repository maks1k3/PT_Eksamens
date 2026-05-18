import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TextArea from 'ui/inputs/textarea';

import styles from './styles.less';

const title = 'TextArea: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Input from 'ui/inputs/input';

<TextArea
	value="This is text"
	classNames={styles}
	clearable={true}
	clearIcon={{ provider: 'fa', name: 'crosshairs' }}
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
			<TextArea
				value="This is text"
				classNames={styles}
				clearable={true}
				clearIcon={{ provider: 'fa', name: 'crosshairs' }}
			/>
		</ExampleHolder>
	);
};

export default Example;
