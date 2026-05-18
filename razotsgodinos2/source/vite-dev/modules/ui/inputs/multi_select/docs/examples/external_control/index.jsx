import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import MultiSelect from 'ui/inputs/multi_select';
import Button from 'ui/controls/button';

const title = 'MultiSelect: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import MultiSelect from 'ui/inputs/multi_select';

class Test extends Component {
	constructor(props) {
		super(props);
		this.multi_select = React.createRef();

		this.state = {
			value: '',
		};
	}

	render() {
		const { value, valueId } = this.state;
		return (
			<div>
				<div className="margin-bottom">
					<MultiSelect
						searchable={true}
						ref={this.multi_select}
						onChange={({ value }) => {
							console.log('onChange', value);
						}}
						value='option_4,option_3'
						options={[
							{
								value: 'option_1',
								label: 'Option 1',
							},
							{
								value: 'option_2',
								label: 'Option 2',
							},
							{
								value: 'option_3',
								label: 'Option 3',
							},
							{
								value: 'option_4',
								label: 'Option 4',
							},

							{
								value: 'option_5',
								label: 'Option 5',
							},
						]}
					/>

					<div className="margin-bottom">
						<Button
							title="Set value to: option_2,option_3"
							onClick={() => {
								this.multi_select.current.setValue('option_2,option_3');
							}}
						/>
					</div>
					<div className="margin-bottom">
						<Button
							title="setValue"
							onClick={() => {
								this.multi_select.current.setValue('option_1');
							}}
						/>
					</div>
					<div className="margin-bottom">
						<Button
							title="Add option 4 to existing selected values"
							onClick={() => {
								this.multi_select.current.addValue('option_4');
							}}
						/>
					</div>
					<div className="margin-bottom">
						<Button
							title="Remove option 4 from existing selected values"
							onClick={() => {
								this.multi_select.current.removeValue('option_4');
							}}
						/>
					</div>
					<div className="margin-bottom">
						<Button
							title="Select all"
							onClick={() => {
								this.multi_select.current.selectAll();
							}}
						/>
					</div>
					<div className="margin-bottom">
						<Button
							title="Unselect all"
							onClick={() => {
								this.multi_select.current.unselectAll();
							}}
						/>
					</div>

					<div className="margin-bottom">
						<Button
							title="getValue"
							onClick={() => {
								console.log(
									'getValue:',
									this.multi_select.current.getValue(),
								);
							}}
						/>
					</div>
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
		this.multi_select = React.createRef();

		this.state = {
			value: '',
		};
	}

	render() {
		const { value, valueId } = this.state;
		return (
			<div>
				<div className="margin-bottom">
					<MultiSelect
						searchable={true}
						ref={this.multi_select}
						onChange={({ value }) => {
							console.log('onChange', value);
						}}
						value={'option_4,option_3'}
						options={[
							{
								value: 'option_1',
								label: 'Option 1',
							},
							{
								value: 'option_2',
								label: 'Option 2',
							},
							{
								value: 'option_3',
								label: 'Option 3',
							},
							{
								value: 'option_4',
								label: 'Option 4',
							},

							{
								value: 'option_5',
								label: 'Option 5',
							},
						]}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Set value to: option_2,option_3"
						onClick={() => {
							this.multi_select.current.setValue('option_2,option_3');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="setValue"
						onClick={() => {
							this.multi_select.current.setValue('option_1');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Add option 4 to existing selected values"
						onClick={() => {
							this.multi_select.current.addValue('option_4');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Remove option 4 from existing selected values"
						onClick={() => {
							this.multi_select.current.removeValue('option_4');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Select all"
						onClick={() => {
							this.multi_select.current.selectAll();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="Unselect all"
						onClick={() => {
							this.multi_select.current.unselectAll();
						}}
					/>
				</div>

				<div className="margin-bottom">
					<Button
						title="getValue"
						onClick={() => {
							console.log('getValue:', this.multi_select.current.getValue());
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
