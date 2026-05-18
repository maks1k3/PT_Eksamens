import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Switch from 'ui/inputs/switch';
import Button from 'ui/controls/button';

const title = 'Switch: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		"For convenience Switch value can be:1,0,'1','0', true, false. But onChange and getValue will always return:'1','0'.",
	code: `
import Switch from 'ui/inputs/switch';

class Test extends Component {
	constructor(props) {
		super(props);
		this.switch = React.createRef();

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
					<Switch ref={this.switch} value={value} valueId={valueId} />
				</div>
				<div className="margin-bottom">
					<Button
						title="Toggle switch"
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
							this.switch.current.setValue('0');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.switch.current.getValue());
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
		this.switch = React.createRef();

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
					<Switch ref={this.switch} value={value} valueId={valueId} />
				</div>
				<div className="margin-bottom">
					<Button
						title="Toggle switch"
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
							this.switch.current.setValue('0');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.switch.current.getValue());
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
