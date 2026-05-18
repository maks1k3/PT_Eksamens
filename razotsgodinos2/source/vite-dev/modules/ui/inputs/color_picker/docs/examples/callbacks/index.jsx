import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ColorPicker from 'ui/inputs/color_picker';

const title = 'ColorPicker: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ColorPicker from 'ui/inputs/color_picker';

<ColorPicker
	onChange={({ value, ColorPicker }) => {
		console.log('onChange:', { value, ColorPicker });
	}}
	onOpen={({ DateTimePicker }) => {
		console.log('onOpen:', { ColorPicker });
	}}
	onClose={({ DateTimePicker }) => {
		console.log('onClose:', { ColorPicker });
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
			<ColorPicker
				onChange={({ value, ColorPicker }) => {
					console.log('onChange:', { value, ColorPicker });
				}}
				onOpen={({ DateTimePicker }) => {
					console.log('onOpen:', { ColorPicker });
				}}
				onClose={({ DateTimePicker }) => {
					console.log('onClose:', { ColorPicker });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
