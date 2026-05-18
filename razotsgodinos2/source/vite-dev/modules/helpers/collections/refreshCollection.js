import { get, isUndefined } from 'lodash-es';
import getCollectionName from './getCollectionName';

/**
 * Refresh collection from server
 *
 *
 *
 * @param {String} name - collection name
 * @param {Integer}  collectionId - collection id
 */
function refreshCollection(name, collectionId) {
	const collectionName = getCollectionName(name, collectionId);

	if (!isUndefined(uiStore)) {
		const refreshOptions = uiStore.get(
			`collections.${collectionName}.refreshOptions`,
		);

		const lang = uiStore.get('currentLang');
		const data = {
			action: 'get',
			name,
			collection_id: collectionId,
			lang,
			...refreshOptions,
		};

		remoteRequest({
			url: 'cms/collection',
			data: data,
			onSuccess: (response) => {
				const collection = get(response, `collections.${collectionName}`);

				const collectionItems = get(response, 'collectionItems');
				const images = get(response, 'images');
				const videos = get(response, 'videos');
				const files = get(response, 'files');

				const update = [];

				if (!_g.isEmpty(images)) {
					update.push({
						path: 'images',
						value: images,
					});
				}

				if (!_g.isEmpty(videos)) {
					update.push({
						path: 'videos',
						value: videos,
					});
				}

				if (!_g.isEmpty(files)) {
					update.push({
						path: 'files',
						value: files,
					});
				}

				if (!_g.isEmpty(collectionItems)) {
					update.push({
						path: 'collectionItems',
						value: collectionItems,
					});
				}

				uiStore.batch({
					set: [
						{
							path: `collections.${collectionName}`,
							value: collection,
						},
					],
					update: update,
				});
			},
			onError: (response) => {
				showAlert({ content: response.msg });
			},
		});
	}
}

export default refreshCollection;
