import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { getAll } from 'core/store/ui/selectors';
import getDisplayName from 'helpers/getDisplayName';

import {
	isUndefined,
	isFunction,
	forEach,
	has,
	isObject,
	get,
} from 'lodash-es';

const hoc = (ui) => (WrappedComponent) => {
	ui = isUndefined(ui) ? null : ui;

	const mapStateToProps = (state, ownProps) => {
		if (isFunction(ui)) {
			const data = {};
			const keys = ui(ownProps);
			const result = [];

			iterate(keys, '', result);

			forEach(result, (o) => {
				data[o.name] = get(getAll(state), o.path);
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

	function WithUi(props, ref) {
		return <WrappedComponent {...props} ref={ref} />;
	}

	WithUi.displayName = `WithUi(${getDisplayName(WrappedComponent)})`;

	return connect(
		mapStateToProps,
		() => {
			return {};
		},
		null,
		{ forwardRef: true },
	)(forwardRef(WithUi));
};

export default hoc;
