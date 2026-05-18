import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TagsInput from 'ui/inputs/tags_input';
import Button from 'ui/controls/button';

const title = 'TagsInput: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import TagsInput from 'ui/inputs/tags_input';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);
		this.tagsInput = React.createRef();

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
					<TagsInput
						ref={this.tagsInput}
						value={value}
						valueId={valueId}
						AutoCompleteProps={{
							optionsUrl: 'example_api/autocomplete',
							valueKey: 'id',
							labelKey: 'name',
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: tag1,tag2"
						onClick={() => {
							this.setState({
								value: 'Test value',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.tagsInput.current.setValue('Tag3,Tag4');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.tagsInput.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.tagsInput.current.focus();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="resetAutoComplete"
						onClick={() => {
							this.tagsInput.current.resetAutoComplete();
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
		this.tagsInput = React.createRef();

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
					<TagsInput
						ref={this.tagsInput}
						value={value}
						valueId={valueId}
						AutoCompleteProps={{
							optionsUrl: 'example_api/autocomplete',
							valueKey: 'id',
							labelKey: 'name',
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: tag1,tag2"
						onClick={() => {
							this.setState({
								value: 'Test value',
								valueId: _g.generateShortId(),
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.tagsInput.current.setValue('Tag3,Tag4');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue', this.tagsInput.current.getValue());
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="focus"
						onClick={() => {
							this.tagsInput.current.focus();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="resetAutoComplete"
						onClick={() => {
							this.tagsInput.current.resetAutoComplete();
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
