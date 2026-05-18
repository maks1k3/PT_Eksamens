import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CubeGridLoader from 'ui/animation/three_dimensional/cube_grid_loader';

import styles from './styles.less';

const title = 'CubeGridLoader';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CubeGridLoader from 'ui/animation/three_dimensional/cube_grid_loader';

<CubeGridLoader />
<CubeGridLoader classNames={styles}/>
<CubeGridLoader center={false}/>
<CubeGridLoader pageCenter={true}/>
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
				<CubeGridLoader />
			</div>

			<h2>Custom calssNames</h2>
			<div>
				<CubeGridLoader classNames={styles} />
			</div>

			<h2>Not centered</h2>
			<div>
				<CubeGridLoader center={false} />
			</div>

			<h2>PageCenter</h2>
			<div
				style={{
					position: 'relative',
					height: '200px',
					border: '1px solid #ccc',
				}}>
				<CubeGridLoader pageCenter={true} />
			</div>
		</ExampleHolder>
	);
};

export default Example;
