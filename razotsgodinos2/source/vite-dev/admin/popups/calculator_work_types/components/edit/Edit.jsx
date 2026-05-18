import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import LangsTab from 'ui/common/langs_tab';

import { get, upperCase } from 'lodash-es';

const uiProps = (ownProps) => ({
	langs: 'langs',
	[ownProps.containerName]: {
		data: { item: 'item', translations: 'translations' },
	},
});

class Edit extends Component {
	onSuccess = ({ response }) => {
		ee.trigger(events.datatable.refresh, { id: this.props.tableName });

		if (uiStore.get(`${this.props.containerName}.mounted`, false)) {
			uiStore.multiSet([
				{ path: `${this.props.containerName}.data.item`, value: response.item },
				{
					path: `${this.props.containerName}.data.translations`,
					value: response.translations,
				},
			]);
		}
	};

	renderLangTab = (lang) => (
		<Fragment>
			<Field
				label={`${upperCase(lang)} Nosaukums`}
				name={`${lang}_title`}
				component={Input}
				value={get(this.props.translations, `${lang}.title`, '')}
			/>
		</Fragment>
	);

	render() {
		const { action, id, item, langs } = this.props;

		return (
			<Form
				action={action}
				extraData={{ action: 'update', id }}
				onSuccess={this.onSuccess}
				submit={{ title: 'Saglabāt' }}>
				<Field
					label="Code"
					name="code"
					component={Input}
					value={get(item, 'code', '')}
				/>
				{/* <Field
					label="Unit"
					name="unit"
					component={Input}
					value={get(item, 'unit', '')}
				/> */}
				{/* <Field
					label="Sort"
					name="sort"
					component={Input}
					value={get(item, 'sort', 0)}
					componentProps={{ type: 'number', step: '1', min: '0' }}
				/> */}
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Form>
		);
	}
}

Edit.propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	langs: PropTypes.array,
	item: PropTypes.object,
	translations: PropTypes.object,
};

Edit.defaultProps = { langs: [], item: {}, translations: {} };

export default WithUi(uiProps)(Edit);
