import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.less';
import WithBrowserWidth from 'hoc/browser/with_browser_width';

import WithUi from 'hoc/store/ui';
import menuHide from 'main/components/utils/menuHide';
import Logo from './components/logo/Logo';
import Menu from './components/menu/Menu';
import MobileMenu from './components/mobile_menu/MobileMenu';
import Link from 'core/navigation/link';
import Phone from './components/phone/Phone';

const propTypes = {
	//from hoc
	browserWidth: PropTypes.number,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {};
};

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAtTop: true,
		};
	}

	componentDidMount() {
		menuHide();

		window.addEventListener('scroll', this.handleScroll);
		this.handleScroll();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const isAtTop = scrollTop === 0;
		if (this.state.isAtTop !== isAtTop) {
			this.setState({ isAtTop });
		}
	};

	render() {
		const { browserWidth } = this.props;
		const { isAtTop } = this.state;

		const pathname = window.location.pathname;
		const isHomePage =
			pathname === '/' || pathname === '/lv' || pathname === '/lv/';

		return (
			<header className={`${styles.wrapper} ${isHomePage ? styles.home : ''}`}>
				<div
					className={`${styles.inner_wrapper} 
          ${isHomePage && isAtTop ? styles.transparent : ''} 
          ${isHomePage && !isAtTop ? styles.solid : ''}`}
					id="header">
					<div className={styles.container}>
						<Logo />
						{browserWidth >= 1050 ? <Menu /> : <MobileMenu />}
						{browserWidth >= 1050 && <Phone />}
					</div>
				</div>
			</header>
		);
	}
}

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

Header = WithBrowserWidth(Header);

export default WithUi(uiProps)(Header);
