import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Tooltip from 'ui/misc/tooltip';
import styles from './styles.less';
const title = 'Tooltip: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
	import Tooltip from 'ui/misc/tooltip';

		<Tooltip
			classNames={styles}
			trigger={['click', 'hover', 'focus']}
			title="tooltip"
			renderPortalElements={({
				top,
				left,
				mouseLeave,
				wrapper,
				ref,
				classNames,
				content,
				arrowStyles,
			}) => {
				console.log({
					top: top,
					left: left,
					mouseLeave: mouseLeave,
					wrapper: wrapper,
					ref: ref,
					classNames: classNames,
					content: content,
					arrowStyles: arrowStyles,
				});
				return (
					<div
						style={{
							position: 'absolute',
							top: top,
							left: left,
						}}
						onMouseLeave={mouseLeave}
						className={wrapper}
						ref={ref}>
						<div className={classNames['container']}>
							<div className={arrowStyles} />
							<div className={classNames['content']}>{content}</div>
						</div>
					</div>
				);
			}}>
			<div style={item} />
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
			<Tooltip
				classNames={styles}
				trigger={['click', 'hover', 'focus']}
				title="tooltip"
				renderPortalElements={({
					top,
					left,
					mouseLeave,
					wrapper,
					ref,
					classNames,
					content,
					arrowStyles,
				}) => {
					console.log({
						top: top,
						left: left,
						mouseLeave: mouseLeave,
						wrapper: wrapper,
						ref: ref,
						classNames: classNames,
						content: content,
						arrowStyles: arrowStyles,
					});
					return (
						<div
							style={{
								position: 'absolute',
								top: top,
								left: left,
							}}
							onMouseLeave={mouseLeave}
							className={wrapper}
							ref={ref}>
							<div className={classNames['container']}>
								<div className={arrowStyles} />
								<div className={classNames['content']}>{content}</div>
							</div>
						</div>
					);
				}}>
				<div style={item} />
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
