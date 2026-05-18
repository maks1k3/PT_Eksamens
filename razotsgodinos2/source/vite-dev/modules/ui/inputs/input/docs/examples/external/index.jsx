import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Input from 'ui/inputs/input';
import Button from 'ui/controls/button';

const title = 'Input: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Input from 'ui/inputs/input';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();

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
					<Input
						ref={this.input}
						value={value}
						valueId={valueId}
						placeholder="Type something..."
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
							this.input.current.setValue('This is text');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.input.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.input.current.focus();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getDOMNode"
						onClick={() => {
							console.log('getDOMNode', this.input.current.getDOMNode());
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
		this.input = React.createRef();

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
					<Input
						ref={this.input}
						value={value}
						valueId={valueId}
						placeholder="Type something..."
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
							this.input.current.setValue('This is text');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.input.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.input.current.focus();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getDOMNode"
						onClick={() => {
							console.log('getDOMNode', this.input.current.getDOMNode());
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
