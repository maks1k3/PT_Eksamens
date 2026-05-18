import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Dropdown from 'ui/controls/dropdown';
import Icon from 'ui/misc/icon';
import Link from 'core/navigation/link';

import styles from './Menu.module.less';
import { get, isFunction, isUndefined, map } from 'lodash-es';
import Image from 'ui/media/image';

const propTypes = {
	items: PropTypes.array.isRequired,
	//from ui
	email: PropTypes.string,
};

const defaultProps = {};

const uiProps = () => {
	return {
		user: {
			email: 'email',
		},
	};
};

class Menu extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderTrigger = () => {
		//<editor-fold defaultstate="collapsed" desc="renderTrigger">
		const { email } = this.props;

		return (
			<span className={styles['trigger']}>
				{email}
				<Icon provider="fa" name="caret-down" className={styles['caret']} />
			</span>
		);
		//</editor-fold>
	};

	renderContent = () => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { items } = this.props;

		const _items = map(items, (row, index) => {
			return <li key={index}>{this.renderItem(row)}</li>;
		});

		return <ul className={styles['list']}>{_items}</ul>;
		//</editor-fold>
	};

	renderItem = (item) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		const type = get(item, 'type', 'list-item');

		if (type === 'divider') {
			return <div className={styles['divider']} />;
		}

		const url = get(item, 'url', '#');
		const { title, icon, onClick, mode } = item;

		const iconType = typeof icon === 'object' ? 'object' : 'image';
		const extra = {};

		if (isFunction(onClick)) {
			extra.onClick = onClick;
		}

		if (!isUndefined(mode)) {
			extra.mode = mode;
		}

		return (
			<Link to={url} {...extra}>
				<div className={styles['list-item']}>
					<span className={styles['title']}>{title}</span>
					{icon &&
						(iconType === 'object' ? (
							<Icon
								provider={icon.provider}
								name={icon.name}
								className={styles['icon']}
							/>
						) : (
							<Image src={icon} className={styles['image_icon']} />
						))}
				</div>
			</Link>
		);

		//</editor-fold>
	};

	render() {
		return (
			<div className={styles['wrapper']}>
				<Dropdown
					trigger={this.renderTrigger()}
					content={this.renderContent()}
					align="bottom-left"
					classNames={{
						content_style: styles['dropdown-content'],
					}}
				/>
			</div>
		);
	}
}

Menu.propTypes = propTypes;

Menu.defaultProps = defaultProps;

export default WithUi(uiProps)(Menu);
