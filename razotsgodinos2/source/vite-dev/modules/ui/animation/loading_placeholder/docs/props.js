const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'type',
		type: 'string: post, rows, image-rows',
		default: 'image-rows',
	},
	{
		name: 'renderCustomMaskers',
		type: 'fun',
	},
];

export default props;
