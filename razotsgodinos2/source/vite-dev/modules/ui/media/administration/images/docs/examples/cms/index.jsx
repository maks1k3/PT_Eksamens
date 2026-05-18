import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ImagesAdministration from 'ui/media/administration/images/cms';

const title = 'ImagesAdministration: cms';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Should be used in cms administration.',
	code: `
import ImagesAdministration from 'ui/media/administration/images/cms';

//basic
<ImagesAdministration
	containerName="example_images_collection"
	containerId={0}
/>

//advanced
<ImagesAdministration
	containerName="example_images_collection"
	containerId={0}
	addNewItemsTo="end" //end,start
	showEdit={true}
	showDelete={true}
	onChange={({ items, ImagesAdministration }) => {
		console.log('onChange:', { items, ImagesAdministration });
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
			code={info.code}>
			<ImagesAdministration
				containerName="example_images_collection"
				containerId={0}
				addNewItemsTo="end" //end,start
				showEdit={true}
				showDelete={true}
				onChange={({ items, ImagesAdministration }) => {
					console.log('onChange:', { items, ImagesAdministration });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
