import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AdministrationLayout from 'ui/layout/administration';

const title = 'AdministrationLayout: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AdministrationLayout from 'ui/layout/administration';

//your custom components
import Sidebar from './components/sidebar'
import Content from './components/content'

<AdministrationLayout
	homePageLink="/administration"
	backgroundColor="#37474F"
	title="Administration"
	Sidebar={Sidebar}
	Content={Content}
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
