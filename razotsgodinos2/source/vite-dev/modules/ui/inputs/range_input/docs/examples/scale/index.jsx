import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RangeInput from 'ui/inputs/range_input';

const title = 'RangeInput: scale, valueLabelFormat';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RangeInput from 'ui/inputs/range_input';

function valueLabelFormat(value) {
	const [coefficient, exponent] = value
		.toExponential()
		.split('e')
		.map(item => Number(item));
	return \`\${Math.round(coefficient)}e^\${exponent}\`;
}

<RangeInput
	min={0}
	step={0.1}
	max={6}
	scale={x => x ** 10}
	valueLabelFormat={valueLabelFormat}
	valueLabelDisplay="auto"
	onChange={({ value, RangeInput }) => {
		console.log('onChange:', { value, RangeInput });
	}}
/>
  `,
};

function valueLabelFormat(value) {
	const [coefficient, exponent] = value
		.toExponential()
		.split('e')
		.map(item => Number(item));
	return `${Math.round(coefficient)}e^${exponent}`;
}

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<RangeInput
				min={0}
				step={0.1}
				max={6}
				scale={x => x ** 10}
				valueLabelFormat={valueLabelFormat}
				valueLabelDisplay="auto"
				onChange={({ value, RangeInput }) => {
					console.log('onChange:', { value, RangeInput });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
