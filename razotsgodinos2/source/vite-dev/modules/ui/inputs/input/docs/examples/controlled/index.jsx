import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Input from 'ui/inputs/input';

const title = 'Input: controlled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'You can control what user types into input. In this example you can\'t type letter "a".',
	code: `
import Input from 'ui/inputs/input';

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
	}

	render() {
		const { value } = this.state;
		return (
			<Input
				controlled={true}
				value={value}
				onChange={({ value }) => {
					value = _.replace(value, 'a', ''); //remove a letters

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
			value: '',
		};
	}

	render() {
		const { value } = this.state;
		return (
			<Input
				controlled={true}
				value={value}
				onChange={({ value }) => {
					value = _.replace(value, 'a', ''); //remove a letters

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
