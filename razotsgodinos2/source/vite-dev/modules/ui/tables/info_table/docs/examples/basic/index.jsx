import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import InfoTable from 'ui/tables/info_table';

const title = 'InfoTable: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import InfoTable from 'ui/tables/info_table';

const rows = [];

rows.push({
	title: 'Name',
	value: 'Peter',
});

rows.push({
	title: 'Surname',
	value: 'Parker',
});

rows.push({
	title: 'Age',
	value: <b>33</b>,
});

<InfoTable rows={rows}/>
  `,
};

const rows = [];

rows.push({
	title: 'Name',
	value: 'Peter',
});

rows.push({
	title: 'Surname',
	value: 'Parker',
});

rows.push({
	title: 'Age',
	value: <b>33</b>,
});

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<InfoTable rows={rows} />
		</ExampleHolder>
	);
};

export default Example;
