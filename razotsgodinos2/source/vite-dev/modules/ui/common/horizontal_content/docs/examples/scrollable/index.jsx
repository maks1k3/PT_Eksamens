import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import HorizontalContent from 'ui/common/horizontal_content';

import styles from '../styles.less';

const title = 'HorizontalContent: scrollable';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import HorizontalContent from 'ui/common/horizontal_content';

<HorizontalContent
	scrollOnMouseWheel={true}
	mouseWheelScrollDistance={50}
	items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
	renderItem={({ item, index, classNames, HorizontalContent }) => {
		return (
			<div
				className={styles['item']}
				style={{ width: (index + 1) * 200 }}>
				{item}
			</div>
		);
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
			<HorizontalContent
				scrollOnMouseWheel={true}
				mouseWheelScrollDistance={50}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
				renderItem={({ item, index, classNames, HorizontalContent }) => {
					return (
						<div
							className={styles['item']}
							style={{ width: (index + 1) * 200 }}>
							{item}
						</div>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
