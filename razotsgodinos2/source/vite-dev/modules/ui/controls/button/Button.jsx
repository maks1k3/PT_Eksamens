import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Icon from 'ui/misc/icon';
import PulseLoader from 'ui/animation/horizontal_bars/pulse_loader';

import loaderStyles from './loader.module.less';
import styles from './Button.module.less';
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
	fullWidth: PropTypes.bool,
	title: PropTypes.string,
	customTitle: PropTypes.node, //another react component
	icon: PropTypes.PropTypes.shape({
		provider: PropTypes.string,
		name: PropTypes.string,
	}),
	style: PropTypes.object,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	loading: PropTypes.bool, //shows loading animation and is always disabled
	onClick: PropTypes.func,

	renderLoader: PropTypes.func,
	renderTitle: PropTypes.func,
};

const defaultProps = {
	classNames: {},
	theme: 'main',
	type: 'button',
	disabled: false,
	loading: false,
	fullWidth: false,
};

class Button extends Component {
	constructor(props) {
		super(props);
	}

	onClick = (event) => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		const { onClick, disabled, loading } = this.props;

		if (disabled || loading) {
			return;
		}

		if (isFunction(onClick)) {
			onClick({ event, Button: this });
		}

		//</editor-fold>
	};

	renderIcon = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderIcon">
		const { icon } = this.props;

		if (isUndefined(icon)) {
			return;
		}

		const { provider, name } = icon;

		return (
			<Icon className={classNames['icon']} provider={provider} name={name} />
		);
		//</editor-fold>
	};

	renderTitle = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderTitle">
		const { title, customTitle, renderTitle } = this.props;

		if (isUndefined(title) && isUndefined(customTitle)) {
			return null;
		}

		if (isFunction(renderTitle)) {
			return renderTitle({
				classNames,
				title,
				customTitle,
				Button: this,
			});
		}

		if (!isUndefined(customTitle)) {
			return <span className={classNames['title']}>{customTitle}</span>;
		} else {
			return <span className={classNames['title']}>{title}</span>;
		}

		//</editor-fold>
	};

	renderLoader = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderLoader">
		const { renderLoader, loading } = this.props;

		if (!loading) {
			return null;
		}

		if (isFunction(renderLoader)) {
			return renderLoader({ Button: this });
		}

		return (
			<div className={classNames['loader-wrapper']}>
				<PulseLoader classNames={loaderStyles} center={false} />
			</div>
		);

		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const { style, type, disabled, loading, theme, fullWidth } = this.props;

		const className = _g.classNames(
			classNames['wrapper'],
			classNames[`wrapper_${theme}`],
			{ [classNames['wrapper_full-width']]: fullWidth },
			{ [classNames['wrapper_loading']]: loading },
			{ [classNames['wrapper_disabled']]: disabled },
		);

		const _disabled = disabled || loading;

		return (
			<button
				className={className}
				onClick={this.onClick}
				disabled={_disabled}
				style={style}
				type={type}>
				{this.renderIcon(classNames)}
				{this.renderTitle(classNames)}
				{this.renderLoader(classNames)}
			</button>
		);
	}
}

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
