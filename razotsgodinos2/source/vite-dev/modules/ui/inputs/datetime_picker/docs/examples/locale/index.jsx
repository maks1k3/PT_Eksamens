import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import DateTimePicker from 'ui/inputs/datetime_picker';

const title = 'DateTimePicker: locale';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import DateTimePicker from 'ui/inputs/datetime_picker';

//en
<DateTimePicker
  locale="en"
/>

//ru
<DateTimePicker
  locale="ru"
/>

//lv
<DateTimePicker
  locale="lv"
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
			<h3>EN</h3>
			<DateTimePicker locale="en" />
			<h3>RU</h3>
			<DateTimePicker locale="ru" />
			<h3>LV</h3>
			<DateTimePicker locale="lv" />
		</ExampleHolder>
	);
};

export default Example;
