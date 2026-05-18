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
	name: PropTypes.string.isRequired,
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

class EditContentForm extends Component {
	constructor(props) {
		super(props);

		this.langs = [];
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.getData();
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	getData = () => {
		//<editor-fold defaultstate="collapsed" desc="getData">
		const { name } = this.props;

		remoteRequest({
			url: 'cms/administration/content',
			data: {
				name: name,
				action: 'get',
			},
			onSuccess: (response) => {
				if (!uiStore.get('CMSPopup.mounted', false)) {
					return;
				}

				this.langs = response.langs;

				uiStore.update('CMSPopup', {
					loading: false,
					content: response.content,
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
		const { name, action } = data;

		delete data.name;
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
			} else {
				delete data[key];
				set(data, `data.${key}`, r);
			}
		});

		data.name = name;
		data.action = action;

		if (!_g.isEmpty(data.langData)) {
			data.langData = Base64.encode(JSON.stringify(data.langData));
		}

		if (!_g.isEmpty(data.data)) {
			data.data = Base64.encode(JSON.stringify(data.data));
		}
		//</editor-fold>
	};

	onSuccess = ({ data, Form, response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { name } = this.props;
		const currentLang = uiStore.get('currentLang', 'en');

		const content = get(response, 'content');
		const newData = get(content, 'data');
		const newLangData = get(content, `langData.${currentLang}`);

		uiStore.multiSet([
			{
				path: `content.${name}.data`,
				value: newData,
			},
			{
				path: `content.${name}.langData`,
				value: newLangData,
			},
		]);

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
		const { name, children, FormProps, save } = this.props;

		return (
			<Form
				action="cms/administration/content"
				extraData={{
					name: name,
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

EditContentForm.propTypes = propTypes;

EditContentForm.defaultProps = defaultProps;

EditContentForm = WithUi(uiProps)(EditContentForm);

EditContentForm = WithLocale(EditContentForm);

export default EditContentForm;
