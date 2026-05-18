const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'type',
		type: 'string: left, right',
		isRequired: true,
	},
	{
		name: 'onClick',
		type: 'func',
		isRequired: true,
	},
];

export default props;
