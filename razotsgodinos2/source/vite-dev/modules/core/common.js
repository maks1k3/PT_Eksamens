import $ from 'jquery';
window.$ = $;
window.CKEDITOR_BASEPATH = '/assets/js/libs/editors/ckeditor/';

//jquery plugins
// import 'vendor/jquery/jquery.highlight';

import moment from 'moment';
//This way we preserve locales for production mode
import momentLV from 'moment/locale/lv';
import momentRU from 'moment/locale/ru';
import momentEN from 'moment/locale/en-gb';
window.moment = moment;

// import _ from 'lodash';
// window._ = _;

import ee from 'core/events/ee';
window.ee = ee;

import events from 'core/events/events';
window.events = events;

import * as rison from 'vendor/core/rison';
// console.log(rison);
window.rison = rison;

import _g from 'helpers';
window._g = _g;

//popup
import { openPopup, closePopup } from 'helpers/popup';
window.openPopup = openPopup;
window.closePopup = closePopup;

//popups
import popups from 'core/popups';
window.popups = popups;

//alert
window.showAlert = (params) => {
	ee.trigger(window.events.hud.showAlert, params);
	setTimeout(function () {
		ee.trigger(window.events.hud.closeAlert);
	}, 7000);
};

import uiStore from 'core/containers/ui/uiStore';
window.uiStore = uiStore;

import forms from 'ui/form/forms';
window.forms = forms;

import browser_window from 'core/browser/browser_window';
window.browser_window = browser_window;
browser_window.init();

import navigation from 'core/navigation/actions';
window.navigation = navigation;

import remoteRequest from 'core/networking/remoteRequest';
window.remoteRequest = remoteRequest;

/*
 * Send request to server every 5 minutes to update session
 */
setInterval(function () {
	remoteRequest({
		url: 'actions/ping',
	});
}, 1000 * 60 * 5); //every 5 minutes
