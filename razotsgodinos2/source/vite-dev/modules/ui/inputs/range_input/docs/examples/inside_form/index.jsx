import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import RangeInput from 'ui/inputs/range_input';

const title = 'RangeInput: inside Form';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import RangeInput from 'ui/inputs/range_input';

<Form
	action="actions/success"
	submit={{
		title: 'Save',
	}}>
	<Field label="Person" name="person" component={Input} />
	<Field
		label="Age"
		name="age"
		component={RangeInput}
		componentProps={{ min: 14, max: 99, valueLabelDisplay: 'auto' }}
		value="18"
	/>
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
				<Field label="Person" name="person" component={Input} />
				<Field
					label="Age"
					name="age"
					component={RangeInput}
					componentProps={{ min: 14, max: 99, valueLabelDisplay: 'auto' }}
					value="18"
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
