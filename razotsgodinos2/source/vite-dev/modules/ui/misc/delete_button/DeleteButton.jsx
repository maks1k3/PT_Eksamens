import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'ui/form';

import WithLocale from './WithLocale';
import { isFunction } from 'lodash-es';

const propTypes = {
	action: PropTypes.string,
	extraData: PropTypes.object,

	title: PropTypes.string,
	icon: PropTypes.shape({
		provider: PropTypes.string,
		name: PropTypes.string,
	}),

	confirmationTitle: PropTypes.string,
	confirmationText: PropTypes.string,
	confirmationTheme: PropTypes.string,
	confirmationConfirm: PropTypes.string,
	confirmationCancel: PropTypes.string,

	onProcess: PropTypes.func,
	onSuccess: PropTypes.func,
	onError: PropTypes.func,

	FormProps: PropTypes.object,
};

const defaultProps = {
	title: 'Delete',
	icon: {
		provider: 'icomoon',
		name: 'trash',
	},
	confirmationTitle: 'Confirm action',
	confirmationText: 'Are you sure you want to delete this?',
	confirmationTheme: 'danger',
	confirmationConfirm: 'Confirm',
	confirmationCancel: 'Cancel',
};

class DeleteButton extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onSuccess = ({ data, Form, response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { onSuccess } = this.props;

		if (isFunction(onSuccess)) {
			onSuccess({ data, Form, response, DeleteButton: this });
		}
		//</editor-fold>
	};

	onError = ({ data, Form, response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { onError } = this.props;

		if (isFunction(onError)) {
			onError({ data, Form, response, DeleteButton: this });
		} else {
			showAlert({ content: response.msg });
		}

		//</editor-fold>
	};

	render() {
		const {
			action,
			extraData,

			title,
			icon,

			confirmationTitle,
			confirmationText,
			confirmationTheme,
			confirmationConfirm,
			confirmationCancel,

			onProcess,

			FormProps,
		} = this.props;

		return (
			<Form
				action={action}
				extraData={extraData}
				submitPosition="left"
				showSuccess={false}
				showError={false}
				submit={{
					title: title,
					theme: 'danger',
					// icon: icon,
				}}
				confirmation={{
					title: confirmationTitle,
					text: confirmationText,
					theme: confirmationTheme,
					confirm: confirmationConfirm,
					cancel: confirmationCancel,
				}}
				onProcess={onProcess}
				onSuccess={this.onSuccess}
				onError={this.onError}
				{...FormProps}
			/>
		);
	}
}

DeleteButton.propTypes = propTypes;

DeleteButton.defaultProps = defaultProps;

DeleteButton = WithLocale(DeleteButton);

export default DeleteButton;
