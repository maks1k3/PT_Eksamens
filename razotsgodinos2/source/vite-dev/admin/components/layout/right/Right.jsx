import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Menu from 'cms/administration_header/components/menu';

import styles from './Right.module.less';

const propTypes = {};

const defaultProps = {};

class Right extends Component {
	constructor(props) {
		super(props);
	}

	getMenu = () => {
		//<editor-fold defaultstate="collapsed" desc="getMenu">
		return [
			{
				title: 'Mājas',
				icon: {
					provider: 'icomoon',
					name: 'home',
				},
				url: _g.getMainUrl(),
				mode: 'navigation',
			},
			{
				type: 'divider',
			},
			{
				title: 'Mainīt paroli',
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
				title: 'Izlogoties',
				icon: {
					provider: 'icomoon',
					name: 'switch2',
				},
				url: _g.getMainUrl() + 'logout',
				mode: 'navigation',
			},
		];
		//</editor-fold>
	};

	render() {
		return (
			<div className={styles['wrapper']}>
				<Menu items={this.getMenu()} />
			</div>
		);
	}
}

Right.propTypes = propTypes;

Right.defaultProps = defaultProps;

export default Right;
