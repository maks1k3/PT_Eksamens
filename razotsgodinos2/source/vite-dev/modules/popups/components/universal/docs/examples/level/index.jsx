import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'UniversalPopup: level';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
//level 0
openPopup({
	name: 'universal',
	data: {
		content: (
			<div>
				<p>Level: 0</p>
			</div>
		),
	},
	settings: {
		level: 0,
		maxWidth: '1000px',
	},
	component: Test,
});
//level 1
openPopup({
	name: 'universal',
	data: {
		content: (
			<div>
				<p>Level: 1</p>
			</div>
		),
	},
	settings: {
		level: 1,
		maxWidth: '800px',
	},
	component: Test,
});
//level 2
openPopup({
	name: 'universal',
	data: {
		content: (
			<div>
				<p>Level: 2</p>
			</div>
		),
	},
	settings: {
		level: 2,
		maxWidth: '600px',
	},
	component: Test,
});
//level 3
openPopup({
	name: 'universal',
	data: {
		content: (
			<div>
				<p>Level: 3</p>
			</div>
		),
	},
	settings: {
		level: 3,
		maxWidth: '400px',
	},
	component: Test,
});
//level 4
openPopup({
	name: 'universal',
	data: {
		content: (
			<div>
				<p>Level: 4</p>
			</div>
		),
	},
	settings: {
		level: 4,
		maxWidth: '200px',
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
					//level 0
					openPopup({
						name: 'universal',
						data: {
							content: (
								<div>
									<p>Level: 0</p>
								</div>
							),
						},
						settings: {
							level: 0,
							maxWidth: '1000px',
						},
						component: Test,
					});
					//level 1
					openPopup({
						name: 'universal',
						data: {
							content: (
								<div>
									<p>Level: 1</p>
								</div>
							),
						},
						settings: {
							level: 1,
							maxWidth: '800px',
						},
						component: Test,
					});
					//level 2
					openPopup({
						name: 'universal',
						data: {
							content: (
								<div>
									<p>Level: 2</p>
								</div>
							),
						},
						settings: {
							level: 2,
							maxWidth: '600px',
						},
						component: Test,
					});
					//level 3
					openPopup({
						name: 'universal',
						data: {
							content: (
								<div>
									<p>Level: 3</p>
								</div>
							),
						},
						settings: {
							level: 3,
							maxWidth: '400px',
						},
						component: Test,
					});
					//level 4
					openPopup({
						name: 'universal',
						data: {
							content: (
								<div>
									<p>Level: 4</p>
								</div>
							),
						},
						settings: {
							level: 4,
							maxWidth: '200px',
						},
						component: Test,
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
