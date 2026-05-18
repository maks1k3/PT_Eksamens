import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AlertContainer from 'hud/alert';

const propTypes = {};

const defaultProps = {};

class HUDContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Fragment>
				<AlertContainer />
			</Fragment>
		);
	}
}

HUDContainer.propTypes = propTypes;

HUDContainer.defaultProps = defaultProps;

export default HUDContainer;
