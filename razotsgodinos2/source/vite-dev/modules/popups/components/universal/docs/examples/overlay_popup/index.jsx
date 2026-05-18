import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

import styles from './styles.less';

const title = 'UniversalPopup: overlay popup';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Overlay popup takes entire screen space.',
	code: `
openPopup({
	name: 'universal',
	data: {
		content: (
			<div
				style={{
					height: 'calc(100% - 60px)',
					fontSize: '25px',
					color: '#525354',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				I am overlay popup!
			</div>
		),
	},
	settings: {
		showCloseControl: true,
		useOverlayPopup: true,
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
		return content;
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
							content: (
								<div
									style={{
										height: 'calc(100% - 60px)',
										fontSize: '25px',
										color: '#525354',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									I am overlay popup!
								</div>
							),
						},
						settings: {
							showCloseControl: true,
							useOverlayPopup: true,
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
