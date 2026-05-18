import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'VideoPopup: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
openPopup({
  name: 'video',
  data:{
    current: 0,
    items:[
      {
        src: 'https://www.youtube.com/embed/UprcpdwuwCg',
        provider: 'youtube',
      },
    ]
  }
});
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Button
				title="Show"
				onClick={() => {
					openPopup({
						name: 'video',
						data: {
							current: 0,
							items: [
								{
									src: 'https://www.youtube.com/embed/UprcpdwuwCg',
									provider: 'youtube',
								},
							],
						},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
