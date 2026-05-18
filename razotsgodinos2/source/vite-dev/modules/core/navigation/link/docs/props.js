const props = [
	{
		name: 'classNames',
		type: 'object',
		default: '{}',
	},
	{
		name: 'className',
		type: 'string',
		default: 'Extra class for link.',
	},
	{
		name: 'theme',
		type: 'string: main, content',
	},
	{
		name: 'mode',
		type: 'string: history, navigation, auto',
		description:
			'history: html5 history api, navigation: full page reload, auto: history api if browser supports.',
		default: 'from store: configuration.navigationMode',
	},
	{
		name: 'to',
		type: 'string or {path, params, hash}',
		default: '#',
	},
	{
		name: 'replace',
		type: 'bool',
		default: 'false',
		description: 'Replace current history entry instead of creating new one.',
	},
	{
		name: 'style',
		type: 'object',
	},
	{
		name: 'target',
		type: 'string: _blank, _self, _parent, _top',
	},
	{
		name: 'disabled',
		type: 'bool',
		default: 'false',
	},
	{
		name: 'scrollTop',
		type: 'bool',
		default: 'true',
		description: 'Scroll to top after onClick in history mode.',
	},
	{
		name: 'onClick',
		type: 'func',
		description: 'Overrides default onClick behaviour.',
	},
	{
		name: 'onClickCallback',
		type: 'func',
		description: 'Does not override default onClick behaviour.',
	},
	{
		name: 'children',
		type: 'node',
	},
];

export default props;
