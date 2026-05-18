import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import DateTimePicker from 'ui/inputs/datetime_picker';

const title = 'DateTimePicker: viewMode';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import DateTimePicker from 'ui/inputs/datetime_picker';

<DateTimePicker
  viewMode="days"//'years', 'months', 'days', 'time'
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
			<DateTimePicker placeholder="years" viewMode="years" />
			<DateTimePicker placeholder="months" viewMode="months" />
			<DateTimePicker placeholder="days" viewMode="days" />
			<DateTimePicker placeholder="time" viewMode="time" />
		</ExampleHolder>
	);
};

export default Example;
