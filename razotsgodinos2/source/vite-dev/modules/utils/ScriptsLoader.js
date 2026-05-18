import { forEach, get, has, isFunction } from 'lodash-es';

window._scriptsLoaderCache = window._scriptsLoaderCache || { js: {}, css: {} };
let loaderCache = window._scriptsLoaderCache;

const ScriptsLoader = {
	load: (options) => {
		//<editor-fold defaultstate="collapsed" desc="load">
		const proms = [];

		const js = get(options, 'js', {});
		const css = get(options, 'css', {});
		const onLoad = get(options, 'onLoad', null);

		forEach(css, (url, key) => {
			if (!has(loaderCache, `css.${key}`)) {
				let prom = ScriptsLoader.loadCss(url);
				loaderCache.css[key] = prom;
				proms.push(prom);
			} else {
				proms.push(loaderCache.css[key]);
			}
		});

		forEach(js, (url, key) => {
			if (!has(loaderCache, `js.${key}`)) {
				let prom = ScriptsLoader.loadJs(url);
				loaderCache.js[key] = prom;
				proms.push(prom);
			} else {
				proms.push(loaderCache.js[key]);
			}
		});

		const result = Promise.all(proms);

		result.then(() => {
			if (isFunction(onLoad)) {
				onLoad();
			}
		});
		//</editor-fold>
	},

	loadJs: (url) => {
		//<editor-fold defaultstate="collapsed" desc="loadJs">
		return new Promise((resolve, reject) => {
			let r = false,
				t = document.getElementsByTagName('script')[0],
				s = document.createElement('script');

			s.type = 'text/javascript';
			s.src = url;
			s.async = true;
			s.onload = s.onreadystatechange = function () {
				if (!r && (!this.readyState || this.readyState === 'complete')) {
					r = true;
					resolve(this);
				}
			};
			s.onerror = s.onabort = reject;
			t.parentNode.insertBefore(s, t);
		});
		//</editor-fold>
	},

	loadCss: (url) => {
		//<editor-fold defaultstate="collapsed" desc="loadCss">
		return new Promise((resolve, reject) => {
			let r = false,
				t = document.getElementsByTagName('link')[0],
				s = document.createElement('link');

			s.type = 'text/css';
			s.href = url;
			s.rel = 'stylesheet';
			s.onload = s.onreadystatechange = function () {
				if (!r && (!this.readyState || this.readyState === 'complete')) {
					r = true;
					resolve(this);
				}
			};
			s.onerror = s.onabort = reject;
			t.parentNode.insertBefore(s, t);
		});
		//</editor-fold>
	},
};

export default ScriptsLoader;
