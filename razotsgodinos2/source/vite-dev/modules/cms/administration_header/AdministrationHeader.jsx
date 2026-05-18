import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Menu from './components/menu';
import Header from 'ui/common/header';

import styles from './AdministrationHeader.module.less';

const propTypes = {
	menu: PropTypes.array,
};

const defaultProps = {
	menu: [
		{
			title: 'Administration',
			icon: {
				provider: 'icomoon',
				name: 'power2',
			},
			url: _g.getMainUrl() + 'administration',
			mode: 'navigation',
		},
		{
			type: 'divider',
		},
		{
			title: 'Change password',
			icon: {
				provider: 'icomoon',
				name: 'key',
			},
			onClick: () => {
				openPopup({
					name: 'cms_change_password',
					data: {},
				});
			},
		},
		{
			title: 'Logout',
			icon: {
				provider: 'icomoon',
				name: 'switch2',
			},
			url: _g.getMainUrl() + 'logout',
			mode: 'navigation',
		},
	],
};

class AdministrationHeader extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { menu } = this.props;
		return (
			<Header
				classNames={styles}
				height={50}
				left={<div className={styles['title']}>Administration</div>}
				right={<Menu items={menu} />}
			/>
		);
	}
}

AdministrationHeader.propTypes = propTypes;

AdministrationHeader.defaultProps = defaultProps;

export default AdministrationHeader;
