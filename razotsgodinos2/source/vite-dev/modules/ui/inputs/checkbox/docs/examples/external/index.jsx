import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Checkbox from 'ui/inputs/checkbox';
import Button from 'ui/controls/button';

const title = 'Checkbox: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		"For convenience Checkbox value can be:1,0,'1','0', true, false. But onChange and getValue will always return:'1','0'.",
	code: `
import Checkbox from 'ui/inputs/checkbox';

class Test extends Component {
	constructor(props) {
		super(props);
		this.checkbox = React.createRef();

		this.state = {
			value: false,
			valueId: '',
		};
	}

	render() {
		const { value, valueId } = this.state;
		return (
			<div>
				<div className="margin-bottom">
					<Checkbox ref={this.checkbox} value={value} valueId={valueId} />
				</div>
				<div className="margin-bottom">
					<Button
						title="Toggle checkbox"
						onClick={() => {
							this.setState({
								value: !this.state.value,
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.checkbox.current.setValue('0');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.checkbox.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.checkbox.current.focus();
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
		this.checkbox = React.createRef();

		this.state = {
			value: false,
			valueId: '',
		};
	}

	render() {
		const { value, valueId } = this.state;
		return (
			<div>
				<div className="margin-bottom">
					<Checkbox ref={this.checkbox} value={value} valueId={valueId} />
				</div>
				<div className="margin-bottom">
					<Button
						title="Toggle checkbox"
						onClick={() => {
							this.setState({
								value: !this.state.value,
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.checkbox.current.setValue('0');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.checkbox.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.checkbox.current.focus();
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
