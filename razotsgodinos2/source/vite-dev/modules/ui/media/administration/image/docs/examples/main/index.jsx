import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ImageAdministration from 'ui/media/administration/image/main';

const title = 'ImageAdministration: main';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Should be used in administration panel.',
	code: `
import ImageAdministration from 'ui/media/administration/image/main';

//basic
<ImageAdministration
	id={1}
/>

//advanced
<ImageAdministration
	id={1}
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
				id={1}
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
