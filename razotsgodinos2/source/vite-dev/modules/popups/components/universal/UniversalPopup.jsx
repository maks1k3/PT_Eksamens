import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Popup from 'popups/components/ui/popup';
import OveralyPopup from 'popups/components/ui/overlay_popup';
import Header from 'popups/components/ui/header';
import Content from 'popups/components/ui/content';
import { defaults } from 'lodash-es';

export const settings = {
	name: 'universal',
	inUrl: false,
	level: 0,
	closeOnEsc: true,
};

const defaultSettings = {
	useOverlayPopup: false,
	level: settings.level,
	verticalAlign: 'top',
	hideOnOverlayClick: true,
	showCloseControl: false,
	maxWidth: '800px',
	openAnimation: '',
	closeAnimation: '',
	PopupProps: {},
	//header
	showHeader: true,
	title: 'Universal popup',
	theme: 'main',
	HeaderProps: {},
	//content
	ContentProps: {},
	closeOnEsc: true,
};

const propTypes = {
	data: PropTypes.object.isRequired,
	component: PropTypes.any.isRequired,
	settings: PropTypes.object,
};

const defaultProps = {
	settings: {},
};

class UniversalPopup extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Events
	 *
	 * ========================================================================*/

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		const { settings } = this.props;
		const options = defaults(settings, defaultSettings);
		closePopup({ name: settings.name, level: options.level });
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderPopup = (options) => {
		//<editor-fold defaultstate="collapsed" desc="renderPopup">
		const {
			useOverlayPopup,
			level,
			verticalAlign,
			hideOnOverlayClick,
			showCloseControl,
			maxWidth,
			openAnimation,
			closeAnimation,
			PopupProps,
		} = options;

		if (useOverlayPopup) {
			return (
				<OveralyPopup
					{...PopupProps}
					level={level}
					showCloseControl={showCloseControl}
					openAnimation={openAnimation}
					closeAnimation={closeAnimation}
					name={settings.name}>
					{this.renderContent(options)}
				</OveralyPopup>
			);
		} else {
			return (
				<Popup
					{...PopupProps}
					level={level}
					verticalAlign={verticalAlign}
					hideOnOverlayClick={hideOnOverlayClick}
					showCloseControl={showCloseControl}
					contentWrapStyle={{
						maxWidth: maxWidth,
					}}
					openAnimation={openAnimation}
					closeAnimation={closeAnimation}
					name={settings.name}>
					{this.renderHeader(options)}
					{this.renderContent(options)}
				</Popup>
			);
		}

		//</editor-fold>
	};

	renderHeader = (options) => {
		//<editor-fold defaultstate="collapsed" desc="renderHeader">
		const { showHeader, title, theme, HeaderProps } = options;

		if (!showHeader) {
			return null;
		}

		return (
			<Header
				{...HeaderProps}
				title={title}
				theme={theme}
				onClose={this.onClose}
			/>
		);
		//</editor-fold>
	};

	renderContent = (options) => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">

		const { data, component } = this.props;

		const { ContentProps, showHeader, useOverlayPopup } = options;

		const content = React.createElement(component, data);

		if (useOverlayPopup) {
			return content;
		}

		return (
			<Content {...ContentProps} noHeader={!showHeader}>
				{content}
			</Content>
		);

		//</editor-fold>
	};

	render() {
		const { settings } = this.props;
		const options = defaults(settings, defaultSettings);

		return this.renderPopup(options);
	}
}

UniversalPopup.propTypes = propTypes;

UniversalPopup.defaultProps = defaultProps;

export default UniversalPopup;
