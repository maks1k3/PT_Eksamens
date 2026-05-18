import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AutoComplete from 'ui/inputs/autocomplete';
import Button from 'ui/controls/button';

const title = 'AutoComplete: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AutoComplete from 'ui/inputs/autocomplete';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);
		this.autoComplete = React.createRef();

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
					<AutoComplete
						ref={this.autoComplete}
						value={value}
						valueId={valueId}
						optionsUrl="example_api/autocomplete"
						valueKey="id"
						labelKey="name"
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: Test value"
						onClick={() => {
							this.setState({
								value: 'Test value',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.autoComplete.current.setValue('This is text');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.autoComplete.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.autoComplete.current.focus();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="reset"
						onClick={() => {
							this.autoComplete.current.reset();
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
		this.autoComplete = React.createRef();

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
					<AutoComplete
						ref={this.autoComplete}
						value={value}
						valueId={valueId}
						optionsUrl="example_api/autocomplete"
						valueKey="id"
						labelKey="name"
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: Test value"
						onClick={() => {
							this.setState({
								value: 'Test value',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.autoComplete.current.setValue('This is text');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.autoComplete.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.autoComplete.current.focus();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="reset"
						onClick={() => {
							this.autoComplete.current.reset();
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
