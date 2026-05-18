import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';
import WithUi from 'hoc/store/ui';

import { Base64 } from 'js-base64';

import Form from 'ui/form';
import FormResponse from 'ui/form/form_response';
import Loading from 'ui/misc/loading';
import AlertBox from 'ui/misc/alertbox';
import { forEach, get, isFunction, replace, set } from 'lodash-es';

const propTypes = {
	id: PropTypes.number.isRequired,
	children: PropTypes.node,
	onBeforeSubmit: PropTypes.func,
	onSuccess: PropTypes.func,

	FormProps: PropTypes.object,

	//from ui
	loading: PropTypes.bool,

	//translations
	save: PropTypes.string,
	dataSaved: PropTypes.string,
};

const defaultProps = {
	//from ui
	loading: true,

	//translations
	save: 'Save',
	dataSaved: 'Data is saved!',
};

const uiProps = (ownProps) => {
	return {
		CMSPopup: {
			loading: 'loading',
		},
	};
};

class EditCollectionItem extends Component {
	constructor(props) {
		super(props);

		this.langs = uiStore.get('CMSPopup.langs', []);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { loading } = this.props;
		if (loading) {
			this.getData();
		}
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	getData = () => {
		//<editor-fold defaultstate="collapsed" desc="getData">
		const { id } = this.props;

		remoteRequest({
			url: 'cms/administration/collection_item',
			data: {
				id: id,
				action: 'get',
			},
			onSuccess: (response) => {
				if (!uiStore.get('CMSPopup.mounted', false)) {
					return;
				}

				this.langs = response.langs;

				uiStore.update('CMSPopup', {
					loading: false,
					collection: response.collection,
					langs: response.langs,
				});
			},
			onError: (response) => {
				showAlert({ content: response.msg });
			},
		});
		//</editor-fold>
	};

	onBeforeSubmit = ({ data, Form }) => {
		//<editor-fold defaultstate="collapsed" desc="onBeforeSubmit">
		const { id, action } = data;

		delete data.id;
		delete data.action;

		const { onBeforeSubmit } = this.props;

		if (isFunction(onBeforeSubmit)) {
			onBeforeSubmit({ data, Form });
		}

		forEach(data, (r, key) => {
			const check = key.substr(0, 3);
			if (check[2] === '_' && _g.inArray(key.substr(0, 2), this.langs)) {
				const lang = key.substr(0, 2);
				const newKey = replace(key, `${lang}_`, '');
				delete data[key];
				set(data, `langData.${lang}.${newKey}`, r);
			} else if (!_g.inArray(key, ['date', 'active'])) {
				delete data[key];
				set(data, `data.${key}`, r);
			}
		});

		data.id = id;
		data.action = action;

		if (!_g.isEmpty(data.data)) {
			data.data = Base64.encode(JSON.stringify(data.data));
		}

		if (!_g.isEmpty(data.langData)) {
			data.langData = Base64.encode(JSON.stringify(data.langData));
		}

		//</editor-fold>
	};

	onSuccess = ({ data, Form, response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { id } = this.props;
		const currentLang = uiStore.get('currentLang', 'en');

		const collection = get(response, 'collection');
		const newData = get(collection, 'data');
		const newLangData = get(collection, `langData.${currentLang}`);

		uiStore.batch({
			set: [
				{
					path: `collectionItems.${id}.data`,
					value: newData,
				},
				{
					path: `collectionItems.${id}.langData`,
					value: newLangData,
				},
			],
			update: [
				{
					path: `collectionItems.${id}`,
					value: {
						date: collection.date,
						active: collection.active,
					},
				},
			],
		});

		const { onSuccess } = this.props;

		if (isFunction(onSuccess)) {
			onSuccess({ data, Form, response });
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderResponse = ({ type, content, onClose }) => {
		//<editor-fold defaultstate="collapsed" desc="renderResponse">
		const { dataSaved } = this.props;
		const theme = type === 'success' ? 'success' : 'danger';

		let _content = content;

		if (type === 'success') {
			_content = dataSaved;
		}

		return <AlertBox content={_content} theme={theme} onClose={onClose} />;
		//</editor-fold>
	};

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { id, children, FormProps, save } = this.props;

		return (
			<Form
				action="cms/administration/collection_item"
				extraData={{
					id: id,
					action: 'update',
				}}
				showResponse={false}
				onBeforeSubmit={this.onBeforeSubmit}
				onSuccess={this.onSuccess}
				submit={{
					title: save,
				}}
				{...FormProps}>
				<FormResponse render={this.renderResponse} />
				{children}
			</Form>
		);
		//</editor-fold>
	};

	render() {
		const { loading } = this.props;

		if (loading) {
			return <Loading />;
		}

		return <div>{this.renderForm()}</div>;
	}
}

EditCollectionItem.propTypes = propTypes;

EditCollectionItem.defaultProps = defaultProps;

EditCollectionItem = WithUi(uiProps)(EditCollectionItem);

EditCollectionItem = WithLocale(EditCollectionItem);

export default EditCollectionItem;
