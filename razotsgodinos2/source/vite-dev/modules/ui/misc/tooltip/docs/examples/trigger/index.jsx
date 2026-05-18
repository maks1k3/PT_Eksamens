import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Tooltip from 'ui/misc/tooltip';

const title = 'Tooltip: trigger';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
	import Tooltip from 'ui/misc/tooltip';

	<Tooltip trigger={['click', 'hover', 'focus']} title="tooltip">
		<div style={item} tabIndex={0}  />
	</Tooltip>
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
			<Tooltip trigger={['click', 'hover', 'focus']} title="tooltip">
				<div style={item} tabIndex={0} />
			</Tooltip>
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
