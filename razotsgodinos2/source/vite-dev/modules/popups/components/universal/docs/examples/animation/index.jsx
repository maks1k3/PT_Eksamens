import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

import styles from './styles.less';

const title = 'UniversalPopup: animation';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'CSS keyframes animation for opening and closing of the popup.',
	code: `
openPopup({
	name: 'universal',
	data: {
		content: <div>This is popup with animation</div>,
	},
	settings: {
		openAnimation: styles['open_animation'],
		closeAnimation: styles['close_animation'],
	},
	component: Test,
});
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { content } = this.props;
		return <div>{content}</div>;
	}
}

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Button
				title="Show"
				onClick={() => {
					openPopup({
						name: 'universal',
						data: {
							content: <div>This is popup with animation</div>,
						},
						settings: {
							openAnimation: styles['open_animation'],
							closeAnimation: styles['close_animation'],
						},
						component: Test,
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
