import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import { Base64 } from 'js-base64';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import DateTimePicker from 'ui/inputs/datetime_picker';
import CKEditor from 'ui/editors/ckeditor';
import LangsTab from 'ui/common/langs_tab';
import TextArea from 'ui/inputs/textarea';
import { forEach, get, replace, size, upperCase } from 'lodash-es';
import Select from 'ui/inputs/select';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	//from ui
	langs: PropTypes.array,
	item: PropTypes.object,
	translations: PropTypes.object,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		langs: 'langs',
		[ownProps.containerName]: {
			data: {
				item: 'item',
				translations: 'translations',
			},
		},
	};
};

class Edit extends Component {
	constructor(props) {
		super(props);
	}

	onBeforeSubmit = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="onBeforeSubmit">
		const { langs } = this.props;

		forEach(data, (r, key) => {
			const check = key.substr(0, 3);

			if (check[2] === '_' && _g.inArray(key.substr(0, 2), langs)) {
				const lang = key.substr(0, 2);
				const checkKey = replace(key, `${lang}_`, '');

				if (_g.inArray(checkKey, ['content', 'info'])) {
					data[key] = Base64.encode(data[key]);
				}
			}
		});
		//</editor-fold>
	};

	onSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName, containerName } = this.props;
		ee.trigger(events.datatable.refresh, { id: tableName });

		if (uiStore.get(`${containerName}.mounted`, false)) {
			uiStore.multiSet([
				{
					path: `${containerName}.data.item`,
					value: response.item,
				},
				{
					path: `${containerName}.data.translations`,
					value: response.translations,
				},
			]);
		}
		//</editor-fold>
	};

	renderFields = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFields">
		const { item } = this.props;
		const { categories, active, pinned, tip_projects } = item;

		return (
			<Fragment>
				<Field
					label={'Bloga kategorija'}
					name={'categories'}
					component={Select}
					value={categories}
					componentProps={{
						multi: true,
						optionsUrl: 'administration/blog/categories/actions',
						valueKey: 'id',
						searchable: true,
						labelKey: 'title',
						extraData: { action: 'get_options' },
					}}
				/>
				<Field
					label="Aktīvs"
					name="active"
					component={Checkbox}
					value={active}
				/>
				<Field label="Pin" name="pinned" component={Checkbox} value={pinned} />
				<Field
					label="Tipveida projekts"
					name="tip_projects"
					component={Checkbox}
					value={tip_projects}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	renderLangTab = (lang) => {
		const { translations } = this.props;

		const title = get(translations, `${lang}.title`, '');
		const content = get(translations, `${lang}.data.content`, '');
		const price = get(translations, `${lang}.data.price`, '');
		const size = get(translations, `${lang}.data.size`, '');
		const info = get(translations, `${lang}.data.info`, '');

		return (
			<Fragment>
				<Field
					label={'Bloga nosaukums'}
					name={`${lang}_title`}
					component={Input}
					value={title}
				/>

				<Field
					label={'Apraksts'}
					name={`${lang}_content`}
					component={CKEditor}
					value={content}
				/>

				<Field
					label={'Cena'}
					name={`${lang}_price`}
					component={Input}
					value={price}
					componentProps={{
						type: 'number',
						step: '0.01',
						min: '0',
						placeholder: '0.00',
					}}
				/>

				<Field
					label={'Izmēri'}
					name={`${lang}_size`}
					component={Input}
					value={size}
				/>

				<Field
					label={'Meta tituls'}
					name={`${lang}_meta_title`}
					component={Input}
					value={get(translations, `${lang}.data.meta_title`, '')}
				/>

				<Field
					label={'Meta apraksts'}
					name={`${lang}_meta_description`}
					component={TextArea}
					value={get(translations, `${lang}.data.meta_description`, '')}
				/>

				<Field
					label={'Informācija'}
					name={`${lang}_info`}
					component={CKEditor}
					value={info}
				/>
			</Fragment>
		);
	};

	render() {
		const { action, id, langs } = this.props;

		return (
			<Form
				action={action}
				extraData={{
					action: 'update',
					id: id,
				}}
				onBeforeSubmit={this.onBeforeSubmit}
				onSuccess={this.onSuccess}
				submit={{
					title: 'Saglabāt',
				}}>
				{this.renderFields()}
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Form>
		);
	}
}

Edit.propTypes = propTypes;

Edit.defaultProps = defaultProps;

Edit = WithUi(uiProps)(Edit);

export default Edit;
