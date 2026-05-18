import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Input from 'ui/inputs/input';

import styles from './styles.less';

const title = 'Input: styled placeholder';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Input from 'ui/inputs/input';

<Input
	placeholder="Type something..."
	showStyledPlaceholder={true}
	classNames={{ 'styled-placeholder': styles['placeholder'] }}
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
			<Input
				placeholder="Type something..."
				showStyledPlaceholder={true}
				classNames={{ 'styled-placeholder': styles['placeholder'] }}
			/>
		</ExampleHolder>
	);
};

export default Example;
