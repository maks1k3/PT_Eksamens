import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import Contact from './components/contact/Contact';

const propTypes = {};

const defaultProps = {};

class Contacts extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Contact />
			</div>
		);
	}
}

Contacts.propTypes = propTypes;

Contacts.defaultProps = defaultProps;

export default Contacts;
