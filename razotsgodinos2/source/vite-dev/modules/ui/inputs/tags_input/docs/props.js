const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'value',
		type: 'string',
	},
	{
		name: 'valueId',
		type: 'string',
		description:
			'If Input is not controlled, value have changed but it is same as before use valueId to change value explicitly. This way we can avoid using refs.',
	},
	{
		name: 'controlled',
		type: 'bool',
		default: 'false',
		description: 'TagsInput will only update when value property changes.',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'readonly',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'caseSensitive',
		type: 'bool',
		default: 'false',
		description: 'If true do not allow to add "Tag" if already have "tag".',
	},
	{
		name: 'onlyFromAutoComplete',
		type: 'bool',
		default: 'false',
		description: 'If true allow to add tags only from AutoComplete options.',
	},
	{
		name: 'removeWithBackspace',
		type: 'bool',
		default: 'false',
		description: 'If true allow to clear tags with backspace.',
	},
	{
		name: 'minChars',
		type: 'number',
		default: '2',
		description: 'Minimum number of chars for a new tag.',
	},
	{
		name: 'defaultText',
		type: 'string',
		default: 'Add a tag',
		description: 'AutoComplete placeholder.',
	},
	{
		name: 'onChange',
		type: 'func',
	},
	{
		name: 'onAddTag',
		type: 'func',
	},
	{
		name: 'onRemoveTag',
		type: 'func',
	},
	{
		name: 'renderTags',
		type: 'func',
	},
	{
		name: 'renderTag',
		type: 'func',
	},
	{
		name: 'AutoCompleteProps',
		type: 'object',
		description: 'Propertis from AutoComplete component.',
	},
	{
		name: 'showValidationError',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'name',
		type: 'type',
		isRequired: true,
		description: 'description',
		default: '{}',
	},
];

export default props;
