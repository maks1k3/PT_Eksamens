import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'UniversalPopup: verticalAlign';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
openPopup({
	name: 'universal',
	data: {},
	settings: {
		verticalAlign: 'top',//top|middle|bottom
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
		return (
			<div>
				<div>{content}</div>
			</div>
		);
	}
}

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div style={{ marginTop: '5px' }}>
				<Button
					title="Top"
					onClick={() => {
						openPopup({
							name: 'universal',
							data: {
								content: 'top',
							},
							settings: {
								verticalAlign: 'top',
							},
							component: Test,
						});
					}}
				/>
			</div>

			<div style={{ marginTop: '5px' }}>
				<Button
					title="Middle"
					onClick={() => {
						openPopup({
							name: 'universal',
							data: {
								content: 'middle',
							},
							settings: {
								verticalAlign: 'middle',
							},
							component: Test,
						});
					}}
				/>
			</div>

			<div style={{ marginTop: '5px' }}>
				<Button
					title="Bottom"
					onClick={() => {
						openPopup({
							name: 'universal',
							data: {
								content: 'bottom',
							},
							settings: {
								verticalAlign: 'bottom',
							},
							component: Test,
						});
					}}
				/>
			</div>
		</ExampleHolder>
	);
};

export default Example;
