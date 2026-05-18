import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import useRouter from 'core/navigation/Router';
import HUDContainer from 'hud/HudContainer';
import PopupContainer from 'popups/PopupContainer';
import GlobalLocaleProvider from 'ui/misc/locale_provider/GlobalLocaleProvider';

const Root = ({ children, store, extra }) => {
	useRouter();

	return (
		<Provider store={store}>
			<GlobalLocaleProvider>
				<HUDContainer />
				<PopupContainer />
				{extra}
				<div
					id="__context_menu_placeholder"
					className="__context_menu_placeholder"
				/>
				{children}
			</GlobalLocaleProvider>
		</Provider>
	);
};
Root.propTypes = {
	children: PropTypes.node.isRequired,
	store: PropTypes.object.isRequired,
	basename: PropTypes.string,
	extra: PropTypes.node,
};

Root.defaultProps = {
	basename: '/',
};

export default Root;
