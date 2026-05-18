import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import ContextMenu from 'ui/controls/context_menu';
import Icon from 'ui/misc/icon';

import styles from './ActionsMenu.module.less';
import { map } from 'lodash-es';

const propTypes = {
	classNames: PropTypes.object,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			icon: PropTypes.shape({
				provider: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
			}),
			onClick: PropTypes.func.isRequired,
		}),
	).isRequired,

	icon: PropTypes.shape({
		provider: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}),
};

const defaultProps = {
	classNames: {},
	icon: {
		provider: 'icomoon',
		name: 'menu9',
	},
};

class ActionsMenu extends Component {
	constructor(props) {
		super(props);
	}

	renderContent = (classNames) => {
		//<editor-fold defaultstate="collapsed" desc="renderContent">
		const { options } = this.props;
		const items = map(options, this.renderOption);
		return <ul className={classNames['list']}>{items}</ul>;
		//</editor-fold>
	};

	renderOption = ({ title, icon, onClick }, index) => {
		//<editor-fold defaultstate="collapsed" desc="renderOption">
		const classNames = this.classNames;

		return (
			<li key={index} className={classNames['list-item']} onClick={onClick}>
				{icon && (
					<Icon
						className={classNames['icon']}
						provider={icon.provider}
						name={icon.name}
					/>
				)}
				<span className={classNames['title']}>{title}</span>
			</li>
		);
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;
		const { icon } = this.props;

		return (
			<ContextMenu
				classNames={{ content_style: classNames['content_style'] }}
				content={this.renderContent(classNames)}>
				<div className={classNames['wrapper']}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none">
						<path
							d="M4.00001 21.0001C4.07972 21.0098 4.1603 21.0098 4.24001 21.0001L8.24001 20.0001C8.41746 19.958 8.57999 19.8681 8.71001 19.7401L21 7.41015C21.3725 7.03542 21.5816 6.52852 21.5816 6.00015C21.5816 5.47178 21.3725 4.96487 21 4.59015L19.42 3.00015C19.2343 2.81419 19.0137 2.66668 18.7709 2.56603C18.5281 2.46538 18.2678 2.41357 18.005 2.41357C17.7422 2.41357 17.4819 2.46538 17.2391 2.56603C16.9963 2.66668 16.7758 2.81419 16.59 3.00015L4.30001 15.2901C4.1708 15.4208 4.07776 15.5827 4.03001 15.7601L3.03001 19.7601C2.99407 19.8895 2.98456 20.0248 3.00204 20.158C3.01953 20.2911 3.06365 20.4194 3.13177 20.5351C3.1999 20.6508 3.29064 20.7517 3.39858 20.8316C3.50651 20.9114 3.62944 20.9688 3.76001 21.0001C3.83972 21.0098 3.9203 21.0098 4.00001 21.0001ZM18 4.41015L19.59 6.00015L18 7.59015L16.42 6.00015L18 4.41015ZM5.91001 16.5101L15 7.41015L16.59 9.00015L7.49001 18.1001L5.38001 18.6201L5.91001 16.5101Z"
							fill="#061D23"
						/>
					</svg>
				</div>
			</ContextMenu>
		);
	}
}

ActionsMenu.propTypes = propTypes;

ActionsMenu.defaultProps = defaultProps;

export default ActionsMenu;
