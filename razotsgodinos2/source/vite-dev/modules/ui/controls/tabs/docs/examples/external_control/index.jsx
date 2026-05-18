import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Tabs from 'ui/controls/tabs';
import Button from 'ui/controls/button';

const title = 'Tabs: external control';

import items from '../items';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Tabs from 'ui/controls/tabs';
import Button from 'ui/controls/button';

class Test extends Component {
	constructor(props) {
		super(props);
		this.tabs = null;
	}

	render() {
		return (
			<div>
				<div className="margin-bottom">
					<Button
						title="Change tab"
						onClick={() => {
							this.tabs.setCurrentTab('edit');
						}}
					/>
				</div>
				<Tabs
					getRef={tabs => {
						this.tabs = tabs;
					}}
					items={items}
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
		this.tabs = null;
	}

	render() {
		return (
			<div>
				<div className="margin-bottom">
					<Button
						title="Change tab"
						onClick={() => {
							this.tabs.setCurrentTab('edit');
						}}
					/>
				</div>
				<Tabs
					getRef={tabs => {
						this.tabs = tabs;
					}}
					items={items}
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
