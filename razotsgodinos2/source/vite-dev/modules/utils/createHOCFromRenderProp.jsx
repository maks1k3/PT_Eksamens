//https://gist.github.com/kentcdodds/ab67e3a2c11cb6c7c8a97a10b4b94d5b
import React from 'react';
import hoistNonReactStatics from './hoistNonReactStatics';

function createHOCFromRenderProp({ prop, Consumer }) {
	return Component => {
		function Wrapper(props, ref) {
			return (
				<Consumer>
					{value => <Component {...{ ...props, [prop]: value, ref }} />}
				</Consumer>
			);
		}
		const upperProp = prop.slice(0, 1).toUpperCase() + prop.slice(1);
		const componentName = Component.displayName || Component.name;
		Wrapper.displayName = `with${upperProp}(${componentName})`;

		return hoistNonReactStatics(React.forwardRef(Wrapper), Component);
	};
}

export default createHOCFromRenderProp;
