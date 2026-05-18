import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'ui/form';
import Loading from 'ui/misc/loading';
import { isFunction } from 'lodash-es';

const propTypes = {
	get: PropTypes.shape({
		action: PropTypes.string.isRequired,
		extraData: PropTypes.object.isRequired,
		parseResponse: PropTypes.func,
	}).isRequired,
	onGetDataSuccess: PropTypes.func,
	update: PropTypes.shape({
		action: PropTypes.string.isRequired,
		extraData: PropTypes.object.isRequired,
		onBeforeSubmit: PropTypes.func,
		onSuccess: PropTypes.func,
		onError: PropTypes.func,
		onFail: PropTypes.func,
	}).isRequired,
	render: PropTypes.func.isRequired,
	FormProps: PropTypes.object,
	LoadingProps: PropTypes.object,
};

const defaultProps = {};

class EditForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			loading: true,
		};

		this.mounted = false;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		this.getData();
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		//</editor-fold>
	}

	getData = () => {
		//<editor-fold defaultstate="collapsed" desc="getData">
		const { action, extraData, parseResponse } = this.props.get;
		const { onGetDataSuccess } = this.props;

		remoteRequest({
			url: action,
			data: extraData,
			onSuccess: (response) => {
				if (!this.mounted) {
					return;
				}

				let data = response;
				if (isFunction(parseResponse)) {
					data = parseResponse(response);
				}

				if (isFunction(onGetDataSuccess)) {
					onGetDataSuccess({ data, response, EditForm: this });
				}

				this.setState({
					data: data,
					loading: false,
				});
			},
			onError: (response) => {
				showAlert({ content: response.msg });
			},
		});
		//</editor-fold>
	};

	onBeforeSubmit = ({ data, Form }) => {
		//<editor-fold defaultstate="collapsed" desc="onBeforeSubmit">
		const { onBeforeSubmit } = this.props.update;

		if (isFunction(onBeforeSubmit)) {
			onBeforeSubmit({ data, Form, EditForm: this });
		}
		//</editor-fold>
	};

	onSuccess = ({ data, Form, response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { onSuccess } = this.props.update;

		if (isFunction(onSuccess)) {
			onSuccess({ data, Form, response, EditForm: this });
		}
		//</editor-fold>
	};

	onError = ({ data, Form, response }) => {
		//<editor-fold defaultstate="collapsed" desc="onError">
		const { onError } = this.props.update;

		if (isFunction(onError)) {
			onError({ data, Form, response, EditForm: this });
		}
		//</editor-fold>
	};

	onFail = ({ data, Form, response }) => {
		//<editor-fold defaultstate="collapsed" desc="onFail">
		const { onFail } = this.props.update;

		if (isFunction(onFail)) {
			onFail({ data, Form, response, EditForm: this });
		}
		//</editor-fold>
	};

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { action, extraData } = this.props.update;
		const { FormProps, render } = this.props;
		const { data } = this.state;

		return (
			<Form
				action={action}
				extraData={extraData}
				onBeforeSubmit={this.onBeforeSubmit}
				onSuccess={this.onSuccess}
				onError={this.onError}
				onFail={this.onFail}
				submit={{
					title: 'Save',
				}}
				{...FormProps}>
				{render({ data, EditForm: this })}
			</Form>
		);
		//</editor-fold>
	};

	render() {
		const { loading } = this.state;
		const { LoadingProps } = this.props;

		if (loading) {
			return <Loading {...LoadingProps} />;
		}

		return this.renderForm();
	}
}

EditForm.propTypes = propTypes;

EditForm.defaultProps = defaultProps;

export default EditForm;
