import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Select from 'ui/inputs/select';

const uiProps = (ownProps) => ({
	[ownProps.containerName]: {
		data: {
			item: 'item',
		},
	},
});

class Edit extends Component {
	onSuccess = ({ response }) => {
		const { tableName, containerName } = this.props;

		ee.trigger(events.datatable.refresh, { id: tableName });

		if (uiStore.get(`${containerName}.mounted`, false)) {
			uiStore.set(`${containerName}.data.item`, response.item ?? null);
		}
	};

	render() {
		const { action, id, item } = this.props;

		if (!item) {
			return null;
		}

		return (
			<Form
				action={action}
				extraData={{ action: 'update', id }}
				onSuccess={this.onSuccess}
				submit={{ title: 'Saglabāt' }}>
				<Field
					label="Kategorija"
					name="category_id"
					value={String(item.category_id)}
					component={Select}
					componentProps={{
						optionsUrl: action,
						extraData: { action: 'get_categories' },
						valueKey: 'value',
						labelKey: 'label',
						searchable: true,
						clearable: false,
					}}
				/>

				<Field
					label="Pakalpojums"
					name="work_type_id"
					value={String(item.work_type_id)}
					component={Select}
					componentProps={{
						optionsUrl: action,
						extraData: { action: 'get_work_types' },
						valueKey: 'value',
						labelKey: 'label',
						searchable: true,
						clearable: false,
					}}
				/>

				<Field
					label="Izvēle"
					name="option_id"
					value={String(item.option_id)}
					component={Select}
					componentProps={{
						optionsUrl: action,
						extraData: { action: 'get_options' },
						valueKey: 'value',
						labelKey: 'label',
						searchable: true,
						clearable: false,
					}}
				/>

				<Field
					label="Cena"
					name="price"
					value={String(item.price)}
					component={Input}
					componentProps={{
						type: 'number',
						step: '0.01',
						min: '0',
					}}
				/>
			</Form>
		);
	}
}

Edit.propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	item: PropTypes.object,
};

export default WithUi(uiProps)(Edit);
