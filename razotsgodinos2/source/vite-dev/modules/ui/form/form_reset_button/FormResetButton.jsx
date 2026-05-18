import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithFormContext from '../form/WithFormContext';

import Button from 'ui/controls/button';

const propTypes = {
	ButtonProps: PropTypes.object,
	render: PropTypes.func,

	//context
	formContext: PropTypes.object.isRequired,
};

const defaultProps = {
	ButtonProps: {},
};

class FormResetButton extends Component {
	constructor(props) {
		super(props);
	}

	onClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		const { formContext } = this.props;

		formContext.Form.reset();
		//</editor-fold>
	};

	render() {
		const { ButtonProps, formContext, render } = this.props;
		const { locked } = formContext;

		if (_.isFunction(render)) {
			return render({
				ButtonProps,
				locked,
				onClick: this.onClick,
				FormResetButton: this,
			});
		}

		return <Button {...ButtonProps} loading={locked} onClick={this.onClick} />;
	}
}

FormResetButton.propTypes = propTypes;

FormResetButton.defaultProps = defaultProps;

FormResetButton = WithFormContext(FormResetButton);

export default FormResetButton;
