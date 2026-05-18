import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title = 'Field: label';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'If label is undefined only input and error text on validation error will be renderd. Use render property for full render customization.',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

<Form
	action="actions/success"
	submit={{
		title: 'Save',
	}}>
	<div style={{ display: 'flex' }}>
		<span style={{ fontWeight: 'bold' }}>Field 1</span>
		<div style={{ flex: '1 1 0' }}>
			<Field name="field_1" component={Input} isRequired={true} />
		</div>
	</div>
	<div style={{ display: 'flex' }}>
		<span style={{ fontWeight: 'bold' }}>Field 2</span>
		<div style={{ flex: '1 1 0' }}>
			<Field name="field_2" component={Input} />
		</div>
	</div>
</Form>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Form
				action="actions/success"
				submit={{
					title: 'Save',
				}}>
				<div style={{ display: 'flex' }}>
					<span style={{ fontWeight: 'bold' }}>Field 1</span>
					<div style={{ flex: '1 1 0' }}>
						<Field name="field_1" component={Input} isRequired={true} />
					</div>
				</div>
				<div style={{ display: 'flex' }}>
					<span style={{ fontWeight: 'bold' }}>Field 2</span>
					<div style={{ flex: '1 1 0' }}>
						<Field name="field_2" component={Input} />
					</div>
				</div>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
