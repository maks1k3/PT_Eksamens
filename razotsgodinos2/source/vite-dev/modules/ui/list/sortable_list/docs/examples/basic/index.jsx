import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import SortableList, { arrayMove } from 'ui/list/sortable_list';

const title = 'SortableList: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import SortableList, { arrayMove } from 'ui/list/sortable_list';

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [1, 2, 3, 4, 5],
		};
	}

	render() {
		const { items } = this.state;

		return (
			<SortableList
				items={items}
				renderItem={({ item, index, SortableList }) => {
					return <div>Line {item}</div>;
				}}
				onSortEnd={({ oldIndex, newIndex }) => {
					this.setState({
						items: arrayMove(this.state.items, oldIndex, newIndex),
					});
				}}
				//lockAxis="y" //Sort only vertically
			/>
		);
	}
}
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [1, 2, 3, 4, 5],
		};
	}

	render() {
		const { items } = this.state;

		return (
			<SortableList
				items={items}
				renderItem={({ item, index, SortableList }) => {
					return <div>Line {item}</div>;
				}}
				onSortEnd={({ oldIndex, newIndex }) => {
					this.setState({
						items: arrayMove(this.state.items, oldIndex, newIndex),
					});
				}}
				//lockAxis="y"
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
