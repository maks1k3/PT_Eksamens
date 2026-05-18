import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'DataTable Controls: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Controls from 'ui/tables/data_table/components/controls';

<Controls
	id="dt_basic_example"
	classNames={classNames}
	enabled={true}
	options={{
		filters: {
			show: true,
			icon: {
				provider: 'fa',
				name: 'filter',
			},
			maxWidth: '600px',
			level: 10,
		},
		columnVisibility: {
			show: true,
			icon: {
				provider: 'fa',
				name: 'eye',
			},
			maxWidth: '400px',
			level: 10,
		},
		reset: {
			show: true,
			icon: {
				provider: 'fa',
				name: 'times',
			},
		},
		refresh: {
			show: true,
			icon: {
				provider: 'fa',
				name: 'refresh',
			},
		},
	}}
	columns={columns}
	filters={filters}
	callbacks={callbacks}
	translations={{
		filtersTitle: 'Filters',
		filtersSubmit: 'Filter',
		columnVisibilityTitle: 'Column visibility',
		columnVisibilitySubmit: 'Apply',
		toggleAll: 'Toggle all',
		reset: 'Reset',
		refresh: 'Refresh',
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
