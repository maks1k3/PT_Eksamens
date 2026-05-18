import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Carousel from 'ui/common/carousel';

import styles from '../styles.less';

const title = 'Carousel: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Carousel from 'ui/common/carousel';

<Carousel
	items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
	renderItem={({ item, index, classNames, gridItemWidth, Carousel }) => {
		return <div className={styles['item_full']}>{item}</div>;
	}}
	onCurrentChange={({ current, Carousel }) => {
		console.log('onCurrentChange:', { current, Carousel });
	}}
	onOffsetChange={({ offset, Carousel }) => {
		console.log('onOffsetChange:', { offset, Carousel });
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
			<Carousel
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
				renderItem={({ item, index, classNames, gridItemWidth, Carousel }) => {
					return <div className={styles['item_full']}>{item}</div>;
				}}
				onCurrentChange={({ current, Carousel }) => {
					console.log('onCurrentChange:', { current, Carousel });
				}}
				onOffsetChange={({ offset, Carousel }) => {
					console.log('onOffsetChange:', { offset, Carousel });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
