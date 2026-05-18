export const getAll = state => state.translations;
export const getByKey = (state, key) => _.has(state.translations, key) ? state.translations[key] : `no translation:${key}`;