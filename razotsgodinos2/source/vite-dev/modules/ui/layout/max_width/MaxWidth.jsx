import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	width: PropTypes.string,
	children: PropTypes.node,
};

const defaultProps = {
	width: '800px',
};

class MaxWidth extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { width, children } = this.props;
		return <div style={{ maxWidth: width }}>{children}</div>;
	}
}

MaxWidth.propTypes = propTypes;

MaxWidth.defaultProps = defaultProps;

export default MaxWidth;
