import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './BooleanStatus.module.less';

const propTypes = {
	title: PropTypes.string.isRequired,
	isTrue: PropTypes.bool,
};

const defaultProps = {
	isTrue: false,
};

class BooleanStatus extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { title, isTrue } = this.props;

		const className = _g.classNames(
			styles['wrapper'],
			{ [styles['wrapper_true']]: isTrue },
			{ [styles['wrapper_false']]: !isTrue },
		);

		return <div className={className}>{title}</div>;
	}
}

BooleanStatus.propTypes = propTypes;

BooleanStatus.defaultProps = defaultProps;

export default BooleanStatus;
