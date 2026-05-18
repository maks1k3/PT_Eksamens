import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Carousel from 'ui/common/carousel';

import styles from '../styles.less';

const title = 'Carousel: autoplay';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'Autoplay stops when user is interacting with Carousel and starts again after cooldown.',
	code: `
import Carousel from 'ui/common/carousel';

<Carousel
	autoplay={true}
	autoplayCooldown={2000} //2 seconds
	autoplaySpeed={1000} //1 second
	multiple={true}
	infinite={true}
	items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
	getGridProps={({
		containerWidth,
		browserDevice,
		browserWindowWidth,
	}) => {
		return {
			gutter: 10,
			minWidth: 200,
		};
	}}
	renderItem={({ item, index, classNames, gridItemWidth, Carousel }) => {
		const className = _g.classNames(
			{ [styles['item_full']]: gridItemWidth === '100%' },
			{ [styles['item']]: gridItemWidth !== '100%' },
		);
		return <div className={className}>{item}</div>;
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
				autoplay={true}
				autoplayCooldown={2000} //2 seconds
				autoplaySpeed={1000} //1 second
				multiple={false}
				infinite={true}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
				getGridProps={({
					containerWidth,
					browserDevice,
					browserWindowWidth,
				}) => {
					return {
						gutter: 10,
						minWidth: 200,
					};
				}}
				renderItem={({ item, index, classNames, gridItemWidth, Carousel }) => {
					const className = _g.classNames(
						{ [styles['item_full']]: gridItemWidth === '100%' },
						{ [styles['item']]: gridItemWidth !== '100%' },
					);
					return <div className={className}>{item}</div>;
				}}
			/>
			<h3>Multiple</h3>
			<Carousel
				autoplay={true}
				autoplayCooldown={2000} //2 seconds
				autoplaySpeed={1000} //1 second
				multiple={true}
				infinite={true}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
				getGridProps={({
					containerWidth,
					browserDevice,
					browserWindowWidth,
				}) => {
					return {
						gutter: 10,
						minWidth: 200,
					};
				}}
				renderItem={({ item, index, classNames, gridItemWidth, Carousel }) => {
					const className = _g.classNames(
						{ [styles['item_full']]: gridItemWidth === '100%' },
						{ [styles['item']]: gridItemWidth !== '100%' },
					);
					return <div className={className}>{item}</div>;
				}}
			/>
			{/* <h3>Multiple and changeCurrentOnArrowClick = false</h3>
			<Carousel
				autoplay={true}
				autoplayCooldown={2000} //2 seconds
				autoplaySpeed={1000} //1 second
				changeCurrentOnArrowClick={false}
				multiple={true}
				infinite={true}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
				getGridProps={({
					containerWidth,
					browserDevice,
					browserWindowWidth,
				}) => {
					return {
						gutter: 10,
						minWidth: 200,
					};
				}}
				renderItem={({ item, index, classNames, gridItemWidth, Carousel }) => {
					const className = _g.classNames(
						{ [styles['item_full']]: gridItemWidth === '100%' },
						{ [styles['item']]: gridItemWidth !== '100%' },
					);
					return <div className={className}>{item}</div>;
				}}
			/> */}
		</ExampleHolder>
	);
};

export default Example;
