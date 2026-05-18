import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Select from 'ui/inputs/select';

const propTypes = {};

const defaultProps = {};

const options = [
	{
		value: 'user',
		label: 'User',
	},
	{
		value: 'admin',
		label: 'Admin',
	},
];

class UserGroupSelect extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <Select options={options} {...this.props} />;
	}
}

UserGroupSelect.propTypes = propTypes;

UserGroupSelect.defaultProps = defaultProps;

export default UserGroupSelect;
