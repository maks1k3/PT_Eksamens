import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Thumbnail from 'ui/media/thumbnail';

const title = 'ViewerJs: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Thumbnail from 'ui/media/thumbnail';

<Thumbnail
	src="https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg"
	width="200px"
	height="200px"
	onClick={() => {
		_g.gallery('viewerJs', 'open', {
			items: [
				{
					image:
						'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg',
					title: 'Dummy caption',
				},
			],
			current: 0,
		});
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
			<Thumbnail
				src="https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg"
				width="200px"
				height="200px"
				onClick={() => {
					_g.gallery('viewerJs', 'open', {
						items: [
							{
								image:
									'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg',
								title: 'Dummy caption',
							},
						],
						current: 0,
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
