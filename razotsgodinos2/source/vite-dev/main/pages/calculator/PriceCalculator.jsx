import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import Head from './components/head/Head';
import Calculator from './components/calculator/Calculator';
const propTypes = {};

const defaultProps = {};

class PriceCalculator extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Head />
				<Calculator />
			</div>
		);
	}
}

PriceCalculator.propTypes = propTypes;

PriceCalculator.defaultProps = defaultProps;

export default PriceCalculator;
