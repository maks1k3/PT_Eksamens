import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AdministrationPopup from 'popups/components/administration';
import Tabs from 'ui/controls/tabs';

import Edit from './components/edit';
import Delete from './components/delete';
import Media from './components/media';
import { get, has } from 'lodash-es';

const containerName = 'BlogItemsAdministration';
const popupName = 'blog_items';
const tableName = 'dt_blog_items';
const url = 'administration/blog/items/actions';
const tabsUrlKey = 'tab';

const doNotHideOnOverlayClickTabs = ['edit'];

export const settings = {
	name: popupName,
	inUrl: true,
	level: 1,
	extraUrlKeys: [tabsUrlKey],
	verticalAlign: 'top',
	//hideOnOverlayClick: false,
	contentWrapStyle: {
		maxWidth: '800px',
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

class ItemsPopup extends Component {
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

	getTitle = (data) => {
		//<editor-fold defaultstate="collapsed" desc="getTitle">
		const id = get(data, 'item.id', '');
		return `Bloga apakšvienums #${id}`;
		//</editor-fold>
	};

	getRows = (data) => {
		//<editor-fold defaultstate="collapsed" desc="getRows">
		const rows = [];

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

	renderPopup = (content) => {
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
			name: 'item_edit',
			title: 'Rediģēt',
			icon: {
				provider: 'icomoon',
				name: 'pencil',
			},
			content: <Edit {...itemData} />,
		});

		items.push({
			name: 'item_media',
			title: 'Media',
			icon: {
				provider: 'icomoon',
				name: 'pencil',
			},
			content: <Media {...itemData} />,
		});

		items.push({
			name: 'item_delete',
			title: 'Dzēst',
			icon: {
				provider: 'icomoon',
				name: 'trash',
			},
			content: <Delete {...itemData} />,
		});

		let extra = {};

		if (has(this.props.data, 'tab')) {
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

ItemsPopup.propTypes = propTypes;

ItemsPopup.defaultProps = defaultProps;

export default ItemsPopup;
