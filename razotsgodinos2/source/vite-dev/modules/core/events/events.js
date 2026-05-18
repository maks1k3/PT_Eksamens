/* ========================================================================*
*
*                       Global events
*
* ========================================================================*/
const events = {
	browserWindow: {
		resize: 'browserWindow:resize',
		widthChange: 'browserWindow:widthChange',
		scrolledToBottom: 'browserWindow:scrolledToBottom',
		scrolledToTop: 'browserWindow:scrolledToTop',
		scrollTop: 'browserWindow:scrollTop',
	},

	drawer: {
		open: 'drawer:open',
		close: 'drawer:close',
	},

	contextMenu: {
		close: 'contextMenu:close',
	},

	datatable: {
		refresh: 'datatable:refresh',
		reset: 'datatable:reset',
		search: 'datatable:search',
		updateUrl: 'datatable:updateUrl',
		resize: 'datatable:resize',
		firstColumnClick: 'datatable:firstColumnClick',
		closeHiddenRows: 'datatable:closeHiddenRows',
	},

	form: {
		clear: 'form:clear',
		getData: 'form:getData',
		hideResponse: 'form:hideResponse',
		lock: 'form:lock',
		reset: 'form:reset',
		showError: 'form:showError',
		showSuccess: 'form:showSuccess',
		submit: 'form:submit',
		unLock: 'form:unLock',
		update: 'form:update',
	},

	keyup: {
		enter: 'keyup:enter',
		ctrl: 'keyup:ctrl',
		shift: 'keyup:shift',
		alt: 'keyup:alt',
		tab: 'keyup:tab',
		esc: 'keyup:esc',
		backspace: 'keyup:backspace',
		space: 'keyup:space',
		up: 'keyup:up',
		down: 'keyup:down',
		left: 'keyup:left',
		right: 'keyup:right',
		keycode: 'keyup:keycode',
	},

	keydown: {
		enter: 'keydown:enter',
		ctrl: 'keydown:ctrl',
		shift: 'keydown:shift',
		alt: 'keydown:alt',
		tab: 'keydown:tab',
		esc: 'keydown:esc',
		backspace: 'keydown:backspace',
		space: 'keydown:space',
		up: 'keydown:up',
		down: 'keydown:down',
		left: 'keydown:left',
		right: 'keydown:right',
		keycode: 'keydown:keycode',
	},

	navigation: {
		link: 'navigation:link', //when link is clicked
		push: 'navigation:push',
		replace: 'navigation:replace', // when the same navigation path
	},

	popup: {
		open: 'popup:open',
		close: 'popup:close',
		isOpened: 'popup:isOpened', //fired if at least one popup is opened
		allClosed: 'popup:allClosed', //fired when last popup is closed
	},

	hud: {
		showAlert: 'hud:showAlert',
		closeAlert: 'hud:closeAlert',
	},

	photoSwipe: {
		open: 'photoSwipe:open',
		close: 'photoSwipe:close',
	},

	viewerJs: {
		open: 'viewerJs:open',
		close: 'viewerJs:close',
	},
};

export default events;
