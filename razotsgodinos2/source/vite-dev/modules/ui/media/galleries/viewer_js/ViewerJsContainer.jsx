import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithStore from 'hoc/store';

import ViewerJs from './ViewerJs';

const propTypes = {
	//from store
	viewer_js: PropTypes.string,
};

const defaultProps = {};

const storeProps = ownProps => {
	return {
		navigation: {
			current: {
				params: {
					viewer_js: 'viewer_js',
				},
			},
		},
	};
};

class ViewerJsContainer extends Component {
	constructor(props) {
		super(props);

		this.onCloseStarted = false;

		this.state = {
			open: false,
			current: 0,
			items: [],
			options: null,
		};
		this.open = false;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { viewer_js } = this.props;

		if (!_.isUndefined(viewer_js)) {
			navigation.updateParamKey('viewer_js', null);
		}

		ee.on(events.viewerJs.open, this.onOpen);
		ee.on(events.viewerJs.close, this.onClose);
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">

		if (prevProps.viewer_js !== this.props.viewer_js) {
			if (_.isUndefined(this.props.viewer_js) && this.open) {
				this.onClose();
			}
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		ee.off(events.viewerJs.open, this.onOpen);
		ee.off(events.viewerJs.close, this.onClose);
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onOpen = ({ items, current = 0, options = null }) => {
		//<editor-fold defaultstate="collapsed" desc="onOpen">
		navigation.updateParamKey('viewer_js', 1);
		this.open = true;

		this.setState({
			open: true,
			current: current,
			items: items,
			options: options,
		});
		//</editor-fold>
	};

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		this.onCloseStarted = false;
		this.open = false;
		this.setState({
			open: false,
			current: 0,
			items: null,
			options: null,
		});
		navigation.updateParamKey('viewer_js', null);
		$('body').removeClass('viewer-open');
		//</editor-fold>
	};

	onCloseStart = () => {
		//<editor-fold defaultstate="collapsed" desc="onCloseStart">
		this.onCloseStarted = true;
		setTimeout(() => {
			if (this.onCloseStarted) {
				this.onClose();
			}
		}, 1000);
		//</editor-fold>
	};

	render() {
		const { open, current, items, options } = this.state;

		if (!open) {
			return null;
		}

		const extra = {};

		if (options !== null) {
			extra.options = options;
		}

		return (
			<ViewerJs
				index={current}
				items={items}
				onClose={this.onClose}
				onCloseStart={this.onCloseStart}
				{...extra}
			/>
		);
	}
}

ViewerJsContainer.propTypes = propTypes;

ViewerJsContainer.defaultProps = defaultProps;

ViewerJsContainer = WithStore(storeProps)(ViewerJsContainer);

export default ViewerJsContainer;
