import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';

const title = 'Form: name';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		"Unique name of this form. If not undefined saves form inputs' data to Redux. Updates inputs' values from Redux on componentDidMount. Can be used when Form or Field components can be unmounted beacuse of different render for desktop and mobile. Because all data entered by user will be lost during unmount.",
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';

class Test extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			formMounted: true,
			field2Mounted: true,
			field4Mounted: false,
		};
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		//remove form data if it is not needed
		uiStore.remove('Forms.test_form');
		//</editor-fold>
	}

	render() {
		const { formMounted, field2Mounted, field4Mounted } = this.state;
		return (
			<div>
				<Checkbox
					label="Form mounted"
					value={formMounted}
					onChange={() => {
						this.setState({
							formMounted: !formMounted,
						});
					}}
				/>
				<Checkbox
					label="Field 2 mounted"
					value={field2Mounted}
					onChange={() => {
						this.setState({
							field2Mounted: !field2Mounted,
						});
					}}
				/>
				<Checkbox
					label="Field 4 mounted"
					value={field4Mounted}
					onChange={() => {
						this.setState({
							field4Mounted: !field4Mounted,
						});
					}}
				/>
				<div className="margin-bottom">
					{formMounted && (
						<Form
							name="test_form"
							action="actions/echo"
							submit={{
								title: 'Save',
							}}>
							<Field
								label="Field 1"
								name="field_1"
								component={Input}
								componentProps={{ placeholder: 'Type something' }}
							/>
							{field2Mounted && (
								<Field
									label="Field 2"
									name="field_2"
									component={Input}
									componentProps={{ placeholder: 'Type something' }}
								/>
							)}
							<Field
								label="Field 3"
								name="field_3"
								component={Input}
								componentProps={{ placeholder: 'Type something' }}
							/>
							{field4Mounted && (
								<Field
									label="Field 4"
									name="field_4"
									component={Input}
									componentProps={{ placeholder: 'Type something' }}
									value="Some value"
								/>
							)}
						</Form>
					)}
				</div>
			</div>
		);
	}
}

  `,
};

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formMounted: true,
			field2Mounted: true,
			field4Mounted: false,
		};
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		//remove form data if it is not needed
		uiStore.remove('Forms.test_form');
		//</editor-fold>
	}

	render() {
		const { formMounted, field2Mounted, field4Mounted } = this.state;
		return (
			<div>
				<Checkbox
					label="Form mounted"
					value={formMounted}
					onChange={() => {
						this.setState({
							formMounted: !formMounted,
						});
					}}
				/>
				<Checkbox
					label="Field 2 mounted"
					value={field2Mounted}
					onChange={() => {
						this.setState({
							field2Mounted: !field2Mounted,
						});
					}}
				/>
				<Checkbox
					label="Field 4 mounted"
					value={field4Mounted}
					onChange={() => {
						this.setState({
							field4Mounted: !field4Mounted,
						});
					}}
				/>
				<div className="margin-bottom">
					{formMounted && (
						<Form
							name="test_form"
							action="actions/echo"
							submit={{
								title: 'Save',
							}}>
							<Field
								label="Field 1"
								name="field_1"
								component={Input}
								componentProps={{ placeholder: 'Type something' }}
							/>
							{field2Mounted && (
								<Field
									label="Field 2"
									name="field_2"
									component={Input}
									componentProps={{ placeholder: 'Type something' }}
								/>
							)}
							<Field
								label="Field 3"
								name="field_3"
								component={Input}
								componentProps={{ placeholder: 'Type something' }}
							/>
							{field4Mounted && (
								<Field
									label="Field 4"
									name="field_4"
									component={Input}
									componentProps={{ placeholder: 'Type something' }}
									value="Some value"
								/>
							)}
						</Form>
					)}
				</div>
			</div>
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
