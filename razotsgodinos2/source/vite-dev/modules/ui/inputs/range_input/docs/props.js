const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},

	{
		name: 'controlled',
		type: 'bool',
		default: 'false',
		description: 'Input will only update when value property changes.',
	},
	{
		name: 'value',
		type: 'string',
	},
	{
		name: 'valueId',
		type: 'string',
		description:
			'If RangeInput is not controlled, value have changed but it is same as before use valueId to change value explicitly. This way we can avoid using refs.',
	},

	{
		name: 'onChange',
		type: 'func',
	},
	{
		name: 'onAfterChange',
		description: 'Runs after user stopped dragging thumb.',
		type: 'func',
	},
	{
		name: 'readonly',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'min',
		type: 'number',
		default: '0',
		description:
			'The minimum allowed value of the RangeInput. Should not be equal to max.',
	},
	{
		name: 'max',
		type: 'number',
		default: '100',
		description:
			'The maximum allowed value of the RangeInput. Should not be equal to min.',
	},
	{
		name: 'showTrack',
		type: 'bool',
		default: 'true',
		description:
			'The track will render a bar representing the RangeInput value.',
	},
	{
		name: 'theme',
		type: 'string: main, primary, success, info, warning, danger, custom',
		default: 'main',
	},
	{
		name: 'marks',
		type: 'bool or array',
		description:
			'Marks indicate predetermined values to which the user can move the RangeInput.',
		default: 'false',
	},
	{
		name: 'step',
		type: 'number',
		description:
			'The granularity with which the RangeInput can step through values.',
		default: '1',
	},
	{
		name: 'valueLabelDisplay',
		type: 'on,auto,off',
		description: 'Controls when the value label is displayed.',
		default: 'off',
	},
	{
		name: 'valueLabelFormat',
		type: 'text or function',
		description: "The format function the value label's value.",
		default: 'x=>x',
	},
	{
		name: 'orientation',
		type: 'string',
		description: 'horizontal,vertical',
		default: 'horizontal',
	},
	{
		name: 'scale',
		type: 'func',
		description:
			'A transformation function, to change the scale of the RangeInput.',
		default: 'x=>x',
	},
	{
		name: 'renderTrack',
		type: 'func',
	},
	{
		name: 'renderThumb',
		type: 'func',
	},
	{
		name: 'renderRail',
		type: 'func',
	},
	{
		name: 'renderValueLabel',
		type: 'func',
	},
	{
		name: 'renderMark',
		type: 'func',
	},
];

export default props;
