import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TextArea from 'ui/inputs/textarea';
import Button from 'ui/controls/button';

const title = 'TextArea: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import TextArea from 'ui/inputs/textarea';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);
		this.textarea = React.createRef();

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
					<TextArea
						ref={this.textarea}
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
							this.textarea.current.setValue('This is text');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.textarea.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.textarea.current.focus();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getDOMNode"
						onClick={() => {
							console.log('getDOMNode', this.textarea.current.getDOMNode());
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
		this.textarea = React.createRef();

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
					<TextArea
						ref={this.textarea}
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
							this.textarea.current.setValue('This is text');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.textarea.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.textarea.current.focus();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getDOMNode"
						onClick={() => {
							console.log('getDOMNode', this.textarea.current.getDOMNode());
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
