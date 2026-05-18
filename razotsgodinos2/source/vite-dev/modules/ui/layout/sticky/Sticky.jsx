import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import stickyfill from './stickyfill';

import styles from './Sticky.module.less';
import { isUndefined } from 'lodash-es';

const propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.node,
};

const defaultProps = {};

class Sticky extends Component {
	constructor(props) {
		super(props);
		this.node = React.createRef();
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		stickyfill.addOne(this.node.current);
		//</editor-fold>
	}

	componentWillUnmount() {
		//<editor-fold defaultstate="collapsed" desc="componentWillUnmount">
		stickyfill.removeOne(this.node.current);
		//</editor-fold>
	}

	render() {
		const { className, style, children } = this.props;

		const _className = _g.classNames(styles['wrapper'], {
			[className]: !isUndefined(className),
		});

		return (
			<div ref={this.node} className={_className} style={style}>
				{children}
			</div>
		);
	}
}

Sticky.propTypes = propTypes;

Sticky.defaultProps = defaultProps;

export default Sticky;
