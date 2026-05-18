import { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	show: PropTypes.bool,
	message: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
};

const defaultProps = {
	show: false,
};

class Prompt extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { show, message } = this.props;
		if (show) {
			this.enable(message);
		}

		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">

		if (prevProps.show !== this.props.show) {
			if (this.props.show) {
				this.enable(this.props.message);
			} else {
				this.disable();
			}
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.disable();
		//</editor-fold>
	}

	enable = message => {
		//<editor-fold defaultstate="collapsed" desc="enable">
		if (this.unblock) this.unblock();

		if (typeof navigation_history !== 'undefined') {
			this.unblock = navigation_history.block(message);
		}
		//</editor-fold>
	};

	disable = () => {
		//<editor-fold defaultstate="collapsed" desc="disable">
		if (this.unblock) {
			this.unblock();
			this.unblock = null;
		}
		//</editor-fold>
	};

	render() {
		return null;
	}
}

Prompt.propTypes = propTypes;

Prompt.defaultProps = defaultProps;

export default Prompt;
