import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'Popup: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Popup from 'popups/components/ui/popup';

<Popup
	classNames={styles}
	name="some_popup_name"
	level={2}
	showOverlay={true}
	hideOnOverlayClick={true}
	onOverlayClick={() => {
		closePopup({ name: 'some_popup_name', level: 2 });
	}}
	showCloseControl={true}
	onClose={() => {
		closePopup({ name: 'some_popup_name', level: 2 });
	}}
	verticalAlign="top"
	contentWrapStyle={{
		maxWidth: '1024px',
	}}
	renderPopup={({
		zIndex,
		classNames,
		verticalAlign,
		contentWrapStyle,
		children,
		closeButton,
		onOverlayClick,
		onAnimationEnd,
		openAnimation,
		closeAnimation,
		inner,
		Popup,
	}) => {
		const contentWrapclassName = _g.classNames(
			classNames['content-wrap'],
			{
				[openAnimation]:
					!_g.isEmpty(openAnimation) && !showCloseAnimation,
				[closeAnimation]:
					!_g.isEmpty(closeAnimation) && showCloseAnimation,
			},
		);

		return (
			<div
				className={classNames['wrapper']}
				style={{ zIndex: zIndex }}
				onClick={onOverlayClick}>
				<div className={classNames['container']}>
					<div
						className={classNames['content-holder']}
						style={{ verticalAlign: verticalAlign }}>
						<div
							className={contentWrapclassName}
							style={contentWrapStyle}
							onAnimationEnd={onAnimationEnd}>
							{closeButton}
							{children}
						</div>
					</div>
					{inner}
				</div>
			</div>
		);
	}}
	inner={<div>Something</div>}
	openAnimation={styles['open_animation']}
	closeAnimation={styles['close_animation']}>
	<div>This is popup content</div>
</Popup>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}
		/>
	);
};

export default Example;
