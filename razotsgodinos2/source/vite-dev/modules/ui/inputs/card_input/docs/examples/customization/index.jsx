import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CardInput from 'ui/inputs/card_input';

import styles from './styles.less';

const title = 'CardInput: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CardInput from 'ui/inputs/card_input';

<CardInput classNames={styles} enableZipInput={true} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<CardInput classNames={styles} enableZipInput={true} />
		</ExampleHolder>
	);
};

export default Example;
