import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TextArea from 'ui/inputs/textarea';

const title = 'TextArea: controlled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'You can control what user types into TextArea. In this example you can\'t type letter "a".',
	code: `
import TextArea from 'ui/inputs/textarea';

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
			<TextArea
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
			<TextArea
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
