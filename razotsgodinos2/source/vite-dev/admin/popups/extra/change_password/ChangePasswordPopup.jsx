import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Popup from 'popups/components/ui/popup';
import Header from 'popups/components/ui/header';
import Content from 'popups/components/ui/content';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

export const settings = {
	name: 'cms_change_password',
	inUrl: true,
	level: 0,
	extraUrlKeys: [],
	verticalAlign: 'top',
	hideOnOverlayClick: true,
	contentWrapStyle: {
		maxWidth: '600px',
	},
	showCloseControl: false,
	onClose: onClose,
	closeOnEsc: true,
};

function onClose() {
	return true;
}

const propTypes = {
	data: PropTypes.object.isRequired,
};

const defaultProps = {};

class ChangePasswordPopup extends Component {
	constructor(props) {
		super(props);
	}

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		closePopup({ name: settings.name });
		//</editor-fold>
	};

	renderPopup = content => {
		//<editor-fold defaultstate="collapsed" desc="renderPopup">

		return (
			<Popup
				name={settings.name}
				level={settings.level}
				verticalAlign={settings.verticalAlign}
				hideOnOverlayClick={settings.hideOnOverlayClick}
				showCloseControl={settings.showCloseControl}
				contentWrapStyle={settings.contentWrapStyle}>
				{this.renderHeader()}
				<Content>{content}</Content>
			</Popup>
		);
		//</editor-fold>
	};

	renderHeader = () => {
		//<editor-fold defaultstate="collapsed" desc="renderHeader">
		return (
			<Header
				title="Change password"
				theme="main"
				showCloseControl={true}
				onClose={this.onClose}
			/>
		);
		//</editor-fold>
	};

	render() {
		const content = (
			<Form
				action="cms/administration/settings"
				extraData={{
					action: 'update_password',
				}}
				submit={{
					title: 'Change password',
				}}
				FieldProps={{
					labelWidth: '30%',
					inputWidth: '70%',
				}}>
				<Field
					name="current_password"
					label="Current password"
					component={Input}
					componentProps={{
						placeholder: 'Current password',
						type: 'password',
					}}
					isRequired={true}
					min={6}
				/>

				<Field
					name="new_password"
					label="New password"
					component={Input}
					componentProps={{
						placeholder: 'New password',
						type: 'password',
					}}
					isRequired={true}
					min={6}
				/>

				<Field
					name="new_password_confirmation"
					label="Repeat password"
					component={Input}
					componentProps={{
						placeholder: 'Repeat password',
						type: 'password',
					}}
					isRequired={true}
					min={6}
					isEqualTo="new_password"
				/>
			</Form>
		);

		return this.renderPopup(content);
	}
}

ChangePasswordPopup.propTypes = propTypes;

ChangePasswordPopup.defaultProps = defaultProps;

export default ChangePasswordPopup;
