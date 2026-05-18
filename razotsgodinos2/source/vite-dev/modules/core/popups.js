const popups = {};

/* ========================================================================*
 *
 *                       Reusable
 *
 * ========================================================================*/

/*
* UniversalPopup
*/
import UniversalPopup, {
	settings as UniversalPopupSettings,
} from 'popups/components/universal';
popups[UniversalPopupSettings.name] = {
	popup: UniversalPopup,
	settings: UniversalPopupSettings,
};

/*
* LoadingPopup
*/
import LoadingPopup, {
	settings as LoadingPopupSettings,
} from 'popups/components/loading';
popups[LoadingPopupSettings.name] = {
	popup: LoadingPopup,
	settings: LoadingPopupSettings,
};

/*
* ConfirmationPopup
*/
import ConfirmationPopup, {
	settings as ConfirmationPopupSettings,
} from 'popups/components/confirmation';
popups[ConfirmationPopupSettings.name] = {
	popup: ConfirmationPopup,
	settings: ConfirmationPopupSettings,
};

/*
* ImagePopup
*/
import ImagePopup, {
	settings as ImagePopupSettings,
} from 'popups/components/image';
popups[ImagePopupSettings.name] = {
	popup: ImagePopup,
	settings: ImagePopupSettings,
};

/*
* VideoPopup
*/
import VideoPopup, {
	settings as VideoPopupSettings,
} from 'popups/components/video';
popups[VideoPopupSettings.name] = {
	popup: VideoPopup,
	settings: VideoPopupSettings,
};

export default popups;
