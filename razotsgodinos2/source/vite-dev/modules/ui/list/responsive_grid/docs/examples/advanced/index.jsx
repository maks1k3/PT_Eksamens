import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ResponsiveGrid from 'ui/list/responsive_grid';

import styles from './styles.less';

const title = 'ResponsiveGrid: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ResponsiveGrid from 'ui/list/responsive_grid';

<ResponsiveGrid
	classNames={styles}
	type="flex"
	items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
	getGridProps={({
		containerWidth,
		browserDevice,
		browserWindowWidth,
	}) => {
		if (browserDevice === 'desktop') {
			return {
				gutter: 20,
				minWidth: 150,
			};
		} else if (browserDevice === 'tablet') {
			return {
				gutter: 10,
				minWidth: 300,
			};
		} else {
			//mobile
			return {
				gutter: 5,
				minWidth: 100,
			};
		}
	}}
	renderItem={({
		containerWidth,
		browserWindowWidth,
		browserDevice,
		gridItemWidth,
		gridItemHeight,
		item,
		index,
		minWidth,
		gutter,
		columns,
		ResponsiveGrid,
	}) => {
		const style = {
			border: '1px solid #ccc',
			padding: '50px',
			textAlign: 'center',
		};

		style.width = gridItemWidth;

		const margin = gutter / 2;

		if (gridItemWidth === '100%') {
			style.marginBottom = margin + 'px';
		} else {
			style.margin = \`0 \${margin}px \${gutter}px \${margin}px\`;
		}

		return (
			<div key={index} style={style}>
				{item}
			</div>
		);
	}}
	render={({
		classNames,
		wrapperClassName,
		wrapperStyle,
		items,
		ResponsiveGrid,
	}) => {
		return (
			<div className={wrapperClassName} style={wrapperStyle}>
				{items}
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
			<ResponsiveGrid
				classNames={styles}
				type="flex"
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
				getGridProps={({
					containerWidth,
					browserDevice,
					browserWindowWidth,
				}) => {
					if (browserDevice === 'desktop') {
						return {
							gutter: 20,
							minWidth: 150,
						};
					} else if (browserDevice === 'tablet') {
						return {
							gutter: 10,
							minWidth: 300,
						};
					} else {
						//mobile
						return {
							gutter: 5,
							minWidth: 100,
						};
					}
				}}
				renderItem={({
					containerWidth,
					browserWindowWidth,
					browserDevice,
					gridItemWidth,
					gridItemHeight,
					item,
					index,
					minWidth,
					gutter,
					columns,
					ResponsiveGrid,
				}) => {
					const style = {
						border: '1px solid #ccc',
						padding: '50px',
						textAlign: 'center',
					};

					style.width = gridItemWidth;

					const margin = gutter / 2;

					if (gridItemWidth === '100%') {
						style.marginBottom = margin + 'px';
					} else {
						style.margin = `0 ${margin}px ${gutter}px ${margin}px`;
					}

					return (
						<div key={index} style={style}>
							{item}
						</div>
					);
				}}
				render={({
					classNames,
					wrapperClassName,
					wrapperStyle,
					items,
					ResponsiveGrid,
				}) => {
					return (
						<div className={wrapperClassName} style={wrapperStyle}>
							{items}
						</div>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
