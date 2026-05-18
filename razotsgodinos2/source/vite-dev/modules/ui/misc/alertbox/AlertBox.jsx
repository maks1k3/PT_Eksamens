import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Icon from 'ui/misc/icon';

import styles from './AlertBox.module.less';
import { isFunction, isUndefined } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	theme: PropTypes.oneOf([
		'main',
		'primary',
		'success',
		'info',
		'warning',
		'danger',
		'custom',
	]),
	content: PropTypes.node.isRequired,
	icon: PropTypes.shape({
		provider: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}),
	showClose: PropTypes.bool,
	onClose: PropTypes.func,
};

const defaultProps = {
	classNames: {},
	theme: 'danger',
	showClose: true,
};

class AlertBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
		};
	}

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		const { onClose } = this.props;

		if (isFunction(onClose)) {
			onClose({ AlertBox: this });
			return;
		}

		this.setState({
			show: false,
		});

		//</editor-fold>
	};

	renderIcon = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderIcon">
		const { icon, theme } = this.props;

		let provider = 'icomoon';
		let name = 'menu6';
		if (!isUndefined(icon)) {
			provider = icon.provider;
			name = icon.name;
		} else if (theme === 'danger') {
			provider = 'icomoon';
			name = 'warning2';
		} else if (theme === 'success') {
			provider = 'icomoon';
			name = 'checkmark3';
		} else if (theme === 'info') {
			provider = 'icomoon';
			name = 'info3';
		}

		return (
			<div className={classNames['icon-wrapper']}>
				{/* <Icon provider={provider} name={name} className={classNames['icon']} /> */}
			</div>
		);
		//</editor-fold>
	};

	renderContent = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { content } = this.props;
		return <div className={classNames['content-wrapper']}>{content}</div>;
		//</editor-fold>
	};

	renderClose = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		const { showClose } = this.props;

		if (!showClose) {
			return null;
		}

		return (
			<div className={classNames['close-wrapper']} onClick={this.onClose}>
				<span className={classNames['close-icon']}>×</span>
			</div>
		);

		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { show } = this.state;

		if (!show) {
			return null;
		}

		const { theme } = this.props;

		const className = _g.classNames(
			classNames['wrapper'],
			classNames[`wrapper_${theme}`],
		);

		return (
			<div className={className}>
				{this.renderIcon(classNames)}
				{this.renderContent(classNames)}
				{this.renderClose(classNames)}
			</div>
		);
	}
}

AlertBox.propTypes = propTypes;

AlertBox.defaultProps = defaultProps;

export default AlertBox;
