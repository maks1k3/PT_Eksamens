import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithStore from 'hoc/store';
import matchPath from './matchPath';
import { get, indexOf } from 'lodash-es';

const propTypes = {
	computedMatch: PropTypes.object, // private, from <Switch>
	path: PropTypes.string.isRequired,
	exact: PropTypes.bool,
	strict: PropTypes.bool,
	sensitive: PropTypes.bool,
	component: PropTypes.any,
	render: PropTypes.func,
	//from store
	currentPath: PropTypes.string,
};

const defaultProps = {
	exact: false,
	strict: false,
	sensitive: false,
};

const storeProps = (ownProps) => {
	return {
		navigation: {
			current: {
				path: 'currentPath',
			},
		},
	};
};

class Route extends Component {
	constructor(props) {
		super(props);
		this.state = {
			match: this.computeMatch(this.props),
		};
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		if (prevProps.currentPath !== this.props.currentPath) {
			this.setState({
				match: this.computeMatch(this.props),
			});
		}
		//</editor-fold>
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	computeMatch = ({
		computedMatch,
		currentPath,
		path,
		strict,
		exact,
		sensitive,
	}) => {
		//<editor-fold defaultstate="collapsed" desc="computeMatch">
		if (computedMatch) {
			return computedMatch;
		} // <Switch> already computed the match for us
		return matchPath(currentPath, { path, strict, exact, sensitive });
		//</editor-fold>
	};

	render() {
		const { match } = this.state;
		const { component, render, path, currentPath } = this.props;

		if (indexOf(path, ':') >= 0 && _g.isEmpty(get(match, 'params'))) {
			return null;
		}

		const props = { key: currentPath, params: get(match, 'params') };

		if (component) return match ? React.createElement(component, props) : null;

		if (render) return match ? render({ params: match.params }) : null;

		return null;
	}
}

Route.propTypes = propTypes;

Route.defaultProps = defaultProps;

export default WithStore(storeProps)(Route);
