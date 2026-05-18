const popups = {};

//<editor-fold defaultstate="collapsed" desc="CMS popups">
// #if process.env.isAdmin === 'yes'

// /*
//  * ChangePasswordPopup
//  */
// import ChangePasswordPopup, {
// 	settings as ChangePasswordPopupSettings,
// } from 'administration/popups/extra/change_password';
// popups[ChangePasswordPopupSettings.name] = {
// 	popup: ChangePasswordPopup,
// 	settings: ChangePasswordPopupSettings,
// };

/*
 * CMSPopup
 */
import CMSPopup, {
	settings as CMSPopupSettings,
} from 'main/popups/cms/CMSPopup';

popups[CMSPopupSettings.name] = {
	popup: CMSPopup,
	settings: CMSPopupSettings,
};

// #endif
//</editor-fold>

export default popups;
