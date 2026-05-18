import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

import styles from './styles.less';

const title = 'UniversalPopup: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
openPopup({
	name: 'universal',
	data: {
		content: <div>This is popup</div>,
	},
	settings: {
		useOverlayPopup: false,
		level: 1,
		verticalAlign: 'middle',
		hideOnOverlayClick: true,
		showCloseControl: false,
		maxWidth: '1000px',
		//header
		showHeader: true,
		title: 'This is some title',
		theme: 'success',
		HeaderProps: {
			classNames: {
				wrapper: styles['header'],
			},
		},
		//content
		ContentProps: {
			classNames: {
				wrapper: styles['content'],
			},
			noHeader: true,
			noPadding: true,
		},
		closeOnEsc: true,
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
							content: <div>This is popup</div>,
						},
						settings: {
							useOverlayPopup: false,
							level: 1,
							verticalAlign: 'middle',
							hideOnOverlayClick: true,
							showCloseControl: false,
							maxWidth: '1000px',
							//header
							showHeader: true,
							title: 'This is some title',
							theme: 'success',
							HeaderProps: {
								classNames: {
									wrapper: styles['header'],
								},
							},
							//content
							ContentProps: {
								classNames: {
									wrapper: styles['content'],
								},
								noHeader: true,
								noPadding: true,
							},
							closeOnEsc: true,
						},
						component: Test,
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
