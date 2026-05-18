import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithBrowserDevice from 'hoc/browser/with_browser_device';

import SimpleDrawer from 'ui/controls/drawer/SimpleDrawer';
import MobileSideBar from 'ui/controls/drawer';
import NavBar from './components/navbar';
import SideBar from './components/sidebar';

import styles from './AdministrationLayout.module.less';
import { isUndefined } from 'lodash-es';

const propTypes = {
	homePageLink: PropTypes.string,
	homePageLinkMode: PropTypes.oneOf(['history', 'navigation', 'auto']),
	backgroundColor: PropTypes.string,
	title: PropTypes.string,
	logo: PropTypes.string,
	drawerType: PropTypes.oneOf(['touch', 'simple']),
	Sidebar: PropTypes.any.isRequired,
	Content: PropTypes.any.isRequired,
	Right: PropTypes.func,

	//from hoc
	browserDevice: PropTypes.string,
};

const defaultProps = {
	homePageLink: '#',
	homePageLinkMode: 'auto',
	backgroundColor: '#37474F',
	title: 'Administration',
	drawerType: 'touch',
};

class AdministrationLayout extends Component {
	constructor(props) {
		super(props);
	}

	renderNavBar = () => {
		//<editor-fold defaultstate="collapsed" desc="renderNavBar">
		const { homePageLink, homePageLinkMode, backgroundColor, title, logo } =
			this.props;

		return (
			<NavBar
				homePageLink={homePageLink}
				homePageLinkMode={homePageLinkMode}
				backgroundColor={backgroundColor}
				title={title}
				logo={logo}
				right={this.renderRight()}
			/>
		);
		//</editor-fold>
	};

	renderSidebar = () => {
		//<editor-fold defaultstate="collapsed" desc="renderSidebar">
		const { Sidebar } = this.props;

		return <Sidebar />;
		//</editor-fold>
	};

	renderRight = () => {
		//<editor-fold defaultstate="collapsed" desc="renderRight">
		const { Right } = this.props;

		if (isUndefined(Right)) {
			return null;
		}

		return <Right />;
		//</editor-fold>
	};

	renderContent = () => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { Content } = this.props;

		return <Content />;
		//</editor-fold>
	};

	renderDesktop = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDesktop">

		return (
			<Fragment>
				{this.renderNavBar()}
				<div className={styles['wrapper']}>
					<div className={styles['inner']}>
						<div className={styles['sidebar']}>
							<SideBar>{this.renderSidebar()}</SideBar>
						</div>
						<div className={styles['content']}>{this.renderContent()}</div>
					</div>
				</div>
			</Fragment>
		);
		//</editor-fold>
	};

	renderMobile = () => {
		//<editor-fold defaultstate="collapsed" desc="renderMobile">
		const { drawerType } = this.props;

		const sidebar = this.renderSidebar();

		if (drawerType === 'touch') {
			const content = (
				<Fragment>
					{this.renderNavBar()}
					<div className={styles['content']}>{this.renderContent()}</div>
				</Fragment>
			);

			return (
				<MobileSideBar
					sidebar={<div className={styles['touch-sidebar']}>{sidebar}</div>}
					content={content}
				/>
			);
		} else {
			const content = (
				<div className={styles['content']}>{this.renderContent()}</div>
			);

			return (
				<Fragment>
					{this.renderNavBar()}
					<SimpleDrawer content={sidebar} />
					{content}
				</Fragment>
			);
		}
		//</editor-fold>
	};

	render() {
		const { browserDevice } = this.props;

		if (browserDevice === 'desktop') {
			return this.renderDesktop();
		} else {
			return this.renderMobile();
		}
	}
}

AdministrationLayout.propTypes = propTypes;

AdministrationLayout.defaultProps = defaultProps;

AdministrationLayout = WithBrowserDevice(AdministrationLayout);

export default AdministrationLayout;
