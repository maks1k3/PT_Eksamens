import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import VideosAdministration from 'ui/media/administration/videos/main';

const title = 'VideosAdministration: main';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Should be used in administration panel.',
	code: `
import VideosAdministration from 'ui/media/administration/videos/main';

//basic
<VideosAdministration
	containerName="example_videos_administration"
	containerId={0}
/>

//advanced
<VideosAdministration
	containerName="example_videos_administration"
	containerId={0}
	addNewItemsTo="end" //end,start
	showEdit={true}
	showDelete={true}
	onChange={({ items, VideosAdministration }) => {
		console.log('onChange:', { items, VideosAdministration });
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
			<VideosAdministration
				containerName="example_videos_administration"
				containerId={0}
				addNewItemsTo="end" //end,start
				showEdit={true}
				showDelete={true}
				onChange={({ items, VideosAdministration }) => {
					console.log('onChange:', { items, VideosAdministration });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
