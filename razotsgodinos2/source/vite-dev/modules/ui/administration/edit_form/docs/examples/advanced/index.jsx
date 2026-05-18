import React, { PureComponent as Component, Fragment } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import MaxWidth from 'ui/layout/max_width';
import EditForm from 'ui/administration/edit_form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import DateTimePicker from 'ui/inputs/datetime_picker';

const title = 'EditForm: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import MaxWidth from 'ui/layout/max_width';
import EditForm from 'ui/administration/edit_form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import DateTimePicker from 'ui/inputs/datetime_picker';

const get = {
	action: 'administration_example/edit_form/actions',
	extraData: {
		action: 'get',
	},
	parseResponse: response => {
		return response.settings;
	},
};

const update = {
	action: 'administration_example/edit_form/actions',
	extraData: {
		action: 'update',
	},
	onBeforeSubmit: ({ data, Form, EditForm }) => {
		data.extra = 'something';
	},
	onSuccess: ({ data, Form, response, EditForm }) => {
		console.log('onSuccess:', { data, Form, response, EditForm });
	},
	onError: ({ data, Form, response, EditForm }) => {
		console.log('onSuccess:', { data, Form, response, EditForm });
	},
	onFail: ({ data, Form, response, EditForm }) => {
		console.log('onSuccess:', { data, Form, response, EditForm });
	},
};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	renderForm = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { name, enabled, discount, price, date_time, date, time } = data;

		return (
			<Fragment>
				<Field
					label="Name"
					name="name"
					component={Input}
					value={name}
					isRequired={true}
				/>
				<Field
					label="Enabled"
					name="enabled"
					component={Checkbox}
					value={enabled}
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
					isRequired={true}
					value={discount}
				/>
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
					isRequired={true}
					value={price}
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

	render() {
		return (
			<MaxWidth width="600px">
				<EditForm
					onGetDataSuccess={({ data, response, EditForm }) => {
						console.log('onGetDataSuccess', { data, response, EditForm });
					}}
					get={get}
					update={update}
					render={this.renderForm}
					FormProps={{
						submit: {
							title: 'Save settings',
						},
					}}
				/>
			</MaxWidth>
		);
	}
}
  `,
};

const get = {
	action: 'administration_example/edit_form/actions',
	extraData: {
		action: 'get',
	},
	parseResponse: response => {
		return response.settings;
	},
};

const update = {
	action: 'administration_example/edit_form/actions',
	extraData: {
		action: 'update',
	},
	onBeforeSubmit: ({ data, Form, EditForm }) => {
		data.extra = 'something';
	},
	onSuccess: ({ data, Form, response, EditForm }) => {
		console.log('onSuccess:', { data, Form, response, EditForm });
	},
	onError: ({ data, Form, response, EditForm }) => {
		console.log('onSuccess:', { data, Form, response, EditForm });
	},
	onFail: ({ data, Form, response, EditForm }) => {
		console.log('onSuccess:', { data, Form, response, EditForm });
	},
};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	renderForm = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { name, enabled, discount, price, date_time, date, time } = data;

		return (
			<Fragment>
				<Field
					label="Name"
					name="name"
					component={Input}
					value={name}
					isRequired={true}
				/>
				<Field
					label="Enabled"
					name="enabled"
					component={Checkbox}
					value={enabled}
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
					isRequired={true}
					value={discount}
				/>
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
					isRequired={true}
					value={price}
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

	render() {
		return (
			<MaxWidth width="600px">
				<EditForm
					onGetDataSuccess={({ data, response, EditForm }) => {
						console.log('onGetDataSuccess', { data, response, EditForm });
					}}
					get={get}
					update={update}
					render={this.renderForm}
					FormProps={{
						submit: {
							title: 'Save settings',
						},
					}}
				/>
			</MaxWidth>
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
			<NewComponent />
		</ExampleHolder>
	);
};

export default Example;
