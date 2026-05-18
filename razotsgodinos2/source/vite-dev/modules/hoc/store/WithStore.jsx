import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import getDisplayName from 'helpers/getDisplayName';
import {
	isUndefined,
	isFunction,
	forEach,
	has,
	isObject,
	get,
} from 'lodash-es';

const hoc = (select) => (WrappedComponent) => {
	select = isUndefined(select) ? null : select;

	const mapStateToProps = (state, ownProps) => {
		if (isFunction(select)) {
			const data = {};
			const keys = select(ownProps);
			const result = [];

			iterate(keys, '', result);

			forEach(result, (o) => {
				data[o.name] = get(state, o.path);
			});

			return data;
		} else {
			return {};
		}
	};

	const iterate = (obj, stack, result) => {
		for (const property in obj) {
			if (has(obj, property)) {
				if (isObject(obj[property])) {
					iterate(obj[property], stack + '.' + property, result);
				} else {
					let path = stack + '.' + property;
					path = path.substr(1);
					result.push({
						path: path,
						name: obj[property],
					});
				}
			}
		}
	};

	class WithStore extends Component {
		static displayName = `WithStore(${getDisplayName(WrappedComponent)})`;

		constructor(props, context) {
			super(props, context);
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	const WithStoreConnected = connect(mapStateToProps)(WithStore);

	return WithStoreConnected;
};

export default hoc;
