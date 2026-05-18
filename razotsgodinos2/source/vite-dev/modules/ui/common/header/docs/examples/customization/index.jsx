import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Header from 'ui/common/header';

import styles from './styles.less';

const title = 'Header: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Header from 'ui/common/header';

<Header
	height={70}
	classNames={styles}
	fixed={false}
	backgroundColor="#3d53fc"
	left={
		<div style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
			This is left
		</div>
	}
	center={
		<div style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
			This is center
		</div>
	}
	right={
		<div style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
			This is right
		</div>
	}
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
			<Header
				height={70}
				classNames={styles}
				fixed={false}
				backgroundColor="#3d53fc"
				left={
					<div style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
						This is left
					</div>
				}
				center={
					<div style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
						This is center
					</div>
				}
				right={
					<div style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
						This is right
					</div>
				}
			/>
		</ExampleHolder>
	);
};

export default Example;
