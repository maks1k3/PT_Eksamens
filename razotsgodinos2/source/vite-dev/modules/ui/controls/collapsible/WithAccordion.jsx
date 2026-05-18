import React, { PureComponent as Component } from 'react';
import getDisplayName from 'helpers/getDisplayName';

import AccordionContext from './AccordionContext';

const hoc = WrappedComponent => {
	class WithAccordion extends Component {
		static displayName = `WithAccordion(${getDisplayName(WrappedComponent)})`;

		constructor(props) {
			super(props);
		}

		render() {
			return (
				<AccordionContext.Consumer>
					{context => (
						<WrappedComponent {...this.props} accordionContext={context} />
					)}
				</AccordionContext.Consumer>
			);
		}
	}

	return WithAccordion;
};

export default hoc;
