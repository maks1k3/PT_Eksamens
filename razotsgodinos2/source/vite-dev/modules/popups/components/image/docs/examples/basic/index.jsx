import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'ImagePopup: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
openPopup({
  name: 'image',
  data:{
    current: 0,
    items:[
      {
        src: 'http://img-fotki.yandex.ru/get/59572/110661898.1b/0_15d8c0_2c9c766b_orig.jpg',
        title: 'Image 1',
      },
      {
        src: 'http://img-fotki.yandex.ru/get/194503/110661898.1b/0_16d43b_2acff364_orig.jpg',
        title: 'Image 2',
      },
      {
        src: 'http://img-fotki.yandex.ru/get/56406/110661898.1b/0_16ba19_9593abf1_orig.jpg',
        title: 'Image 3',
      }
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
						name: 'image',
						data: {
							current: 0,
							items: [
								{
									src:
										'http://img-fotki.yandex.ru/get/59572/110661898.1b/0_15d8c0_2c9c766b_orig.jpg',
									title: 'Image 1',
								},
								{
									src:
										'http://img-fotki.yandex.ru/get/194503/110661898.1b/0_16d43b_2acff364_orig.jpg',
									title: 'Image 2',
								},
								{
									src:
										'http://img-fotki.yandex.ru/get/56406/110661898.1b/0_16ba19_9593abf1_orig.jpg',
									title: 'Image 3',
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
