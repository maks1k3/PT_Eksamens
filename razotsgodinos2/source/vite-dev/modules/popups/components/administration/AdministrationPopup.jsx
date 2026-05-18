import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Popup from 'popups/components/ui/popup';
import Header from 'popups/components/ui/header';
import Content from 'popups/components/ui/content';
import Loading from 'ui/misc/loading';
import AdministrationPopupHeader from './components/header';
import { isFunction } from 'lodash-es';

const propTypes = {
	name: PropTypes.string.isRequired, //unique key for data in redux
	popupName: PropTypes.string.isRequired, //popup name

	url: PropTypes.string.isRequired,
	extraData: PropTypes.object,
	onSuccess: PropTypes.func,
	onError: PropTypes.func,
	onFail: PropTypes.func,
	onClose: PropTypes.func,
	parseResponse: PropTypes.func,

	getTitle: PropTypes.func, //optional
	getImage: PropTypes.func, //optional
	getRows: PropTypes.func, //optional

	showHeader: PropTypes.bool,
	showRefresh: PropTypes.bool,

	PopupProps: PropTypes.object, //other Popup properties
	HeaderProps: PropTypes.object,
	ContentProps: PropTypes.object,
	LoadingProps: PropTypes.object,
	AdministrationPopupHeaderProps: PropTypes.object,

	//PopupProps
	level: PropTypes.number,
	verticalAlign: PropTypes.string,
	hideOnOverlayClick: PropTypes.bool,
	showCloseControl: PropTypes.bool,
	contentWrapStyle: PropTypes.object,

	children: PropTypes.node,

	//from ui
	loading: PropTypes.bool,
	data: PropTypes.object,
};

const defaultProps = {
	extraData: {},

	showHeader: true,
	showRefresh: true,

	level: 0,
	verticalAlign: 'top',
	hideOnOverlayClick: false,
	showCloseControl: false,
	contentWrapStyle: {
		maxWidth: '1024px',
	},

	//from ui
	loading: true,
	data: {},
};

const uiProps = (ownProps) => {
	return {
		[ownProps.name]: {
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
		const { name } = this.props;
		uiStore.set(`${name}.mounted`, true);
		//const { loading } = this.props;

		//if (loading) {
		this.getData();
		//}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		const { name } = this.props;
		uiStore.remove(name);
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	getData = () => {
		//<editor-fold defaultstate="collapsed" desc="getData">
		const { url, extraData, onSuccess, onError, onFail, name } = this.props;
		uiStore.set(`${name}.loading`, true);

		remoteRequest({
			url: url,
			data: extraData,
			onSuccess: (response) => {
				if (!uiStore.get(`${name}.mounted`, false)) {
					return;
				}

				const { parseResponse } = this.props;

				if (isFunction(parseResponse)) {
					response = parseResponse(response);
				}

				uiStore.update(name, {
					loading: false,
					data: response,
				});

				if (isFunction(onSuccess)) {
					onSuccess({ response });
				}
			},
			onError: (response) => {
				if (!uiStore.get(`${name}.mounted`, false)) {
					return;
				}

				if (isFunction(onError)) {
					onError({ response });
				} else {
					showAlert({ content: response.msg });
				}
			},
			onFail: (response) => {
				if (!uiStore.get(`${name}.mounted`, false)) {
					return;
				}

				if (isFunction(onFail)) {
					onFail({ response });
				}
			},
		});
		//</editor-fold>
	};

	onRefreshClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onRefreshClick">
		this.getData();
		//</editor-fold>
	};

	onImageClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onImageClick">
		const { data, getImage } = this.props;

		const { image } = getImage(data);
		openPopup({
			name: 'image',
			data: {
				current: 0,
				items: [
					{
						src: image,
					},
				],
			},
		});
		//</editor-fold>
	};

	onClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onClose">
		const { popupName, onClose } = this.props;

		if (isFunction(onClose)) {
			onClose();
		} else {
			closePopup({ name: popupName });
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderPopupHeader = () => {
		//<editor-fold defaultstate="collapsed" desc="renderPopupHeader">
		const { data, getTitle, loading, showHeader, HeaderProps } = this.props;

		if (!showHeader) {
			return null;
		}

		let title = '';

		if (!loading && isFunction(getTitle)) {
			title = getTitle(data);
		}

		return (
			<Header
				title={title}
				showCloseControl={true}
				onClose={this.onClose}
				{...HeaderProps}
			/>
		);
		//</editor-fold>
	};

	renderHeader = () => {
		//<editor-fold defaultstate="collapsed" desc="renderHeader">
		const {
			loading,
			data,
			getImage,
			getRows,
			showRefresh,
			AdministrationPopupHeaderProps,
		} = this.props;

		if (loading) {
			return null;
		}

		const extra = {};

		if (isFunction(getImage)) {
			const { thumbnail } = getImage(data);
			extra.image = thumbnail;
		}

		if (isFunction(getRows)) {
			const rows = getRows(data);
			extra.rows = rows;
		}

		return (
			<AdministrationPopupHeader
				showRefresh={showRefresh}
				onRefreshClick={this.onRefreshClick}
				onImageClick={this.onImageClick}
				{...extra}
				{...AdministrationPopupHeaderProps}
			/>
		);
		//</editor-fold>
	};

	renderContent = () => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { loading, children, ContentProps } = this.props;

		const content = !loading ? children : this.renderLoading();

		return (
			<Content {...ContentProps}>
				{this.renderHeader()}
				{content}
			</Content>
		);
		//</editor-fold>
	};

	renderLoading = () => {
		//<editor-fold defaultstate="collapsed" desc="renderLoading">
		const { LoadingProps } = this.props;

		return <Loading {...LoadingProps} />;
		//</editor-fold>
	};

	render() {
		const {
			level,
			verticalAlign,
			hideOnOverlayClick,
			showCloseControl,
			contentWrapStyle,
			PopupProps,
			popupName,
		} = this.props;

		return (
			<Popup
				name={popupName}
				level={level}
				verticalAlign={verticalAlign}
				hideOnOverlayClick={hideOnOverlayClick}
				showCloseControl={showCloseControl}
				contentWrapStyle={contentWrapStyle}
				{...PopupProps}>
				{this.renderPopupHeader()}
				{this.renderContent()}
			</Popup>
		);
	}
}

AdministrationPopup.propTypes = propTypes;

AdministrationPopup.defaultProps = defaultProps;

AdministrationPopup = WithUi(uiProps)(AdministrationPopup);

export default AdministrationPopup;
