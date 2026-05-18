import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import VideoAdministration from 'ui/media/administration/video/cms';

const title = 'VideoAdministration: cms';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Should be used in cms administration.',
	code: `
import VideoAdministration from 'ui/media/administration/video/cms';

//basic
<VideoAdministration
	id={2}
/>

//advanced
<VideoAdministration
	id={2}
	showDelete={true}
	onUpdate={({ response, video, VideoAdministration }) => {
		console.log('onUpdate:', { response, video, VideoAdministration });
	}}
	onDelete={({ response, video, VideoAdministration }) => {
		console.log('onDelete:', { response, video, VideoAdministration });
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
			<VideoAdministration
				id={2}
				showDelete={true}
				onUpdate={({ response, video, VideoAdministration }) => {
					console.log('onUpdate:', { response, video, VideoAdministration });
				}}
				onDelete={({ response, video, VideoAdministration }) => {
					console.log('onDelete:', { response, video, VideoAdministration });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
