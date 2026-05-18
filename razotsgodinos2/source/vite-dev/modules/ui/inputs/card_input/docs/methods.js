const methods = [
	{
		name: 'isValid',
		params: '',
		return: 'boolean',
		description: 'Validate card data.',
	},
	{
		name: 'getData',
		params: '',
		return: 'object:{ cardNumber, expMonth, expYear, cvc, zip }',
		description: 'Get card data.',
	},
	{
		name: 'setData',
		params: '{ cardNumber, expMonth, expYear, cvc, zip }',
		return: 'void',
		description: 'Set card data.',
	},
];

export default methods;
