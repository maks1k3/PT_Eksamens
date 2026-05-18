import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CKEditor from 'ui/editors/ckeditor';

const title = 'CKEditor: custom toolbar';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CKEditor from 'ui/editors/ckeditor';

<CKEditor
	toolbar="custom"
	customToolbar={[
		{
			name: 'clipboard',
			items: [
				'Cut',
				'Copy',
				'Paste',
				'PasteText',
				'PasteFromWord',
				'-',
				'Undo',
				'Redo',
			],
		},
		{
			name: 'formationg',
			items: [
				'NumberedList',
				'BulletedList',
				'-',
				'Outdent',
				'Indent',
				'Blockquote',
				'-',
				'JustifyLeft',
				'JustifyCenter',
				'JustifyRight',
				'JustifyBlock',
			],
		},
		{ name: 'link', items: ['Link', 'Unlink', 'Anchor'] },
		{ name: 'special', items: ['Image', 'SpecialChar'] },
		'/',
		{
			name: 'basicstyles',
			items: [
				'Bold',
				'Italic',
				'Underline',
				'Strike',
				'Subscript',
				'Superscript',
				'-',
				'RemoveFormat',
			],
		},
		{ name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
		{ name: 'colors', items: ['TextColor', 'BGColor'] },
		{ name: 'tools', items: ['Maximize', '-', 'About'] },
	]}
/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<CKEditor
				toolbar="custom"
				customToolbar={[
					{
						name: 'clipboard',
						items: [
							'Cut',
							'Copy',
							'Paste',
							'PasteText',
							'PasteFromWord',
							'-',
							'Undo',
							'Redo',
						],
					},
					{
						name: 'formationg',
						items: [
							'NumberedList',
							'BulletedList',
							'-',
							'Outdent',
							'Indent',
							'Blockquote',
							'-',
							'JustifyLeft',
							'JustifyCenter',
							'JustifyRight',
							'JustifyBlock',
						],
					},
					{ name: 'link', items: ['Link', 'Unlink', 'Anchor'] },
					{ name: 'special', items: ['Image', 'SpecialChar'] },
					'/',
					{
						name: 'basicstyles',
						items: [
							'Bold',
							'Italic',
							'Underline',
							'Strike',
							'Subscript',
							'Superscript',
							'-',
							'RemoveFormat',
						],
					},
					{ name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
					{ name: 'colors', items: ['TextColor', 'BGColor'] },
					{ name: 'tools', items: ['Maximize', '-', 'About'] },
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
