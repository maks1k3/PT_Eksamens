import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import LocaleProvider from 'ui/misc/locale_provider';

import RadioGroup from 'ui/inputs/radio_group';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Select from 'ui/inputs/select';
import DateTimePicker from 'ui/inputs/datetime_picker';
import DeleteButton from 'ui/misc/delete_button';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import DataTable from 'ui/tables/data_table';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

const title = 'LocaleProvider: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'You can still specify textual properties for this components if you need custom translations.',
	code: `
import LocaleProvider from 'ui/misc/locale_provider';

//Components with locale support
import RadioGroup from 'ui/inputs/radio_group';
import Select from 'ui/inputs/select';
import DateTimePicker from 'ui/inputs/datetime_picker';
import DeleteButton from 'ui/misc/delete_button';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import DataTable from 'ui/tables/data_table';

<LocaleProvider locale="en"> //en,ru,lv
	... other components
</LocaleProvider>
  `,
};

const datatableConfig = {
	id: 'dt_basic_example',
	url: 'example_api/search',
	syncWithUrl: false,
	//<editor-fold defaultstate="collapsed" desc="columns">
	columns: [
		{
			name: 'id',
			title: 'ID',
			isHidable: false,
		},
		{
			name: 'created_at',
			title: 'Created at',
		},
		{
			name: 'updated_at',
			title: 'Updated at',
		},
		{
			name: 'title',
			title: 'Title',
		},
		{
			name: 'content_type',
			title: 'Content type',
		},
		{
			name: 'preview',
			title: 'Preview',
		},
		{
			name: 'book',
			title: 'Book',
		},
		{
			name: 'tags',
			title: 'Tags',
		},
		{
			name: 'deleted',
			title: 'Deleted',
		},
		{
			name: 'action',
			title: 'Action',
			isHidable: false,
			sortable: false,
			style: {
				width: '50px',
			},
		},
	],
	//</editor-fold>
	//<editor-fold defaultstate="collapsed" desc="filters">
	filters: [
		{
			label: 'Id',
			name: 'id',
			component: Input,
			componentProps: {
				placeholder: 'Id',
				clearable: true,
			},
		},
		{
			label: 'Title',
			name: 'title_id',
			component: Select,
			componentProps: {
				async: true,
				optionsUrl: 'example_api/title_autocomplete',
				clearable: true,
			},
			optionsFromUrl: true, //mark that this select should send and receive current value label to url
		},
		{
			label: 'Date from',
			name: 'date_from',
			component: DateTimePicker,
			componentProps: {
				placeholder: 'Date from',
			},
		},
		{
			label: 'Date to',
			name: 'date_to',
			component: DateTimePicker,
			componentProps: {
				placeholder: 'Date to',
			},
		},
	],
	//</editor-fold>
	//<editor-fold defaultstate="collapsed" desc="columnRenderers">
	columnRenderers: {
		created_at: ({ id, cell, row }) => {
			return <span className="no-wrap">{cell}</span>;
		},
		updated_at: ({ id, cell, row }) => {
			return <span className="no-wrap">{cell}</span>;
		},
		deleted: ({ id, cell, row }) => {
			return <span>{_.toString(cell) === '1' ? 'Yes' : 'No'}</span>;
		},
		action: ({ id, cell, row }) => {
			return (
				<ActionsMenu
					options={[
						{
							title: 'View',
							icon: {
								provider: 'icomoon',
								name: 'file-text',
							},
							onClick: () => {
								console.log({ View: { id, cell, row } });
							},
						},
						{
							title: 'Edit',
							icon: {
								provider: 'icomoon',
								name: 'pencil',
							},
							onClick: () => {
								console.log({ Edit: { id, cell, row } });
							},
						},
						{
							title: 'Delete',
							icon: {
								provider: 'icomoon',
								name: 'trash',
							},
							onClick: () => {
								console.log({ Delete: { id, cell, row } });
							},
						},
					]}
				/>
			);
		},
	},
	//</editor-fold>
	resultsPerPage: 10,
	order: {
		id: 'desc',
		// title: 'asc',
	},
};

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			locale: 'en',
		};
	}

	render() {
		const { locale } = this.state;
		return (
			<LocaleProvider locale={locale}>
				<RadioGroup
					onChange={({ value }) => {
						this.setState({
							locale: value,
						});
					}}
					controlled={true}
					value={locale}
					options={[
						{
							value: 'en',
							label: 'en',
						},
						{
							value: 'lv',
							label: 'lv',
						},
						{
							value: 'ru',
							label: 'ru',
						},
					]}
				/>

				<h3>Select</h3>
				<Select
					clearable={true}
					searchable={true}
					options={[
						{
							value: 'option_1',
							label: 'Option 1',
						},
						{
							value: 'option_2',
							label: 'Option 2',
						},
						{
							value: 'option_3',
							label: 'Option 3',
						},
						{
							value: 'option_4',
							label: 'Option 4',
						},
					]}
				/>

				<h3>DateTimePicker</h3>
				<DateTimePicker />

				<h3>DeleteButton</h3>
				<DeleteButton action="actions/success" />

				<h3>Form validation</h3>
				<Form
					action="actions/success"
					submit={{
						title: 'Send',
					}}>
					<Field
						label="Field 1"
						name="field_1"
						component={Input}
						componentProps={{
							placeholder: 'isRequired={true}',
						}}
						isRequired={true}
					/>
					<Field
						label="Field 2"
						name="field_2"
						component={Input}
						componentProps={{
							placeholder: 'isEqualTo="field_1"',
						}}
						isEqualTo="field_1"
					/>
					<Field
						label="Field 3"
						name="field_3"
						component={Input}
						componentProps={{
							placeholder: 'isEmail={true}',
						}}
						isEmail={true}
					/>
					<Field
						label="Field 4"
						name="field_4"
						component={Input}
						componentProps={{
							placeholder: 'isValidUrl={true}',
						}}
						isValidUrl={true}
					/>
					<Field
						label="Field 5"
						name="field_5"
						component={Input}
						componentProps={{
							placeholder: 'min={3}',
						}}
						min={3}
					/>
					<Field
						label="Terms"
						name="terms"
						component={Checkbox}
						mustAccept={true}
					/>
				</Form>
				<DataTable {...datatableConfig} />
			</LocaleProvider>
		);
	}
}

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Test />
		</ExampleHolder>
	);
};

export default Example;
