import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import styles from './MobileDropdown.module.less';
import Link from 'core/navigation/link';
import navItems from '../../../../../footer/navItems';
import Logo from '../../../logo/Logo'; // <-- путь проверь (от MobileDropdown до Logo)
import Phone from '../../../phone/Phone';

const propTypes = {
	open: PropTypes.bool,
	toogleDropdown: PropTypes.func,
};

class MobileDropdown extends Component {
	close = () => {
		const { toogleDropdown } = this.props;
		if (toogleDropdown) toogleDropdown();
	};

	render() {
		const { open } = this.props;

		return (
			<div className={`${styles.wrapper} ${open ? styles.open : ''}`}>
				<div className={styles.container}>
					<div className={styles.top}>
						<Logo />
						<button
							className={styles.close}
							onClick={this.close}
							aria-label="Close menu">
							×
						</button>
					</div>

					<div className={styles.center}>
						{navItems.map((item, index) => (
							<Link
								to={item.link}
								key={index}
								className={styles.link}
								onClickCallback={this.close}
								aria-label={item.ariaLabel || item.fallback}>
								{item.Icon ? <item.Icon /> : item.fallback}
							</Link>
						))}
					</div>

					<div className={styles.bottom}>
						<Phone />
					</div>
				</div>
			</div>
		);
	}
}

MobileDropdown.propTypes = propTypes;
export default WithUi(() => ({}))(MobileDropdown);
