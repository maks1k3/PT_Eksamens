import { toInteger } from 'lodash-es';

/**
 * Get collection name in store
 *
 *
 *
 * @param {String} name - collection name
 * @param {Integer}  collectionId - collection id
 */
function getCollectionName(name, collectionId) {
	collectionId = toInteger(collectionId);

	if (collectionId > 0) {
		return `${name}_${collectionId}`;
	}

	return name;
}

export default getCollectionName;
