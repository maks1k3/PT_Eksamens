import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import SyncLoader from 'ui/animation/horizontal_bars/sync_loader';

import styles from './styles.less';

const title = 'SyncLoader';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import SyncLoader from 'ui/animation/horizontal_bars/sync_loader';

<SyncLoader />
<SyncLoader classNames={styles}/>
<SyncLoader center={false}/>
<SyncLoader pageCenter={true}/>
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
				<SyncLoader />
			</div>

			<h2>Custom calssNames</h2>
			<div>
				<SyncLoader classNames={styles} />
			</div>

			<h2>Not centered</h2>
			<div>
				<SyncLoader center={false} />
			</div>

			<h2>PageCenter</h2>
			<div
				style={{
					position: 'relative',
					height: '200px',
					border: '1px solid #ccc',
				}}>
				<SyncLoader pageCenter={true} />
			</div>
		</ExampleHolder>
	);
};

export default Example;
