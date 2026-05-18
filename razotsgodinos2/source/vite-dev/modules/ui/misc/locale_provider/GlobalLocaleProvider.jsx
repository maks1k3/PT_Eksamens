import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import LocaleProvider from './LocaleProvider';

const propTypes = {
	children: PropTypes.node,
	//from ui
	currentLang: PropTypes.string,
};

const defaultProps = {
	//from ui
	currentLang: 'en',
};

const uiProps = ownProps => {
	return {
		currentLang: 'currentLang',
	};
};

class GlobalLocaleProvider extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { currentLang, children } = this.props;

		return <LocaleProvider locale={currentLang}>{children}</LocaleProvider>;
	}
}

GlobalLocaleProvider.propTypes = propTypes;

GlobalLocaleProvider.defaultProps = defaultProps;

GlobalLocaleProvider = WithUi(uiProps)(GlobalLocaleProvider);

export default GlobalLocaleProvider;
