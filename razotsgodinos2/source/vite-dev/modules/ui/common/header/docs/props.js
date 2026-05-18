const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'right',
		type: 'node',
		description: 'Header right content.',
	},
	{
		name: 'applyMarginRightWhenPopupIsOpened',
		type: 'bool',
		default: 'false',
		description:
			'Add margin right for Header when popup is opened. Useful for top page Header with fixed position.',
	},
	{
		name: 'center',
		type: 'node',
		description: 'Header center content.',
	},
	{
		name: 'left',
		type: 'node',
		description: 'Header left content.',
	},
	{
		name: 'backgroundColor',
		type: 'string',
	},
	{
		name: 'height',
		type: 'number',
		default: '50',
	},
	{
		name: 'fixed',
		type: 'bool',
		default: 'false',
	},
];

export default props;
