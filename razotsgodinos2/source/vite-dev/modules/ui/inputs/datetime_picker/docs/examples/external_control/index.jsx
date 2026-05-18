import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import DateTimePicker from 'ui/inputs/datetime_picker';
import Button from 'ui/controls/button';

const title = 'DateTimePicker: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import DateTimePicker from 'ui/inputs/datetime_picker';

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
					<DateTimePicker
						ref={this.input}
						value={value}
						valueId={valueId}
						placeholder="Select date"
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: 2017-06-01 00:00:00"
						onClick={() => {
							this.setState({
								value: '2017-06-01 00:00:00',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.input.current.setValue('2018-06-01 00:00:00');
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
					<DateTimePicker
						ref={this.input}
						value={value}
						valueId={valueId}
						placeholder="Select date"
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: 2017-06-01 00:00:00"
						onClick={() => {
							this.setState({
								value: '2017-06-01 00:00:00',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.input.current.setValue('2018-06-01 00:00:00');
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
