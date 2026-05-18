import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Tabs from 'ui/controls/tabs';
import View from './components/view';
import Edit from './components/edit';
import Delete from './components/delete';
import Loading from 'ui/misc/loading';
import AdministrationPopupHeader from './components/header';

const propTypes = {
	id: PropTypes.any.isRequired,
	tab: PropTypes.string,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	showEdit: PropTypes.bool,
	showDelete: PropTypes.bool,
	showView: PropTypes.bool,
	renderView: PropTypes.func,
	editFormProps: PropTypes.object,
	renderEditForm: PropTypes.func,
	renderDelete: PropTypes.func,
	renderTabs: PropTypes.func,
	closePopup: PropTypes.func,
	uiTranslations: PropTypes.object,
	deleteFormProps: PropTypes.object,

	//from ui
	loading: PropTypes.bool,
	data: PropTypes.object,
};

const defaultProps = {
	//from ui
	loading: true,
	data: {},
};

const uiProps = ownProps => {
	return {
		[ownProps.containerName]: {
			loading: 'loading',
			data: 'data',
		},
	};
};

class AdministrationPopup extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { containerName } = this.props;
		uiStore.set(`${containerName}.mounted`, true);

		this.getData();
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		const { containerName } = this.props;
		uiStore.remove(containerName);
		//</editor-fold>
	}

	/* ========================================================================*
   *
   *                     Methods
   *
   * ========================================================================*/

	getData = () => {
		//<editor-fold defaultstate="collapsed" desc="getData">
		const { containerName, action, id } = this.props;
		uiStore.set(`${containerName}.loading`, true);

		remoteRequest({
			url: action,
			data: { id, action: 'get' },
			onSuccess: response => {
				if (!uiStore.get(`${containerName}.mounted`, false)) {
					return;
				}

				uiStore.update(containerName, {
					loading: false,
					data: response,
				});
			},
			onError: response => {
				if (!uiStore.get(`${containerName}.mounted`, false)) {
					return;
				}
				showAlert({ content: response.msg });
			},
		});
		//</editor-fold>
	};

	onRefreshClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onRefreshClick">
		this.getData();
		//</editor-fold>
	};

	/* ========================================================================*
   *
   *                     Renderers
   *
   * ========================================================================*/

	renderHeader = () => {
		//<editor-fold defaultstate="collapsed" desc="renderHeader">
		const { loading } = this.props;

		if (loading) {
			return null;
		}

		return (
			<AdministrationPopupHeader
				showRefresh={true}
				onRefreshClick={this.onRefreshClick}
			/>
		);
		//</editor-fold>
	};

	renderContent = () => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const {
			id,
			tab,
			showView,
			showEdit,
			showDelete,
			containerName,
			renderView,
			action,
			tableName,
			editFormProps,
			renderEditForm,
			closePopup,
			uiTranslations,
			deleteFormProps,
		} = this.props;

		const items = [];

		const itemData = {
			id: id,
			action: action,
			containerName: containerName,
			tableName: tableName,
		};

		if (showView) {
			items.push({
				name: 'view',
				title: _.get(uiTranslations, 'view', 'View'),
				icon: {
					provider: 'icomoon',
					name: 'file-text',
				},
				content: <View {...itemData} renderView={renderView} />,
			});
		}

		if (showEdit) {
			items.push({
				name: 'edit',
				title: _.get(uiTranslations, 'edit', 'Edit'),
				icon: {
					provider: 'icomoon',
					name: 'pencil',
				},
				content: (
					<Edit
						{...itemData}
						renderEditForm={renderEditForm}
						editFormProps={editFormProps}
						uiTranslations={uiTranslations}
					/>
				),
			});
		}

		if (showDelete) {
			items.push({
				name: 'delete',
				title: _.get(uiTranslations, 'delete', 'Delete'),
				icon: {
					provider: 'icomoon',
					name: 'trash',
				},
				content: (
					<Delete
						{...itemData}
						closePopup={closePopup}
						deleteFormProps={deleteFormProps}
					/>
				),
			});
		}

		let extra = {};

		if (!_g.isEmpty(tab)) {
			extra.current = tab;
		}

		return <Tabs items={items} lazyLoad={true} {...extra} />;
		//</editor-fold>
	};

	render() {
		const { loading } = this.props;

		if (loading) {
			return <Loading />;
		}

		return (
			<Fragment>
				{this.renderHeader()}
				{this.renderContent()}
			</Fragment>
		);
	}
}

AdministrationPopup.propTypes = propTypes;

AdministrationPopup.defaultProps = defaultProps;

AdministrationPopup = WithUi(uiProps)(AdministrationPopup);

export default AdministrationPopup;
