import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Video from 'ui/media/video';
import Popup from 'popups/components/ui/popup';
import Arrow from 'popups/components/ui/arrow';

export const settings = {
	name: 'video',
	inUrl: false,
	level: 14,
	extraUrlKeys: [],
	verticalAlign: 'middle',
	hideOnOverlayClick: true,
	contentWrapStyle: {
		maxWidth: '900px',
	},
	showCloseControl: true,
	closeOnEsc: true,
};

const propTypes = {
	data: PropTypes.object,
};

const defaultProps = {};

class VideoPopup extends Component {
	constructor(props) {
		super(props);

		const current = _.get(this.props.data, 'current', 0);

		this.state = {
			current: current,
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		ee.on(events.keyup.left, this.previous);
		ee.on(events.keyup.right, this.next);
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		ee.off(events.keyup.left, this.previous);
		ee.off(events.keyup.right, this.next);
		//</editor-fold>
	}

	previous = () => {
		//<editor-fold defaultstate="collapsed" desc="previous">
		const items = this.getItems();
		const { current } = this.state;

		let _current = current;
		_current--;

		if (_current < 0) {
			_current = items.length - 1;
		}

		this.setVideo(_current);
		//</editor-fold>
	};

	next = () => {
		//<editor-fold defaultstate="collapsed" desc="next">
		const { data } = this.props;
		const items = this.getItems();
		const onGalleryFinish = _.get(data, 'onGalleryFinish', 'loop');
		const { current } = this.state;

		let _current = current;

		_current++;
		if (_current >= items.length) {
			if (onGalleryFinish === 'loop') {
				_current = 0;
			} else if (onGalleryFinish === 'close') {
				this.close();
				return;
			} else if (_.isFunction(onGalleryFinish)) {
				onGalleryFinish({ VideoPopup: this });
				return;
			}
		}

		this.setVideo(_current);
		//</editor-fold>
	};

	setVideo = index => {
		//<editor-fold defaultstate="collapsed" desc="setVideo">
		this.setState({ current: index });
		//</editor-fold>
	};

	getItems = () => {
		//<editor-fold defaultstate="collapsed" desc="getItemById">
		const { data } = this.props;

		return _.get(data, 'items', []);
		//</editor-fold>
	};

	getItemById = index => {
		//<editor-fold defaultstate="collapsed" desc="getItemById">
		const items = this.getItems();

		return _.get(items, index);
		//</editor-fold>
	};

	close = () => {
		//<editor-fold defaultstate="collapsed" desc="close">
		closePopup({ name: settings.name });
		//</editor-fold>
	};

	renderContent = () => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { data } = this.props;
		const items = this.getItems();

		const { current } = this.state;

		const autoPlay = _.get(data, 'autoPlay', true);
		const { src, provider } = _.get(items, current);

		return (
			<Video key={src} src={src} provider={provider} autoPlay={autoPlay} />
		);
		//</editor-fold>
	};

	renderArrows = () => {
		//<editor-fold defaultstate="collapsed" desc="renderArrows">
		const items = this.getItems();

		let arrowLeft = null;
		let arrowRight = null;

		if (items.length > 1) {
			arrowLeft = <Arrow type="left" onClick={this.previous} />;
			arrowRight = <Arrow type="right" onClick={this.next} />;
		}

		return (
			<Fragment>
				{arrowLeft}
				{arrowRight}
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		const { data } = this.props;

		const hideOnOverlayClick = _.get(
			data,
			'hideOnOverlayClick',
			settings.hideOnOverlayClick,
		);

		const PopupProps = _.get(data, 'PopupProps', {});

		return (
			<Popup
				name={settings.name}
				level={settings.level}
				verticalAlign={settings.verticalAlign}
				hideOnOverlayClick={hideOnOverlayClick}
				showCloseControl={settings.showCloseControl}
				contentWrapStyle={settings.contentWrapStyle}
				inner={this.renderArrows()}
				{...PopupProps}>
				{this.renderContent()}
			</Popup>
		);
	}
}

VideoPopup.propTypes = propTypes;

VideoPopup.defaultProps = defaultProps;

export default VideoPopup;
