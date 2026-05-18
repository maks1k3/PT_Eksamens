import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import AdministrationHeaderUi from 'cms/administration_header';

const propTypes = {
	//from ui
	user: PropTypes.any,
};

const defaultProps = {
	//from ui
	user: 'user',
};

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
				title: 'Administration',
				icon: _g.getMainUrl() + 'assets/icons/admin.svg',
				url: _g.getMainUrl() + 'administration',
				mode: 'navigation',
			},
			{
				type: 'divider',
			},
			{
				title: 'Change password',
				icon: _g.getMainUrl() + 'assets/icons/key.svg',
				onClick: () => {
					openPopup({
						name: 'cms_change_password',
						data: {},
					});
				},
			},
			{
				title: 'Logout',
				icon: _g.getMainUrl() + 'assets/icons/switch2.svg',
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

		return <AdministrationHeaderUi menu={this.getMenu()} />;
	}
}

AdministrationHeader.propTypes = propTypes;

AdministrationHeader.defaultProps = defaultProps;

export default WithUi(uiProps)(AdministrationHeader);
