import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Icon from 'ui/misc/icon';

import styles from './Editable.module.less';

import { isUndefined, some } from 'lodash-es';
import Image from 'ui/media/image';

const propTypes = {
	edit: PropTypes.object,
	add: PropTypes.object,
	sort: PropTypes.object,
	active: PropTypes.bool,

	children: PropTypes.element.isRequired,
	style: PropTypes.object,

	//from ui
	user: PropTypes.any,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		user: 'user',
	};
};

class Editable extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onEditClick = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onEditClick">
		e.preventDefault();
		e.stopPropagation();

		const { edit } = this.props;

		openPopup({
			name: 'cms',
			data: edit,
		});
		//</editor-fold>
	};

	onAddClick = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onAddClick">
		e.preventDefault();
		e.stopPropagation();

		const { add } = this.props;

		openPopup({
			name: 'cms',
			data: add,
		});
		//</editor-fold>
	};

	onSortClick = (e) => {
		//<editor-fold defaultstate="collapsed" desc="onSortClick">
		e.preventDefault();
		e.stopPropagation();

		const { sort } = this.props;

		openPopup({
			name: 'cms',
			data: sort,
		});
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderEditIcon = () => {
		//<editor-fold defaultstate="collapsed" desc="renderEditIcon">

		const { edit } = this.props;

		if (isUndefined(edit)) {
			return null;
		}

		const className = _g.classNames(
			styles['icon-wrapper'],
			styles['top-right'],
		);

		return (
			<div className={className} onClick={this.onEditClick}>
				<Image
					style={{ height: 12 }}
					src={_g.getMainUrl() + 'assets/icons/pencil.svg'}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderAddNewIcon = () => {
		//<editor-fold defaultstate="collapsed" desc="renderAddNewIcon">

		const { add } = this.props;

		if (isUndefined(add)) {
			return null;
		}

		const className = _g.classNames(styles['icon-wrapper'], styles['top-left']);

		return (
			<div className={className} onClick={this.onAddClick}>
				<Image
					style={{ height: 12 }}
					src={_g.getMainUrl() + 'assets/icons/plus.svg'}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderActiveIcon = () => {
		//<editor-fold defaultstate="collapsed" desc="renderActiveIcon">

		const { active } = this.props;

		if (isUndefined(active)) {
			return null;
		}

		const className = _g.classNames(
			styles['icon-wrapper'],
			styles['active-icon'],
			{ [styles['active-icon_not-active']]: !active },
		);

		const name = active ? 'eye' : 'eye-slash';

		return (
			<div className={className}>
				<Icon provider="fa" name={name} className={styles['icon']} />
			</div>
		);
		//</editor-fold>
	};

	renderSortIcon = () => {
		//<editor-fold defaultstate="collapsed" desc="renderSortIcon">
		const { sort } = this.props;

		if (isUndefined(sort)) {
			return null;
		}

		const className = _g.classNames(
			styles['icon-wrapper'],
			styles['top-right'],
		);

		return (
			<div className={className} onClick={this.onSortClick}>
				<Image
					style={{ height: 12 }}
					src={_g.getMainUrl() + 'assets/icons/list.svg'}
				/>
			</div>
		);
		//</editor-fold>
	};

	render() {
		const { children, user, add, sort, style } = this.props;

		if (_g.isEmpty(user) || !user.isAdmin) {
			return children;
		}

		const className = _g.classNames(styles['wrapper'], {
			[styles['wrapper_padding']]: some([add, sort], (i) => !isUndefined(i)),
		});

		return (
			<div className={className} style={style}>
				{this.renderEditIcon()}
				{this.renderActiveIcon()}
				{this.renderAddNewIcon()}
				{this.renderSortIcon()}
				{children}
			</div>
		);
	}
}

Editable.propTypes = propTypes;

Editable.defaultProps = defaultProps;

export default Editable = WithUi(uiProps)(Editable);
