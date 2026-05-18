import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { createBrowserHistory } from 'history';
import queryString from 'query-string';
import { push as navigation_push } from 'core/store/navigation/actions';
import { get, isFunction } from 'lodash-es';

const handleLocationChange = ({ action, location }) => {
	//<editor-fold defaultstate="collapsed" desc="handleLocationChange">

	const data = {};
	data.action = action;
	data.path = location.pathname;

	let search = get(location, 'search', '');
	let hash = get(location, 'hash', '');

	data.params = search.length > 0 ? queryString.parse(search) : undefined;

	data.hash = hash.length > 0 ? hash.substring(1) : undefined;
	data.state = location.state;

	ee.trigger(events.navigation.push, data);
	store.dispatch(navigation_push(data));

	//</editor-fold>
};

const useRouter = () => {
	useEffect(() => {
		const history = createBrowserHistory();
		const unsubscribeFromHistory = history.listen(handleLocationChange);

		handleLocationChange({
			action: history.action,
			location: history.location,
		});
		window.navigation_history = history;

		return () => {
			if (isFunction(unsubscribeFromHistory)) {
				unsubscribeFromHistory();
			}
		};
	}, []);
};

useRouter.propTypes = {
	basename: PropTypes.string,
};

useRouter.defaultProps = {};

export default useRouter;
