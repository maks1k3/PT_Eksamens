import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import DateTimePicker from 'ui/inputs/datetime_picker';

const title = 'DateTimePicker: isValidDate';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'It is possible to disable dates in the calendar if the user are not allowed to select them, e.g. dates in the past. This is done using the prop isValidDate, which admits a function in the form function(currentDate, selectedDate) where both arguments are moment objects. The function shall return true for selectable dates, and false for disabled ones.',
	code: `
import DateTimePicker from 'ui/inputs/datetime_picker';

// Let's use the static moment reference in the Datetime component
const yesterday = moment().subtract( 1, 'day' );
const valid = function( current ){
    return current.isAfter( yesterday );
};
<DateTimePicker isValidDate={ valid } />

It's also possible to disable the weekends, as shown in the example below.
const valid = function( current ){
    return current.day() !== 0 && current.day() !== 6;
};
<DateTimePicker isValidDate={ valid } />
  `,
};

const yesterday = moment().subtract(1, 'day');
const valid = function(current) {
	return current.isAfter(yesterday);
};

const valid2 = function(current) {
	return current.day() !== 0 && current.day() !== 6;
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<h3>All dates before today disabled</h3>
			<DateTimePicker isValidDate={valid} />
			<h3>Disable the weekends</h3>
			<DateTimePicker isValidDate={valid2} />
		</ExampleHolder>
	);
};

export default Example;
