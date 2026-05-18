import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithStore from 'hoc/store';
import matchPath from './matchPath';

const propTypes = {
	children: PropTypes.node.isRequired,
	//from store
	currentPath: PropTypes.string,
};

const defaultProps = {};

const storeProps = ownProps => {
	return {
		navigation: {
			current: {
				path: 'currentPath',
			},
		},
	};
};

class Switch extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { currentPath, children } = this.props;
		let match = null;
		let child;

		React.Children.forEach(children, element => {
			if (!React.isValidElement(element)) {
				return;
			}

			const { path: pathProp, exact, strict, sensitive, from } = element.props;

			const path = pathProp || from;

			if (match === null) {
				child = element;
				match = matchPath(currentPath, { path, exact, strict, sensitive });
			}
			if (match === null && path === '*') {
				child = element;
				match = { params: {} };
			}
		});

		return match ? React.cloneElement(child, { computedMatch: match }) : null;
	}
}

Switch.propTypes = propTypes;

Switch.defaultProps = defaultProps;

Switch = WithStore(storeProps)(Switch);

export default Switch;
