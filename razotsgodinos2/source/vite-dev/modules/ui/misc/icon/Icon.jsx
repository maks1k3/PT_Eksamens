import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Icon.module.less';
import { isFunction, isUndefined } from 'lodash-es';

const propTypes = {
	provider: PropTypes.oneOf([
		'mdi',
		'ion',
		'icomoon',
		'glyphicon',
		'foundation',
		'fa',
	]).isRequired,
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.object,
	title: PropTypes.string,
};

const defaultProps = {};

class Icon extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { provider, name, className, onClick, style, title } = this.props;

		const extra = {};

		if (isFunction(onClick)) {
			extra.onClick = onClick;
		}

		if (!isUndefined(title) && title.length > 0) {
			extra.title = title;
		}

		const _className = _g.classNames(
			`${provider} ${provider}-${name}`,
			{ [styles['clickable']]: isFunction(onClick) },
			{ [className]: !isUndefined(className) },
		);

		return <i className={_className} style={style} {...extra} />;
	}
}

Icon.propTypes = propTypes;

Icon.defaultProps = defaultProps;

export default Icon;
