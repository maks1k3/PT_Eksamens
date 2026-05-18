import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import DateTimePicker from 'ui/inputs/datetime_picker';

const title = 'DateTimePicker: timeConstraints';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		"Add some constraints to the timepicker. It accepts an object with the format { hours: { min: 9, max: 15, step: 2 }}, this example means the hours can't be lower than 9 and higher than 15, and it will change adding or subtracting 2 hours everytime the buttons are clicked. The constraints can be added to the hours, minutes, seconds and milliseconds.",
	code: `
import DateTimePicker from 'ui/inputs/datetime_picker';

<DateTimePicker
  timeConstraints={{
    hours: { min: 9, max: 15, step: 2 },
    minutes: { min: 10, max: 50, step: 5 },
    seconds: { min: 10, max: 50, step: 10 },
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
				timeConstraints={{
					hours: { min: 9, max: 15, step: 2 },
					minutes: { min: 10, max: 50, step: 5 },
					seconds: { min: 10, max: 50, step: 10 },
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
