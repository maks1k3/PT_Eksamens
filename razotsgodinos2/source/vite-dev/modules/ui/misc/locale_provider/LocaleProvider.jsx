import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import LocaleContext from './LocaleContext';

const propTypes = {
	locale: PropTypes.string.isRequired,
	children: PropTypes.node,
};

const defaultProps = {};

class LocaleProvider extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { children, locale } = this.props;
		return (
			<LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
		);
	}
}

LocaleProvider.propTypes = propTypes;

LocaleProvider.defaultProps = defaultProps;

export default LocaleProvider;
