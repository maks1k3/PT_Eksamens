import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithStore from 'hoc/store';

import hash from 'object-hash';
import getScrollBarWidth from 'helpers/getScrollBarWidth';
import rison from 'rison';
import {
	isUndefined,
	forEach,
	has,
	set,
	unset,
	every,
	isNull,
	max,
	get,
	map,
} from 'lodash-es';
import PopupContainerContext from './PopupContainerContext';

const propTypes = {
	//from store
	params: PropTypes.any,
};

const defaultProps = {};

const storeProps = (ownProps) => {
	return {
		navigation: {
			current: {
				params: 'params',
			},
		},
	};
};

class PopupContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			popups: {},
			context: {
				PopupContainer: this,
			},
		};

		this.local_state = {
			popups: {},
		};

		this.popups = {};
		this.ui_popups = {};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.updateFromUrl(this.props.params);

		ee.on(events.popup.open, this.openPopup);
		ee.on(events.popup.close, this.closePopup);
		ee.on(events.keyup.esc, this.closeUpper);
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (
			!isUndefined(prevProps.params) &&
			prevProps.params !== this.props.params
		) {
			this.updateFromUrl(this.props.params);
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		ee.off(events.popup.open, this.openPopup);
		ee.off(events.popup.close, this.closePopup);
		ee.off(events.keyup.esc, this.closeUpper);
		//</editor-fold>
	}

	register = ({ Popup, level }) => {
		//<editor-fold defaultstate="collapsed" desc="register">
		set(this.ui_popups, level, Popup);
		//</editor-fold>
	};

	unregister = ({ level }) => {
		//<editor-fold defaultstate="collapsed" desc="unregister">
		unset(this.ui_popups, level);
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Helpers
	 *
	 * ========================================================================*/

	isValidName = (name) => {
		//<editor-fold defaultstate="collapsed" desc="isValidName">
		if (!has(popups, name)) {
			console.error('No popup with name:' + name);
			return false;
		}

		return true;
		//</editor-fold>
	};

	get = ({ name, data, settings: newSettings, component }) => {
		//<editor-fold defaultstate="collapsed" desc="get">
		let { popup, settings } = popups[name];
		let _settings;

		if (!isUndefined(newSettings)) {
			_settings = Object.assign({}, settings, newSettings);
		} else {
			_settings = Object.assign({}, settings);
		}

		return {
			name,
			popup,
			data,
			settings: _settings,
			component,
		};
		//</editor-fold>
	};

	isAlreadyOpened = (popup) => {
		//<editor-fold defaultstate="collapsed" desc="isAlreadyOpened">
		if (has(this.popups, popup.settings.level)) {
			const current = this.popups[popup.settings.level];

			const checks = [];

			checks.push(current.name === popup.name);

			if (!isUndefined(current.component) && !isUndefined(popup.component)) {
				checks.push(current.component === popup.component);
			}

			checks.push(_g.areEqualObjects(current.data, popup.data));

			return every(checks);
		}

		return false;
		//</editor-fold>
	};

	isAlreadyClosed = (popup) => {
		//<editor-fold defaultstate="collapsed" desc="isAlreadyClosed">
		if (!has(this.popups, popup.settings.level)) {
			return true;
		}

		return false;
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	openPopup = ({ name, data, settings, component }) => {
		//<editor-fold defaultstate="collapsed" desc="openPopup">
		if (!this.isValidName(name)) {
			return;
		}

		const popup = this.get({ name, data, settings, component });

		if (this.isAlreadyOpened(popup)) {
			return;
		}

		//do not open if previous popup onClose returns false
		let previous_popup_settings = null;

		if (has(this.popups, popup.settings.level)) {
			previous_popup_settings = this.popups[popup.settings.level].settings;

			if (has(previous_popup_settings, 'onClose')) {
				if (!previous_popup_settings.onClose()) {
					return;
				}
			}
		}

		this.popups[popup.settings.level] = popup;

		this.local_state.popups = _g.dotProp.set(
			this.local_state.popups,
			popup.settings.level,
			popup.settings.level,
		);

		this.setState(
			{
				popups: this.local_state.popups,
			},
			() => {
				if (!_g.isEmpty(this.state.popups)) {
					ee.trigger(events.popup.isOpened);
				}
			},
		);

		$('body').css('margin-right', getScrollBarWidth() + 'px');
		$('body').css('overflow', 'hidden');

		//update url
		const newUrlParams = {};
		//remove previous key from url
		if (!isNull(previous_popup_settings)) {
			if (previous_popup_settings.inUrl) {
				newUrlParams[previous_popup_settings.name] = null;

				if (has(previous_popup_settings, 'extraUrlKeys')) {
					forEach(previous_popup_settings.extraUrlKeys, (value) => {
						newUrlParams[value] = null;
					});
				}
			}
		}

		if (popup.settings.inUrl) {
			newUrlParams[popup.name] = rison.encode(popup.data);
		}

		if (!_g.isEmpty(newUrlParams)) {
			navigation.batchUpdateParamKeys(newUrlParams);
		}

		//</editor-fold>
	};

	closePopup = ({ name, level }) => {
		//<editor-fold defaultstate="collapsed" desc="closePopup">
		if (!this.isValidName(name)) {
			return;
		}

		const popup = this.get({ name });

		if (!isUndefined(level)) {
			popup.settings.level = level;
		} else {
			level = popup.settings.level;
		}

		if (this.isAlreadyClosed(popup)) {
			return;
		}

		if (has(popup.settings, 'onClose')) {
			if (!popup.settings.onClose()) {
				return;
			}
		}

		const _popup = get(this.popups, level);
		const ui_popup = get(this.ui_popups, level, null);
		const { key } = _popup;

		if (!isNull(ui_popup) && !_g.isEmpty(ui_popup.props.closeAnimation)) {
			ui_popup.closeAnimation({ key, name, level }, this.onAnimationClose);
		} else {
			this.closePopupFinally({ name, level });
		}

		//</editor-fold>
	};

	onAnimationClose = ({ key, name, level }) => {
		//<editor-fold defaultstate="collapsed" desc="onAnimationClose">
		const popup = get(this.popups, level, null);

		if (!isNull(popup)) {
			if (popup.key === key && popup.name === name) {
				this.closePopupFinally({ name, level });
			}
		}
		//</editor-fold>
	};

	closePopupFinally = ({ name, level }) => {
		//<editor-fold defaultstate="collapsed" desc="closePopupFinally">
		if (!this.isValidName(name)) {
			return;
		}

		const popup = this.get({ name });

		if (!isUndefined(level)) {
			popup.settings.level = level;
		} else {
			level = popup.settings.level;
		}

		if (this.isAlreadyClosed(popup)) {
			return;
		}

		delete this.popups[popup.settings.level];

		this.local_state.popups = _g.dotProp.delete(
			this.local_state.popups,
			popup.settings.level,
		);

		this.setState(
			{
				popups: this.local_state.popups,
			},
			() => {
				if (_g.isEmpty(this.state.popups)) {
					ee.trigger(events.popup.allClosed);
				}
			},
		);

		if (_g.isEmpty(this.popups)) {
			$('body').css('overflow', '');
			$('body').css('margin-right', '');
		}

		const newUrlParams = {};

		if (popup.settings.inUrl) {
			newUrlParams[popup.name] = null;

			if (has(popup.settings, 'extraUrlKeys')) {
				forEach(popup.settings.extraUrlKeys, (value) => {
					newUrlParams[value] = null;
				});
			}
		}

		if (!_g.isEmpty(newUrlParams)) {
			navigation.batchUpdateParamKeys(newUrlParams);
		}
		//</editor-fold>
	};

	closeUpper = () => {
		//<editor-fold defaultstate="collapsed" desc="closeUpper">
		let keys = Object.keys(this.popups);
		if (keys.length === 0) {
			return;
		}

		for (let i = 0; i < keys.length; i++) {
			keys[i] = parseInt(keys[i], 10) || 0;
		}

		let upper = max(keys);

		for (let key of keys) {
			let popup = this.popups[key];

			if (key === upper) {
				if (has(popup.settings, 'closeOnEsc')) {
					if (!popup.settings.closeOnEsc) {
						return;
					}
				}

				this.closePopup({ name: popup.name, level: key });
				return;
			}
		}

		//</editor-fold>
	};

	updateFromUrl = (_params) => {
		//<editor-fold defaultstate="collapsed" desc="updateFromUrl">

		const params = !isNull(_params) ? _params : {};

		Object.keys(this.popups).forEach((key) => {
			let popup = this.popups[key];
			//close if opened and inUrl=true but doesn't exist in url
			if (popup.settings.inUrl && !has(params, popup.settings.name)) {
				this.closePopup({ name: popup.name });
			}
		});

		Object.keys(popups).forEach((key) => {
			let popup = popups[key];
			//open if closed and in_url=true but exists in url
			if (
				popup.settings.inUrl &&
				has(params, key) &&
				!has(this.popups, popup.settings.level)
			) {
				let data = rison.decode(params[key]);
				this.openPopup({ name: key, data: data });
			}
		});

		//</editor-fold>
	};

	renderPopup = (level) => {
		//<editor-fold defaultstate="collapsed" desc="renderPopup">

		const { name, popup, component, data, settings } = get(this.popups, level);

		const extra = {};

		if (!isUndefined(component)) {
			extra.settings = settings;
		}

		const key = name + '-' + hash({ ...extra, ...data });
		this.popups[level].key = key;

		const props = {
			key: key,
			data: data,
		};

		if (!isUndefined(component)) {
			props.component = component;
		}

		if (!isUndefined(settings)) {
			props.settings = _g.cloneDeep(settings);
		}

		return React.createElement(popup, props);

		//</editor-fold>
	};

	renderPopups = () => {
		//<editor-fold defaultstate="collapsed" desc="renderPopups">
		const { popups } = this.state;

		return map(popups, this.renderPopup);
		//</editor-fold>
	};

	render() {
		const popups = this.renderPopups();
		return (
			<PopupContainerContext.Provider value={this.state.context}>
				{popups}
			</PopupContainerContext.Provider>
		);
	}
}

PopupContainer.propTypes = propTypes;

PopupContainer.defaultProps = defaultProps;

export default WithStore(storeProps)(PopupContainer);
