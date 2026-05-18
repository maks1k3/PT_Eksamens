import React, { PureComponent as Component } from 'react';
import getDisplayName from 'helpers/getDisplayName';
import hoistNonReactStatics from 'utils/hoistNonReactStatics';

import { LocaleContext } from 'ui/misc/locale_provider';

import translations from 'assets/translations/ui/tables/datatable';
import { get } from 'lodash-es';

const hoc = (WrappedComponent) => {
	function Wrapper(props, ref) {
		return (
			<LocaleContext.Consumer>
				{(locale) => (
					<WrappedComponent
						translations={{
							showing: get(translations, `${locale}.showing`, undefined),
							to: get(translations, `${locale}.to`, undefined),
							of: get(translations, `${locale}.of`, undefined),
							entries: get(translations, `${locale}.entries`, undefined),
						}}
						{...props}
						//ref={ref}
					/>
				)}
			</LocaleContext.Consumer>
		);
	}

	Wrapper.displayName = `WithLocale(${getDisplayName(WrappedComponent)})`;

	return hoistNonReactStatics(Wrapper, Component);
};

export default hoc;
