import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import PulseLoader from 'ui/animation/horizontal_bars/pulse_loader';

import styles from './styles.less';

const title = 'PulseLoader';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import PulseLoader from 'ui/animation/horizontal_bars/pulse_loader';

<PulseLoader />
<PulseLoader classNames={styles}/>
<PulseLoader center={false}/>
<PulseLoader pageCenter={true}/>
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
				<PulseLoader />
			</div>

			<h2>Custom calssNames</h2>
			<div>
				<PulseLoader classNames={styles} />
			</div>

			<h2>Not centered</h2>
			<div>
				<PulseLoader center={false} />
			</div>

			<h2>PageCenter</h2>
			<div
				style={{
					position: 'relative',
					height: '200px',
					border: '1px solid #ccc',
				}}>
				<PulseLoader pageCenter={true} />
			</div>
		</ExampleHolder>
	);
};

export default Example;
