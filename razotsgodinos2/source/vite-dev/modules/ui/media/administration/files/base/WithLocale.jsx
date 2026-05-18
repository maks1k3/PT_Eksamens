import React, { PureComponent as Component } from 'react';
import getDisplayName from 'helpers/getDisplayName';
import hoistNonReactStatics from 'utils/hoistNonReactStatics';

import { LocaleContext } from 'ui/misc/locale_provider';

import translations from 'assets/translations/ui/media/administration/file';
import confirmationTranslations from 'assets/translations/ui/misc/delete_button';

const hoc = (WrappedComponent) => {
	function Wrapper(props, ref) {
		return (
			<LocaleContext.Consumer>
				{(locale) => (
					<WrappedComponent
						translations={{
							...confirmationTranslations[locale],
							...translations[locale],
						}}
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
