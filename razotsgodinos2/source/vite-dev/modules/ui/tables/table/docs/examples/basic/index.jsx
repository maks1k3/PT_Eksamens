import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Table from 'ui/tables/table';

const title = 'Table: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Table from 'ui/tables/table';

<Table
	header={['ID', 'Name', 'Date', 'Value']}
	rows={[
		{
			id: '1',
			name: 'Name 1',
			date: '2017.05.06',
			value: 'This is some data',
		},
		{
			id: '2',
			name: 'Name 2',
			date: '2017.05.07',
			value: 'This is some data',
		},
		{
			id: '3',
			name: 'Name 3',
			date: '2017.05.08',
			value: 'This is some data',
		},
	]}
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
			<Table
				header={['ID', 'Name', 'Date', 'Value']}
				rows={[
					{
						id: '1',
						name: 'Name 1',
						date: '2017.05.06',
						value: 'This is some data',
					},
					{
						id: '2',
						name: 'Name 2',
						date: '2017.05.07',
						value: 'This is some data',
					},
					{
						id: '3',
						name: 'Name 3',
						date: '2017.05.08',
						value: 'This is some data',
					},
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
