import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import { Base64 } from 'js-base64';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import CKEditor from 'ui/editors/ckeditor';
import LangsTab from 'ui/common/langs_tab';
import TextArea from 'ui/inputs/textarea';
import { forEach, map, replace } from 'lodash-es';
import Select from 'ui/inputs/select';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,

	//from ui
	langs: PropTypes.array,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		langs: 'langs',
	};
};

class AddForm extends Component {
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

	onSuccess = () => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName } = this.props;

		ee.trigger(events.datatable.refresh, { id: tableName });
		//</editor-fold>
	};

	renderFields = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFields">

		return (
			<Fragment>
				<Field
					label={'Bloga kategorija'}
					name={'categories'}
					component={Select}
					componentProps={{
						multi: true,
						optionsUrl: 'administration/blog/categories/actions',
						valueKey: 'id',
						searchable: true,
						labelKey: 'title',
						extraData: { action: 'get_options' },
					}}
				/>

				<Field label="Aktīvs" name="active" component={Checkbox} value="1" />
				<Field label="Pin" name="pinned" component={Checkbox} />
				<Field
					label="Tipveida projekts"
					name="tip_projects"
					component={Checkbox}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	renderLangTab = (lang) => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		return (
			<Fragment>
				<Field
					label={'Bloga nosaukums'}
					name={`${lang}_title`}
					component={Input}
				/>
				<Field
					label={'Apraksts'}
					name={`${lang}_content`}
					component={CKEditor}
				/>
				<Field
					label={'Meta tituls'}
					name={`${lang}_meta_title`}
					component={Input}
				/>
				<Field
					label={'Meta apraksts'}
					name={`${lang}_meta_description`}
					component={TextArea}
				/>
				<Field
					label={'Cena'}
					name={`${lang}_price`}
					component={Input}
					componentProps={{
						type: 'number',
						step: '0.01',
						min: '0',
						placeholder: '0.00',
					}}
				/>
				<Field label={'Izmēri'} name={`${lang}_size`} component={Input} />

				<Field
					label={'Informācija'}
					name={`${lang}_info`}
					component={CKEditor}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		const { action, langs } = this.props;

		return (
			<Form
				action={action}
				extraData={{
					action: 'create',
				}}
				refresh={true}
				onBeforeSubmit={this.onBeforeSubmit}
				onSuccess={this.onSuccess}
				submit={{
					title: 'Pievienot',
				}}>
				{this.renderFields()}
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Form>
		);
	}
}

AddForm.propTypes = propTypes;

AddForm.defaultProps = defaultProps;

AddForm = WithUi(uiProps)(AddForm);

export default AddForm;
