import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import DateTimePicker from 'ui/inputs/datetime_picker';

const title = 'DateTimePicker: icon';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import DateTimePicker from 'ui/inputs/datetime_picker';

<DateTimePicker icon={{ provider: 'mdi', name: 'calendar' }} />
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<DateTimePicker icon={{ provider: 'mdi', name: 'calendar' }} />
		</ExampleHolder>
	);
};

export default Example;
