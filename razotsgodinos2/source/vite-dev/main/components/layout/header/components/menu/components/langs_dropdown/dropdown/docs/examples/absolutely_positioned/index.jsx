import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Dropdown from 'ui/controls/dropdown';

const title = 'Dropdown: absolutelyPositioned';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Dropdown from 'ui/controls/dropdown';

<div
	style={{
		width: 100,
		height: 100,
		backgroundColor: '#c2b5a3',
		padding: 20,
		overflow: 'auto',
	}}>
	<div>
		<Dropdown
			trigger="click me"
			content={<div style={{ height: 300 }}>This is content</div>}
		/>
	</div>
	<div>
		<Dropdown
			trigger="click me"
			absolutelyPositioned={true}
			content={
				<div style={{ height: 300 }}>
					This is absolutelyPositioned content
				</div>
			}
		/>
	</div>
	<div>
		<Dropdown
			trigger="click me"
			absolutelyPositioned={true}
			adjustAbsolutePosition={position => {
				position.width = 300;
				position.top += 50;
				position.left -= 50;
			}}
			content={
				<div style={{ height: 300 }}>
					This is absolutelyPositioned and adjusted content
				</div>
			}
		/>
	</div>
</div>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div
				style={{
					width: 100,
					height: 100,
					backgroundColor: '#c2b5a3',
					padding: 20,
					overflow: 'auto',
				}}>
				<div>
					<Dropdown
						trigger="click me"
						content={<div style={{ height: 300 }}>This is content</div>}
					/>
				</div>
				<div>
					<Dropdown
						trigger="click me"
						absolutelyPositioned={true}
						content={
							<div style={{ height: 300 }}>
								This is absolutelyPositioned content
							</div>
						}
					/>
				</div>
				<div>
					<Dropdown
						trigger="click me"
						absolutelyPositioned={true}
						adjustAbsolutePosition={position => {
							position.width = 300;
							position.top += 50;
							position.left -= 50;
						}}
						content={
							<div style={{ height: 300 }}>
								This is absolutelyPositioned and adjusted content
							</div>
						}
					/>
				</div>
			</div>
		</ExampleHolder>
	);
};

export default Example;
