import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import FlippingSquareLoader from 'ui/animation/three_dimensional/flipping_square_loader';

import styles from './styles.less';

const title = 'FlippingSquareLoader';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import FlippingSquareLoader from 'ui/animation/three_dimensional/flipping_square_loader';

<FlippingSquareLoader />
<FlippingSquareLoader classNames={styles}/>
<FlippingSquareLoader center={false}/>
<FlippingSquareLoader pageCenter={true}/>
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
				<FlippingSquareLoader />
			</div>

			<h2>Custom calssNames</h2>
			<div>
				<FlippingSquareLoader classNames={styles} />
			</div>

			<h2>Not centered</h2>
			<div>
				<FlippingSquareLoader center={false} />
			</div>

			<h2>PageCenter</h2>
			<div
				style={{
					position: 'relative',
					height: '200px',
					border: '1px solid #ccc',
				}}>
				<FlippingSquareLoader pageCenter={true} />
			</div>
		</ExampleHolder>
	);
};

export default Example;
