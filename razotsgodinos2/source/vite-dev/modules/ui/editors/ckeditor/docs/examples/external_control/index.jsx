import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CKEditor from 'ui/editors/ckeditor';
import Button from 'ui/controls/button';

const title = 'CKEditor: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CKEditor from 'ui/editors/ckeditor';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);
		this.editor = React.createRef();

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
					<CKEditor ref={this.editor} value={value} valueId={valueId} />
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
							this.editor.current.setValue('This is text');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.editor.current.getValue());
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
		this.editor = React.createRef();

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
					<CKEditor ref={this.editor} value={value} valueId={valueId} />
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
							this.editor.current.setValue('This is text');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.editor.current.getValue());
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
