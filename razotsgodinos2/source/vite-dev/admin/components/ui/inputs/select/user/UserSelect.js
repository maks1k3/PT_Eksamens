import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Select from 'ui/inputs/select';

const propTypes = {};

const defaultProps = {};

class UserSelect extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Select
				async={true}
				optionsUrl="administration/users/actions"
				extraData={{
					action: 'autocomplete',
				}}
				{...this.props}
			/>
		);
	}
}

UserSelect.propTypes = propTypes;

UserSelect.defaultProps = defaultProps;

export default UserSelect;
