import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Tooltip from 'ui/misc/tooltip';

const title = 'Tooltip: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Tooltip from 'ui/misc/tooltip';

<div style={{ display: 'flex' }}>
	<Tooltip position="top" title="tooltip">
		<div style={item}>top</div>
	</Tooltip>
	<Tooltip position="right" title="tooltip">
		<div style={item}>right</div>
	</Tooltip>
	<Tooltip position="bottom" title="tooltip">
		<div style={item}>bottom</div>
	</Tooltip>
	<Tooltip position="left" title="tooltip">
		<div style={item}>left</div>
	</Tooltip>

	<Tooltip
		renderContent={() => {
			return (
				<div style={{ color: 'red' }}>
					<b>
						<i>tooltip</i>
					</b>
				</div>
			);
		}}>
		<div style={item}>content</div>
	</Tooltip>
</div>
  `,
};

const Example = () => {
	let item = {
		background: '#6c757d',
		borderRadius: '5px',
		width: '50px',
		height: '50px',
		margin: '5px',
		color: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
		padding: '5px',
	};

	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div style={{ display: 'flex' }}>
				<Tooltip position="top" title="tooltip">
					<div style={item}>top</div>
				</Tooltip>
				<Tooltip position="right" title="tooltip">
					<div style={item}>right</div>
				</Tooltip>
				<Tooltip position="bottom" title="tooltip">
					<div style={item}>bottom</div>
				</Tooltip>
				<Tooltip position="left" title="tooltip">
					<div style={item}>left</div>
				</Tooltip>

				<Tooltip
					renderContent={() => {
						return (
							<div style={{ color: 'red' }}>
								<b>
									<i>tooltip</i>
								</b>
							</div>
						);
					}}>
					<div style={item}>content</div>
				</Tooltip>
			</div>
		</ExampleHolder>
	);
};

export default Example;
