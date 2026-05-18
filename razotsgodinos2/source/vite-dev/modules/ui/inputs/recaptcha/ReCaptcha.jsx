import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import ScriptsLoader from 'utils/ScriptsLoader';

import WithLocale from './WithLocale';

const propTypes = {
	sitekey: PropTypes.string,
	lang: PropTypes.string,
	verifyCallback: PropTypes.func,
	expiredCallback: PropTypes.func,
	theme: PropTypes.oneOf(['light', 'dark']),
	size: PropTypes.oneOf(['compact', 'normal']),

	//from Field
	onChange: PropTypes.func,
	FieldInstance: PropTypes.object,
};

const defaultProps = {
	lang: 'en',
	theme: 'light',
	size: 'normal',
};

const isReady = () =>
	typeof window !== 'undefined' &&
	typeof window.grecaptcha !== 'undefined' &&
	typeof window.grecaptcha.render === 'function';

class ReCaptcha extends Component {
	constructor(props) {
		super(props);
		this.node = React.createRef();

		this.sitekey = _.isUndefined(this.props.sitekey)
			? _.get(store.getState(), 'configuration.reCaptcha')
			: this.props.sitekey;

		this.value = '';
		this.widgetId = null;

		this.interval = null;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		ScriptsLoader.load({
			js: {
				ReCaptcha: 'https://www.google.com/recaptcha/api.js',
			},
			onLoad: this.onScriptsLoaded,
		});

		const { FieldInstance } = this.props;

		if (!_.isUndefined(FieldInstance)) {
			FieldInstance.register({ input: this });
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.stopInterval();
		//</editor-fold>
	}

	stopInterval = () => {
		//<editor-fold defaultstate="collapsed" desc="stopInterval">
		if (this.interval !== null) {
			clearInterval(this.interval);
			this.interval = null;
		}
		//</editor-fold>
	};

	onScriptsLoaded = () => {
		//<editor-fold defaultstate="collapsed" desc="onScriptsLoaded">
		this.interval = setInterval(() => {
			if (isReady()) {
				this.stopInterval();
				this.init();
			}
		}, 1000);
		//</editor-fold>
	};

	init = () => {
		//<editor-fold defaultstate="collapsed" desc="init">
		const { theme, lang, size } = this.props;

		this.widgetId = window.grecaptcha.render(this.node.current, {
			sitekey: this.sitekey,
			hl: lang,
			theme,
			size,
			callback: this.verifyCallback,
			'expired-callback': this.expiredCallback,
		});
		//</editor-fold>
	};

	setValue = value => {
		//<editor-fold defaultstate="collapsed" desc="setValue">
		if (value === '') {
			this.reset();
			this.value = '';
		}
		//</editor-fold>
	};

	getValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getValue">
		// if (!_.isNull(this.widgetId)) {
		// 	return window.grecaptcha.getResponse(this.widgetId);
		// }
		return this.value;
		//</editor-fold>
	};

	verifyCallback = token => {
		//<editor-fold defaultstate="collapsed" desc="verifyCallback">
		this.value = token;

		const { verifyCallback, onChange } = this.props;

		if (_.isFunction(verifyCallback)) {
			verifyCallback(token);
		}

		if (_.isFunction(onChange)) {
			onChange({ value: token });
		}
		//</editor-fold>
	};

	expiredCallback = () => {
		//<editor-fold defaultstate="collapsed" desc="expiredCallback">
		this.value = '';

		const { expiredCallback, onChange } = this.props;

		if (_.isFunction(expiredCallback)) {
			expiredCallback();
		}

		if (_.isFunction(onChange)) {
			onChange({ value: '' });
		}
		//</editor-fold>
	};

	reset = () => {
		//<editor-fold defaultstate="collapsed" desc="reset">
		if (!_.isNull(this.widgetId)) {
			window.grecaptcha.reset(this.widgetId);
		}
		//</editor-fold>
	};

	render() {
		return <div ref={this.node} />;
	}
}

ReCaptcha.propTypes = propTypes;

ReCaptcha.defaultProps = defaultProps;

ReCaptcha = WithLocale(ReCaptcha);

export default ReCaptcha;
