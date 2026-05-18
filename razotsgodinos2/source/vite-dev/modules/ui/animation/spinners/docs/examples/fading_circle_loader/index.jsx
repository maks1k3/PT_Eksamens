import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FadingCircleLoader from 'ui/animation/spinners/fading_circle_loader';

import styles from './styles.less';

const title = 'FadingCircleLoader';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FadingCircleLoader from 'ui/animation/spinners/fading_circle_loader';

<FadingCircleLoader />
<FadingCircleLoader classNames={styles}/>
<FadingCircleLoader center={false}/>
<FadingCircleLoader pageCenter={true}/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<h2>Basic</h2>
			<div>
				<FadingCircleLoader />
			</div>

			<h2>Custom calssNames</h2>
			<div>
				<FadingCircleLoader classNames={styles} />
			</div>

			<h2>Not centered</h2>
			<div>
				<FadingCircleLoader center={false} />
			</div>

			<h2>PageCenter</h2>
			<div
				style={{
					position: 'relative',
					height: '200px',
					border: '1px solid #ccc',
				}}>
				<FadingCircleLoader pageCenter={true} />
			</div>
		</ExampleHolder>
	);
};

export default Example;
