import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Image from 'ui/media/image';

import styles from './styles.less';

const title = 'Image: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Image from 'ui/media/image'

<Image
	src="http://img-fotki.yandex.ru/get/59115/110661898.1b/0_15bdda_df3bae41_orig.jpg"
	className={styles['image']}
	style={{
		width: '200px',
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
			<Image
				src="http://img-fotki.yandex.ru/get/59115/110661898.1b/0_15bdda_df3bae41_orig.jpg"
				className={styles['image']}
				style={{
					width: '200px',
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
