import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

const propTypes = {};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {};
};

class Arrow extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="17"
				viewBox="0 0 16 17"
				fill="none">
				<path
					d="M6.47147 12.3046L10.2761 8.49998L6.47147 4.69531L5.52881 5.63798L8.39081 8.49998L5.52881 11.362L6.47147 12.3046Z"
					fill="#323342"
				/>
			</svg>
		);
	}
}

Arrow.propTypes = propTypes;

Arrow.defaultProps = defaultProps;

export default WithUi(uiProps)(Arrow);
