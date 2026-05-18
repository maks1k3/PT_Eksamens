import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import MasonryList from 'ui/list/masonry_list';
import Image from 'ui/media/image';

const title = 'MasonryList: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import MasonryList from 'ui/list/masonry_list';
import Image from 'ui/media/image';

const images = [
  {
    src: 'http://img-fotki.yandex.ru/get/59572/110661898.1b/0_15d8c0_2c9c766b_orig.jpg',
    width: 889,
    height: 960,
  },
  {
    src: 'http://img-fotki.yandex.ru/get/194503/110661898.1b/0_16d43b_2acff364_orig.jpg',
    width: 1159,
    height: 950,
  },
  ...
];

<MasonryList
	items={images}
	getGridProps={({
		containerWidth,
		browserWindowWidth,
		browserDevice,
	}) => {
		return {
			gutter: 10,
			minWidth: 200,
		};
	}}
	renderItem={({
		containerWidth,
		browserWindowWidth,
		browserDevice,
		gridItemWidth,
		item,
		index,
		gutter,
		minWidth,
		MasonryList,
	}) => {
		const style = {
			width: gridItemWidth,
		};

		if (gridItemWidth === '100%') {
			style.marginBottom = '10px';
		}

		let itemContainerWidth =
			gridItemWidth === '100%' ? containerWidth : gridItemWidth;

		const { src, width, height } = item;

		return (
			<Image
				key={index}
				style={style}
				src={src}
				onClick={() => {
					openPopup({
						name: 'image',
						data: {
							current: index,
							items: images,
						},
					});
				}}
				containerWidth={_.toNumber(
					_.replace(itemContainerWidth, 'px', ''),
				)}
				originalWidth={_.toInteger(width)}
				originalHeight={_.toInteger(height)}
			/>
		);
	}}
	render={({ ref, items, MasonryList }) => {
		return <div ref={ref}>{items}</div>;
	}}
/>
  `,
};

const images = [
	{
		src:
			'http://img-fotki.yandex.ru/get/59572/110661898.1b/0_15d8c0_2c9c766b_orig.jpg',
		width: 889,
		height: 960,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/194503/110661898.1b/0_16d43b_2acff364_orig.jpg',
		width: 1159,
		height: 950,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/56406/110661898.1b/0_16ba19_9593abf1_orig.jpg',
		width: 1280,
		height: 934,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/4414/68701203.76/0_7cb3a_9ff387aa_orig.jpg',
		width: 990,
		height: 614,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/4708/68701203.76/0_7cb46_f5bd974e_orig.jpg',
		width: 990,
		height: 724,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/4814/68701203.77/0_7cb75_a1444561_orig.jpg',
		width: 600,
		height: 796,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/169451/110661898.1c/0_172d3d_779fb02b_orig.jpg',
		width: 1100,
		height: 908,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/102548/110661898.1c/0_172d3e_f17f8e56_orig.jpg',
		width: 800,
		height: 572,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/98645/110661898.1c/0_172d3c_ec3b72c_orig.jpg',
		width: 500,
		height: 361,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/195637/110661898.1c/0_172d3b_b0d544d6_orig.jpg',
		width: 416,
		height: 600,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/98645/110661898.1b/0_1659f0_dbfdabd3_orig.jpg',
		width: 480,
		height: 640,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/42925/110661898.1b/0_16272e_32166b40_orig.jpg',
		width: 960,
		height: 675,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/26144/110661898.1b/0_1625c8_35a3a674_orig.jpg',
		width: 604,
		height: 604,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/115272/110661898.1b/0_15ca99_4505c0fc_orig.jpg',
		width: 419,
		height: 604,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/26767/110661898.1b/0_15c93f_14d366a7_orig.jpg',
		width: 1920,
		height: 1080,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/6447/110661898.1/0_95b13_abfad647_orig.jpg',
		width: 900,
		height: 600,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/5633/110661898.2/0_95b62_e5ecf43_orig.jpg',
		width: 900,
		height: 598,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/4708/68701203.76/0_7cb51_8ec1a646_orig.jpg',
		width: 990,
		height: 712,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/61747/110661898.1b/0_15c940_84cc3c35_orig.jpg',
		width: 900,
		height: 613,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/128446/110661898.1b/0_15bdd5_f6f8e467_orig.jpg',
		width: 600,
		height: 600,
	},
	{
		src:
			'http://img-fotki.yandex.ru/get/59115/110661898.1b/0_15bdda_df3bae41_orig.jpg',
		width: 540,
		height: 720,
	},
];

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<MasonryList
				items={images}
				getGridProps={({
					containerWidth,
					browserWindowWidth,
					browserDevice,
				}) => {
					return {
						gutter: 10,
						minWidth: 200,
					};
				}}
				renderItem={({
					containerWidth,
					browserWindowWidth,
					browserDevice,
					gridItemWidth,
					item,
					index,
					gutter,
					minWidth,
					MasonryList,
				}) => {
					const style = {
						width: gridItemWidth,
					};

					if (gridItemWidth === '100%') {
						style.marginBottom = '10px';
					}

					let itemContainerWidth =
						gridItemWidth === '100%' ? containerWidth : gridItemWidth;

					const { src, width, height } = item;

					return (
						<Image
							key={index}
							style={style}
							src={src}
							onClick={() => {
								openPopup({
									name: 'image',
									data: {
										current: index,
										items: images,
									},
								});
							}}
							containerWidth={_.toNumber(
								_.replace(itemContainerWidth, 'px', ''),
							)}
							originalWidth={_.toInteger(width)}
							originalHeight={_.toInteger(height)}
						/>
					);
				}}
				render={({ ref, items, MasonryList }) => {
					return <div ref={ref}>{items}</div>;
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
