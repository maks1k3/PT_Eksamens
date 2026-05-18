const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'center',
		type: 'bool',
		default: 'false',
		description: 'Center Pagination horizontally.',
	},
	{
		name: 'controlled',
		type: 'bool',
		default: 'false',
		description: 'Page can only be changed externally.',
	},
	{
		name: 'onPageChange',
		type: 'func',
	},
	{
		name: 'page',
		type: 'number',
		default: '1',
	},
	{
		name: 'pageCount',
		type: 'number',
		isRequired: true,
		description: 'Total number of pages.',
	},
	{
		name: 'pageRangeDisplayed',
		type: 'number',
		isRequired: true,
		description: 'Range of pages displayed.',
	},
	{
		name: 'marginPagesDisplayed',
		type: 'number',
		isRequired: true,
		description: 'Number of pages to display for margins.',
	},
	{
		name: 'getLinkUrl',
		type: 'func',
		description: 'Function that returns url for given page number.',
	},
	{
		name: 'previousLabel',
		type: 'node',
		default: '←',
	},
	{
		name: 'breakLabel',
		type: 'node',
		default: '…',
	},
	{
		name: 'nextLabel',
		type: 'node',
		default: '→',
	},
	{
		name: 'renderPrevious',
		type: 'func',
	},
	{
		name: 'renderBreak',
		type: 'func',
	},
	{
		name: 'renderNext',
		type: 'func',
	},
	{
		name: 'renderPageItem',
		type: 'func',
	},
	{
		name: 'disableArrows',
		type: 'bool',
		default: 'false',
	},
];

export default props;
