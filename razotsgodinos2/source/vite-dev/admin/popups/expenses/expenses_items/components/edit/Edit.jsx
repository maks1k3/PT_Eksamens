import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import LangsTab from 'ui/common/langs_tab';
import { get, upperCase } from 'lodash-es';
import Checkbox from 'ui/inputs/checkbox';

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
				{
					path: 'SelectOptions.blogCategories',
					value: response.blogCategories,
				},
			]);
		}
		//</editor-fold>
	};

	renderFields = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFields">
		const { item } = this.props;
		const { price, price_per_unit } = item;

		return (
			<Fragment>
				<Fragment>
					<Field
						label="Izdevuma vienības cena"
						name="price"
						component={Input}
						value={price}
						componentProps={{
							number: {
								allowNegative: false,
								allowDecimal: true,
							},
						}}
					/>
					<Field
						label="Cena par vienu vienību"
						name="price_per_unit"
						component={Checkbox}
						value={price_per_unit}
					/>
				</Fragment>
			</Fragment>
		);
		//</editor-fold>
	};

	renderLangTab = (lang) => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		const { translations } = this.props;

		const title = get(translations, `${lang}.title`, '');

		return (
			<Fragment>
				<Field
					label={`${upperCase(lang)} nosaukums`}
					name={`${lang}_title`}
					component={Input}
					value={title}
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
					title: 'Saglabāt',
				}}>
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Form>
		);
	}
}

Edit.propTypes = propTypes;

Edit.defaultProps = defaultProps;

Edit = WithUi(uiProps)(Edit);

export default Edit;
