import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'CustomPopups: overlay popup';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Custom popups must be registered in app/{project}/popups',
	code: `
import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import OverlayPopup from 'popups/components/ui/overlay_popup';

export const settings = {
	name: 'overlay_popup',
	inUrl: true,
	level: 0,
	extraUrlKeys: [],
	showCloseControl: true,
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

class PopupWithOverlay extends Component {
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
			<OverlayPopup
				name={settings.name}
				level={settings.level}
				showCloseControl={settings.showCloseControl}>
				{content}
			</OverlayPopup>
		);
		//</editor-fold>
	};

	render() {
		const content = <div>This is overlay popup</div>;

		return this.renderPopup(content);
	}
}

PopupWithOverlay.propTypes = propTypes;

PopupWithOverlay.defaultProps = defaultProps;

export default PopupWithOverlay;
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
						name: 'overlay_popup',
						data: {},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
