import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ContextMenu from 'ui/controls/context_menu';

const title = 'ContextMenu: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ContextMenu from 'ui/controls/context_menu';


<ContextMenu
	content={<div>This is content</div>}
	onClick={({ ContextMenu }) => {
		console.log({ onClick: { ContextMenu } });
		if (ContextMenu.state.opened) {
			ContextMenu.close();
		} else {
			ContextMenu.open();
		}
	}}
	onOpen={({ ContextMenu }) => {
		console.log({ onOpen: { ContextMenu } });
	}}
	onClose={({ ContextMenu }) => {
		console.log({ onClose: { ContextMenu } });
	}}>
	<span>Click me</span>
</ContextMenu>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<ContextMenu
				content={<div>This is content</div>}
				onClick={({ ContextMenu }) => {
					console.log({ onClick: { ContextMenu } });
					if (ContextMenu.state.opened) {
						ContextMenu.close();
					} else {
						ContextMenu.open();
					}
				}}
				onOpen={({ ContextMenu }) => {
					console.log({ onOpen: { ContextMenu } });
				}}
				onClose={({ ContextMenu }) => {
					console.log({ onClose: { ContextMenu } });
				}}>
				<span>Click me</span>
			</ContextMenu>
		</ExampleHolder>
	);
};

export default Example;
