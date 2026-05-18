import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Status.less';

const propTypes = {
	title: PropTypes.string.isRequired,
	backgroundColor: PropTypes.string.isRequired,
};

const defaultProps = {};

class Status extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { title, backgroundColor } = this.props;

		return (
			<div
				className={styles['wrapper']}
				style={{ backgroundColor: backgroundColor }}>
				{title}
			</div>
		);
	}
}

Status.propTypes = propTypes;

Status.defaultProps = defaultProps;

export default Status;
