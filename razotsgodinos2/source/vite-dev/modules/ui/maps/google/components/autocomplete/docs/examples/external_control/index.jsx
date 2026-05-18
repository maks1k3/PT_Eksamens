import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AutoComplete from 'ui/maps/google/components/autocomplete';
import Button from 'ui/controls/button';

const title = 'Google AutoComplete: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AutoComplete from 'ui/maps/google/components/autocomplete';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);
		this.autocomplete = React.createRef();

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
					<AutoComplete
						ref={this.autocomplete}
						types={['(cities)']}
						value={value}
						valueId={valueId}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: London"
						onClick={() => {
							this.setState({
								value: 'London',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.autocomplete.current.setValue('New York');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.autocomplete.current.getValue());
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
		this.autocomplete = React.createRef();

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
					<AutoComplete
						ref={this.autocomplete}
						types={['(cities)']}
						value={value}
						valueId={valueId}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: London"
						onClick={() => {
							this.setState({
								value: 'London',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.autocomplete.current.setValue('New York');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.autocomplete.current.getValue());
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
