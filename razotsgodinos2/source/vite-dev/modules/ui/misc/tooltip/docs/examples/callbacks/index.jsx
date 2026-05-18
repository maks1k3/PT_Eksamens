import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Tooltip from 'ui/misc/tooltip';

const title = 'Tooltip: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
	import Tooltip from 'ui/misc/tooltip';

	<div style={{ display: 'flex', alignItems: 'center' }}>
		<Tooltip
			trigger={['click', 'hover', 'focus']}
			position="top"
			onClick={e => {
				console.log('onClick');
			}}
			onClickOutside={e => {
				console.log('onClickOutside');
			}}
			onMouseEnter={e => {
				console.log('onMouseEnter');
			}}
			onMouseLeave={e => {
				console.log('onMouseLeave');
			}}
			title="tooltip">
			{ <div style={item} />}
		</Tooltip>
		<div>
			<Tooltip
				trigger={['focus']}
				title="tooltop"
				onFocus={e => {
					console.log('onFocus');
				}}
				onBlur={e => {
					console.log('onBlur');
				}}>
				<input />
			</Tooltip>
		</div>
	</div>
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);
	}

	render() {
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
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Tooltip
					trigger={['click', 'hover', 'focus']}
					position="top"
					onClick={e => {
						console.log('onClick');
					}}
					onClickOutside={e => {
						console.log('onClickOutside');
					}}
					onMouseEnter={e => {
						console.log('onMouseEnter');
					}}
					onMouseMove={e => {
						console.log('onMouseMove');
					}}
					onMouseLeave={e => {
						console.log('onMouseLeave');
					}}
					title="tooltip">
					{<div style={item} />}
				</Tooltip>
				<div>
					<Tooltip
						trigger={['focus']}
						title="tooltop"
						onFocus={e => {
							console.log('onFocus');
						}}
						onBlur={e => {
							console.log('onBlur');
						}}>
						<input />
					</Tooltip>
				</div>
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
