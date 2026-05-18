const navigation = {};

import get from 'core/navigation/actions/get';
navigation.get = get;

import redirect from 'core/navigation/actions/redirect';
navigation.redirect = redirect;

import updateParams from 'core/navigation/actions/updateParams';
navigation.updateParams = updateParams;

import updateParamKey from 'core/navigation/actions/updateParamKey';
navigation.updateParamKey = updateParamKey;

import batchUpdateParamKeys from 'core/navigation/actions/batchUpdateParamKeys';
navigation.batchUpdateParamKeys = batchUpdateParamKeys;

import updateHash from 'core/navigation/actions/updateHash';
navigation.updateHash = updateHash;

import go from 'core/navigation/actions/go';
navigation.go = go;

import goBack from 'core/navigation/actions/goBack';
navigation.goBack = goBack;

import goForward from 'core/navigation/actions/goForward';
navigation.goForward = goForward;

export default navigation;
