import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RadioGroup from 'ui/inputs/radio_group';

const title = 'RadioGroup: controlled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RadioGroup from 'ui/inputs/radio_group';

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'male',
		};
	}

	render() {
		const { value } = this.state;
		return (
			<RadioGroup
				controlled={true}
				value={value}
				options={[
					{
						value: 'male',
						label: 'Male',
					},
					{
						value: 'female',
						label: 'Female',
					},
				]}
				onChange={({ value }) => {
					this.setState({
						value: value,
					});
				}}
			/>
		);
	}
}
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'male',
		};
	}

	render() {
		const { value } = this.state;
		return (
			<RadioGroup
				controlled={true}
				value={value}
				options={[
					{
						value: 'male',
						label: 'Male',
					},
					{
						value: 'female',
						label: 'Female',
					},
				]}
				onChange={({ value }) => {
					this.setState({
						value: value,
					});
				}}
			/>
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
