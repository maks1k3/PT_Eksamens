import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import CircleLoader from 'ui/animation/spinners/circle_loader';

import styles from './Loader.module.less';
import loaderStyle from './LoaderComponentStyle.module.less';

const propTypes = {
	id: PropTypes.string.isRequired,
	classNames: PropTypes.object,
	loaderComponent: PropTypes.func,
	loaderComponentProps: PropTypes.object,

	//from ui
	loading: PropTypes.bool,
};

const defaultProps = {
	classNames: {},
	loaderComponent: CircleLoader,
	loaderComponentProps: {
		classNames: loaderStyle,
		pageCenter: true,
	},

	//from ui
	loading: false,
};

const uiProps = (ownProps) => {
	return {
		[ownProps.id]: {
			loading: 'loading',
		},
	};
};

class Loader extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { loading, loaderComponent, loaderComponentProps } = this.props;

		if (!loading) {
			return null;
		}

		const loader = React.createElement(loaderComponent, loaderComponentProps);

		return (
			<Fragment>
				<div className={classNames['overlay']} />
				{loader}
			</Fragment>
		);
	}
}

Loader.propTypes = propTypes;

Loader.defaultProps = defaultProps;

Loader = WithUi(uiProps)(Loader);

export default Loader;
