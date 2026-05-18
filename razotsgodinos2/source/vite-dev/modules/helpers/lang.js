import { get, isUndefined } from 'lodash-es';

/**
 * Get translation

 *  _g.lang('title', 'Default title');

 * @param {string} key - needle
 * @param {string} default_key - haystack
 */
function lang(key, default_key) {
	if (typeof store !== 'undefined') {
		const translations = get(store.getState(), 'translations', {});

		return get(
			translations,
			key,
			!isUndefined(default_key) ? default_key : key,
		);
	} else {
		return key;
	}
}

export default lang;
