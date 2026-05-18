/**
 * Get main url
 *
 * @param {boolean} withLang - add lang to url start
 */
import { get } from 'lodash-es';

function getMainUrl(withLang = false) {
	if (typeof store !== 'undefined') {
		let mainUrl = get(store.getState(), 'configuration.mainUrl', '');

		if (withLang) {
			const lang = get(store.getState(), 'ui.currentLang', 'en');

			mainUrl += '/' + lang;
		}

		return mainUrl + '/';
	} else {
		return '/';
	}
}

export default getMainUrl;
