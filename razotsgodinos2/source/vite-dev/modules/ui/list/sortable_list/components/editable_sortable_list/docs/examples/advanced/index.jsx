import React, { PureComponent as Component, Fragment } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import EditableSortableList, {
	arrayMove,
	SortableHandle,
} from 'ui/list/sortable_list/components/editable_sortable_list';
import Icon from 'ui/misc/icon';

import styles from './styles.less';

const title = 'EditableSortableList: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import EditableSortableList, {
	arrayMove,
	SortableHandle,
} from 'ui/list/sortable_list/components/editable_sortable_list';
import Icon from 'ui/misc/icon';

const SortableDragHandle = SortableHandle(() => (
	<Icon className={styles['sorting-control']} provider="icomoon" name="sort" />
));

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
			<EditableSortableList
				classNames={styles}
				sortable={true}
				SortableListProps={{
					keyExtractor: (item, index) => {
						return index;
					},
				}}
				items={items}
				renderItem={({ classNames, item, index, EditableSortableList }) => {
					return <div>Item: {item}</div>;
				}}
				onSortEnd={({ oldIndex, newIndex }) => {
					this.setState({
						items: arrayMove(this.state.items, oldIndex, newIndex),
					});
				}}
				onViewClick={({ item, index, EditableSortableList }) => {
					console.log('onViewClick:', { item, index, EditableSortableList });
				}}
				onEditClick={({ item, index, EditableSortableList }) => {
					console.log('onEditClick:', { item, index, EditableSortableList });
				}}
				onDeleteClick={({ item, index, EditableSortableList }) => {
					console.log('onDeleteClick:', { item, index, EditableSortableList });
				}}
				renderLeft={({ classNames, item, index, EditableSortableList }) => {
					return <SortableDragHandle />;
				}}
				renderRight={({ classNames, item, index, EditableSortableList }) => {
					return (
						<Fragment>
							<Icon
								className={classNames['icon']}
								provider="icomoon"
								name="file-text"
								onClick={() => {
									console.log('onViewClick:', {
										classNames,
										item,
										index,
										EditableSortableList,
									});
								}}
							/>
							<Icon
								className={classNames['icon']}
								provider="fa"
								name="eye"
								onClick={() => {
									console.log('onToggle:', {
										classNames,
										item,
										index,
										EditableSortableList,
									});
								}}
							/>
							<Icon
								className={classNames['icon']}
								provider="icomoon"
								name="pencil"
								onClick={() => {
									console.log('onEdit:', {
										classNames,
										item,
										index,
										EditableSortableList,
									});
								}}
							/>
							<Icon
								className={classNames['icon']}
								provider="icomoon"
								name="trash"
								onClick={() => {
									console.log('onDelete:', {
										classNames,
										item,
										index,
										EditableSortableList,
									});
								}}
							/>
						</Fragment>
					);
				}}
				render={({ classNames, items, EditableSortableList }) => {
					return <div className={classNames['wrapper']}>{items}</div>;
				}}
			/>
		);
	}
}
  `,
};

const SortableDragHandle = SortableHandle(() => (
	<Icon className={styles['sorting-control']} provider="icomoon" name="sort" />
));

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
			<EditableSortableList
				classNames={styles}
				sortable={true}
				SortableListProps={{
					keyExtractor: (item, index) => {
						return index;
					},
				}}
				items={items}
				renderItem={({ classNames, item, index, EditableSortableList }) => {
					return <div>Item: {item}</div>;
				}}
				onSortEnd={({ oldIndex, newIndex }) => {
					this.setState({
						items: arrayMove(this.state.items, oldIndex, newIndex),
					});
				}}
				onViewClick={({ item, index, EditableSortableList }) => {
					console.log('onViewClick:', { item, index, EditableSortableList });
				}}
				onEditClick={({ item, index, EditableSortableList }) => {
					console.log('onEditClick:', { item, index, EditableSortableList });
				}}
				onDeleteClick={({ item, index, EditableSortableList }) => {
					console.log('onDeleteClick:', { item, index, EditableSortableList });
				}}
				renderLeft={({ classNames, item, index, EditableSortableList }) => {
					return <SortableDragHandle />;
				}}
				renderRight={({ classNames, item, index, EditableSortableList }) => {
					return (
						<Fragment>
							<Icon
								className={classNames['icon']}
								provider="icomoon"
								name="file-text"
								onClick={() => {
									console.log('onViewClick:', {
										classNames,
										item,
										index,
										EditableSortableList,
									});
								}}
							/>
							<Icon
								className={classNames['icon']}
								provider="fa"
								name="eye"
								onClick={() => {
									console.log('onToggle:', {
										classNames,
										item,
										index,
										EditableSortableList,
									});
								}}
							/>
							<Icon
								className={classNames['icon']}
								provider="icomoon"
								name="pencil"
								onClick={() => {
									console.log('onEdit:', {
										classNames,
										item,
										index,
										EditableSortableList,
									});
								}}
							/>
							<Icon
								className={classNames['icon']}
								provider="icomoon"
								name="trash"
								onClick={() => {
									console.log('onDelete:', {
										classNames,
										item,
										index,
										EditableSortableList,
									});
								}}
							/>
						</Fragment>
					);
				}}
				render={({ classNames, items, EditableSortableList }) => {
					return <div className={classNames['wrapper']}>{items}</div>;
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
