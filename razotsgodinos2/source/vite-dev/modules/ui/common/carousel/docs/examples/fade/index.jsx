import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Carousel from 'ui/common/carousel';
import Thumbnail from 'ui/media/thumbnail';
import styles from '../styles.less';

const title = 'Carousel: fade';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Only if multipe = false.',
	code: `
import Carousel from 'ui/common/carousel';
import Thumbnail from 'ui/media/thumbnail'

<Carousel
	fade={true}
	infinite={true}
	items={[
		'http://img-fotki.yandex.ru/get/59572/110661898.1b/0_15d8c0_2c9c766b_orig.jpg',
		'http://img-fotki.yandex.ru/get/194503/110661898.1b/0_16d43b_2acff364_orig.jpg',
		'http://img-fotki.yandex.ru/get/56406/110661898.1b/0_16ba19_9593abf1_orig.jpg',
		'http://img-fotki.yandex.ru/get/4414/68701203.76/0_7cb3a_9ff387aa_orig.jpg',
		'http://img-fotki.yandex.ru/get/4708/68701203.76/0_7cb46_f5bd974e_orig.jpg',
	]}
	renderItem={({ item, index, classNames, gridItemWidth, Carousel }) => {
		return <Thumbnail width="100%" height="500px" src={item} />;
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
				fade={true}
				infinite={true}
				items={[
					'http://img-fotki.yandex.ru/get/59572/110661898.1b/0_15d8c0_2c9c766b_orig.jpg',
					'http://img-fotki.yandex.ru/get/194503/110661898.1b/0_16d43b_2acff364_orig.jpg',
					'http://img-fotki.yandex.ru/get/56406/110661898.1b/0_16ba19_9593abf1_orig.jpg',
					'http://img-fotki.yandex.ru/get/4414/68701203.76/0_7cb3a_9ff387aa_orig.jpg',
					'http://img-fotki.yandex.ru/get/4708/68701203.76/0_7cb46_f5bd974e_orig.jpg',
				]}
				renderItem={({ item, index, classNames, gridItemWidth, Carousel }) => {
					return <Thumbnail width="100%" height="500px" src={item} />;
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
