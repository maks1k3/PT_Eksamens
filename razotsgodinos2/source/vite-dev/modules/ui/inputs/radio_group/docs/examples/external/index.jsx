import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RadioGroup from 'ui/inputs/radio_group';
import Button from 'ui/controls/button';

const title = 'RadioGroup: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RadioGroup from 'ui/inputs/radio_group';

class Test extends Component {
	constructor(props) {
		super(props);
		this.radioGroup = React.createRef();

		this.state = {
			value: 'en',
			valueId: '',
		};
	}

	render() {
		const { value, valueId } = this.state;
		return (
			<div>
				<div className="margin-bottom">
					<RadioGroup
						ref={this.radioGroup}
						value={value}
						valueId={valueId}
						options={[
							{
								value: 'en',
								label: 'English',
							},
							{
								value: 'lv',
								label: 'Latvian',
							},
							{
								value: 'ru',
								label: 'Russian',
							},
						]}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: lv"
						onClick={() => {
							this.setState({
								value: 'lv',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.radioGroup.current.setValue('ru');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.radioGroup.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.radioGroup.current.focus();
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
		this.radioGroup = React.createRef();

		this.state = {
			value: 'en',
			valueId: '',
		};
	}

	render() {
		const { value, valueId } = this.state;
		return (
			<div>
				<div className="margin-bottom">
					<RadioGroup
						ref={this.radioGroup}
						value={value}
						valueId={valueId}
						options={[
							{
								value: 'en',
								label: 'English',
							},
							{
								value: 'lv',
								label: 'Latvian',
							},
							{
								value: 'ru',
								label: 'Russian',
							},
						]}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: lv"
						onClick={() => {
							this.setState({
								value: 'lv',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.radioGroup.current.setValue('ru');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.radioGroup.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.radioGroup.current.focus();
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
