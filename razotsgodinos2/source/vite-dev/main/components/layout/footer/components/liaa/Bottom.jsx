import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import styles from './Bottom.module.less';
import Mark from './components/Mark';
import Link from 'core/navigation/link';
import getMainUrl from 'helpers/getMainUrl';
import PrivacyPolicy from 'main/info_pages/privacy_policy/PrivacyPolicy';

const propTypes = {};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {};
};

class Bottom extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.wrapper}>
				{/* <PrivacyPolicy /> */}
				<div className={styles.left}>
					<div className={styles.privacy}>
						<Link
							to={getMainUrl(true) + 'privatumu-politika'}
							className={styles.privacyLink}>
							{_g.lang('footer_privacy_policy')}
						</Link>
					</div>
					<div className={styles.disclaimer}>{_g.lang('disclaimer')}</div>
				</div>
				<div className={styles.liaa}>
					<Mark />
					<span className={styles.liaa_text}>{_g.lang('liaa')}</span>
				</div>
			</div>
		);
	}
}

Bottom.propTypes = propTypes;

Bottom.defaultProps = defaultProps;

export default WithUi(uiProps)(Bottom);
