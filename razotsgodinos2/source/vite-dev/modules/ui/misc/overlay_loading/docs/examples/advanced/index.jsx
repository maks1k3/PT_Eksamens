import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import OverlayLoading from 'ui/misc/overlay_loading';
import styles from './styles.less';
import FlippingSquareLoader from 'ui/animation/three_dimensional/flipping_square_loader';
import loaderStyles from './loaderStyles.less';

const title = 'OverlayLoading: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import OverlayLoading from 'ui/misc/overlay_loading';
import FlippingSquareLoader from 'ui/animation/three_dimensional/flipping_square_loader';

<div style={{ position: 'relative' }}>
	<OverlayLoading
		classNames={styles}
		loaderClassNames={loaderStyles}
		Loader={FlippingSquareLoader}
	/>
	<div style={{ height: '400px' }}>This is some content</div>
</div>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div style={{ position: 'relative' }}>
				<OverlayLoading
					classNames={styles}
					loaderClassNames={loaderStyles}
					Loader={FlippingSquareLoader}
				/>
				<div style={{ height: '400px' }}>This is some content</div>
			</div>
		</ExampleHolder>
	);
};

export default Example;
