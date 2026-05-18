/**
 * Show notification
 * showAlert({type:'error',content:'Server error'});
 * @param {Object}  params
 */
export default function showAlert(params) {
	ee.trigger(events.hud.showAlert, params);
}
