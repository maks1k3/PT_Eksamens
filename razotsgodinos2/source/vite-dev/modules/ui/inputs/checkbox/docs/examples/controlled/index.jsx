import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Checkbox from 'ui/inputs/checkbox';

const title = 'Checkbox: controlled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Checkbox from 'ui/inputs/checkbox';

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '0',
		};
	}

	render() {
		const { value } = this.state;
		return (
			<Checkbox
				controlled={true}
				value={value}
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
			value: '0',
		};
	}

	render() {
		const { value } = this.state;
		return (
			<Checkbox
				controlled={true}
				value={value}
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
