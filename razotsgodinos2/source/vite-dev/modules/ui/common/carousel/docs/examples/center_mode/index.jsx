import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Carousel from 'ui/common/carousel';

import styles from '../styles.less';

const title = 'Carousel: centerMode';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'CenterMode should be used in combination with multiple="true" infinite="true" pageMode="false". Use isInCenter parameter passed to renderItem to style center slide.',
	code: `
import Carousel from 'ui/common/carousel';

<Carousel
	pageMode={false}
	centerMode={true}
	infinite={true}
	multiple={true}
	items={[1, 2, 3, 4, 5]}
	getGridProps={({
		containerWidth,
		browserDevice,
		browserWindowWidth,
	}) => {
		return {
			gutter: 20,
			minWidth: 350,
		};
	}}
	renderItem={({
		item,
		index,
		classNames,
		gridItemWidth,
		isInCenter,
		Carousel,
	}) => {
		const className = _g.classNames(
			{ [styles['item_full']]: gridItemWidth === '100%' },
			{ [styles['item']]: gridItemWidth !== '100%' },
			{ [styles['item_center']]: isInCenter },
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
				pageMode={false}
				centerMode={true}
				infinite={true}
				multiple={true}
				items={[1, 2, 3, 4, 5]}
				getGridProps={({
					containerWidth,
					browserDevice,
					browserWindowWidth,
				}) => {
					return {
						gutter: 20,
						minWidth: 350,
					};
				}}
				renderItem={({
					item,
					index,
					classNames,
					gridItemWidth,
					isInCenter,
					Carousel,
				}) => {
					const className = _g.classNames(
						{ [styles['item_full']]: gridItemWidth === '100%' },
						{ [styles['item']]: gridItemWidth !== '100%' },
						{ [styles['item_center']]: isInCenter },
					);
					return <div className={className}>{item}</div>;
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
