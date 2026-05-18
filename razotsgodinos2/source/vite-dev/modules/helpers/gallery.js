/**
 * Gallery events
 */
function gallery(galleryName, galleryEvent, payload = {}) {
	if (galleryName === 'photoSwipe') {
		if (galleryEvent === 'open') {
			ee.trigger(events.photoSwipe.open, payload);
		} else if (galleryEvent === 'close') {
			ee.trigger(events.photoSwipe.close, payload);
		}
	} else if (galleryName === 'viewerJs') {
		if (galleryEvent === 'open') {
			ee.trigger(events.viewerJs.open, payload);
		} else if (galleryEvent === 'close') {
			ee.trigger(events.viewerJs.close, payload);
		}
	}
}

export default gallery;
