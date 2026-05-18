import { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import WithMapContext from '../WithMapContext';

const propTypes = {
	children: PropTypes.element.isRequired,
	marker: PropTypes.object,
	visible: PropTypes.bool,

	// callbacks
	onClose: PropTypes.func,
	onOpen: PropTypes.func,

	//from hoc
	mapContext: PropTypes.object,
};

const defaultProps = {
	visible: false,
};

class InfoWindow extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.renderInfoWindow();
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		const map = this.props.mapContext.Map.map;
		const google = this.props.mapContext.Map.google;

		if (!google || !map) {
			return;
		}

		if (this.props.children !== prevProps.children) {
			this.updateContent();
		}

		if (
			this.props.visible !== prevProps.visible ||
			this.props.marker !== prevProps.marker
		) {
			this.props.visible ? this.openWindow() : this.closeWindow();
		}
		//</editor-fold>
	}

	/* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

	renderInfoWindow = () => {
		//<editor-fold defaultstate="collapsed" desc="renderInfoWindow">

		const google = this.props.mapContext.Map.google;

		if (!google || !google.maps) {
			return;
		}

		const iw = (this.infowindow = new google.maps.InfoWindow({
			content: '',
		}));

		google.maps.event.addListener(iw, 'closeclick', this.onClose.bind(this));
		google.maps.event.addListener(iw, 'domready', this.onOpen.bind(this));
		//</editor-fold>
	};

	onOpen = () => {
		//<editor-fold defaultstate="collapsed" desc="onOpen">
		if (this.props.onOpen) {
			this.props.onOpen();
		}
		//</editor-fold>
	};

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		if (this.props.onClose) {
			this.props.onClose();
		}
		//</editor-fold>
	};

	openWindow = () => {
		//<editor-fold defaultstate="collapsed" desc="openWindow">
		const map = this.props.mapContext.Map.map;
		this.infowindow.open(map, this.props.marker);
		//</editor-fold>
	};

	updateContent = () => {
		//<editor-fold defaultstate="collapsed" desc="updateContent">
		const content = this.renderChildren();
		this.infowindow.setContent(content);
		//</editor-fold>
	};

	closeWindow = () => {
		//<editor-fold defaultstate="collapsed" desc="closeWindow">
		this.infowindow.close();
		//</editor-fold>
	};

	renderChildren = () => {
		//<editor-fold defaultstate="collapsed" desc="renderChildren">
		const { children } = this.props;
		return ReactDOMServer.renderToString(children);
		//</editor-fold>
	};

	render() {
		return null;
	}
}

InfoWindow.propTypes = propTypes;

InfoWindow.defaultProps = defaultProps;

InfoWindow = WithMapContext(InfoWindow);

export default InfoWindow;
