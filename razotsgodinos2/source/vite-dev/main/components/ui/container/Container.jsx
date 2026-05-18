import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import WithBrowserWidth from 'hoc/browser/with_browser_width';

import styles from './Container.module.less';
import Image from 'ui/media/image';

const propTypes = {
	classNames: PropTypes.object,
	children: PropTypes.node,
	browserWidth: PropTypes.number,
	top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mtop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mbottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	image: PropTypes.string,
	mask: PropTypes.string,
	background: PropTypes.string,
};

const defaultProps = {
	classNames: {},
	children: null,
	browserWidth: 0,
	top: 0,
	bottom: 0,
	mtop: 0,
	mbottom: 0,
	image: null,
	mask: null,
	background: null,
};

class Container extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			browserWidth,
			children,
			top,
			bottom,
			mtop,
			mbottom,
			image,
			mask,
			background,
			classNames,
		} = this.props;

		// Create base style object for padding
		const style =
			browserWidth >= 991
				? { paddingTop: top, paddingBottom: bottom }
				: { paddingTop: mtop, paddingBottom: mbottom };

		// Add background color if provided
		if (background) {
			style.background = background;
		}

		return (
			<div
				className={`${styles.wrapper} ${classNames?.wrapper || ''}`}
				style={style}>
				{image ? (
					<Image src={image} className={styles.backgroundImage} />
				) : null}
				{mask ? (
					<div className={styles.mask} style={{ background: mask }} />
				) : null}

				{/* ВАЖНО: добавили classNames.container */}
				<div className={`${styles.container} ${classNames?.container || ''}`}>
					{children}
				</div>
			</div>
		);
	}
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

Container = WithBrowserWidth(Container);

export default Container;
