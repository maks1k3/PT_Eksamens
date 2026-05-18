import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'UniversalPopup: theme';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
openPopup({
  name: 'universal',
  data:{},
	settings: {
		theme: 'main',//main|primary|success|info|warning|danger|custom
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
		const { theme } = this.props;
		return (
			<div>
				<div>theme: {theme}</div>
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
					title="Main"
					theme="main"
					onClick={() => {
						openPopup({
							name: 'universal',
							data: {
								theme: 'main',
							},
							settings: {
								theme: 'main',
							},
							component: Test,
						});
					}}
				/>
			</div>

			<div style={{ marginTop: '5px' }}>
				<Button
					title="Primary"
					theme="primary"
					onClick={() => {
						openPopup({
							name: 'universal',
							data: {
								theme: 'primary',
							},
							settings: {
								theme: 'primary',
							},
							component: Test,
						});
					}}
				/>
			</div>

			<div style={{ marginTop: '5px' }}>
				<Button
					title="Success"
					theme="success"
					onClick={() => {
						openPopup({
							name: 'universal',
							data: {
								theme: 'success',
							},
							settings: {
								theme: 'success',
							},
							component: Test,
						});
					}}
				/>
			</div>

			<div style={{ marginTop: '5px' }}>
				<Button
					title="Info"
					theme="info"
					onClick={() => {
						openPopup({
							name: 'universal',
							data: {
								theme: 'info',
							},
							settings: {
								theme: 'info',
							},
							component: Test,
						});
					}}
				/>
			</div>

			<div style={{ marginTop: '5px' }}>
				<Button
					title="Warning"
					theme="warning"
					onClick={() => {
						openPopup({
							name: 'universal',
							data: {
								theme: 'warning',
							},
							settings: {
								theme: 'warning',
							},
							component: Test,
						});
					}}
				/>
			</div>

			<div style={{ marginTop: '5px' }}>
				<Button
					title="Danger"
					theme="danger"
					onClick={() => {
						openPopup({
							name: 'universal',
							data: {
								theme: 'danger',
							},
							settings: {
								theme: 'danger',
							},
							component: Test,
						});
					}}
				/>
			</div>

			<div style={{ marginTop: '5px' }}>
				<Button
					title="Custom"
					theme="custom"
					onClick={() => {
						openPopup({
							name: 'universal',
							data: {
								theme: 'custom',
							},
							settings: {
								theme: 'custom',
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
