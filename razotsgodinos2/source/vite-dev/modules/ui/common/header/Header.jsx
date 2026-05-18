import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import getScrollBarWidth from 'helpers/getScrollBarWidth';

import styles from './Header.module.less';

const propTypes = {
	classNames: PropTypes.object,
	right: PropTypes.node,
	center: PropTypes.node,
	left: PropTypes.node,
	backgroundColor: PropTypes.string,
	height: PropTypes.number,
	fixed: PropTypes.bool,
	applyMarginRightWhenPopupIsOpened: PropTypes.bool,
};

const defaultProps = {
	classNames: {},
	height: 50,
	fixed: false,
	applyMarginRightWhenPopupIsOpened: false,
};

class Header extends Component {
	constructor(props) {
		super(props);

		this.scrollBarWidth = getScrollBarWidth();
		this.mounted = false;

		this.state = {
			extraRightMargin: 0,
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;

		ee.on(events.popup.isOpened, this.onPopupOpened);
		ee.on(events.popup.allClosed, this.onAllPopupClosed);
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;

		ee.off(events.popup.isOpened, this.onPopupOpened);
		ee.off(events.popup.allClosed, this.onAllPopupClosed);
		//</editor-fold>
	}

	onPopupOpened = () => {
		//<editor-fold defaultstate="collapsed" desc="onPopupOpened">
		if (
			this.state.extraRightMargin === 0 &&
			this.mounted &&
			this.props.applyMarginRightWhenPopupIsOpened
		) {
			this.setState({
				extraRightMargin: this.scrollBarWidth,
			});
		}
		//</editor-fold>
	};

	onAllPopupClosed = () => {
		//<editor-fold defaultstate="collapsed" desc="onAllPopupClosed">
		if (this.mounted && this.props.applyMarginRightWhenPopupIsOpened) {
			this.setState({
				extraRightMargin: 0,
			});
		}
		//</editor-fold>
	};

	renderLeft = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderLeft">
		const { left } = this.props;

		return <div className={classNames['left']}>{left}</div>;
		//</editor-fold>
	};

	renderCenter = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderCenter">
		const { center } = this.props;

		return <div className={classNames['center']}>{center}</div>;
		//</editor-fold>
	};

	renderRight = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderRight">
		const { right } = this.props;

		return <div className={classNames['right']}>{right}</div>;
		//</editor-fold>
	};

	render() {
		const { extraRightMargin } = this.state;

		const classNames = _g.getClassNames(styles, this.props.classNames);
		const {
			backgroundColor,
			height,
			fixed,
			applyMarginRightWhenPopupIsOpened,
		} = this.props;

		const className = _g.classNames(classNames['wrapper'], {
			[classNames['fixed']]: fixed,
		});

		const extraStyles = {};

		if (extraRightMargin > 0 && applyMarginRightWhenPopupIsOpened) {
			extraStyles.marginRight = extraRightMargin;
		}

		return (
			<div
				className={className}
				style={{ backgroundColor, height, ...extraStyles }}>
				{this.renderLeft(classNames)}
				{this.renderCenter(classNames)}
				{this.renderRight(classNames)}
			</div>
		);
	}
}

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

export default Header;
