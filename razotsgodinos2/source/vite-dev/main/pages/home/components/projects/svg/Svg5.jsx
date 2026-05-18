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
					className={styles.svg5}
					xmlns="http://www.w3.org/2000/svg"
					width="402"
					height="330"
					viewBox="0 0 402 330"
					fill="none">
					<path
						d="M200.96 0L0 201.341V308.59L102.216 411H299.784L402 308.59V201.341L200.96 0ZM333.789 189.625H68.1309L200.96 56.5435L333.789 189.625ZM271.486 370.972H130.434V229.613H271.526V370.972H271.486ZM39.9126 229.613H90.5218V342.7L39.9126 291.995V229.573V229.613ZM311.438 342.7V229.613H362.047V292.035L311.438 342.74V342.7Z"
						fill="#FDAC5B"
					/>
				</svg>
			</div>
		);
	}
}

NewComponent.propTypes = propTypes;

NewComponent.defaultProps = defaultProps;

export default NewComponent;
