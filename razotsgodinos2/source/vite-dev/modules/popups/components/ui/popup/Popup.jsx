import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithPopupContainerContext from '../../../WithPopupContainerContext';

import styles from './Popup.module.less';
import { isFunction, isNull, isUndefined } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	name: PropTypes.string.isRequired, //popups name
	level: PropTypes.number, //popup level in hierarchy

	//overlay
	showOverlay: PropTypes.bool,
	hideOnOverlayClick: PropTypes.bool,
	onOverlayClick: PropTypes.func, //overrides default behaviour

	//close
	showCloseControl: PropTypes.bool, //x button to close popup
	onClose: PropTypes.func, //overrides default behaviour

	//ui
	verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
	contentWrapStyle: PropTypes.object, //styles for .content-wrap
	renderPopup: PropTypes.func, //override popup rendering
	inner: PropTypes.node, //inner for container
	children: PropTypes.node, //children for render

	//animation
	openAnimation: PropTypes.string, //openAnimation className
	closeAnimation: PropTypes.string, //closeAnimation className

	//from WithPopupContainerContext
	popupContainerContext: PropTypes.object,
};

const defaultProps = {
	classNames: {},
	level: 0,
	verticalAlign: 'top',
	showOverlay: true,
	hideOnOverlayClick: true,
	showCloseControl: false,
	openAnimation: '',
	closeAnimation: '',
};

class Popup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showCloseAnimation: false,
			hideOverlay: false,
			hide: false,
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { popupContainerContext } = this.props;

		if (!isNull(popupContainerContext)) {
			const { PopupContainer } = popupContainerContext;
			PopupContainer.register({ level: this.props.level, Popup: this });
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		const { popupContainerContext } = this.props;

		if (!isNull(popupContainerContext)) {
			const { PopupContainer } = popupContainerContext;
			PopupContainer.unregister({ level: this.props.level });
		}
		//</editor-fold>
	}

	onOverlayClick = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onOverlayClick">
		e.stopPropagation();
		const classNames = _g.getClassNames(styles, this.props.classNames);
		if (
			!_g.inArray(e.target.className, [
				classNames['wrapper'],
				classNames['container'],
				classNames['content-holder'],
			])
		) {
			return;
		}

		const { name, hideOnOverlayClick, onOverlayClick, onClose, level } =
			this.props;

		if (isFunction(onOverlayClick)) {
			onOverlayClick();
			return;
		}

		if (!hideOnOverlayClick) {
			return;
		}

		if (isFunction(onClose)) {
			onClose();
			return;
		}

		closePopup({ name, level });
		//</editor-fold>
	};

	onCloseClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onCloseClick">
		const { name, level, onClose } = this.props;

		if (isFunction(onClose)) {
			onClose();
			return;
		}

		closePopup({ name, level });
		//</editor-fold>
	};

	closeAnimation = ({ key, name, level }, callback) => {
		//<editor-fold defaultstate="collapsed" desc="closeAnimation">
		this.closeAnimation = {
			key,
			name,
			level,
			callback,
		};

		this.setState({
			showCloseAnimation: true,
			hideOverlay: true,
		});

		//</editor-fold>
	};

	onAnimationEnd = () => {
		//<editor-fold defaultstate="collapsed" desc="onAnimationEnd">
		const { showCloseAnimation } = this.state;

		if (showCloseAnimation) {
			this.setState({
				hide: true,
			});
			if (!isUndefined(this.closeAnimation)) {
				const { key, name, level, callback } = this.closeAnimation;
				callback({ key, name, level });
			}
		}
		//</editor-fold>
	};

	renderOverlay = (zIndex, classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderOverlay">
		const { hideOverlay } = this.state;

		if (hideOverlay) {
			return null;
		}
		const { showOverlay } = this.props;

		if (!showOverlay) {
			return null;
		}

		return (
			<div
				className={classNames['overlay']}
				style={{
					zIndex: zIndex,
				}}
			/>
		);
		//</editor-fold>
	};

	renderClose = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderClose">
		const { showCloseControl } = this.props;

		if (!showCloseControl) {
			return null;
		}

		return (
			<div
				title="Close"
				className={classNames['close']}
				onClick={this.onCloseClick}>
				×
			</div>
		);
		//</editor-fold>
	};

	renderPopup = (zIndex, classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderPopup">
		const {
			verticalAlign,
			contentWrapStyle,
			renderPopup,
			openAnimation,
			closeAnimation,
			inner,
			children,
			level,
		} = this.props;

		const { showCloseAnimation } = this.state;

		const closeButton = this.renderClose(classNames);

		if (isFunction(renderPopup)) {
			return renderPopup({
				zIndex,
				classNames,
				verticalAlign,
				contentWrapStyle,
				children,
				closeButton,
				onOverlayClick: this.onOverlayClick,
				onAnimationEnd: this.onAnimationEnd,
				openAnimation,
				closeAnimation,
				inner,
				Popup: this,
			});
		}

		const contentWrapclassName = _g.classNames(classNames['content-wrap'], {
			[openAnimation]: !_g.isEmpty(openAnimation) && !showCloseAnimation,
			[closeAnimation]: !_g.isEmpty(closeAnimation) && showCloseAnimation,
		});

		return (
			<div
				className={classNames['wrapper']}
				style={{ zIndex: zIndex }}
				onClick={this.onOverlayClick}>
				<div data-name={`popup-${level}`} className={classNames['container']}>
					<div
						className={classNames['content-holder']}
						style={{ verticalAlign: verticalAlign }}>
						<div
							className={contentWrapclassName}
							style={contentWrapStyle}
							onAnimationEnd={this.onAnimationEnd}>
							{closeButton}
							{children}
						</div>
					</div>
					{inner}
				</div>
			</div>
		);
		//</editor-fold>
	};

	render() {
		const { hide } = this.state;

		if (hide) {
			return null;
		}

		const { level } = this.props;
		let zIndex = 1000 + 100 * level;
		const classNames = _g.getClassNames(styles, this.props.classNames);

		return (
			<div>
				{this.renderOverlay(++zIndex, classNames)}
				{this.renderPopup(++zIndex, classNames)}
			</div>
		);
	}
}

Popup.propTypes = propTypes;

Popup.defaultProps = defaultProps;

export default WithPopupContainerContext(Popup);
