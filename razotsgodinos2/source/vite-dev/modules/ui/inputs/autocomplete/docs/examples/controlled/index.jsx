import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AutoComplete from 'ui/inputs/autocomplete';

const title = 'AutoComplete: controlled';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AutoComplete from 'ui/inputs/autocomplete';

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			valueId: null,
		};
	}

	render() {
		const { value, valueId } = this.state;
		return (
			<AutoComplete
				controlled={true}
				value={value}
				valueId={valueId}
				onChange={({ value }) => {
					this.setState({
						value: value,
					});
				}}
				onSelect={({ value, label, index, AutoComplete }) => {
					this.setState({
						value: label,
						valueId: _g.generateShortId(),
					});

					const { onClose } = AutoComplete.props;

					AutoComplete.setState(
						{
							opened: false,
							focusedIndex: null,
						},
						() => {
							if (_.isFunction(onClose)) {
								onClose({ AutoComplete: this });
							}
						},
					);
				}}
				options={[
					{
						value: 'age_of_mythology',
						label: 'Age of Mythology',
					},
					{
						value: 'starcraft',
						label: 'StarCraft',
					},
					{
						value: 'counter_strike',
						label: 'Counter strike',
					},
				]}
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
			valueId: null,
		};
	}

	render() {
		const { value, valueId } = this.state;
		return (
			<AutoComplete
				controlled={true}
				value={value}
				valueId={valueId}
				onChange={({ value }) => {
					this.setState({
						value: value,
					});
				}}
				onSelect={({ value, label, index, AutoComplete }) => {
					this.setState({
						value: label,
						valueId: _g.generateShortId(),
					});

					const { onClose } = AutoComplete.props;

					AutoComplete.setState(
						{
							opened: false,
							focusedIndex: null,
						},
						() => {
							if (_.isFunction(onClose)) {
								onClose({ AutoComplete: this });
							}
						},
					);
				}}
				options={[
					{
						value: 'age_of_mythology',
						label: 'Age of Mythology',
					},
					{
						value: 'starcraft',
						label: 'StarCraft',
					},
					{
						value: 'counter_strike',
						label: 'Counter strike',
					},
				]}
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
