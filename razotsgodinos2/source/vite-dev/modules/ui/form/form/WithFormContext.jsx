import React, { PureComponent as Component } from 'react';
import getDisplayName from 'helpers/getDisplayName';

import FormContext from './FormContext';

const hoc = WrappedComponent => {
	class WithFormContext extends Component {
		static displayName = `WithFormContext(${getDisplayName(WrappedComponent)})`;

		constructor(props) {
			super(props);
		}

		render() {
			return (
				<FormContext.Consumer>
					{context => (
						<WrappedComponent {...this.props} formContext={context} />
					)}
				</FormContext.Consumer>
			);
		}
	}

	return WithFormContext;
};

export default hoc;
