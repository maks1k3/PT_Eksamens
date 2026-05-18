import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import Editable from 'cms/editable';

import styles from './NavItems.module.less';
import navItems from 'main/components/layout/footer/navItems';
import Link from 'core/navigation/link';

const propTypes = {
	footerNavMenu: PropTypes.object,
};
const defaultProps = {};
const uiProps = () => ({
	content: {
		nav_menu: { langData: 'footerNavMenu' },
	},
});

class NavItems extends Component {
	render() {
		const { footerNavMenu } = this.props;

		return (
			<Editable edit={{ name: 'nav_menu' }}>
				<div className={styles.nav_items_wrapper}>
					<div className={styles.link_wrapper}>
						{navItems.map((item, index) => {
							const title = footerNavMenu?.[item.field] || item.fallback;

							return (
								<Link to={item.link} key={index} className={styles.nav_item}>
									<span>{title}</span>
								</Link>
							);
						})}
					</div>
				</div>
			</Editable>
		);
	}
}

NavItems.propTypes = propTypes;

export default WithUi(uiProps)(NavItems);
