import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'DataTable Length: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Length from 'ui/tables/data_table/components/length';

<Length
	id="dt_basic_example"
	classNames={classNames}
	translations={{
		rows: 'rows',
		all: 'all',
	}}
	SelectProps={{
		options: [
			{
				value: 10,
				label: '10 :rows',
			},
			{
				value: 20,
				label: '20 :rows',
			},
			{
				value: 50,
				label: '50 :rows',
			},
			{
				value: 100,
				label: '100 :rows',
			},
			{
				value: 'all',
				label: ':all',
			},
		],
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
			code={info.code}
		/>
	);
};

export default Example;
