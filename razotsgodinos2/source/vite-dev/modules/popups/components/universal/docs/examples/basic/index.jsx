import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'UniversalPopup: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
//Popup's content component
class Test extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { extra, content } = this.props;
		return (
			<div>
				<div>extra: {extra}</div>
				{content}
			</div>
		);
	}
}


//basic
//Test component will get all data keys as props

openPopup({
	name: 'universal',
	data: {
		extra: 'This is extra.',
		content: (
			<div>
				<p>
					This is <b>basic</b> popup
				</p>
				<p>
					Default level <b>0</b>
				</p>
			</div>
		),
	},
	component: Test,
});

//open
openPopup({ name, data });

//close
closePopup({ name });
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { extra, content } = this.props;
		return (
			<div>
				<div>extra: {extra}</div>
				{content}
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
			<Button
				title="Show"
				onClick={() => {
					openPopup({
						name: 'universal',
						data: {
							extra: 'This is extra.',
							content: (
								<div>
									<p>
										This is <b>basic</b> popup
									</p>
									<p>
										Default level <b>0</b>
									</p>
								</div>
							),
						},
						component: Test,
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
