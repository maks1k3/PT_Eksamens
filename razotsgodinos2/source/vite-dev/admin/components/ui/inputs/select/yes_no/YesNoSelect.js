import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Select from 'ui/inputs/select';

const propTypes = {};

const defaultProps = {};

const options = [
	{
		value: '1',
		label: 'Jā',
	},
	{
		value: '0',
		label: 'Nē',
	},
];

class YesNoSelect extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <Select options={options} {...this.props} />;
	}
}

YesNoSelect.propTypes = propTypes;

YesNoSelect.defaultProps = defaultProps;

export default YesNoSelect;
