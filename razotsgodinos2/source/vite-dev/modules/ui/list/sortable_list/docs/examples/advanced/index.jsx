import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import SortableList, { arrayMove, SortableHandle } from 'ui/list/sortable_list';
import Icon from 'ui/misc/icon';

const title = 'SortableList: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import SortableList, { arrayMove, SortableHandle } from 'ui/list/sortable_list';

const SortableDragHandle = SortableHandle(() => (
	<Icon
		provider="fa"
		name="arrows"
		style={{
			cursor: 'move',
			position: 'absolute',
			bottom: 5,
			left: 5,
		}}
	/>
));

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		};
	}

	render() {
		const { items } = this.state;

		return (
			<SortableList
				items={items}
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
					item,
					index,
					minWidth,
					gutter,
					SortableList,
				}) => {
					const style = {
						border: '1px solid #ccc',
						padding: '50px',
						textAlign: 'center',
						position: 'relative',
						backgroundColor: '#fff',
					};

					style.width = gridItemWidth;

					const margin = gutter / 2;

					if (gridItemWidth === '100%') {
						style.marginBottom = margin + 'px';
					} else {
						style.margin = \`0 \${margin}px \${gutter}px \${margin}px\`;
						style.float = 'left';
					}

					return (
						<div key={index} style={style}>
							{item} <SortableDragHandle />
						</div>
					);
				}}
				onSortEnd={({ oldIndex, newIndex }) => {
					this.setState({
						items: arrayMove(this.state.items, oldIndex, newIndex),
					});
				}}
				keyExtractor={(item, index) => {
					return index;
				}}
				useDragHandle={true}
				axis="xy"
				render={({ gridItemWidth, minWidth, gutter, items, SortableList }) => {
					const style = {
						userSelect: 'none',
					};

					if (gridItemWidth !== '100%' && gutter > 0) {
						const margin = gutter / 2;

						style.marginLeft = \`-\${margin}px\`;
						style.marginRight = \`-\${margin}px\`;
					}

					return (
						<div className="clearfix" style={style}>
							{items}
						</div>
					);
				}}
			/>
		);
	}
}
  `,
};

const SortableDragHandle = SortableHandle(() => (
	<Icon
		provider="fa"
		name="arrows"
		style={{
			cursor: 'move',
			position: 'absolute',
			bottom: 5,
			left: 5,
		}}
	/>
));

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		};
	}

	render() {
		const { items } = this.state;

		return (
			<SortableList
				items={items}
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
					item,
					index,
					minWidth,
					gutter,
					SortableList,
				}) => {
					const style = {
						border: '1px solid #ccc',
						padding: '50px',
						textAlign: 'center',
						position: 'relative',
						backgroundColor: '#fff',
					};

					style.width = gridItemWidth;

					const margin = gutter / 2;

					if (gridItemWidth === '100%') {
						style.marginBottom = margin + 'px';
					} else {
						style.margin = `0 ${margin}px ${gutter}px ${margin}px`;
						style.float = 'left';
					}

					return (
						<div key={index} style={style}>
							{item} <SortableDragHandle />
						</div>
					);
				}}
				onSortEnd={({ oldIndex, newIndex }) => {
					this.setState({
						items: arrayMove(this.state.items, oldIndex, newIndex),
					});
				}}
				keyExtractor={(item, index) => {
					return index;
				}}
				useDragHandle={true}
				axis="xy"
				render={({ gridItemWidth, minWidth, gutter, items, SortableList }) => {
					const style = {
						userSelect: 'none',
					};

					if (gridItemWidth !== '100%' && gutter > 0) {
						const margin = gutter / 2;

						style.marginLeft = `-${margin}px`;
						style.marginRight = `-${margin}px`;
					}

					return (
						<div className="clearfix" style={style}>
							{items}
						</div>
					);
				}}
			/>
		);
	}
}

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Test />
		</ExampleHolder>
	);
};

export default Example;
