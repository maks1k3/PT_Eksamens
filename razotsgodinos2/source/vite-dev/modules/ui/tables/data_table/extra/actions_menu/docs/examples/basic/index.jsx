import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'DataTable ActionsMenu: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

<ActionsMenu
	classNames={classNames}
	icon={{
		provider: 'icomoon',
		name: 'menu9',
	}}
	options={[
		{
			title: 'View',
			icon: {
				provider: 'icomoon',
				name: 'file-text',
			},
			onClick: () => {
				console.log({ View: { id, cell, row } });
			},
		},
		{
			title: 'Edit',
			icon: {
				provider: 'icomoon',
				name: 'pencil',
			},
			onClick: () => {
				console.log({ Edit: { id, cell, row } });
			},
		},
		{
			title: 'Delete',
			icon: {
				provider: 'icomoon',
				name: 'trash',
			},
			onClick: () => {
				console.log({ Delete: { id, cell, row } });
			},
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
			code={info.code}
		/>
	);
};

export default Example;
