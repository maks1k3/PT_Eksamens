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
						locale={locale}
						translations={{
							filtersTitle: get(
								translations,
								`${locale}.filtersTitle`,
								undefined,
							),
							filtersSubmit: get(
								translations,
								`${locale}.filtersSubmit`,
								undefined,
							),
							columnVisibilityTitle: get(
								translations,
								`${locale}.columnVisibilityTitle`,
								undefined,
							),
							columnVisibilitySubmit: get(
								translations,
								`${locale}.columnVisibilitySubmit`,
								undefined,
							),
							toggleAll: get(translations, `${locale}.toggleAll`, undefined),
							reset: get(translations, `${locale}.reset`, undefined),
							refresh: get(translations, `${locale}.refresh`, undefined),
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
