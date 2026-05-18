import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import { Base64 } from 'js-base64';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import AutoComplete from 'ui/inputs/autocomplete';
import Select from 'ui/inputs/select';
import DateTimePicker from 'ui/inputs/datetime_picker';
import FileInput from 'ui/inputs/file_input';
import CKEditor from 'ui/editors/ckeditor';
import LangsTab from 'ui/common/langs_tab';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,

	//from ui
	langs: PropTypes.array,
};

const defaultProps = {};

const uiProps = ownProps => {
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

		_.forEach(data, (r, key) => {
			const check = key.substr(0, 3);

			if (check[2] === '_' && _g.inArray(key.substr(0, 2), langs)) {
				const lang = key.substr(0, 2);
				const checkKey = _.replace(key, `${lang}_`, '');

				if (checkKey === 'content') {
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
					label="Price"
					name="price"
					component={Input}
					componentProps={{
						number: {
							allowNegative: false,
							allowDecimal: true,
						},
					}}
				/>
				<Field label="Active" name="active" component={Checkbox} />
				<Field
					label="Discount"
					name="discount"
					component={Input}
					componentProps={{
						number: {
							allowNegative: false,
							allowDecimal: false,
						},
					}}
					isRequired={true}
				/>
				<Field
					label="Address"
					name="address"
					component={AutoComplete}
					componentProps={{
						optionsUrl:
							'administration_example/administration_example_3/actions',
						extraData: {
							action: 'address_autocomplete',
						},
					}}
				/>
				<Field
					label="Content type"
					name="content_type"
					component={Select}
					componentProps={{
						options: [
							{
								value: 'image',
								label: 'Image',
							},
							{
								value: 'video',
								label: 'Video',
							},
							{
								value: 'note',
								label: 'Note',
							},
						],
					}}
					isRequired={true}
				/>
				<Field
					label="Date time"
					name="date_time"
					component={DateTimePicker}
					isRequired={true}
				/>
				<Field
					label="Date"
					name="date"
					component={DateTimePicker}
					componentProps={{
						timeFormat: false,
					}}
					isRequired={true}
				/>
				<Field
					label="Time"
					name="time"
					component={DateTimePicker}
					componentProps={{
						dateFormat: false,
					}}
					isRequired={true}
				/>
				<Field
					label="Image"
					name="image"
					component={FileInput}
					componentProps={{
						accept: 'image/*',
					}}
				/>
				<Field
					label="Images"
					name="images"
					component={FileInput}
					componentProps={{
						accept: 'image/*',
						multiple: true,
					}}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	renderLangTab = lang => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		return (
			<Fragment>
				<Field
					label={`${_.upperCase(lang)} title`}
					name={`${lang}_title`}
					component={Input}
				/>
				<Field
					label={`${_.upperCase(lang)} content`}
					name={`${lang}_content`}
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
					title: 'Add',
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
