export const getAll = state => state.forms;
export const getForm = (state, formName) => _.get(getAll(state), formName, null);
export const getInput = (state, formName, inputName) => _.get(getForm(state, formName), inputName, null);
