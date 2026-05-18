import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Carousel from 'ui/common/carousel';

import styles from '../styles.less';

const title = 'Carousel: pageMode';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Carousel from 'ui/common/carousel';

<h3>Pagemode="true"</h3>
<Carousel
	items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
	pageMode={true}
	multiple={true}
	infinite={true}
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
<h3>
	Pagemode="false" should be used in combination with multiple="true" and
	infinite="true"
</h3>
<Carousel
	items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
	pageMode={false}
	multiple={true}
	infinite={true}
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
			<h3>Pagemode="true"</h3>
			<Carousel
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
				pageMode={true}
				multiple={true}
				infinite={true}
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
			<h3>
				Pagemode="false" should be used in combination with multiple="true" and
				infinite="true"
			</h3>
			<Carousel
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
				pageMode={false}
				multiple={true}
				infinite={true}
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
		</ExampleHolder>
	);
};

export default Example;
