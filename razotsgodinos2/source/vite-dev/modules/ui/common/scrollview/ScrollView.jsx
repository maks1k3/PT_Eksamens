import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

//https://github.com/malte-wessel/react-custom-scrollbars
//https://github.com/RobPethick/react-custom-scrollbars-2 - Old package is not maintained, so we are using a fork moving forward
import { Scrollbars } from 'react-custom-scrollbars-2';
import isolatedScroll from 'utils/isolated-scroll';
import ReactDOM from 'react-dom';
import { isFunction, isUndefined } from 'lodash-es';

const propTypes = {
	children: PropTypes.node, //contents
	isolated: PropTypes.bool, //make scrolling isolated from window scrolling
	autoHide: PropTypes.bool, //hide when not scrolling
	autoHeight: PropTypes.bool, //take all available height

	//callbacks
	onScroll: PropTypes.func,
	onScrolledToBottom: PropTypes.func,
	onScrolledToTop: PropTypes.func,

	height: PropTypes.number, //container height
	width: PropTypes.number, //container width

	//customization
	renderThumbVertical: PropTypes.func, //render scroll thumb
	renderThumbHorizontal: PropTypes.func, //render scroll thumb
};

const defaultProps = {
	autoHide: false,
	autoHeight: false,
	isolated: false,
};

let isolatedScrollHandler;

class ScrollView extends Component {
	constructor(props) {
		super(props);
		this.scroll_view = React.createRef();
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { isolated } = this.props;
		if (isolated) {
			isolatedScrollHandler = isolatedScroll(
				$(ReactDOM.findDOMNode(this.scroll_view.current)).find('div').eq(0)[0],
			);
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		const { isolated } = this.props;
		if (isolated && isFunction(isolatedScrollHandler)) {
			isolatedScrollHandler();
		}
		//</editor-fold>
	}

	onScroll = () => {
		//<editor-fold defaultstate="collapsed" desc="onScroll">
		const { onScroll, onScrolledToBottom, onScrolledToTop } = this.props;
		const values = this.scroll_view.current.getValues();

		if (values.scrollTop === 0) {
			if (isFunction(onScrolledToTop)) {
				onScrolledToTop({ values, ScrollView: this });
			}
		}

		if (values.clientHeight + values.scrollTop === values.scrollHeight) {
			if (isFunction(onScrolledToBottom)) {
				onScrolledToBottom({ values, ScrollView: this });
			}
		}

		if (isFunction(onScroll)) {
			onScroll({ values, ScrollView: this });
		}
		//</editor-fold>
	};

	render() {
		const {
			children,
			autoHide,
			autoHeight,
			height,
			width,
			renderThumbVertical,
			renderThumbHorizontal,
		} = this.props;

		const style = {};

		if (!isUndefined(height)) {
			style.height = height;
		}

		if (!isUndefined(width)) {
			style.width = width;
		}

		return (
			<Scrollbars
				ref={this.scroll_view}
				style={style}
				autoHide={autoHide}
				autoHeight={autoHeight}
				onScroll={this.onScroll}
				renderThumbVertical={renderThumbVertical}
				renderThumbHorizontal={renderThumbHorizontal}>
				{children}
			</Scrollbars>
		);
	}
}

ScrollView.propTypes = propTypes;

ScrollView.defaultProps = defaultProps;

export default ScrollView;
