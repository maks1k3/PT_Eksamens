import React, { PureComponent as Component } from 'react';
import getDisplayName from 'helpers/getDisplayName';
import hoistNonReactStatics from 'utils/hoistNonReactStatics';

import { LocaleContext } from 'ui/misc/locale_provider';

import translations from 'assets/translations/ui/media/administration/image';
import { get } from 'lodash-es';

const hoc = (WrappedComponent) => {
	function Wrapper(props, ref) {
		return (
			<LocaleContext.Consumer>
				{(locale) => (
					<WrappedComponent
						title={get(translations, `${locale}.uploadTitle`, undefined)}
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
