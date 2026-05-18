/**
 * Open popup
 * openPopup({name:'user',data:{id:1}});
 * @param {Object}  params
 */
export function openPopup(params) {
	ee.trigger(events.popup.open, params);
}

/**
 * Close popup
 * closePopup({name:'user'});
 * @param {Object}  params
 */
export function closePopup(params) {
	ee.trigger(events.popup.close, params);
}
