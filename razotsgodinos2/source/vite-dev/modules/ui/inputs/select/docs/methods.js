const methods = [
	{
		name: 'focus',
		params: '',
		return: 'void',
		description: 'Focus input.',
	},
	{
		name: 'setValue',
		params: 'param1:string',
		return: 'void',
		description: "Set input's value.",
	},
	{
		name: 'setValueAndOptions',
		params: 'param1:string, param2:array',
		return: 'void',
		description: "Set input's value and options.",
	},
	{
		name: 'getValue',
		params: '',
		return: 'string',
		description: "Get input's value.",
	},
	{
		name: 'getSelectedOptions',
		params: '',
		return: 'array',
		description: 'Get an array with selected options.',
	},
];

export default methods;
