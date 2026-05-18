import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Select from 'ui/inputs/select';
import LangsTab from 'ui/common/langs_tab';

import { get, upperCase } from 'lodash-es';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	// ui
	langs: PropTypes.array,

	// from popup store
	item: PropTypes.object,
	translations: PropTypes.object,
	workTypes: PropTypes.array,
};

const defaultProps = {
	item: {},
	translations: {},
	workTypes: [],
};

const uiProps = (ownProps) => ({
	langs: 'langs',
	[ownProps.containerName]: {
		data: {
			item: 'item',
			translations: 'translations',
			workTypes: 'workTypes',
		},
	},
});

class Edit extends Component {
	onSuccess = ({ response }) => {
		const { tableName, containerName } = this.props;

		ee.trigger(events.datatable.refresh, { id: tableName });

		if (uiStore.get(`${containerName}.mounted`, false)) {
			uiStore.multiSet([
				{ path: `${containerName}.data.item`, value: response.item ?? null },
				{
					path: `${containerName}.data.translations`,
					value: response.translations ?? {},
				},
				{
					path: `${containerName}.data.workTypes`,
					value: response.workTypes ?? [],
				},
			]);
		}
	};

	renderFields = () => {
		const { item, workTypes } = this.props;

		return (
			<Fragment>
				<Field
					label="Code"
					name="code"
					component={Input}
					value={get(item, 'code', '')}
				/>

				{/* <Field
					label="Sort"
					name="sort"
					component={Input}
					value={get(item, 'sort', 0)}
					componentProps={{
						type: 'number',
						step: '1',
						min: '0',
					}}
				/> */}
			</Fragment>
		);
	};

	renderLangTab = (lang) => {
		const { translations } = this.props;

		return (
			<Fragment>
				<Field
					label={`${upperCase(lang)} Nosaukums`}
					name={`${lang}_title`}
					component={Input}
					value={get(translations, `${lang}.title`, '')}
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

export default WithUi(uiProps)(Edit);
