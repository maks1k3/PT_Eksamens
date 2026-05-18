import {
	set,
	multiSet,
	update,
	multiUpdate,
	remove,
	multiRemove,
	batch,
} from 'core/store/ui/actions';
import { get } from 'lodash-es';
import { getAll } from 'core/store/ui/selectors';
const uiStore = {
	set: (path, value) => {
		store.dispatch(set(path, value));
	},

	multiSet: (params) => {
		store.dispatch(multiSet(params));
	},

	update: (path, value) => {
		store.dispatch(update(path, value));
	},

	multiUpdate: (params) => {
		store.dispatch(multiUpdate(params));
	},

	remove: (path) => {
		store.dispatch(remove(path));
	},

	multiRemove: (params) => {
		store.dispatch(multiRemove(params));
	},

	batch: (params) => {
		store.dispatch(batch(params));
	},

	get: (path, placeholder = null) => {
		return get(getAll(store.getState()), path, placeholder);
	},
};

export default uiStore;
