import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import styles from './Footer.module.less';
import Container from 'main/components/ui/container/Container';
import Logo from './components/logo/Logo';
import NavItems from './components/nav_items/NavItems';
import Info from './components/info/Info';
import Bottom from './components/liaa/Bottom';
import Phone from './components/phone/Phone';

const propTypes = {};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {};
};

class Footer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container
				top={80}
				bottom={64}
				mtop={64}
				mbottom={32}
				background={'#EEEEED'}
				classNames={{
					container: styles.footerContainer,
					wrapper: styles.footerWrapper,
				}}>
				<div className={styles.wrapper}>
					<div className={styles.top_wrapper}>
						<Logo />
						<NavItems />
						<Phone />
					</div>
					<Info />
					<Bottom />
				</div>
			</Container>
		);
	}
}

Footer.propTypes = propTypes;

Footer.defaultProps = defaultProps;

export default WithUi(uiProps)(Footer);
