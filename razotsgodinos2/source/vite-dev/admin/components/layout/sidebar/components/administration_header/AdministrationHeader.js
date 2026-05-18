import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import AdministrationHeaderUi from 'cms/administration_header';

import styles from './AdministrationHeader.less';

const propTypes = {
	//from ui
	user: PropTypes.any,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		user: 'user',
	};
};

class AdministrationHeader extends Component {
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
		const { user } = this.props;

		if (_g.isEmpty(user) || !user.isAdmin) {
			return null;
		}

		return (
			<div className={styles['wrapper']}>
				<AdministrationHeaderUi menu={this.getMenu()} />
			</div>
		);
	}
}

AdministrationHeader.propTypes = propTypes;

AdministrationHeader.defaultProps = defaultProps;

export default WithUi(uiProps)(AdministrationHeader);
