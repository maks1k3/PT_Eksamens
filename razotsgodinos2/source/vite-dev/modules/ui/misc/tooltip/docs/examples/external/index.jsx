import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Tooltip from 'ui/misc/tooltip';
import Button from 'ui/controls/button';

const title = 'Tooltip: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
	import Tooltip from 'ui/misc/tooltip';
	import Button from 'ui/controls/button';


	class Test extends Component {
		constructor(props) {
			super(props);

			this.ref = React.createRef();
		}

		render() {

			return (
				<div>
					<Tooltip ref={this.ref} title="tooltip">
						<div style={item} />
					</Tooltip>
					<Button
						title="Toggle"
						onClick={() => {
							this.ref.current.toggle();
						}}
					/>
				</div>
			);
		}
}
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);

		this.ref = React.createRef();
	}

	render() {
		let item = {
			background: '#6c757d',
			borderRadius: '5px',
			width: '50px',
			height: '50px',
			margin: '5px',
		};
		return (
			<div>
				<Tooltip ref={this.ref} title="tooltip">
					<div style={item} />
				</Tooltip>
				<Button
					title="Toggle"
					onClick={() => {
						this.ref.current.toggle();
					}}
				/>
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
			<Test />
		</ExampleHolder>
	);
};

export default Example;
