import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import AlertBox from 'ui/misc/alertbox';

import styles from './AlertContainer.module.less';

const propTypes = {};

const defaultProps = {};

class AlertContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			theme: 'danger',
			content: null,
			classNames: {},
			AlertBoxProps: {},
		};
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		ee.on(events.hud.showAlert, this.show);
		ee.on(events.hud.closeAlert, this.close);
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		ee.off(events.hud.showAlert, this.show);
		ee.off(events.hud.closeAlert, this.close);
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	show = ({
		theme = 'danger',
		content = '',
		classNames = {},
		AlertBoxProps = {},
	}) => {
		//<editor-fold defaultstate="collapsed" desc="show">

		this.setState({
			show: true,
			theme: theme,
			content: content,
			classNames: classNames,
			AlertBoxProps: AlertBoxProps,
		});

		//</editor-fold>
	};

	close = () => {
		//<editor-fold defaultstate="collapsed" desc="close">
		this.setState({
			show: false,
			theme: 'danger',
			content: null,
			classNames: {},
			AlertBoxProps: {},
		});
		//</editor-fold>
	};

	render() {
		const { show, theme, content, AlertBoxProps } = this.state;
		const classNames = _g.getClassNames(styles, this.state.classNames);

		if (!show) {
			return null;
		}

		return (
			<div className={classNames['wrapper']}>
				<AlertBox
					{...AlertBoxProps}
					theme={theme}
					content={content}
					onClose={this.close}
				/>
			</div>
		);
	}
}

AlertContainer.propTypes = propTypes;

AlertContainer.defaultProps = defaultProps;

export default AlertContainer;
