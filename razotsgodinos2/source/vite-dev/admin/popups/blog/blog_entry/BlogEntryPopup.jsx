import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AdministrationPopup from 'popups/components/administration';

import Tabs from 'ui/controls/tabs';
import Edit from './components/edit';
import Media from './components/media';
import Delete from './components/delete';
import { get, has } from 'lodash-es';

const containerName = 'BlogEntryAdministration';
const popupName = 'blog_entry';
const tableName = 'dt_blog_entries';
const url = 'administration/blog/actions';
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

class BlogEntryPopup extends Component {
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
		return `Bloga ieraksts #${id}`;
		//</editor-fold>
	};

	getImage = (data) => {
		//<editor-fold defaultstate="collapsed" desc="getImage">
		const thumbnail = get(data, 'image.thumbnail', '');
		const image = get(data, 'image.image', '');

		return { thumbnail, image };
		//</editor-fold>
	};

	getRows = (data) => {
		//<editor-fold defaultstate="collapsed" desc="getRows">
		const rows = [];

		const title = get(data, 'translations.lv.title', '');

		rows.push('ID: ' + get(data, 'item.id', ''));

		if (!_g.isEmpty(title)) {
			rows.push('Nosaukums: ' + title);
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
			name: 'edit',
			title: 'Rediģēt',
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

BlogEntryPopup.propTypes = propTypes;

BlogEntryPopup.defaultProps = defaultProps;

export default BlogEntryPopup;
