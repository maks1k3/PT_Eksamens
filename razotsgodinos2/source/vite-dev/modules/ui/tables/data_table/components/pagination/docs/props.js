const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'id',
		type: 'string',
		isRequired: true,
		description: "DataTable's id.",
	},
	{
		name: 'PaginationProps',
		type: 'object',
		description: 'Properties for Pagination component.',
	},
	{
		name: 'callbacks',
		type: 'object',
		default: '{}',
	},
];

export default props;
