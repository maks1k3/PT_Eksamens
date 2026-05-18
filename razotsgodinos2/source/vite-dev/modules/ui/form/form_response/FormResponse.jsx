import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithFormContext from '../form/WithFormContext';

import AlertBox from 'ui/misc/alertbox';
import { isFunction } from 'lodash-es';

const propTypes = {
	AlertBoxProps: PropTypes.object,
	render: PropTypes.func,

	//context
	formContext: PropTypes.object.isRequired,
};

const defaultProps = {};

class FormResponse extends Component {
	constructor(props) {
		super(props);
	}

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		const { formContext } = this.props;

		formContext.Form.hideResponse();
		//</editor-fold>
	};

	render() {
		const { AlertBoxProps, formContext, render } = this.props;
		const { response } = formContext;

		const { show, type, content } = response;

		if (!show) {
			return null;
		}

		if (isFunction(render)) {
			return render({
				AlertBoxProps,
				type,
				content,
				onClose: this.onClose,
				FormResponse: this,
			});
		}

		const theme = type === 'success' ? 'success' : 'danger';

		return (
			<AlertBox
				{...AlertBoxProps}
				content={content}
				theme={theme}
				onClose={this.onClose}
			/>
		);
	}
}

FormResponse.propTypes = propTypes;

FormResponse.defaultProps = defaultProps;

FormResponse = WithFormContext(FormResponse);

export default FormResponse;
