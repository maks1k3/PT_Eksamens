import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import EditableSortableGrid, {
	arrayMove,
	SortableHandle,
} from 'ui/list/sortable_list/components/editable_sortable_grid';
import Icon from 'ui/misc/icon';

import styles from './styles.less';

const title = 'EditableSortableGrid: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import EditableSortableGrid, {
	arrayMove,
	SortableHandle,
} from 'ui/list/sortable_list/components/editable_sortable_grid';
import Icon from 'ui/misc/icon';


const SortableDragHandle = SortableHandle(() => (
	<Icon className={styles['sorting-control']} provider="mdi" name="drag" />
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
			<EditableSortableGrid
				classNames={styles}
				sortable={true}
				SortableListProps={{
					keyExtractor: (item, index) => {
						return index;
					},
				}}
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
				items={items}
				renderItem={({
					classNames,
					containerWidth,
					browserWindowWidth,
					browserDevice,
					gridItemWidth,
					item,
					index,
					minWidth,
					gutter,
					EditableSortableGrid,
				}) => {
					return <div>Item: {item}</div>;
				}}
				onSortEnd={({ oldIndex, newIndex }) => {
					this.setState({
						items: arrayMove(this.state.items, oldIndex, newIndex),
					});
				}}
				onViewClick={({ item, index, EditableSortableGrid }) => {
					console.log('onViewClick:', { item, index, EditableSortableGrid });
				}}
				onEditClick={({ item, index, EditableSortableGrid }) => {
					console.log('onEditClick:', { item, index, EditableSortableGrid });
				}}
				onDeleteClick={({ item, index, EditableSortableGrid }) => {
					console.log('onDeleteClick:', { item, index, EditableSortableGrid });
				}}
				renderCell={({
					containerWidth,
					browserWindowWidth,
					browserDevice,
					gridItemWidth,
					item,
					index,
					minWidth,
					gutter,
					content,
					bottom,
					classNames,
					EditableSortableGrid,
				}) => {
					const className = _g.classNames(
						classNames['item'],
						{ [classNames['item_full']]: gridItemWidth === '100%' },
						{ [classNames['item_grid']]: gridItemWidth !== '100%' },
					);

					const style = {
						width: gridItemWidth,
					};

					return (
						<div className={className} style={style}>
							<div className={classNames['content']}>{content}</div>
							{bottom}
						</div>
					);
				}}
				renderBottom={({ classNames, item, index, EditableSortableGrid }) => {
					return (
						<div className={classNames['bottom']}>
							<div className={classNames['sorting-control-wrapper']}>
								<SortableDragHandle />
							</div>
							<div className={classNames['controls']}>
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="file-text"
									onClick={() => {
										console.log('onViewClick:', {
											classNames,
											item,
											index,
											EditableSortableGrid,
										});
									}}
								/>
								<Icon
									className={classNames['icon']}
									provider="fa"
									name="eye"
									onClick={() => {
										console.log('onToggleClick:', {
											classNames,
											item,
											index,
											EditableSortableGrid,
										});
									}}
								/>
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="pencil"
									onClick={() => {
										console.log('onEditClick:', {
											classNames,
											item,
											index,
											EditableSortableGrid,
										});
									}}
								/>
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="trash"
									onClick={() => {
										console.log('onDeleteClick:', {
											classNames,
											item,
											index,
											EditableSortableGrid,
										});
									}}
								/>
							</div>
						</div>
					);
				}}
				render={({ classNames, items, style, EditableSortableGrid }) => {
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
	<Icon className={styles['sorting-control']} provider="mdi" name="drag" />
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
			<EditableSortableGrid
				classNames={styles}
				sortable={true}
				SortableListProps={{
					keyExtractor: (item, index) => {
						return index;
					},
				}}
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
				items={items}
				renderItem={({
					classNames,
					containerWidth,
					browserWindowWidth,
					browserDevice,
					gridItemWidth,
					item,
					index,
					minWidth,
					gutter,
					EditableSortableGrid,
				}) => {
					return <div>Item: {item}</div>;
				}}
				onSortEnd={({ oldIndex, newIndex }) => {
					this.setState({
						items: arrayMove(this.state.items, oldIndex, newIndex),
					});
				}}
				onViewClick={({ item, index, EditableSortableGrid }) => {
					console.log('onViewClick:', { item, index, EditableSortableGrid });
				}}
				onEditClick={({ item, index, EditableSortableGrid }) => {
					console.log('onEditClick:', { item, index, EditableSortableGrid });
				}}
				onDeleteClick={({ item, index, EditableSortableGrid }) => {
					console.log('onDeleteClick:', { item, index, EditableSortableGrid });
				}}
				renderCell={({
					containerWidth,
					browserWindowWidth,
					browserDevice,
					gridItemWidth,
					item,
					index,
					minWidth,
					gutter,
					content,
					bottom,
					classNames,
					EditableSortableGrid,
				}) => {
					const className = _g.classNames(
						classNames['item'],
						{ [classNames['item_full']]: gridItemWidth === '100%' },
						{ [classNames['item_grid']]: gridItemWidth !== '100%' },
					);

					const style = {
						width: gridItemWidth,
					};

					return (
						<div className={className} style={style}>
							<div className={classNames['content']}>{content}</div>
							{bottom}
						</div>
					);
				}}
				renderBottom={({ classNames, item, index, EditableSortableGrid }) => {
					return (
						<div className={classNames['bottom']}>
							<div className={classNames['sorting-control-wrapper']}>
								<SortableDragHandle />
							</div>
							<div className={classNames['controls']}>
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="file-text"
									onClick={() => {
										console.log('onViewClick:', {
											classNames,
											item,
											index,
											EditableSortableGrid,
										});
									}}
								/>
								<Icon
									className={classNames['icon']}
									provider="fa"
									name="eye"
									onClick={() => {
										console.log('onToggleClick:', {
											classNames,
											item,
											index,
											EditableSortableGrid,
										});
									}}
								/>
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="pencil"
									onClick={() => {
										console.log('onEditClick:', {
											classNames,
											item,
											index,
											EditableSortableGrid,
										});
									}}
								/>
								<Icon
									className={classNames['icon']}
									provider="icomoon"
									name="trash"
									onClick={() => {
										console.log('onDeleteClick:', {
											classNames,
											item,
											index,
											EditableSortableGrid,
										});
									}}
								/>
							</div>
						</div>
					);
				}}
				render={({ classNames, items, style, EditableSortableGrid }) => {
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
