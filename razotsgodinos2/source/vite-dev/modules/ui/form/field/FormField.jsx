import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import FormContext from '../form/FormContext';
import Field from './components/field';

const propTypes = {
	name: PropTypes.string.isRequired,
};

const defaultProps = {};

class FormField extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { name } = this.props;
		return (
			<FormContext.Consumer>
				{(context) => (
					<Field
						key={name}
						{...context.FieldProps}
						{...this.props}
						formContext={context}
					/>
				)}
			</FormContext.Consumer>
		);
	}
}

FormField.propTypes = propTypes;

FormField.defaultProps = defaultProps;

export default FormField;
