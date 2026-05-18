import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'helpers/getDisplayName';

import WithUi from 'hoc/store/ui';

const uiProps = ownProps => {
	return {
		files: {
			[ownProps.fileId]: 'fileData',
		},
	};
};

const propTypes = {
	fileId: PropTypes.number.isRequired,
};

const hoc = WrappedComponent => {
	class WithFile extends Component {
		static displayName = `WithFile(${getDisplayName(WrappedComponent)})`;

		constructor(props, context) {
			super(props, context);
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	WithFile.propTypes = propTypes;
	WithFile = WithUi(uiProps)(WithFile);

	return WithFile;
};

export default hoc;
