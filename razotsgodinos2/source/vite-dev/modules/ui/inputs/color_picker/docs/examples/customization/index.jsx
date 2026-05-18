import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import ColorPicker from 'ui/inputs/color_picker';

import styles from './styles.less';

const title = 'ColorPicker: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import ColorPicker from 'ui/inputs/color_picker';

<ColorPicker
	classNames={styles}
	value="#547147"
	clearable={true}
	InputProps={{ clearIcon: { provider: 'fa', name: 'crosshairs' } }}
	DropdownProps={{
		align: 'top-right',
	}}
	ChromePickerProps={{
		disableAlpha: true,
	}}
/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<ColorPicker
				classNames={styles}
				value="#547147"
				clearable={true}
				InputProps={{ clearIcon: { provider: 'fa', name: 'crosshairs' } }}
				DropdownProps={{
					align: 'top-right',
				}}
				ChromePickerProps={{
					disableAlpha: true,
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
