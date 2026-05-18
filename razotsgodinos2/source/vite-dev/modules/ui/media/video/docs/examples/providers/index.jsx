import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Video from 'ui/media/video';

const title = 'Video: providers';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Video from 'ui/media/video'

<Video
  provider="youtube"
  src="https://www.youtube.com/embed/eO-0_lecfKg"
/>

<Video
  provider="coub"
  src="https://coub.com/embed/opzh9"
/>

<Video
  provider="vimeo"
  src="https://player.vimeo.com/video/168572637"
/>

<Video
  provider="rutube"
  src="https://rutube.ru/play/embed/1fbc51ed5c522a3172c96f4af83c628b"
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
			<div>
				<h2>Youtube </h2>
				<Video
					provider="youtube"
					src="https://www.youtube.com/embed/eO-0_lecfKg"
				/>
			</div>

			<div>
				<h2>Coub </h2>
				<Video provider="coub" src="https://coub.com/embed/opzh9" />
			</div>

			<div>
				<h2>Vimeo </h2>
				<Video
					provider="vimeo"
					src="https://player.vimeo.com/video/168572637"
				/>
			</div>

			<div>
				<h2>Rutube </h2>
				<Video
					provider="rutube"
					src="https://rutube.ru/play/embed/1fbc51ed5c522a3172c96f4af83c628b"
				/>
			</div>
		</ExampleHolder>
	);
};

export default Example;
