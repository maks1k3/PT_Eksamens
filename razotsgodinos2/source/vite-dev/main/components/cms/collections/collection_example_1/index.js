import React from 'react';
import PropTypes from 'prop-types';
import CollectionAdministration from 'cms/collection_administration';
import Edit from './CollectionExample1';

const name = 'collection_example_1';

const getTitle = collectionItem => {
	//<editor-fold defaultstate="collapsed" desc="getTitle">

	const { title } = _.get(collectionItem, 'data', {});

	return `${title}`;
	//</editor-fold>
};

const Collection = ({ action, id, collectionId }) => {
	return (
		<CollectionAdministration
			action={action}
			id={id}
			name={name}
			collectionId={collectionId}
			getTitle={getTitle}
			Edit={Edit}
		/>
	);
};

Collection.propTypes = {
	action: PropTypes.string,
	id: PropTypes.number,
	collectionId: PropTypes.number,
};

export default Collection;
