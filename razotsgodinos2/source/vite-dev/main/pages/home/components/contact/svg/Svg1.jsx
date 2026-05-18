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
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none">
					<path
						d="M17.0307 12.531L9.53068 20.031C9.46099 20.1007 9.37827 20.156 9.28722 20.1937C9.19618 20.2314 9.0986 20.2508 9.00005 20.2508C8.9015 20.2508 8.80392 20.2314 8.71288 20.1937C8.62183 20.156 8.53911 20.1007 8.46943 20.031C8.39974 19.9614 8.34447 19.8786 8.30676 19.7876C8.26904 19.6965 8.24963 19.599 8.24963 19.5004C8.24963 19.4019 8.26904 19.3043 8.30676 19.2132C8.34447 19.1222 8.39974 19.0395 8.46943 18.9698L15.4397 12.0004L8.46943 5.03104C8.32869 4.89031 8.24963 4.69944 8.24963 4.50042C8.24963 4.30139 8.32869 4.11052 8.46943 3.96979C8.61016 3.82906 8.80103 3.75 9.00005 3.75C9.19907 3.75 9.38995 3.82906 9.53068 3.96979L17.0307 11.4698C17.1004 11.5394 17.1557 11.6222 17.1935 11.7132C17.2312 11.8043 17.2506 11.9019 17.2506 12.0004C17.2506 12.099 17.2312 12.1966 17.1935 12.2876C17.1557 12.3787 17.1004 12.4614 17.0307 12.531Z"
						fill="#FC9732"
					/>
				</svg>
			</div>
		);
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

export default NewComponent;
