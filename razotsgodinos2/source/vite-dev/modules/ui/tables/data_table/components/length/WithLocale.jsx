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
							rows: get(translations, `${locale}.rows`, undefined),
							all: get(translations, `${locale}.all`, undefined),
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
