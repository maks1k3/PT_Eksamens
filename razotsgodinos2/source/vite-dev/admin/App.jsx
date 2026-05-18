import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Sidebar from 'admin/components/layout/sidebar';
import Content from 'admin/components/content';
import Right from 'admin/components/layout/right';

import AdministrationLayout from 'ui/layout/administration';

const propTypes = {};

const defaultProps = {};

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<AdministrationLayout
				homePageLink="/administration"
				homePageLinkMode="auto"
				backgroundColor="#FF5722"
				title="Administrācija"
				//logo=""
				drawerType="touch"
				Sidebar={Sidebar}
				Content={Content}
				Right={Right}
			/>
		);
	}
}

App.propTypes = propTypes;

App.defaultProps = defaultProps;

export default App;

