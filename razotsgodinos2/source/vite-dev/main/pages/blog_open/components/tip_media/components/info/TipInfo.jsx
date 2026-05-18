import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import styles from './TipInfo.module.less';

class TipInfo extends Component {
	render() {
		const { blog } = this.props;

		const infoHtml =
			blog?.lang_data?.info || blog?.translations?.lv?.data?.info || '';

		if (!infoHtml) return null;

		return (
			<div className={styles.wrapper}>
				<div
					className={styles.content}
					dangerouslySetInnerHTML={{ __html: infoHtml }}
				/>
			</div>
		);
	}
}

TipInfo.propTypes = {
	blog: PropTypes.any,
};

TipInfo.defaultProps = {
	blog: null,
};

export default TipInfo;
