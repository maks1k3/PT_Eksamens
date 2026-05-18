import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Loading from 'ui/misc/loading';
import styles from './styles.less';
import FlippingSquareLoader from 'ui/animation/three_dimensional/flipping_square_loader';
import loaderStyles from './loaderStyles.less';

const title = 'Loading: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Loading from 'ui/misc/loading';
import FlippingSquareLoader from 'ui/animation/three_dimensional/flipping_square_loader';

<Loading
	classNames={styles}
	loaderClassNames={loaderStyles}
	Loader={FlippingSquareLoader}
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
			<Loading
				classNames={styles}
				loaderClassNames={loaderStyles}
				Loader={FlippingSquareLoader}
			/>
		</ExampleHolder>
	);
};

export default Example;
