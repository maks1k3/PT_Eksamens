const props = [
	{
		name: 'verifyCallback',
		type: 'func',
		description: 'Executed when we get response from reCAPTCHA.',
	},
	{
		name: 'expiredCallback',
		type: 'func',
		description: 'Executed when the reCAPTCHA response expires.',
	},
	{
		name: 'sitekey',
		type: 'string',
		description: 'ReCaptcha key.',
		default: 'Takes ReCaptcha key from configuration.',
	},
	{
		name: 'lang',
		type: 'string',
		description: 'Language.',
		default: 'Takes current language from Redux.',
	},
	{
		name: 'theme',
		type: 'string: light, dark',
		default: 'light',
	},
	{
		name: 'size',
		type: 'string: compact, normal',
		default: 'normal',
	},
];

export default props;
