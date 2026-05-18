import React from 'react';
import PropTypes from 'prop-types';
import CollectionAdministration from 'cms/collection_administration';
import { get } from 'lodash-es';
import Edit from './Reviews1';

const name = 'reviews1';

const getTitle = collectionItem => {
	//<editor-fold defaultstate="collapsed" desc="getTitle">

	const { title } = get(collectionItem, 'langData', {});

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
