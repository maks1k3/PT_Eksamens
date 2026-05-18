const popups = {};

/*
 * BlogCategoryPopup
 */
import BlogCategoryPopup, {
	settings as BlogCategoryPopupSettings,
} from 'admin/popups/blog/category';
popups[BlogCategoryPopupSettings.name] = {
	popup: BlogCategoryPopup,
	settings: BlogCategoryPopupSettings,
};

/*
 * BlogEntryPopup
 */
import BlogEntryPopup, {
	settings as BlogEntryPopupSettings,
} from 'admin/popups/blog/blog_entry';
popups[BlogEntryPopupSettings.name] = {
	popup: BlogEntryPopup,
	settings: BlogEntryPopupSettings,
};

/*
 * UserPopup
 */
import UserPopup, { settings as UserPopupSettings } from 'admin/popups/user';
popups[UserPopupSettings.name] = {
	popup: UserPopup,
	settings: UserPopupSettings,
};

/*
 * Calculator
 */
import CalculatorPopup, {
	settings as CalculatorPopupSettings,
} from 'admin/popups/calculator';
popups[CalculatorPopupSettings.name] = {
	popup: CalculatorPopup,
	settings: CalculatorPopupSettings,
};

import ContactsPopup, {
	settings as ContactsPopupSettings,
} from 'admin/popups/contacts';
popups[ContactsPopupSettings.name] = {
	popup: ContactsPopup,
	settings: ContactsPopupSettings,
};

import CalculatorCategoriesPopup, {
	settings as CalculatorCategoriesPopupSettings,
} from 'admin/popups/calculator_categories';
popups[CalculatorCategoriesPopupSettings.name] = {
	popup: CalculatorCategoriesPopup,
	settings: CalculatorCategoriesPopupSettings,
};

import CalculatorOptionsPopup, {
	settings as CalculatorOptionsPopupSettings,
} from 'admin/popups/calculator_options';
popups[CalculatorOptionsPopupSettings.name] = {
	popup: CalculatorOptionsPopup,
	settings: CalculatorOptionsPopupSettings,
};

import CalculatorWorkTypesPopup, {
	settings as CalculatorWorkTypesPopupSettings,
} from 'admin/popups/calculator_work_types';
popups[CalculatorWorkTypesPopupSettings.name] = {
	popup: CalculatorWorkTypesPopup,
	settings: CalculatorWorkTypesPopupSettings,
};

import CalculatorRequrstsPopup, {
	settings as CalculatorRequrstsPopuppSettings,
} from 'admin/popups/calculator_requests';
popups[CalculatorRequrstsPopuppSettings.name] = {
	popup: CalculatorRequrstsPopup,
	settings: CalculatorRequrstsPopuppSettings,
};
/*
 * TranslationPopup
 */
import TranslationPopup, {
	settings as TranslationPopupSettings,
} from 'admin/popups/translation';
popups[TranslationPopupSettings.name] = {
	popup: TranslationPopup,
	settings: TranslationPopupSettings,
};

/*
 * MetaDataPopup
 */
import MetaDataPopup, {
	settings as MetaDataPopupSettings,
} from 'admin/popups/meta_data';
popups[MetaDataPopupSettings.name] = {
	popup: MetaDataPopup,
	settings: MetaDataPopupSettings,
};

//<editor-fold defaultstate="collapsed" desc="CMS popups">
/*
 * ChangePasswordPopup
 */
import ChangePasswordPopup, {
	settings as ChangePasswordPopupSettings,
} from 'admin/popups/extra/change_password';
popups[ChangePasswordPopupSettings.name] = {
	popup: ChangePasswordPopup,
	settings: ChangePasswordPopupSettings,
};
// /*
//  * CMSPopup
//  */
// import CMSPopup, { settings as CMSPopupSettings } from 'admin/popups/cms';
// popups[CMSPopupSettings.name] = {
// 	popup: CMSPopup,
// 	settings: CMSPopupSettings,
// };
// //</editor-fold>

export default popups;
