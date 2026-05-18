import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ImageAdministration from 'ui/media/administration/image/cms';

const title = 'ImageAdministration: cms';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Should be used in cms administration.',
	code: `
import ImageAdministration from 'ui/media/administration/image/cms';

//basic
<ImageAdministration
	id={2}
/>

//advanced
<ImageAdministration
	id={2}
	showDelete={true}
	onUpdate={({ response, image, ImageAdministration }) => {
		console.log('onUpdate:', { response, image, ImageAdministration });
	}}
	onDelete={({ response, image, ImageAdministration }) => {
		console.log('onDelete:', { response, image, ImageAdministration });
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
			<ImageAdministration
				id={2}
				showDelete={true}
				onUpdate={({ response, image, ImageAdministration }) => {
					console.log('onUpdate:', { response, image, ImageAdministration });
				}}
				onDelete={({ response, image, ImageAdministration }) => {
					console.log('onDelete:', { response, image, ImageAdministration });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
