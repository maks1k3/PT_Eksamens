import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CircleLoader from 'ui/animation/spinners/circle_loader';

import styles from './styles.less';

const title = 'CircleLoader';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CircleLoader from 'ui/animation/spinners/circle_loader';

<CircleLoader />
<CircleLoader classNames={styles}/>
<CircleLoader center={false}/>
<CircleLoader pageCenter={true}/>
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
				<CircleLoader />
			</div>

			<h2>Custom calssNames</h2>
			<div>
				<CircleLoader classNames={styles} />
			</div>

			<h2>Not centered</h2>
			<div>
				<CircleLoader center={false} />
			</div>

			<h2>PageCenter</h2>
			<div
				style={{
					position: 'relative',
					height: '200px',
					border: '1px solid #ccc',
				}}>
				<CircleLoader pageCenter={true} />
			</div>
		</ExampleHolder>
	);
};

export default Example;
