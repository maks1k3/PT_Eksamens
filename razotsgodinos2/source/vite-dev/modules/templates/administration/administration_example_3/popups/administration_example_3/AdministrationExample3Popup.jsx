import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AdministrationPopup from 'popups/components/administration';

import Tabs from 'ui/controls/tabs';
import View from './components/view';
import Edit from './components/edit';
import Media from './components/media';
import Delete from './components/delete';

const containerName = 'AdministrationExample3';
const popupName = 'administration_example_3';
const tableName = 'dt_administration_example_3';
const url = 'administration_example/administration_example_3/actions';
const tabsUrlKey = 'tab';

const doNotHideOnOverlayClickTabs = ['edit', 'media'];

export const settings = {
	name: popupName,
	inUrl: true,
	level: 0,
	extraUrlKeys: [tabsUrlKey],
	verticalAlign: 'top',
	//hideOnOverlayClick: false,
	contentWrapStyle: {
		maxWidth: '1024px',
	},
	showCloseControl: false,
	onClose: onClose,
	closeOnEsc: true,
};

function onClose() {
	return true;
}

const propTypes = {
	data: PropTypes.object.isRequired,
};

const defaultProps = {};

class AdministrationExample3Popup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hideOnOverlayClick: false,
		};
	}

	/* ========================================================================*
*
*                     Methods
*
* ========================================================================*/

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		closePopup({ name: settings.name });
		//</editor-fold>
	};

	getTitle = data => {
		//<editor-fold defaultstate="collapsed" desc="getTitle">
		const id = _.get(data, 'item.id', '');
		return `Item #${id}`;
		//</editor-fold>
	};

	getImage = data => {
		//<editor-fold defaultstate="collapsed" desc="getImage">
		const thumbnail = _.get(data, 'image.thumbnail', '');
		const image = _.get(data, 'image.image', '');

		return { thumbnail, image };
		//</editor-fold>
	};

	getRows = data => {
		//<editor-fold defaultstate="collapsed" desc="getRows">
		const rows = [];

		const title = _.get(data, 'item.translations.en', '');
		const price = _.get(data, 'item.price', '');
		const address = _.get(data, 'item.address', '');

		rows.push('ID: ' + _.get(data, 'item.id', ''));

		if (!_g.isEmpty(title)) {
			rows.push('Title: ' + title);
		}

		if (!_g.isEmpty(price)) {
			rows.push('Price: ' + price);
		}

		if (!_g.isEmpty(address)) {
			rows.push('Address: ' + address);
		}

		return rows;
		//</editor-fold>
	};

	onTabChange = ({ current }) => {
		//<editor-fold defaultstate="collapsed" desc="onTabChange">
		let hideOnOverlayClick = true;
		if (_g.inArray(current, doNotHideOnOverlayClickTabs)) {
			hideOnOverlayClick = false;
		}

		if (hideOnOverlayClick !== this.state.hideOnOverlayClick) {
			this.setState({
				hideOnOverlayClick: hideOnOverlayClick,
			});
		}
		//</editor-fold>
	};

	/* ========================================================================*
*
*                     Renderers
*
* ========================================================================*/

	renderPopup = content => {
		//<editor-fold defaultstate="collapsed" desc="renderPopup">
		const { id } = this.props.data;
		const { hideOnOverlayClick } = this.state;

		return (
			<AdministrationPopup
				name={containerName}
				popupName={settings.name}
				url={url}
				extraData={{
					id: id,
					action: 'get',
				}}
				getTitle={this.getTitle}
				getImage={this.getImage}
				getRows={this.getRows}
				level={settings.level}
				verticalAlign={settings.verticalAlign}
				hideOnOverlayClick={hideOnOverlayClick}
				showCloseControl={settings.showCloseControl}
				contentWrapStyle={settings.contentWrapStyle}>
				{content}
			</AdministrationPopup>
		);
		//</editor-fold>
	};

	renderContent = () => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { id } = this.props.data;
		const items = [];

		const itemData = {
			id: id,
			action: url,
			containerName: containerName,
			popupName: popupName,
			tableName: tableName,
		};

		items.push({
			name: 'view',
			title: 'View',
			icon: {
				provider: 'icomoon',
				name: 'file-text',
			},
			content: <View {...itemData} />,
		});

		items.push({
			name: 'edit',
			title: 'Edit',
			icon: {
				provider: 'icomoon',
				name: 'pencil',
			},
			content: <Edit {...itemData} />,
		});

		items.push({
			name: 'media',
			title: 'Media',
			icon: {
				provider: 'icomoon',
				name: 'image2',
			},
			content: <Media {...itemData} />,
		});

		items.push({
			name: 'delete',
			title: 'Delete',
			icon: {
				provider: 'icomoon',
				name: 'trash',
			},
			content: <Delete {...itemData} />,
		});

		let extra = {};

		if (_.has(this.props.data, 'tab')) {
			extra.current = this.props.data.tab;
		}

		return (
			<Tabs
				inUrl={true}
				urlKey={tabsUrlKey}
				items={items}
				lazyLoad={true}
				onTabChange={this.onTabChange}
				{...extra}
			/>
		);
		//</editor-fold>
	};

	render() {
		const content = this.renderContent();

		return this.renderPopup(content);
	}
}

AdministrationExample3Popup.propTypes = propTypes;

AdministrationExample3Popup.defaultProps = defaultProps;

export default AdministrationExample3Popup;
