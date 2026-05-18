// import 'vite/modulepreload-polyfill';
// import 'assets/styles/normalize.less';

//<editor-fold defaultstate="collapsed" desc="icon fonts">
// import 'assets/fonts/font-awesome.less';
// import 'assets/fonts/foundation.less';
// import 'assets/fonts/glyphicons.less';
// import 'assets/fonts/icomoon.less';
// import 'assets/fonts/ionicons.less';
// import 'assets/fonts/material.less';
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="utility styles">
// import 'assets/styles/utility/helpers.less';
// import 'assets/styles/utility/common.less';
// import 'assets/styles/utility/reset.less';
//</editor-fold>
if (import.meta.hot) {
	import.meta.hot.on('vite:beforeUpdate', () => console.clear());
}

import 'core/common';
import Root from 'core/Root';

import popups from 'main/popups';
window.popups = { ...window.popups, ...popups };

import events from 'main/events';
window.events = { ...window.events, ...events };

import store from 'main/store/config';

import App from './App.jsx';
import './Main.css';

import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
	<Root store={store}>
		<App />
	</Root>,
);
