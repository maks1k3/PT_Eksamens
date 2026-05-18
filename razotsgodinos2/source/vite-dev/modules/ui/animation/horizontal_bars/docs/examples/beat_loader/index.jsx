import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import BeatLoader from 'ui/animation/horizontal_bars/beat_loader';

import styles from './styles.less';

const title = 'BeatLoader';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import BeatLoader from 'ui/animation/horizontal_bars/beat_loader';

<BeatLoader />
<BeatLoader classNames={styles}/>
<BeatLoader center={false}/>
<BeatLoader pageCenter={true}/>
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
				<BeatLoader />
			</div>

			<h2>Custom calssNames</h2>
			<div>
				<BeatLoader classNames={styles} />
			</div>

			<h2>Not centered</h2>
			<div>
				<BeatLoader center={false} />
			</div>

			<h2>PageCenter</h2>
			<div
				style={{
					position: 'relative',
					height: '200px',
					border: '1px solid #ccc',
				}}>
				<BeatLoader pageCenter={true} />
			</div>
		</ExampleHolder>
	);
};

export default Example;
