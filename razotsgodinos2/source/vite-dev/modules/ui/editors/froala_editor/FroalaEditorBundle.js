import 'vendor/froala/froala-editor/codemirror/codemirror.less';
import 'vendor/froala/froala-editor/style/froala_editor.less';
import 'vendor/froala/froala-editor/style/froala_style.less';
import 'vendor/froala/froala-editor/style/third_party/spell_checker.less';

import 'vendor/froala/froala-editor/codemirror/codemirror.js';

import 'vendor/froala/froala-editor/codemirror/xml.js';

import 'vendor/froala/froala-editor/js/froala_editor.min.js';
import 'vendor/froala/froala-editor/js/plugins/align.min.js';
import 'vendor/froala/froala-editor/js/plugins/code_beautifier.min.js';
import 'vendor/froala/froala-editor/js/plugins/code_view.min.js';
import 'vendor/froala/froala-editor/js/plugins/colors.min.js';
import 'vendor/froala/froala-editor/js/plugins/draggable.min.js';
import 'vendor/froala/froala-editor/js/plugins/entities.min.js';
import 'vendor/froala/froala-editor/js/plugins/fullscreen.min.js';
import 'vendor/froala/froala-editor/js/plugins/help.min.js';
import 'vendor/froala/froala-editor/js/plugins/image.min.js';
import 'vendor/froala/froala-editor/js/plugins/link.min.js';
import 'vendor/froala/froala-editor/js/plugins/lists.min.js';
import 'vendor/froala/froala-editor/js/plugins/paragraph_format.min.js';
import 'vendor/froala/froala-editor/js/plugins/quote.min.js';
import 'vendor/froala/froala-editor/js/plugins/table.min.js';

$.FroalaEditor.DefineIcon('insertCode', { NAME: 'file-code-o' });
$.FroalaEditor.RegisterCommand('insertCode', {
	title: 'Insert code snippet',
	focus: true,
	undo: true,
	refreshAfterCallback: true,
	callback: function() {
		this.html.insert('<pre>//Code</pre>');
		this.undo.saveStep();
	},
});
