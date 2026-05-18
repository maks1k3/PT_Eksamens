import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import styles from './LoadingPlaceholder.module.less';

const propTypes = {};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {};
};

class LoadingPlaceholder extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.wrapper}>
				<div className={styles.image_wrapper}>
					<div className={styles.image} />
				</div>
			</div>
		);
	}
}

LoadingPlaceholder.propTypes = propTypes;

LoadingPlaceholder.defaultProps = defaultProps;

export default WithUi(uiProps)(LoadingPlaceholder);
