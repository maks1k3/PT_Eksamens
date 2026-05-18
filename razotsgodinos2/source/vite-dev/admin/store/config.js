import configureStore, {
	composeEnhancers,
} from 'core/redux/store/configureStore';
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const enhancers = composeEnhancers(applyMiddleware(thunk));

import core_reducers from 'core/store';
import app_reducers from 'admin/store';

const reducers = { ...core_reducers, ...app_reducers };
const rootReducer = combineReducers(reducers);

const store = configureStore({ rootReducer, enhancers });
window.store = store;
export default store;
