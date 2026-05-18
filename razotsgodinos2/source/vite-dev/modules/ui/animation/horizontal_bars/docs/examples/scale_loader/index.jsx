import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ScaleLoader from 'ui/animation/horizontal_bars/scale_loader';

import styles from './styles.less';

const title = 'ScaleLoader';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ScaleLoader from 'ui/animation/horizontal_bars/scale_loader';

<ScaleLoader />
<ScaleLoader classNames={styles}/>
<ScaleLoader center={false}/>
<ScaleLoader pageCenter={true}/>
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
				<ScaleLoader />
			</div>

			<h2>Custom calssNames</h2>
			<div>
				<ScaleLoader classNames={styles} />
			</div>

			<h2>Not centered</h2>
			<div>
				<ScaleLoader center={false} />
			</div>

			<h2>PageCenter</h2>
			<div
				style={{
					position: 'relative',
					height: '200px',
					border: '1px solid #ccc',
				}}>
				<ScaleLoader pageCenter={true} />
			</div>
		</ExampleHolder>
	);
};

export default Example;
