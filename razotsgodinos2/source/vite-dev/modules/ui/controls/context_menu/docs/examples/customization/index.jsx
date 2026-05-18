import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ContextMenu from 'ui/controls/context_menu';
import Icon from 'ui/misc/icon';

import styles from './styles.less';

const title = 'ContextMenu: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ContextMenu from 'ui/controls/context_menu';
import Icon from 'ui/misc/icon';

<div
	style={{
		width: 100,
		height: 200,
		backgroundColor: '#c2b5a3',
		padding: 20,
		position: 'relative',
	}}>
	<div
		style={{
			position: 'absolute',
			top: 10,
			right: 10,
		}}>
		<ContextMenu
			classNames={styles}
			closeOnContentClick={false}
			renderTrigger={({
				ref,
				children,
				classNames,
				onClick,
				ContextMenu,
			}) => {
				return (
					<div
						ref={ref}
						className={classNames['trigger']}
						onClick={onClick}>
						{children}
					</div>
				);
			}}
			content={<div>This is content</div>}>
			<Icon
				provider="mdi"
				name="dots-vertical"
				style={{ fontSize: 20 }}
			/>
		</ContextMenu>
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
					height: 200,
					backgroundColor: '#c2b5a3',
					padding: 20,
					position: 'relative',
				}}>
				<div
					style={{
						position: 'absolute',
						top: 10,
						right: 10,
					}}>
					<ContextMenu
						classNames={styles}
						closeOnContentClick={false}
						renderTrigger={({
							ref,
							children,
							classNames,
							onClick,
							ContextMenu,
						}) => {
							return (
								<div
									ref={ref}
									className={classNames['trigger']}
									onClick={onClick}>
									{children}
								</div>
							);
						}}
						content={<div>This is content</div>}>
						<Icon
							provider="mdi"
							name="dots-vertical"
							style={{ fontSize: 20 }}
						/>
					</ContextMenu>
				</div>
			</div>
		</ExampleHolder>
	);
};

export default Example;
