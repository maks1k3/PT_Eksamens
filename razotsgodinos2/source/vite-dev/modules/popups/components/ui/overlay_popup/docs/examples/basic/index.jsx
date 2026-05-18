import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'OverlayPopup: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import OverlayPopup from 'popups/components/ui/overlay_popup';

<OverlayPopup
	classNames={styles}
	name="some_popup"
	level={2}
	showCloseControl={true}
	onClose={() => {
		closePopup({ name: 'some_popup_name', level: 2 });
	}}
	renderPopup={({
		zIndex,
		classNames,
		children,
		closeButton,
		openAnimation,
		closeAnimation,
		showCloseAnimation,
		onAnimationEnd,
		OverlayPopup,
	}) => {
		const className = _g.classNames(classNames['wrapper'], {
			[openAnimation]: !_g.isEmpty(openAnimation) && !showCloseAnimation,
			[closeAnimation]: !_g.isEmpty(closeAnimation) && showCloseAnimation,
		});

		return (
			<div
				className={className}
				style={{ zIndex: zIndex }}
				onAnimationEnd={onAnimationEnd}>
				{closeButton}
				{children}
			</div>
		);
	}}
	openAnimation={styles['open_animation']}
	closeAnimation={styles['close_animation']}>
	<div>This is overlay popup content.</div>
</OverlayPopup>
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
