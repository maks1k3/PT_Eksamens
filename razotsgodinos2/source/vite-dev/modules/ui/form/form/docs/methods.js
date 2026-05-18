const methods = [
	{
		name: 'getData',
		params: '',
		return: 'object',
		description: "Get form's inputs' values.",
	},
	{
		name: 'lock',
		params: '',
		return: 'void',
		description:
			'Adds disabled={true} for all inputs and loading={true} for submit buttons.',
	},
	{
		name: 'unLock',
		params: '',
		return: 'void',
		description:
			'Addes disabled={false} for all inputs and loading={false} for submit buttons.',
	},
	{
		name: 'update',
		params: 'param1:object',
		return: 'void',
		description:
			"Update form's inputs. Param1 should be key->value object where key is input's name and value input's new value.",
	},
	{
		name: 'submit',
		params: '',
		return: 'void',
		description: 'Submit form.',
	},
	{
		name: 'reset',
		params: '',
		return: 'void',
		description: "Reset form. Input's will receive their default values.",
	},
	{
		name: 'clear',
		params: '',
		return: 'void',
		description: 'Clear form. All inputs will be empty.',
	},
	{
		name: 'showSuccess',
		params: 'param1:node',
		return: 'void',
		description: 'Shows success AlertBox and also unLocks form.',
	},
	{
		name: 'showError',
		params: 'param1:node',
		return: 'void',
		description: 'Shows error AlertBox and also unLocks form.',
	},
	{
		name: 'hideResponse',
		params: '',
		return: 'void',
		description: 'Hides all alert boxes.',
	},
];

export default methods;
