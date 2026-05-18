import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import Center from './components/center/Center';

const propTypes = {};

const defaultProps = {};

class AboutPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Center />
			</div>
		);
	}
}

AboutPage.propTypes = propTypes;

AboutPage.defaultProps = defaultProps;

export default AboutPage;
