const methods = [
	{
		name: 'previous',
		params: '',
		return: 'void',
		description: 'Previous item.',
	},
	{
		name: 'previousPage',
		params: '',
		return: 'void',
		description: 'Previous page.',
	},
	{
		name: 'next',
		params: '',
		return: 'void',
		description: 'Next item.',
	},
	{
		name: 'nextPage',
		params: '',
		return: 'void',
		description: 'Next page.',
	},
	{
		name: 'setPage',
		params: 'param1:number',
		return: 'void',
		description: 'Set specific page. For pageMode="true"',
	},
	{
		name: 'setItem',
		params: 'param1:number',
		return: 'void',
		description: 'Set specific item. For pageMode="false"',
	},
];

export default methods;
