import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Card from 'ui/common/card';
import Title from 'ui/common/title';
import Tabs from 'ui/controls/tabs';
import FooterJs from './components/footer_js';
const propTypes = {};

const defaultProps = {};

class SettingsPage extends Component {
	constructor(props) {
		super(props);
	}

	renderContent = () => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const items = [];

		items.push({
			name: 'footer_js',
			title: 'Footer js',
			icon: {
				provider: 'icomoon',
				name: 'file-xml',
			},
			content: <FooterJs />,
		});

		return <Tabs lazyLoad={true} inUrl={true} urlKey="section" items={items} />;
		//</editor-fold>
	};

	render() {
		return (
			<Card>
				<Title>Settings</Title>
				{this.renderContent()}
			</Card>
		);
	}
}

SettingsPage.propTypes = propTypes;

SettingsPage.defaultProps = defaultProps;

export default SettingsPage;
