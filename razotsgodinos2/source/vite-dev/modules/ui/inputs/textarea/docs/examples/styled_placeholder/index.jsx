import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TextArea from 'ui/inputs/textarea';

import styles from './styles.less';

const title = 'TextArea: styled placeholder';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import TextArea from 'ui/inputs/textarea';

<TextArea
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
			<TextArea
				placeholder="Type something..."
				showStyledPlaceholder={true}
				classNames={{ 'styled-placeholder': styles['placeholder'] }}
			/>
		</ExampleHolder>
	);
};

export default Example;
