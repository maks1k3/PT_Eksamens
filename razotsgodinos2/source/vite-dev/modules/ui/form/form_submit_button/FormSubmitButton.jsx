import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithFormContext from '../form/WithFormContext';

import Button from 'ui/controls/button';
import { isFunction } from 'lodash-es';

const propTypes = {
	ButtonProps: PropTypes.object,
	render: PropTypes.func,

	//context
	formContext: PropTypes.object.isRequired,
};

const defaultProps = {};

class FormSubmitButton extends Component {
	constructor(props) {
		super(props);
	}

	onClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		const { formContext } = this.props;

		formContext.Form.submit();
		//</editor-fold>
	};

	render() {
		const { ButtonProps, formContext, render } = this.props;
		const { locked } = formContext;

		if (isFunction(render)) {
			return render({
				ButtonProps,
				locked,
				onClick: this.onClick,
				FormSubmitButton: this,
			});
		}

		return <Button {...ButtonProps} loading={locked} onClick={this.onClick} />;
	}
}

FormSubmitButton.propTypes = propTypes;

FormSubmitButton.defaultProps = defaultProps;

FormSubmitButton = WithFormContext(FormSubmitButton);

export default FormSubmitButton;
