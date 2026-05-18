import React, { PureComponent as Component } from 'react';
import getDisplayName from 'helpers/getDisplayName';
import hoistNonReactStatics from 'utils/hoistNonReactStatics';

import { LocaleContext } from 'ui/misc/locale_provider';

import translations from 'assets/translations/ui/inputs/file_input';

const hoc = WrappedComponent => {
	function Wrapper(props, ref) {
		return (
			<LocaleContext.Consumer>
				{locale => (
					<WrappedComponent
						title={translations[locale]['title']}
						{...props}
						ref={ref}
					/>
				)}
			</LocaleContext.Consumer>
		);
	}

	Wrapper.displayName = `WithLocale(${getDisplayName(WrappedComponent)})`;

	return hoistNonReactStatics(React.forwardRef(Wrapper), Component);
};

export default hoc;
