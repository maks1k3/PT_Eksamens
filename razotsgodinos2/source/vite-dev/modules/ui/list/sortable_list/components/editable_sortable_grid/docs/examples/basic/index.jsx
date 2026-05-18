import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import EditableSortableGrid, {
	arrayMove,
} from 'ui/list/sortable_list/components/editable_sortable_grid';

const title = 'EditableSortableGrid: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import EditableSortableGrid, {
	arrayMove,
} from 'ui/list/sortable_list/components/editable_sortable_grid';

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
			<EditableSortableGrid
				items={items}
				renderItem={({ classNames, item, index, EditableSortableGrid }) => {
					return <div>Item: {item}</div>;
				}}
				onSortEnd={({ oldIndex, newIndex }) => {
					this.setState({
						items: arrayMove(this.state.items, oldIndex, newIndex),
					});
				}}
				onEditClick={({ item, index, EditableSortableList }) => {
					console.log('onEditClick:', { item, index, EditableSortableGrid });
				}}
				onDeleteClick={({ item, index, EditableSortableList }) => {
					console.log('onDeleteClick:', { item, index, EditableSortableGrid });
				}}
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
			<EditableSortableGrid
				items={items}
				renderItem={({ classNames, item, index, EditableSortableGrid }) => {
					return <div>Item: {item}</div>;
				}}
				onSortEnd={({ oldIndex, newIndex }) => {
					this.setState({
						items: arrayMove(this.state.items, oldIndex, newIndex),
					});
				}}
				onEditClick={({ item, index, EditableSortableList }) => {
					console.log('onEditClick:', { item, index, EditableSortableGrid });
				}}
				onDeleteClick={({ item, index, EditableSortableList }) => {
					console.log('onDeleteClick:', { item, index, EditableSortableGrid });
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
