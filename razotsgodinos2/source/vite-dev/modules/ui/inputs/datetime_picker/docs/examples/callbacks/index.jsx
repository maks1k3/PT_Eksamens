import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import DateTimePicker from 'ui/inputs/datetime_picker';

const title = 'DateTimePicker: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import DateTimePicker from 'ui/inputs/datetime_picker';

<DateTimePicker
	onChange={({ value, DateTimePicker }) => {
		console.log('onChange:', { value, DateTimePicker });
	}}
	onViewModeChange={({ mode, DateTimePicker }) => {
		console.log('onViewModeChange:', { DateTimePicker });
	}}
	onOpen={({ DateTimePicker }) => {
		console.log('onOpen:', { DateTimePicker });
	}}
	onClose={({ DateTimePicker }) => {
		console.log('onClose:', { DateTimePicker });
	}}
	onBlur={({ value, DateTimePicker }) => {
		console.log('onBlur:', { value, DateTimePicker });
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
			<DateTimePicker
				onChange={({ value, DateTimePicker }) => {
					console.log('onChange:', { value, DateTimePicker });
				}}
				onViewModeChange={({ mode, DateTimePicker }) => {
					console.log('onViewModeChange:', { DateTimePicker });
				}}
				onOpen={({ DateTimePicker }) => {
					console.log('onOpen:', { DateTimePicker });
				}}
				onClose={({ DateTimePicker }) => {
					console.log('onClose:', { DateTimePicker });
				}}
				onBlur={({ value, DateTimePicker }) => {
					console.log('onBlur:', { value, DateTimePicker });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
