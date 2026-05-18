import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import styles from './MobileMenu.module.less';
import MobileDropdown from './components/mobile_dropdown/MobileDropdown';

const propTypes = {};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {};
};

class MobileMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}

	componentWillUnmount() {
		document.body.classList.remove('menu-open');
	}

	toogleDropdown = () => {
		this.setState(
			(prev) => ({ open: !prev.open }),
			() => {
				if (this.state.open) {
					document.documentElement.classList.add('menu-open'); // html
					document.body.classList.add('menu-open');
				} else {
					document.documentElement.classList.remove('menu-open');
					document.body.classList.remove('menu-open');
				}
			},
		);
	};

	render() {
		const { open } = this.state;

		return (
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<div
						className={`${styles.icon} ${open ? styles.open : ''}`}
						onClick={this.toogleDropdown}>
						<span />
						<span />
						<span />
						<span />
					</div>

					<MobileDropdown open={open} toogleDropdown={this.toogleDropdown} />
				</div>
			</div>
		);
	}
}

MobileMenu.propTypes = propTypes;
MobileMenu.defaultProps = defaultProps;

export default WithUi(uiProps)(MobileMenu);
