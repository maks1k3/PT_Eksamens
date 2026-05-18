import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'UniversalPopup: hideOnOverlayClick';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Do not close popup on overlay click.',
	code: `
openPopup({
  name: 'universal',
  data:{
    content: (
      <div>hideOnOverlayClick: false</div>
    ),
  },
	settings: {
		hideOnOverlayClick: false,
	}
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
							content: <div>hideOnOverlayClick: false</div>,
						},
						settings: {
							hideOnOverlayClick: false,
						},
						component: Test,
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
