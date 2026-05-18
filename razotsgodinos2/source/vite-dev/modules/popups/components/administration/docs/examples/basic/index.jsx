import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'AdministrationPopup: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AdministrationPopup from 'popups/components/administration';

export const settings = {
	name: 'administration_popup_basic',
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

class AdministrationPopupBasic extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
  *
  *                     Methods
  *
  * ========================================================================*/

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		closePopup({ name: settings.name });
		//</editor-fold>
	};

	getTitle = data => {
		//<editor-fold defaultstate="collapsed" desc="getTitle">
		const id = _.get(data, 'id', '');
		return \`Record #\${id}\`;
		//</editor-fold>
	};

	getImage = data => {
		//<editor-fold defaultstate="collapsed" desc="getImage">
		const thumbnail = _.get(data, 'image', '');
		const image = _.get(data, 'image', '');

		return { thumbnail, image };
		//</editor-fold>
	};

	getRows = data => {
		//<editor-fold defaultstate="collapsed" desc="getRows">
		const rows = [];

		rows.push('ID: ' + _.get(data, 'id', ''));
		rows.push('Name: ' + _.get(data, 'name', ''));
		rows.push('Type: ' + _.get(data, 'type', ''));

		return rows;
		//</editor-fold>
	};

	/* ========================================================================*
  *
  *                     Renderers
  *
  * ========================================================================*/

	renderPopup = content => {
		//<editor-fold defaultstate="collapsed" desc="renderPopup">
		return (
			<AdministrationPopup
				name="AdministrationPopupBasic"
				popupName={settings.name}
				url="actions/echo"
				extraData={{
					id: 1,
					name: 'Cat',
					type: 'Animal',
					image:
						'https://img-fotki.yandex.ru/get/59115/110661898.1b/0_15bdda_df3bae41_orig.jpg',
				}}
				getTitle={this.getTitle}
				getImage={this.getImage}
				getRows={this.getRows}
				level={settings.level}
				verticalAlign={settings.verticalAlign}
				hideOnOverlayClick={settings.hideOnOverlayClick}
				showCloseControl={settings.showCloseControl}
				contentWrapStyle={settings.contentWrapStyle}>
				{content}
			</AdministrationPopup>
		);
		//</editor-fold>
	};

	render() {
		const content = <div>AdministrationPopupBasic</div>;

		return this.renderPopup(content);
	}
}

AdministrationPopupBasic.propTypes = propTypes;

AdministrationPopupBasic.defaultProps = defaultProps;

export default AdministrationPopupBasic;
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
				title="Show"
				onClick={() => {
					openPopup({
						name: 'administration_popup_basic',
						data: {},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
