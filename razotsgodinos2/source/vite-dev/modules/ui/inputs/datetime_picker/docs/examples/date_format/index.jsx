import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import DateTimePicker from 'ui/inputs/datetime_picker';

const title = 'DateTimePicker: dateFormat';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import DateTimePicker from 'ui/inputs/datetime_picker';

<DateTimePicker
  placeholder="YYYY-MM"
  dateFormat="YYYY-MM"
  timeFormat={false}
/>
<DateTimePicker
  placeholder="Time picker"
  dateFormat={false}
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
				placeholder="YYYY-MM"
				dateFormat="YYYY-MM"
				timeFormat={false}
			/>
			<DateTimePicker placeholder="Time picker" dateFormat={false} />
		</ExampleHolder>
	);
};

export default Example;
