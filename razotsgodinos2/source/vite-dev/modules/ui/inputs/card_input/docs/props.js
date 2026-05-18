const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'enableZipInput',
		type: 'bool',
		default: 'false',
		description: 'Enable zip input.',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'errorText',
		type: 'string',
		description: 'Custom error message.',
	},
	{
		name: 'cardNumberFieldError',
		type: 'bool',
		description: 'Highlight card number error.',
	},
	{
		name: 'cardExpiryFieldError',
		type: 'bool',
		description: 'Highlight card expiry error.',
	},
	{
		name: 'cvcFieldError',
		type: 'bool',
		description: 'Highlight cvc error.',
	},
	{
		name: 'zipFieldError',
		type: 'bool',
		description: 'Highlight zip error.',
	},
	{
		name: 'forcePropsUpdate',
		type: 'string',
		description: 'Change this string to force state to sync with properties.',
	},
	{
		name: 'translations',
		type: 'object',
	},
];

export default props;
