import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import Popup from 'popups/components/ui/popup';
import Header from 'popups/components/ui/header';
import Content from 'popups/components/ui/content';
import Button from 'ui/controls/button';

import styles from './ConfirmationPopup.module.less';
import { defaults, get, isFunction } from 'lodash-es';

export const settings = {
	name: 'confirmation',
	inUrl: false,
	level: 15,
};

const defaultSettings = {
	level: settings.level,
	verticalAlign: 'top',
	maxWidth: '600px',
	openAnimation: '',
	closeAnimation: '',
	PopupProps: {},
	//content
	ContentProps: {},
};

const propTypes = {
	translations: PropTypes.object,
	data: PropTypes.object,
	settings: PropTypes.object,
};

const defaultProps = {};

class ConfirmationPopup extends Component {
	constructor(props) {
		super(props);
	}

	onConfirm = () => {
		//<editor-fold defaultstate="collapsed" desc="onConfirm">
		const onConfirm = get(this.props.data, 'onConfirm');

		if (isFunction(onConfirm)) {
			onConfirm();
		}

		const { settings } = this.props;
		const options = defaults(settings, defaultSettings);
		closePopup({ name: settings.name, level: options.level });
		//</editor-fold>
	};

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		const onCancel = get(this.props.data, 'onCancel');

		if (isFunction(onCancel)) {
			onCancel();
		}
		const { settings } = this.props;
		const options = defaults(settings, defaultSettings);
		closePopup({ name: settings.name, level: options.level });
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(
			styles,
			get(this.props.data, 'classNames', {}),
		);

		const { settings, translations } = this.props;
		const options = defaults(settings, defaultSettings);

		const {
			level,
			verticalAlign,
			maxWidth,
			openAnimation,
			closeAnimation,
			PopupProps,
			ContentProps,
		} = options;

		const title = get(
			this.props.data,
			'title',
			get(translations, 'title', 'Confirm action'),
		);

		const text = get(
			this.props.data,
			'text',
			get(translations, 'text', 'Are you sure?'),
		);

		const theme = get(this.props.data, 'theme', 'danger');
		const confirm = get(
			this.props.data,
			'confirm',
			get(this.props.data, 'confirm', get(translations, 'confirm', 'Confirm')),
		);
		const cancel = get(
			this.props.data,
			'cancel',
			get(translations, 'cancel', 'Cancel'),
		);

		return (
			<Popup
				{...PopupProps}
				name={settings.name}
				level={level}
				verticalAlign={verticalAlign}
				onOverlayClick={this.onClose}
				showCloseControl={false}
				contentWrapStyle={{
					maxWidth: maxWidth,
				}}
				openAnimation={openAnimation}
				closeAnimation={closeAnimation}>
				<Header
					theme={theme}
					title={title}
					showCloseControl={true}
					onClose={this.onClose}
				/>
				<Content
					{...ContentProps}
					classNames={{ wrapper: classNames['wrapper'] }}>
					<div className={classNames['text']}>{text}</div>
					<div className={classNames['footer']}>
						<span className={classNames['cancel']} onClick={this.onClose}>
							{cancel}
						</span>
						<Button theme={theme} title={confirm} onClick={this.onConfirm} />
					</div>
				</Content>
			</Popup>
		);
	}
}

ConfirmationPopup.propTypes = propTypes;

ConfirmationPopup.defaultProps = defaultProps;

ConfirmationPopup = WithLocale(ConfirmationPopup);

export default ConfirmationPopup;
