import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import InfoTable from 'ui/tables/info_table';
import Tabs from 'ui/controls/tabs';
import { forEach, capitalize } from 'lodash-es';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	//from ui
	user: PropTypes.object,
	profile: PropTypes.object,
	providers: PropTypes.any,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		[ownProps.containerName]: {
			data: {
				user: 'user',
				profile: 'profile',
				providers: 'providers',
			},
		},
	};
};

class View extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { user, profile, providers } = this.props;

		const items = [];

		items.push({
			name: 'user',
			title: 'User',
			content: <InfoTable rows={user} />,
		});

		items.push({
			name: 'profile',
			title: 'Profile',
			content: <InfoTable rows={profile} />,
		});

		forEach(providers, (provider) => {
			const { provider: title } = provider;

			items.push({
				name: title,
				title: capitalize(title),
				content: <InfoTable rows={provider} />,
			});
		});

		return <Tabs items={items} lazyLoad={true} />;
	}
}

View.propTypes = propTypes;

View.defaultProps = defaultProps;

View = WithUi(uiProps)(View);

export default View;
