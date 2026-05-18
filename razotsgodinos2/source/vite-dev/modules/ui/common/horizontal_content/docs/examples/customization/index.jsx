import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import HorizontalContent from 'ui/common/horizontal_content';
import Icon from 'ui/misc/icon';

import _styles from '../styles.less';
import styles from './styles.less';

const title = 'HorizontalContent: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import HorizontalContent from 'ui/common/horizontal_content';
import Icon from 'ui/misc/icon';

<HorizontalContent
	classNames={styles}
	height="200px"
	scrollOnMouseWheel={true}
	mouseWheelScrollDistance={100}
	items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
	renderItem={({ item, index, classNames, HorizontalContent }) => {
		return (
			<div
				className={_styles['item']}
				style={{ width: (index + 1) * 200 }}>
				{item}
			</div>
		);
	}}
	showArrows={true}
	renderArrow={({
		classNames,
		direction,
		onClick,
		HorizontalContent,
	}) => {
		const className = _g.classNames(
			classNames['arrow'],
			classNames[\`arrow-\${direction}\`],
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
	arrowClickScrollDistance={300}
	arrowClickScrollDuration={800}
	render={({
		classNames,
		arrows,
		style,
		items,
		extra,
		containerRef,
		HorizontalContent,
	}) => {
		return (
			<div className={classNames['outer-wrapper']}>
				{arrows}
				<div
					ref={containerRef}
					className={classNames['wrapper']}
					style={style}
					{...extra}>
					{items}
				</div>
			</div>
		);
	}}
	initialOffset={400}
	draggable={true}
	swipeable={true}
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
				classNames={styles}
				height="200px"
				scrollOnMouseWheel={true}
				mouseWheelScrollDistance={100}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
				renderItem={({ item, index, classNames, HorizontalContent }) => {
					return (
						<div
							className={_styles['item']}
							style={{ width: (index + 1) * 200 }}>
							{item}
						</div>
					);
				}}
				showArrows={true}
				renderArrow={({
					classNames,
					direction,
					onClick,
					HorizontalContent,
				}) => {
					const className = _g.classNames(
						classNames['arrow'],
						classNames[`arrow-${direction}`],
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
				arrowClickScrollDistance={300}
				arrowClickScrollDuration={800}
				render={({
					classNames,
					arrows,
					style,
					items,
					extra,
					containerRef,
					HorizontalContent,
				}) => {
					return (
						<div className={classNames['outer-wrapper']}>
							{arrows}
							<div
								ref={containerRef}
								className={classNames['wrapper']}
								style={style}
								{...extra}>
								{items}
							</div>
						</div>
					);
				}}
				initialOffset={400}
				draggable={true}
				swipeable={true}
			/>
		</ExampleHolder>
	);
};

export default Example;
