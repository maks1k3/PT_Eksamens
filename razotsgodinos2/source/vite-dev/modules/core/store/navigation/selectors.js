export const getCurrent = state => state.navigation.current;
export const getCurrentAction = state => getCurrent(state).action;
export const getCurrentPath = state => getCurrent(state).path;
export const getCurrentParams = state => getCurrent(state).params;
export const getCurrentHash = state =>  getCurrent(state).hash;
export const getCurrentState = state => getCurrent(state).state;

export const getPrevious = state => state.navigation.previous;
export const getPreviousAction = state => getPrevious(state).action;
export const getPreviousPath = state => getPrevious(state).path;
export const getPreviousParams = state => getPrevious(state).params;
export const getPreviousHash = state =>  getPrevious(state).hash;
export const getPreviousState = state => getPrevious(state).state;

export const getReplace = state => getReplace(state).replace;