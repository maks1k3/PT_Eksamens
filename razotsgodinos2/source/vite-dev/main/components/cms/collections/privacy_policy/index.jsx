import React from 'react';
import PropTypes from 'prop-types';
import CollectionAdministration from 'cms/collection_administration';
import Edit from './PrivacyPolicy';
import { get } from 'lodash-es';

const name = 'privacy_policy';

const getTitle = (collectionItem) => {
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
