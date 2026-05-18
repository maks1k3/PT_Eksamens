import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import leaflet from 'leaflet';

import { Marker } from 'ui/maps/leaflet';
import Content from './components/content';

const propTypes = {
	children: PropTypes.node,
	position: PropTypes.any.isRequired,
	MarkerProps: PropTypes.object,
	iconSize: PropTypes.any,
	iconAnchor: PropTypes.any,
};

const defaultProps = {};

class DivIcon extends Component {
	constructor(props) {
		super(props);

		this.id = _g.generateShortId();
	}

	getIcon = () => {
		//<editor-fold defaultstate="collapsed" desc="getIcon">
		const { iconSize, iconAnchor } = this.props;

		return leaflet.divIcon({
			iconSize,
			iconAnchor,
			html: `<div id="${this.id}"></div>`,
		});
		//</editor-fold>
	};

	renderContent = () => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { children } = this.props;

		return <Content content={children} id={this.id} />;
		//</editor-fold>
	};

	render() {
		const { MarkerProps, position } = this.props;

		return (
			<Fragment>
				{this.renderContent()}
				<Marker {...MarkerProps} position={position} icon={this.getIcon()} />
			</Fragment>
		);
	}
}

DivIcon.propTypes = propTypes;

DivIcon.defaultProps = defaultProps;

export default DivIcon;
