import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Collapsible from 'ui/controls/collapsible';
import Button from 'ui/controls/button';

const title = 'Collapsible: external control';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Collapsible from 'ui/controls/collapsible';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			opened: true,
		};
	}

	toggle = () => {
		//<editor-fold defaultstate="collapsed" desc="toggle">
		this.setState(prevState => {
			return {
				opened: !prevState.opened,
			};
		});
		//</editor-fold>
	};

	render() {
		const { opened } = this.state;
		return (
			<div>
				<div>opened: {opened}</div>
				<Collapsible opened={opened}>
					<div>This is content top</div>
					<div>This is content</div>
					<div>This is content</div>
					<div>This is content</div>
					<div>This is content</div>
					<div>This is content bottom</div>
				</Collapsible>
				<Button title="Toggle" onClick={this.toggle} />
			</div>
		);
	}
}
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			opened: true,
		};
	}

	toggle = () => {
		//<editor-fold defaultstate="collapsed" desc="toggle">
		this.setState(prevState => {
			return {
				opened: !prevState.opened,
			};
		});
		//</editor-fold>
	};

	render() {
		const { opened } = this.state;
		return (
			<div>
				<div>opened: {opened ? 'true' : 'false'}</div>
				<Collapsible opened={opened}>
					<div>This is content top</div>
					<div>This is content</div>
					<div>This is content</div>
					<div>This is content</div>
					<div>This is content</div>
					<div>This is content bottom</div>
				</Collapsible>
				<Button title="Toggle" onClick={this.toggle} />
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
