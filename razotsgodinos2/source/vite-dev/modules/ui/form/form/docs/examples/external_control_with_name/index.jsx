import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Button from 'ui/controls/button';

const title = 'Form: control Form with name';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Button from 'ui/controls/button';

<Form
	name="control_test_form"
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

//clear
forms.clear('control_test_form');

//getData
forms.getData('control_test_form', data => {
	console.log('getData:', data);
});

//hideResponse
forms.hideResponse('control_test_form');

//unLock
forms.unLock('control_test_form');

//reset
forms.reset('control_test_form');

//showError
forms.showError('control_test_form', 'This is error!');

//showSuccess
forms.showSuccess('control_test_form', 'This is success!');

//submit
forms.submit('control_test_form');

//unLock
forms.unLock('control_test_form');

//update
forms.update('control_test_form', {
	field_1: 'New value for field 1',
	field_3: 'New value for field 3',
});
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div>
				<div className="margin-bottom">
					<Form
						name="control_test_form"
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
							forms.getData('control_test_form', data => {
								console.log('getData:', data);
							});
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="update"
						onClick={() => {
							forms.update('control_test_form', {
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
							forms.lock('control_test_form');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="unLock"
						onClick={() => {
							forms.unLock('control_test_form');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="submit"
						onClick={() => {
							forms.submit('control_test_form');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="reset"
						onClick={() => {
							forms.reset('control_test_form');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="clear"
						onClick={() => {
							forms.clear('control_test_form');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="showSuccess"
						onClick={() => {
							forms.showSuccess('control_test_form', 'This is success!');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="showError"
						onClick={() => {
							forms.showError('control_test_form', 'This is error!');
						}}
					/>
				</div>
				<div className="margin-bottom">
					<Button
						title="hideResponse"
						onClick={() => {
							forms.hideResponse('control_test_form');
						}}
					/>
				</div>
			</div>
		</ExampleHolder>
	);
};

export default Example;
