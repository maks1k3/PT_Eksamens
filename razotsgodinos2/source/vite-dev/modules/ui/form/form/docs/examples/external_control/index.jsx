import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Button from 'ui/controls/button';

const title = 'Form: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);
		this.form = React.createRef();
	}

	render() {
		return (
			<div>
				<div className="margin-bottom">
					<Form
						ref={this.form}
						action="actions/success"
						submit={{
							title: 'Save',
						}}>
						<Field label="Field 1" name="field_1" component={Input} />
						<Field
							label="Field 2"
							name="field_2"
							component={Input}
							value="Some value"
						/>
						<Field label="Field 3" name="field_3" component={Input} />
					</Form>
				</div>

				<div className="margin-bottom">
					<Button
						title="getData"
						onClick={() => {
							const data = this.form.current.getData();
							console.log('getData:', data);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="update"
						onClick={() => {
							this.form.current.update({
								field_1: 'New value for field 1',
								field_3: 'New value for field 3',
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="lock"
						onClick={() => {
							this.form.current.lock();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="unLock"
						onClick={() => {
							this.form.current.unLock();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="submit"
						onClick={() => {
							this.form.current.submit();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="reset"
						onClick={() => {
							this.form.current.reset();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="clear"
						onClick={() => {
							this.form.current.clear();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="showSuccess"
						onClick={() => {
							this.form.current.showSuccess('This is success!');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="showError"
						onClick={() => {
							this.form.current.showError('This is error!');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="hideResponse"
						onClick={() => {
							this.form.current.hideResponse();
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
		this.form = React.createRef();
	}

	render() {
		return (
			<div>
				<div className="margin-bottom">
					<Form
						ref={this.form}
						action="actions/success"
						submit={{
							title: 'Save',
						}}>
						<Field label="Field 1" name="field_1" component={Input} />
						<Field
							label="Field 2"
							name="field_2"
							component={Input}
							value="Some value"
						/>
						<Field label="Field 3" name="field_3" component={Input} />
					</Form>
				</div>

				<div className="margin-bottom">
					<Button
						title="getData"
						onClick={() => {
							const data = this.form.current.getData();
							console.log('getData:', data);
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="update"
						onClick={() => {
							this.form.current.update({
								field_1: 'New value for field 1',
								field_3: 'New value for field 3',
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="lock"
						onClick={() => {
							this.form.current.lock();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="unLock"
						onClick={() => {
							this.form.current.unLock();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="submit"
						onClick={() => {
							this.form.current.submit();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="reset"
						onClick={() => {
							this.form.current.reset();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="clear"
						onClick={() => {
							this.form.current.clear();
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="showSuccess"
						onClick={() => {
							this.form.current.showSuccess('This is success!');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="showError"
						onClick={() => {
							this.form.current.showError('This is error!');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="hideResponse"
						onClick={() => {
							this.form.current.hideResponse();
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
