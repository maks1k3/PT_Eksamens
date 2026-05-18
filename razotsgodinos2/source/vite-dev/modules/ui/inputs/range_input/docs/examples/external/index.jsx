import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RangeInput from 'ui/inputs/range_input';
import Button from 'ui/controls/button';

const title = 'RangeInput: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RangeInput from 'ui/inputs/range_input';
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
					<RangeInput
						ref={this.input}
						value={value}
						valueId={valueId}
						valueLabelDisplay="on"
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: 75"
						onClick={() => {
							this.setState({
								value: '75',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.input.current.setValue('20');
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
					<RangeInput
						ref={this.input}
						value={value}
						valueId={valueId}
						valueLabelDisplay="on"
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: 75"
						onClick={() => {
							this.setState({
								value: '75',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.input.current.setValue('20');
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
