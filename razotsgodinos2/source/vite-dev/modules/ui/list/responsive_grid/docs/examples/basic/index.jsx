import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ResponsiveGrid from 'ui/list/responsive_grid';

const title = 'ResponsiveGrid: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ResponsiveGrid from 'ui/list/responsive_grid';

<ResponsiveGrid
	items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
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
		gridItemWidth,
		gridItemHeight,
		item,
		index,
		ResponsiveGrid,
	}) => {
		const style = {
			border: '1px solid #ccc',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		};

		style.width = gridItemWidth;
		style.height = gridItemHeight;

		if (gridItemWidth === '100%') {
			style.marginBottom = '5px';
		} else {
			style.margin = '0 5px 10px 5px';
			style.float = 'left';
		}

		return (
			<div key={index} style={style}>
				{item}
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
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
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
					gridItemWidth,
					gridItemHeight,
					item,
					index,
					ResponsiveGrid,
				}) => {
					const style = {
						border: '1px solid #ccc',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					};

					style.width = gridItemWidth;
					style.height = gridItemHeight;

					if (gridItemWidth === '100%') {
						style.marginBottom = '5px';
					} else {
						style.margin = '0 5px 10px 5px';
						style.float = 'left';
					}

					return (
						<div key={index} style={style}>
							{item}
						</div>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
