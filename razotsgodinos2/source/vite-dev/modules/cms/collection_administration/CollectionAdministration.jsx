import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AddCollectionItem from 'cms/collection/add';
import SortCollection from 'cms/collection/sort';

const propTypes = {
	action: PropTypes.oneOf(['add', 'edit', 'sort']).isRequired,
	id: PropTypes.any,
	name: PropTypes.string.isRequired,
	collectionId: PropTypes.number,
	getTitle: PropTypes.func.isRequired,
	Edit: PropTypes.any.isRequired,
	extra: PropTypes.object,
};

const defaultProps = {
	collectionId: 0,
};

class CollectionAdministration extends Component {
	constructor(props) {
		super(props);
	}

	renderAdd = () => {
		//<editor-fold defaultstate="collapsed" desc="renderAdd">
		const { name, collectionId, Edit, extra } = this.props;

		return (
			<AddCollectionItem
				name={name}
				collectionId={collectionId}
				EditForm={Edit}
				extra={extra}
			/>
		);
		//</editor-fold>
	};

	renderEdit = () => {
		//<editor-fold defaultstate="collapsed" desc="renderEdit">
		const { id, Edit, extra } = this.props;

		return <Edit id={id} extra={extra} />;
		//</editor-fold>
	};

	renderSort = () => {
		//<editor-fold defaultstate="collapsed" desc="renderSort">
		const { name, collectionId, getTitle } = this.props;
		return (
			<SortCollection
				name={name}
				collectionId={collectionId}
				getTitle={getTitle}
			/>
		);
		//</editor-fold>
	};

	render() {
		const { action } = this.props;

		if (action === 'add') {
			return this.renderAdd();
		} else if (action === 'edit') {
			return this.renderEdit();
		} else if (action === 'sort') {
			return this.renderSort();
		}
	}
}

CollectionAdministration.propTypes = propTypes;

CollectionAdministration.defaultProps = defaultProps;

export default CollectionAdministration;
