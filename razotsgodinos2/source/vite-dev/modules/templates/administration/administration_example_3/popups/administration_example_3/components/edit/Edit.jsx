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
import CKEditor from 'ui/editors/ckeditor';
import LangsTab from 'ui/common/langs_tab';

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

const uiProps = ownProps => {
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
		const {
			price,
			active,
			discount,
			address,
			content_type,
			date_time,
			date,
			time,
		} = item;

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
					value={price}
				/>
				<Field
					label="Active"
					name="active"
					component={Checkbox}
					value={active}
				/>
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
					value={discount}
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
					value={address}
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
					value={content_type}
				/>
				<Field
					label="Date time"
					name="date_time"
					component={DateTimePicker}
					isRequired={true}
					value={date_time}
				/>
				<Field
					label="Date"
					name="date"
					component={DateTimePicker}
					componentProps={{
						timeFormat: false,
					}}
					isRequired={true}
					value={date}
				/>
				<Field
					label="Time"
					name="time"
					component={DateTimePicker}
					componentProps={{
						dateFormat: false,
					}}
					isRequired={true}
					value={time}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	renderLangTab = lang => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		const { translations } = this.props;

		const title = _.get(translations, `${lang}.title`, '');
		const content = _.get(translations, `${lang}.content`, '');

		return (
			<Fragment>
				<Field
					label={`${_.upperCase(lang)} title`}
					name={`${lang}_title`}
					component={Input}
					value={title}
				/>
				<Field
					label={`${_.upperCase(lang)} content`}
					name={`${lang}_content`}
					component={CKEditor}
					value={content}
				/>
			</Fragment>
		);
		//</editor-fold>
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
					title: 'Save',
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
