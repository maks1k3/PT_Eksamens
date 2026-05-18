import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import getCollectionName from 'helpers/collections/getCollectionName';

import EditableSortableList, {
	arrayMove,
} from 'ui/list/sortable_list/components/editable_sortable_list';
import { clone, forEach, map } from 'lodash-es';

const propTypes = {
	name: PropTypes.string.isRequired,
	collectionId: PropTypes.number.isRequired,
	getTitle: PropTypes.func.isRequired,
};

const defaultProps = {};

class SortCollection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.getItems();
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	getItems = () => {
		//<editor-fold defaultstate="collapsed" desc="getItems">
		const { name, collectionId, getTitle } = this.props;

		const ids = uiStore.get(
			`collections.${getCollectionName(name, collectionId)}.ids`,
			[],
		);

		const items = [];

		forEach(ids, (id) => {
			items.push({
				id: id,
				name: getTitle(uiStore.get(`collectionItems.${id}`, {})),
			});
		});

		this.setState({
			items: items,
		});
		//</editor-fold>
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		//<editor-fold defaultstate="collapsed" desc="onSortEnd">
		const { name, collectionId } = this.props;

		const newItems = arrayMove(this.state.items, oldIndex, newIndex);

		const ids = map(newItems, (item) => item.id);

		this.setState({
			items: newItems,
		});

		uiStore.set(
			`collections.${getCollectionName(name, collectionId)}.ids`,
			clone(ids),
		);

		remoteRequest({
			url: 'cms/administration/collection',
			data: {
				ids: ids.join(','),
				action: 'reorder',
				name: name,
				collection_id: collectionId,
			},
		});
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderItem = ({ item }) => {
		//<editor-fold defaultstate="collapsed" desc="renderRow">
		const { name } = item;

		return <div>{name}</div>;
		//</editor-fold>
	};

	render() {
		const { items } = this.state;

		return (
			<EditableSortableList
				items={items}
				renderItem={this.renderItem}
				onSortEnd={this.onSortEnd}
			/>
		);
	}
}

SortCollection.propTypes = propTypes;

SortCollection.defaultProps = defaultProps;

export default SortCollection;
