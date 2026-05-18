import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Select from 'ui/inputs/select';
import Button from 'ui/controls/button';

const title = 'Select: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Select from 'ui/inputs/select';

class Test extends Component {
	constructor(props) {
		super(props);
		this.select = React.createRef();

		this.state = {
			value: '',
			valueId: '',
		};
	}

	render() {
		const { value, valueId } = this.state;
		return (
			<div>
				<div className="margin-bottom">
					<Select
						ref={this.select}
						value={value}
						valueId={valueId}
						multi={true}
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
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: option_2,option_3"
						onClick={() => {
							this.setState({
								value: 'option_2,option_3',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.select.current.setValue('option_1');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValueAndOptions"
						onClick={() => {
							this.select.current.setValueAndOptions('new_option', [
								{ value: 'new_option', label: 'New option' },
							]);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.select.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.select.current.focus();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getOptions"
						onClick={() => {
							console.log('options:', this.select.current.options);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getSelectedOptions"
						onClick={() => {
							console.log(
								'selected options:',
								this.select.current.getSelectedOptions(),
							);
						}}
					/>
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
		this.select = React.createRef();

		this.state = {
			value: '',
			valueId: '',
		};
	}

	render() {
		const { value, valueId } = this.state;
		return (
			<div>
				<div className="margin-bottom">
					<Select
						ref={this.select}
						value={value}
						valueId={valueId}
						multi={true}
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
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: option_2,option_3"
						onClick={() => {
							this.setState({
								value: 'option_2,option_3',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.select.current.setValue('option_1');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValueAndOptions"
						onClick={() => {
							this.select.current.setValueAndOptions('new_option', [
								{ value: 'new_option', label: 'New option' },
							]);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.select.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.select.current.focus();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getOptions"
						onClick={() => {
							console.log('options:', this.select.current.options);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getSelectedOptions"
						onClick={() => {
							console.log(
								'selected options:',
								this.select.current.getSelectedOptions(),
							);
						}}
					/>
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
