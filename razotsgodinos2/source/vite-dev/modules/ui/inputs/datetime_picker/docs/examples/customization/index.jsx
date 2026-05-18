import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import DateTimePicker from 'ui/inputs/datetime_picker';

import styles from './styles.less';

const title = 'DateTimePicker: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import DateTimePicker from 'ui/inputs/datetime_picker';

<DateTimePicker
	classNames={styles}	
	DropdownProps={{
		align: 'top-right',
	}}
	renderDay={(props, currentDate, selectedDate) => {
		return <td {...props}>{'0' + currentDate.date()}</td>;
	}}
	renderMonth={(props, month, year, selectedDate) => {
		return <td {...props}>{month}</td>;
	}}
	renderYear={(props, year, selectedDate) => {
		return <td {...props}>{year % 100}</td>;
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
				classNames={styles}
				DropdownProps={{
					align: 'top-right',
				}}
				renderDay={(props, currentDate, selectedDate) => {
					return <td {...props}>{'0' + currentDate.date()}</td>;
				}}
				renderMonth={(props, month, year, selectedDate) => {
					return <td {...props}>{month}</td>;
				}}
				renderYear={(props, year, selectedDate) => {
					return <td {...props}>{year % 100}</td>;
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
