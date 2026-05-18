import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AdministrationLayout from 'ui/layout/administration';

const title = 'AdministrationLayout: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AdministrationLayout from 'ui/layout/administration';

//your custom components
import Sidebar from './components/sidebar'
import Content from './components/content'
import Right from './components/right'

<AdministrationLayout
	homePageLink="/administration"
	homePageLinkMode="history"
	backgroundColor="#4caf50"
	title="Some page administration"
	logo={_g.getMainUrl()+'img/logo/logo.svg'}
	drawerType="touch"
	Sidebar={Sidebar}
	Content={Content}
	Right={Right}
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
