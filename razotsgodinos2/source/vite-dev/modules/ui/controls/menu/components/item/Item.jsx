import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import WithStore from 'hoc/store';

import Link from 'core/navigation/link';
import Icon from 'ui/misc/icon';
import Holder from '../holder';
import Collapsible from 'ui/controls/collapsible';

import styles from './Item.module.less';
import { get, isFunction, isNull, isUndefined, map } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	holderClassNames: PropTypes.object,

	row: PropTypes.object,
	openParent: PropTypes.func,
	renderItem: PropTypes.func,

	//from store
	path: PropTypes.string,
};

const defaultProps = {
	classNames: {},

	//from store
	path: '',
};

const storeProps = (ownProps) => {
	return {
		navigation: {
			current: {
				path: 'path',
			},
		},
	};
};

const getInitialState = () => {
	return {
		opened: false,
	};
};

class Item extends Component {
	constructor(props) {
		super(props);
		this.state = getInitialState();
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { path, row } = this.props;
		const url = get(row, 'url', '#');
		if (url !== '#' && url === path) {
			this.open();
		}
		//</editor-fold>
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (prevProps.path !== this.props.path) {
			const { row } = this.props;
			const url = get(row, 'url', '#');
			if (url !== '#' && url === this.props.path) {
				this.open();
			}
		}
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	open = () => {
		//<editor-fold defaultstate="collapsed" desc="open">
		const { row } = this.props;
		const subMenu = get(row, 'subMenu', null);

		if (!isNull(subMenu)) {
			this.setState({
				opened: true,
			});
		}

		const { openParent } = this.props;

		if (isFunction(openParent)) {
			openParent();
		}
		//</editor-fold>
	};

	toggle = () => {
		//<editor-fold defaultstate="collapsed" desc="toggle">

		this.setState((prevState) => {
			return {
				opened: !prevState.opened,
			};
		});
		//</editor-fold>
	};

	linkCallback = () => {
		//<editor-fold defaultstate="collapsed" desc="linkCallback">
		ee.trigger(events.drawer.close);
		//</editor-fold>
	};

	onClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		const { row } = this.props;
		const { onClick } = row;

		onClick({ Item: this });

		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderItem = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const { opened } = this.state;
		const { renderItem, row, path } = this.props;

		if (isFunction(renderItem)) {
			return renderItem({ Item: this, row, path, opened, classNames });
		}

		const { onClick, mode, title } = row;

		const icon = get(row, 'icon', {});

		const url = get(row, 'url', '#');
		const subMenu = get(row, 'subMenu', null);

		const className = _g.classNames(
			classNames['item'],
			{ [classNames['item_active']]: url !== '#' && url === path },
			{ [classNames['has-sub-menu']]: !isNull(subMenu) },
			{ [classNames['sub-menu-opened']]: opened },
		);

		const extra = {};

		if (!isUndefined(mode)) {
			extra.mode = mode;
		}

		if (isFunction(onClick)) {
			extra.onClick = this.onClick;
		} else if (!isNull(subMenu)) {
			extra.onClick = this.toggle;
		} else {
			extra.onClickCallback = this.linkCallback;
		}

		const iconClassName = _g.classNames(classNames['icon'], {
			[icon.className]: icon.className,
		});

		return (
			<Link to={url} {...extra}>
				<div className={className}>
					{!_g.isEmpty(icon) && (
						<Icon
							provider={icon.provider}
							name={icon.name}
							className={iconClassName}
						/>
					)}
					<span className={classNames['title']}>{title}</span>
				</div>
			</Link>
		);
		//</editor-fold>
	};

	renderSubMenuRows = (subMenu) => {
		//<editor-fold defaultstate="collapsed" desc="renderSubMenuRows">
		const { renderItem, holderClassNames } = this.props;

		return map(subMenu, (row) => {
			const { name } = row;
			return (
				<ItemWrapper
					key={name}
					row={row}
					renderItem={renderItem}
					holderClassNames={holderClassNames}
					classNames={this.props.classNames}
					openParent={this.open}
				/>
			);
		});
		//</editor-fold>
	};

	renderSubMenu = () => {
		//<editor-fold defaultstate="collapsed" desc="renderSubMenu">
		const { row, holderClassNames } = this.props;
		const subMenu = get(row, 'subMenu', null);

		if (isNull(subMenu)) {
			return null;
		}

		const { opened } = this.state;

		return (
			<Collapsible opened={opened}>
				<Holder classNames={holderClassNames}>
					{this.renderSubMenuRows(subMenu)}
				</Holder>
			</Collapsible>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);

		return (
			<li className={classNames['wrapper']}>
				{this.renderItem(classNames)}
				{this.renderSubMenu()}
			</li>
		);
	}
}

Item.propTypes = propTypes;

Item.defaultProps = defaultProps;

const ItemWrapper = WithStore(storeProps)(Item);

export default ItemWrapper;
