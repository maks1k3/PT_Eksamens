import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'VideoPopup: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
openPopup({
  name: 'video',
  data:{
    current: 2,
    hideOnOverlayClick: false,
    autoPlay: false,
    PopupProps: {
      showOverlay: false,
    },
    items:[
      {
        src:'https://www.youtube.com/embed/UprcpdwuwCg',
        provider: 'youtube',
      },
      {
        src:'https://www.youtube.com/embed/ifBM3SY3G-s',
        provider: 'youtube',
      },
      {
        src:'https://www.youtube.com/embed/1TB1x67Do5U',
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
							current: 2,
							hideOnOverlayClick: false,
							autoPlay: false,
							PopupProps: {
								showOverlay: false,
							},
							items: [
								{
									src: 'https://www.youtube.com/embed/UprcpdwuwCg',
									provider: 'youtube',
								},
								{
									src: 'https://www.youtube.com/embed/ifBM3SY3G-s',
									provider: 'youtube',
								},
								{
									src: 'https://www.youtube.com/embed/1TB1x67Do5U',
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
