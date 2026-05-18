import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Icon from 'ui/misc/icon';

const propTypes = {
	extension: PropTypes.string,
};

const defaultProps = {};

class FileIcon extends Component {
	constructor(props) {
		super(props);
	}

	getName = extension => {
		//<editor-fold defaultstate="collapsed" desc="getName">
		let name = 'file-o';

		if (extension === 'pdf') {
			name = 'file-pdf-o';
		} else if (_g.inArray(extension, ['doc', 'docx'])) {
			name = 'file-word-o';
		} else if (_g.inArray(extension, ['xls', 'xlsx'])) {
			name = 'file-excel-o';
		} else if (_g.inArray(extension, ['ppt', 'pptx'])) {
			name = 'file-powerpoint-o';
		} else if (
			_g.inArray(extension, ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'tif'])
		) {
			name = 'file-image-o';
		} else if (
			_g.inArray(extension, ['zip', 'zipx', 'rar', 'tar', 'gz', 'dmg', 'iso'])
		) {
			name = 'file-archive-o';
		} else if (
			_g.inArray(extension, [
				'wav',
				'mp3',
				'fla',
				'flac',
				'ra',
				'rma',
				'aif',
				'aiff',
				'aa',
				'aac',
				'aax',
				'ac3',
				'au',
				'ogg',
				'avr',
				'3ga',
				'flac',
				'mid',
				'midi',
				'm4a',
				'mp4a',
				'amz',
				'mka',
				'asx',
				'pcm',
				'm3u',
				'wma',
				'xwma',
			])
		) {
			name = 'file-audio-o';
		} else if (
			_g.inArray(extension, [
				'avi',
				'mpg',
				'mp4',
				'mkv',
				'mov',
				'wmv',
				'vp6',
				'264',
				'vid',
				'rv',
				'webm',
				'swf',
				'h264',
				'flv',
				'mk3d',
				'gifv',
				'oggv',
				'3gp',
				'm4v',
				'movie',
				'divx',
			])
		) {
			name = 'file-video-o';
		} else if (
			_g.inArray(extension, [
				'css',
				'js',
				'py',
				'git',
				'py',
				'cpp',
				'h',
				'ini',
				'config',
			])
		) {
			name = 'file-code-o';
		} else if (
			_g.inArray(extension, [
				'exe',
				'jar',
				'dll',
				'bat',
				'pl',
				'scr',
				'msi',
				'app',
				'deb',
				'apk',
				'jar',
				'vb',
				'prg',
				'sh',
			])
		) {
			name = 'cogs';
		}

		return name;
		//</editor-fold>
	};

	render() {
		const { extension, ...rest } = this.props;

		const name = this.getName(extension);

		return <Icon {...rest} provider="fa" name={name} />;
	}
}

FileIcon.propTypes = propTypes;

FileIcon.defaultProps = defaultProps;

export default FileIcon;
