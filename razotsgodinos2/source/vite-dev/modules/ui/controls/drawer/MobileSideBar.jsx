import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'vendor/balloob/react-sidebar/Sidebar';

const propTypes = {
	sidebar: PropTypes.node.isRequired,
	content: PropTypes.node.isRequired,
};

const defaultProps = {};

const getInitialState = () => {
	return {
		sidebarOpen: false,
	};
};

class MobileSideBar extends Component {
	constructor(props) {
		super(props);
		this.state = getInitialState();
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		ee.on(events.drawer.open, this.open);
		ee.on(events.drawer.close, this.close);

		const self = this;
		$('#drawer_scroll').on('scroll.MobileSideBar', function(e) {
			const elem = $(e.currentTarget);

			if (self.isScrolledToBottom(elem[0])) {
				//console.log("MobileSideBar bottom");
				ee.trigger(events.browserWindow.scrolledToBottom);
			}

			if (self.isScrolledToTop(elem[0])) {
				//console.log("MobileSideBar top");
				ee.trigger(events.browserWindow.scrolledToTop);
			}
		});
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		ee.off(events.drawer.open, this.open);
		ee.off(events.drawer.close, this.close);
		$(window).off('scroll.MobileSideBar');
		//</editor-fold>
	}

	/* ========================================================================*
  *
  *                     Methods
  *
  * ========================================================================*/

	isScrolledToTop = el => {
		//<editor-fold defaultstate="collapsed" desc="isScrolledToTop">
		const $el = $(el);
		return $el.scrollTop() === 0;
		//</editor-fold>
	};

	isScrolledToBottom = el => {
		//<editor-fold defaultstate="collapsed" desc="isScrolledToBottom">
		const $el = $(el);

		return el.scrollHeight - $el.scrollTop() - $el.outerHeight() < 1; //originally <1
		//</editor-fold>
	};

	open = () => {
		//<editor-fold defaultstate="collapsed" desc="open">
		this.setState({ sidebarOpen: true });
		//</editor-fold>
	};

	close = () => {
		//<editor-fold defaultstate="collapsed" desc="close">
		this.setState({ sidebarOpen: false });
		//</editor-fold>
	};

	onSetOpen = open => {
		//<editor-fold defaultstate="collapsed" desc="onSetOpen">
		this.setState({ sidebarOpen: open });
		//</editor-fold>
	};

	render() {
		const { sidebar, content } = this.props;
		const { sidebarOpen } = this.state;

		return (
			<Sidebar sidebar={sidebar} open={sidebarOpen} onSetOpen={this.onSetOpen}>
				{content}
			</Sidebar>
		);
	}
}

MobileSideBar.propTypes = propTypes;

MobileSideBar.defaultProps = defaultProps;

export default MobileSideBar;
