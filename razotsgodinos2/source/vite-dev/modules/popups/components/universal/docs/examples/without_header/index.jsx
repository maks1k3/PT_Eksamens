import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'UniversalPopup: without header';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
openPopup({
	name: 'universal',
	data: {
		content: <div>Content without header</div>,
	},
	settings: {
		showHeader: false,
		showCloseControl: true,
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
							content: <div>Content without header</div>,
						},
						settings: {
							showHeader: false,
							showCloseControl: true,
						},
						component: Test,
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
