import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import styles from './LangsDropdown.module.less';
import Dropdown from './dropdown';
import { get, toUpper } from 'lodash-es';
import Link from 'core/navigation/link';
import getMainUrl from 'helpers/getMainUrl';

const propTypes = {};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		currentLang: 'currentLang',
	};
};

class LangsDropdown extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { currentLang } = this.props;

		let currentPanth = get(navigation.get(), 'path', '');
		currentPanth = currentPanth.split('/');

		currentPanth.shift();
		currentPanth.shift();
		currentPanth = currentPanth.join('/');

		return (
			<div className={styles.wrapper}>
				<Dropdown
					trigger={
						<div className={styles.outer}>
							{toUpper(currentLang)}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none">
								<path
									d="M16.293 8.05029L12 12.3433L7.70697 8.05029L6.29297 9.46429L12 15.1713L17.707 9.46429L16.293 8.05029Z"
									fill="white"
								/>
							</svg>
						</div>
					}
					content={
						<div className={styles.content_wrapper}>
							<Link
								to={getMainUrl() + '/lv/' + currentPanth}
								className={styles.lang}>
								LV
							</Link>
							<Link
								to={getMainUrl() + '/en/' + currentPanth}
								className={styles.lang}>
								EN
							</Link>
							<Link
								to={getMainUrl() + '/ru/' + currentPanth}
								className={styles.lang}>
								RU
							</Link>
						</div>
					}
				/>
			</div>
		);
	}
}

LangsDropdown.propTypes = propTypes;

LangsDropdown.defaultProps = defaultProps;

export default WithUi(uiProps)(LangsDropdown);
