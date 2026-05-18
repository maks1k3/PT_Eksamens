import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Holder.module.less';

const propTypes = {
	classNames: PropTypes.object,
	children: PropTypes.node,
	hidden: PropTypes.bool,
};

const defaultProps = {
	classNames: {},
	hidden: false,
};

const Holder = ({ classNames: _classNames, children, hidden }) => {
	const classNames = _g.getClassNames(styles, _classNames);

	const className = _g.classNames(classNames['wrapper'], {
		[classNames['hidden']]: hidden,
	});

	return <ul className={className}>{children}</ul>;
};

Holder.propTypes = propTypes;

Holder.defaultProps = defaultProps;

export default Holder;
