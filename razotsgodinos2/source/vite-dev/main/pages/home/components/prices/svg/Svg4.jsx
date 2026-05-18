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
					className={styles.svg4}
					xmlns="http://www.w3.org/2000/svg"
					width="186"
					height="142"
					viewBox="0 0 186 142"
					fill="none">
					<path
						d="M92.9815 -48L0 45.0774V94.6571L47.2941 142H138.706L186 94.6571V45.0774L92.9815 -48ZM154.44 39.661H31.5232L92.9815 -21.8607L154.44 39.661ZM125.613 123.495H60.3503V58.1471H125.631V123.495H125.613ZM18.467 58.1471H41.8832V110.426L18.467 86.9854V58.1286V58.1471ZM144.098 110.426V58.1471H167.514V87.0039L144.098 110.444V110.426Z"
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
