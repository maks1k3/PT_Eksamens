import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'CustomPopups: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
//styles
.wrapper {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}

.open_animation {
  animation-name: open_animation;
  animation-duration: 1s;
  animation-timing-function: linear;
}
@keyframes open_animation {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

.close_animation {
  animation-name: close_animation;
  animation-duration: 1s;
  animation-timing-function: linear;
}
@keyframes close_animation {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Popup from 'popups/components/ui/popup';

import styles from './CustomizationPopup.less';

export const settings = {
	name: 'customization_popup',
	inUrl: true,
	level: 1,
	extraUrlKeys: [],
	verticalAlign: 'middle',
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

class CustomizationPopup extends Component {
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
				contentWrapStyle={settings.contentWrapStyle}
				openAnimation={styles['open_animation']}
				closeAnimation={styles['close_animation']}>
				{content}
			</Popup>
		);
		//</editor-fold>
	};

	render() {
		const content = (
			<div className={styles['wrapper']}>This is custom popup.</div>
		);

		return this.renderPopup(content);
	}
}

CustomizationPopup.propTypes = propTypes;

CustomizationPopup.defaultProps = defaultProps;

export default CustomizationPopup;
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
						name: 'customization_popup',
						data: {},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
