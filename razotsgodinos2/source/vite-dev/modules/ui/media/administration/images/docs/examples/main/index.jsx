import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ImagesAdministration from 'ui/media/administration/images/main';

const title = 'ImagesAdministration: main';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Should be used in administration panel.',
	code: `
import ImagesAdministration from 'ui/media/administration/images/main';

//basic
<ImagesAdministration
	containerName="example_images_administration"
	containerId={0}
/>

//advanced
<ImagesAdministration
	containerName="example_images_administration"
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
				containerName="example_images_administration"
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
