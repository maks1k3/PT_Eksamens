import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Carousel from 'ui/common/carousel';
import Icon from 'ui/misc/icon';

import _styles from '../styles.less';

import styles from './styles.less';

const title = 'Carousel: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Carousel from 'ui/common/carousel';
import Icon from 'ui/misc/icon';

<Carousel
	classNames={styles}
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
	current={0}
	multiple={true}
	draggable={true}
	dragTershold={20}
	swipeable={true}
	changeOnMouseWheel={true}
	infinite={true}
	transitionDuration={800}
	transitionEasing="linear"
	renderItem={({ item, index, classNames, gridItemWidth, Carousel }) => {
		return <div className={_styles['item']}>{item}</div>;
	}}
	showArrows={true}
	renderArrow={({
		classNames,
		direction,
		onClick,
		disabled,
		Carousel,
	}) => {
		const className = _g.classNames(
			classNames['arrow'],
			classNames[\`arrow-\${direction}\`],
			{
				[classNames['arrow_disabled']]: disabled,
			},
		);

		return (
			<Icon
				className={className}
				provider="fa"
				name={\`caret-\${direction}\`}
				onClick={onClick}
			/>
		);
	}}
	showDots={true}
	renderDot={({ classNames, index, active, onClick, Carousel }) => {
		const className = _g.classNames(classNames['dot'], {
			[classNames['dot_active']]: active,
		});

		return <div key={index} className={className} onClick={onClick} />;
	}}
	render={({
		classNames,
		arrows,
		dots,
		items,
		containerRef,
		Carousel,
	}) => {
		return (
			<div ref={containerRef}>
				<div className={classNames['wrapper']}>
					{arrows} {items}
				</div>
				{dots}
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
			<Carousel
				classNames={styles}
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
				current={0}
				multiple={true}
				draggable={true}
				dragTershold={20}
				swipeable={true}
				changeOnMouseWheel={true}
				infinite={true}
				transitionDuration={800}
				transitionEasing="linear"
				renderItem={({ item, index, classNames, gridItemWidth, Carousel }) => {
					return <div className={_styles['item']}>{item}</div>;
				}}
				showArrows={true}
				renderArrow={({
					classNames,
					direction,
					onClick,
					disabled,
					Carousel,
				}) => {
					const className = _g.classNames(
						classNames['arrow'],
						classNames[`arrow-${direction}`],
						{
							[classNames['arrow_disabled']]: disabled,
						},
					);

					return (
						<Icon
							className={className}
							provider="fa"
							name={`caret-${direction}`}
							onClick={onClick}
						/>
					);
				}}
				showDots={true}
				renderDot={({ classNames, index, active, onClick, Carousel }) => {
					const className = _g.classNames(classNames['dot'], {
						[classNames['dot_active']]: active,
					});

					return <div key={index} className={className} onClick={onClick} />;
				}}
				render={({
					classNames,
					arrows,
					dots,
					items,
					containerRef,
					Carousel,
				}) => {
					return (
						<div ref={containerRef}>
							<div className={classNames['wrapper']}>
								{arrows} {items}
							</div>
							{dots}
						</div>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
