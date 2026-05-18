import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CollectionAdministration from 'cms/collection_administration';

const title = 'CollectionAdministration: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CollectionAdministration from 'cms/collection_administration';

<CollectionAdministration
	action="add" //'add', 'edit', 'sort'
	id={1}
	name="some_collection_name"
	collectionId={0}
	getTitle={collectionItem => {
		const { title } = _.get(collectionItem, 'data', {});

		return \`\${title}\`;
	}}
	Edit={Edit}
	extra={{
		page: true,
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
