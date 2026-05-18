import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Image from 'ui/media/image';
import Icon from 'ui/misc/icon';

import styles from './AdministrationPopupHeader.less';

const propTypes = {
	classNames: PropTypes.object,

	showRefresh: PropTypes.bool,
	onRefreshClick: PropTypes.func,
	onImageClick: PropTypes.func,

	image: PropTypes.string,
	rows: PropTypes.array,

	ImageProps: PropTypes.object,
	refreshIcon: PropTypes.shape({
		provider: PropTypes.string,
		name: PropTypes.string,
	}),

	renderRows: PropTypes.func,
};

const defaultProps = {
	classNames: {},

	showRefresh: true,
	refreshIcon: {
		provider: 'fa',
		name: 'refresh',
	},
};

class AdministrationPopupHeader extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
   *
   *                     Renderers
   *
   * ========================================================================*/

	renderImage = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderImage">
		const { image, ImageProps, onImageClick } = this.props;
		if (_g.isEmpty(image)) {
			return null;
		}

		const extra = {};

		if (_.isFunction(onImageClick)) {
			extra.onClick = onImageClick;
		}

		return (
			<div className={classNames['image-wrapper']}>
				<Image
					src={image}
					className={classNames['image']}
					{...extra}
					{...ImageProps}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderRows = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderRows">
		const { rows, renderRows, image } = this.props;

		let content = '';
		if (!_g.isEmpty(rows)) {
			if (_.isFunction(renderRows)) {
				content = renderRows({
					rows,
					image,
					classNames,
					AdministrationPopupHeader: this,
				});
			} else {
				content = _.map(rows, (row, index) => {
					return (
						<div key={index} className={classNames['row-item']}>
							{row}
						</div>
					);
				});
			}
		}

		const className = _g.classNames(classNames['rows'], {
			[classNames['rows_with-image']]: !_g.isEmpty(image),
		});

		return (
			<div className={className}>
				{this.renderRefreshIcon(classNames)}
				{content}
			</div>
		);
		//</editor-fold>
	};

	renderRefreshIcon = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderRefreshIcon">
		const { showRefresh, onRefreshClick, refreshIcon } = this.props;

		if (!showRefresh) {
			return null;
		}

		const extra = {};

		if (_.isFunction(onRefreshClick)) {
			extra.onClick = onRefreshClick;
		}

		return (
			<Icon
				className={classNames['refresh-icon']}
				provider={refreshIcon.provider}
				name={refreshIcon.name}
				{...extra}
			/>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		return (
			<div className={`clearfix ${classNames['wrapper']}`}>
				{this.renderImage(classNames)}
				{this.renderRows(classNames)}
			</div>
		);
	}
}

AdministrationPopupHeader.propTypes = propTypes;

AdministrationPopupHeader.defaultProps = defaultProps;

export default AdministrationPopupHeader;
