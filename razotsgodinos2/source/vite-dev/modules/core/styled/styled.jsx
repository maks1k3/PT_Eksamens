import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import invariant from 'utils/invariant';

const styled = styles => options => {
	const defaults = {
		component: 'div',
	};

	options = !_.isUndefined(options)
		? _.extend({}, defaults, options)
		: _.extend({}, defaults);

	const name = _.get(options, 'name');
	const component = _.get(options, 'component');

	const classNames = getClassNames(styles, name);

	invariant(!_g.isEmpty(name), 'No name for the component');

	class StyledComponent extends Component {
		static displayName = `Styled(${name})`;

		constructor(props) {
			super(props);
		}

		/* ========================================================================*
    *
    *                     Methods
    *
    * ========================================================================*/

		setRef = comp => {
			//<editor-fold defaultstate="collapsed" desc="setRef">
			this.innerRef = comp;
			//</editor-fold>
		};

		render() {
			let className = '';

			if (_.has(classNames, 'wrapper')) {
				className += ' ' + classNames['wrapper'];
			}

			if (_.has(this.props, 'className')) {
				className += ' ' + _.get(this.props, 'className', '');
			}

			const props = { ...this.props };
			// props.ref = this.setRef;

			_.forEach(classNames, (item, key) => {
				if (_.has(props, key)) {
					if (props[key] === true) {
						className += ' ' + item;
					}
					delete props[key];
				}
			});

			props.className = _.trim(className);

			return React.createElement(component, props, this.props.children);
		}
	}

	return StyledComponent;
};

const getClassNames = (styles, name) => {
	const classNames = {};

	_.forEach(styles, (value, key) => {
		const parts = key.split('_');
		const prefix = _.head(parts);
		const className = _.last(parts);
		if (prefix === name) {
			classNames[className] = value;
		}
	});

	return classNames;
};

export default styled;
