import { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

const propTypes = {
	id: PropTypes.string.isRequired,
	content: PropTypes.node.isRequired,
};

const defaultProps = {};

class Content extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ready: false,
		};

		this.interval = null;
		this.mounted = false;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		this.interval = setInterval(() => {
			if (this.isReady()) {
				this.stopInterval();
				this.init();
			}
		}, 300);
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		this.stopInterval();
		//</editor-fold>
	}

	stopInterval = () => {
		//<editor-fold defaultstate="collapsed" desc="stopInterval">
		if (this.interval !== null) {
			clearInterval(this.interval);
			this.interval = null;
		}
		//</editor-fold>
	};

	isReady = () => {
		//<editor-fold defaultstate="collapsed" desc="isReady">
		const { id } = this.props;

		return $(`#${id}`).length === 1;
		//</editor-fold>
	};

	init = () => {
		//<editor-fold defaultstate="collapsed" desc="init">
		this.setState({ ready: true });
		//</editor-fold>
	};

	renderContent = () => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { content, id } = this.props;

		return createPortal(content, $(`#${id}`)[0]);
		//</editor-fold>
	};

	render() {
		const { ready } = this.state;

		if (ready) {
			return this.renderContent();
		}

		return null;
	}
}

Content.propTypes = propTypes;

Content.defaultProps = defaultProps;

export default Content;
