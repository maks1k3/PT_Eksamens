import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Svg.module.less';

const propTypes = {};

const defaultProps = {};

class NewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<svg
					className={styles.svg1}
					xmlns="http://www.w3.org/2000/svg"
					width="160"
					height="160"
					viewBox="0 0 160 160"
					fill="none">
					<path
						d="M43.554 92.5301C50.7078 94.672 56.1784 98.7416 59.9657 104.739C64.1738 110.308 66.2779 117.162 66.2779 125.301C66.2779 135.582 63.1218 143.936 56.8096 150.361C50.4974 156.787 42.7124 160 33.4545 160C23.3551 160 15.1492 156.787 8.83705 150.361C2.94568 143.507 0 135.154 0 125.301C0 120.161 0.420811 115.234 1.26244 110.522C2.52487 105.382 4.83934 98.0991 8.20583 88.6747L34.717 0H65.0154L43.554 92.5301ZM137.276 92.5301C144.43 94.672 149.901 98.7416 153.688 104.739C157.896 110.308 160 117.162 160 125.301C160 135.582 156.844 143.936 150.532 150.361C144.22 156.787 136.435 160 127.177 160C117.077 160 108.871 156.787 102.559 150.361C96.6678 143.507 93.7221 135.154 93.7221 125.301C93.7221 120.161 94.1429 115.234 94.9846 110.522C96.247 105.382 98.5615 98.0991 101.928 88.6747L128.439 0H158.738L137.276 92.5301Z"
						fill="#EEEEED"
					/>
				</svg>
			</div>
		);
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

export default NewComponent;
