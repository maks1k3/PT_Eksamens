import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';
import Link from 'core/navigation/link';

const title = 'CustomPopups: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Custom popups must be registered in app/{project}/popups',
	code: `
<Button
	title="Open custom popup 1"
	onClick={() => {
		openPopup({
			name: 'custom_popup_1',
			data: {},
		});
	}}
/>

<Link
	to={{
		path: '/web_docs/popups/custom',
		params: {
			custom_popup_2: rison.encode({}),
		},
	}}
	theme="content">
	Open custom popup 2
</Link>

//close
closePopup({ name: 'custom_popup_1' });

extraUrlKeys - url GET parameters that should be removed from url when popup is closed.
For example url params that are used for Tabs inside popups.

//{project}/popups.js

/*
 * CustomPopup
 */
import CustomPopup, {
	settings as CustomPopup1Settings,
} from './popups/custom_popup';
popups[CustomPopupSettings.name] = {
	popup: CustomPopup,
	settings: CustomPopupSettings,
};

//{project}/popups/custom_popup/index.js

import CustomPopup from './CustomPopup';

export { settings } from './CustomPopup';

export default CustomPopup;

//{project}/popups/custom_popup/CustomPopup.js

import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Popup from 'popups/components/ui/popup';
import Header from 'popups/components/ui/header';
import Content from 'popups/components/ui/content';

export const settings = {
	name: 'custom_popup',
	inUrl: true,
	level: 0,
	extraUrlKeys: [],
	verticalAlign: 'top',
	hideOnOverlayClick: true,
	contentWrapStyle: {
		maxWidth: '800px',
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

class CustomPopup extends Component {
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
				title="CustomPopup"
				theme="main"
				showCloseControl={true}
				onClose={this.onClose}
			/>
		);
		//</editor-fold>
	};

	render() {
		const content = (
			<div>
				<h3>CustomPopup</h3>
			</div>
		);

		return this.renderPopup(content);
	}
}

CustomPopup.propTypes = propTypes;

CustomPopup.defaultProps = defaultProps;

export default CustomPopup;
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Button
				title="Open custom popup 1"
				onClick={() => {
					openPopup({
						name: 'custom_popup_1',
						data: {},
					});
				}}
			/>
			<div>
				<Link
					to={{
						path: '/web_docs/popups/custom',
						params: {
							custom_popup_2: rison.encode({}),
						},
					}}
					theme="content">
					Open custom popup 2
				</Link>
			</div>
		</ExampleHolder>
	);
};

export default Example;
