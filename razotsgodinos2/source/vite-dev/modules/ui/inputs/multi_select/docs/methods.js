const methods = [
	{
		name: 'setValue',
		params: 'param1:string',
		return: 'void',
		description: "Set input's value.",
	},
	{
		name: 'getValue',
		params: '',
		return: 'string',
		description: 'Returns selected values',
	},

	{
		name: 'selectAll',
		params: '',
		return: 'void',
		description: 'Selects all values',
	},
	{
		name: 'unselectAll',
		params: '',
		return: 'void',
		description: 'Unselects all values',
	},
	{
		name: 'addValue',
		params: 'param1:string',
		return: 'void',
		description: 'Adds an existing value to selected values',
	},
	{
		name: 'removeValue',
		params: 'param1:string',
		return: 'void',
		description: 'Unselects a value',
	},
];

export default methods;
