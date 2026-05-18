import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Input from 'ui/inputs/input';

const title = 'Input: numbers';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Input from 'ui/inputs/input';

//Only integers
<Input
	placeholder="Only integers"
	number={{
		allowNegative: false,
		allowDecimal: false,
	}}
/>

//Negative integers
<Input
	placeholder="Negative integers"
	number={{
		allowNegative: true,
		allowDecimal: false,
	}}
/>

//Floats
<Input
	placeholder="Floats"
	number={{
		allowNegative: false,
		allowDecimal: true,
	}}
/>

//Positive and negative floats
<Input
	placeholder="Positive and negative floats"
	number={{
		allowNegative: true,
		allowDecimal: true,
	}}
/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<h3>Only integers</h3>
			<Input
				placeholder="Only integers"
				number={{
					allowNegative: false,
					allowDecimal: false,
				}}
			/>
			<h3>Negative integers</h3>
			<Input
				placeholder="Negative integers"
				number={{
					allowNegative: true,
					allowDecimal: false,
				}}
			/>
			<h3>Floats</h3>
			<Input
				placeholder="Floats"
				number={{
					allowNegative: false,
					allowDecimal: true,
				}}
			/>
			<h3>Positive and negative floats</h3>
			<Input
				placeholder="Positive and negative floats"
				number={{
					allowNegative: true,
					allowDecimal: true,
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
