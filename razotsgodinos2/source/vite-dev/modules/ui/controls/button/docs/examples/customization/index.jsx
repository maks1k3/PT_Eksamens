import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

import styles from './styles.less';

const title = 'Button: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Button from 'ui/controls/button';

<Button
	title="Customization"
	type="reset"
	classNames={styles}
	style={{ outline: '3px solid red' }}
	renderTitle={({ classNames, title, customTitle, Button }) => {
		if (!_.isUndefined(customTitle)) {
			return <span className={classNames['title']}>{customTitle}</span>;
		} else {
			return <span className={classNames['title']}>{title}</span>;
		}
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
			<Button
				title="Customization"
				type="reset"
				classNames={styles}
				style={{ outline: '3px solid red' }}
				renderTitle={({ classNames, title, customTitle, Button }) => {
					if (!_.isUndefined(customTitle)) {
						return <span className={classNames['title']}>{customTitle}</span>;
					} else {
						return <span className={classNames['title']}>{title}</span>;
					}
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
