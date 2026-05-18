import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import DateTimePicker from 'ui/inputs/datetime_picker';

const title = 'DateTimePicker: timeFormat';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import DateTimePicker from 'ui/inputs/datetime_picker';

<DateTimePicker
  placeholder="Date picker"
  timeFormat={false}
/>
<DateTimePicker
  placeholder="HH:mm:ss.SSS"
  timeFormat="HH:mm:ss.SSS"
/>
<DateTimePicker
  placeholder="H:mm:ss a"
  timeFormat="H:mm:ss a"
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
			<DateTimePicker placeholder="Date picker" timeFormat={false} />
			<DateTimePicker placeholder="HH:mm:ss.SSS" timeFormat="HH:mm:ss.SSS" />
			<DateTimePicker placeholder="H:mm:ss a" timeFormat="H:mm:ss a" />
		</ExampleHolder>
	);
};

export default Example;
