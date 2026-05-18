import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import AlertBox from 'ui/misc/alertbox';
import Image from 'ui/media/image';
import FileUploadButton from 'ui/file_upload/file_upload_button';

import styles from './ImageAdministration.module.less';
import { isFunction } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	action: PropTypes.string.isRequired, //server action url
	extraData: PropTypes.object, //extra data for server
	image: PropTypes.string.isRequired, //current image

	title: PropTypes.string,
	icon: PropTypes.shape({
		provider: PropTypes.string,
		name: PropTypes.string,
	}),

	parseResponse: PropTypes.func.isRequired,

	//customization
	showAlert: PropTypes.bool,
	AlertBoxProps: PropTypes.object,
	ImageProps: PropTypes.object,
	FileUploadButtonProps: PropTypes.object,

	//custom renderers
	render: PropTypes.func,
	renderAlertBox: PropTypes.func,
	renderImage: PropTypes.func,
	renderFileUploadButton: PropTypes.func,

	//callbacks
	onSuccess: PropTypes.func,
	onError: PropTypes.func,
	onFail: PropTypes.func,
};

const defaultProps = {
	classNames: {},

	showAlert: true,
	title: 'Upload image',
	icon: {
		provider: 'icomoon',
		name: 'image5',
	},
};

class ImageAdministration extends Component {
	constructor(props) {
		super(props);

		const { image } = this.props;

		this.state = {
			image: image,
			response: {
				show: false,
				type: 'error',
				content: '',
			},
		};

		this.mounted = false;
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.mounted = true;
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (prevProps.image !== this.props.image) {
			this.setState({
				image: this.props.image,
			});
		}
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		this.mounted = false;
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	parseResponse = (response) => {
		//<editor-fold defaultstate="collapsed" desc="parseResponse">
		const { parseResponse } = this.props;
		return parseResponse(response);
		//</editor-fold>
	};

	onAlertBoxClose = () => {
		//<editor-fold defaultstate="collapsed" desc="onAlertBoxClose">
		this.setState({
			response: {
				show: false,
				type: 'error',
				content: '',
			},
		});
		//</editor-fold>
	};

	onImageClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onImageClick">
		const { image } = this.state;

		openPopup({
			name: 'image',
			data: {
				current: 0,
				showTitle: false,
				showNumbers: false,
				items: [
					{
						src: image,
						title: '',
					},
				],
			},
		});
		//</editor-fold>
	};

	onSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { onSuccess } = this.props;
		const parsedResponse = this.parseResponse(response);

		if (!this.mounted) {
			return;
		}
		const { image, msg } = parsedResponse;

		this.setState({
			image: image,
			response: {
				show: false,
				type: 'success',
				content: msg,
			},
		});

		if (isFunction(onSuccess)) {
			onSuccess({ response, image, ImageAdministration: this });
		}
		//</editor-fold>
	};

	onError = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onError">
		const { onError } = this.props;

		if (!this.mounted) {
			return;
		}

		this.setState({
			response: {
				show: true,
				type: 'danger',
				content: response.msg,
			},
		});

		if (isFunction(onError)) {
			onError({ response, ImageAdministration: this });
		}
		//</editor-fold>
	};

	onFail = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { onFail } = this.props;

		if (!this.mounted) {
			return;
		}

		if (isFunction(onFail)) {
			onFail({ response, ImageAdministration: this });
		} else {
			showAlert({ content: 'Server error!' });
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderAlertBox = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderAlertBox">
		const { renderAlertBox, AlertBoxProps, showAlert } = this.props;
		const { show, type, content } = this.state.response;

		if (!showAlert || !show) {
			return null;
		}

		if (_g.isEmpty(content)) {
			return null;
		}

		if (isFunction(renderAlertBox)) {
			return renderAlertBox({
				type,
				content,
				classNames,
				AlertBoxProps,
				onClose: this.onAlertBoxClose,
				ImageAdministration: this,
			});
		}

		return (
			<AlertBox
				theme={type}
				content={content}
				onClose={this.onAlertBoxClose}
				{...AlertBoxProps}
			/>
		);
		//</editor-fold>
	};

	renderImage = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderImage">
		const { image } = this.state;
		const { renderImage, ImageProps } = this.props;

		if (_g.isEmpty(image)) {
			return null;
		}

		if (isFunction(renderImage)) {
			return renderImage({
				image,
				classNames,
				onClick: this.onImageClick,
				ImageProps,
				ImageAdministration: this,
			});
		}

		return (
			<div className={classNames['image-wrapper']}>
				<Image
					src={image}
					className={classNames['image']}
					onClick={this.onImageClick}
					{...ImageProps}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderFileUploadButton = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderFileUploadButton">
		const {
			renderFileUploadButton,
			FileUploadButtonProps,
			action,
			extraData,
			title,
			icon,
		} = this.props;

		if (isFunction(renderFileUploadButton)) {
			return renderFileUploadButton({
				classNames,
				FileUploadButtonProps,
				action,
				extraData,
				title,
				icon,
				onSuccess: this.onSuccess,
				onError: this.onError,
				onFail: this.onFail,
				ImageAdministration: this,
			});
		}

		return (
			<div className={classNames['file-upload-wrapper']}>
				<FileUploadButton
					action={action}
					extraData={extraData}
					title={title}
					icon={icon}
					multiple={false}
					accept="image/*"
					onSuccess={this.onSuccess}
					onError={this.onError}
					onFail={this.onFail}
					{...FileUploadButtonProps}
				/>
			</div>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { render } = this.props;

		if (isFunction(render)) {
			return render({
				classNames: classNames,
				AlertBox: this.renderAlertBox(classNames),
				Image: this.renderImage(classNames),
				FileUploadButton: this.renderFileUploadButton(classNames),
				ImageAdministration: this,
			});
		}

		return (
			<div className={classNames['wrapper']}>
				{this.renderAlertBox(classNames)}
				{this.renderImage(classNames)}
				{this.renderFileUploadButton(classNames)}
			</div>
		);
	}
}

ImageAdministration.propTypes = propTypes;

ImageAdministration.defaultProps = defaultProps;

ImageAdministration = WithLocale(ImageAdministration);

export default ImageAdministration;
