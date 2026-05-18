import axios from 'axios';
import $ from 'jquery';
import _g from 'helpers';
import { has, isFunction, extend, isNull, trimStart, get } from 'lodash-es';
import PQueue from 'utils/PQueue';
import invariant from 'utils/invariant';
import { saveAs } from 'file-saver-es';

const queue = new PQueue({ concurrency: 1 });

const instance = axios.create({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
		Accept: 'application/json',
		'remote-dev-server': process.env.NODE_ENV === 'development' ? 'yes' : 'no',
	},
});

function getOptions(options = {}) {
	//<editor-fold defaultstate="collapsed" desc="getOptions">

	const defaults = {
		url: null,
		params: {},
		data: {},
		method: 'post',
		baseURL: _g.getMainUrl() + 'api/',
		headers: {
			Locale: uiStore.get('currentLang'),
		},
		responseType: 'json',
	};

	const {
		url,
		onUploadProgress,
		onDownloadProgress,
		onSuccess,
		onError,
		onFail,
	} = options;

	if (!_g.isEmpty(url)) {
		options.url = trimStart(url, '/');
	}

	if (isFunction(onUploadProgress)) {
		options.onUploadProgress = (progressEvent) => {
			const percentCompleted = Math.round(
				(progressEvent.loaded * 100) / progressEvent.total,
			);
			onUploadProgress(percentCompleted);
		};
	}

	if (isFunction(onDownloadProgress)) {
		options.onDownloadProgress = (progressEvent) => {
			const percentCompleted = Math.round(
				(progressEvent.loaded * 100) / progressEvent.total,
			);
			onDownloadProgress(percentCompleted);
		};
	}

	if (!isFunction(onSuccess)) {
		options.onSuccess = () => {};
	}

	if (!isFunction(onError)) {
		options.onError = (response) => {
			if (_g.isDebugMode()) {
				console.error(response);
			}
		};
	}

	if (!isFunction(onFail)) {
		options.onFail = () => {};
	}

	return extend({}, defaults, options);
	//</editor-fold>
}

function remoteRequest(options) {
	//<editor-fold defaultstate="collapsed" desc="remoteRequest">
	options = getOptions(options);

	invariant(!isNull(options.url), 'No url');

	const { onSuccess, onError, onFail } = options;

	instance
		.request(options)
		.then((response) => {
			remoteRequest.parse({
				response: response.data,
				onSuccess,
				onError,
				onFail,
			});
		})
		.catch((error) => {
			onFail(error);
		});
	//</editor-fold>
}

remoteRequest.parse = ({ response, onSuccess, onError, onFail }) => {
	//<editor-fold defaultstate="collapsed" desc="parse">
	if (has(response, 'response')) {
		if (isFunction(onSuccess)) {
			onSuccess(response.response);
		}
	} else if (has(response, 'error')) {
		if (isFunction(onError)) {
			onError(response.error);
		}
	} else if (has(response, 'reload')) {
		console.log(response);
		// location.reload(true);
	} else {
		if (_g.isDebugMode()) {
			console.error({ parseResponseFailed: response });
		}

		if (isFunction(onFail)) {
			onFail(response);
		}
	}
	//</editor-fold>
};

remoteRequest.promise = (options) => {
	//<editor-fold defaultstate="collapsed" desc="promise">
	options = getOptions(options);

	invariant(!isNull(options.url), 'No url');

	return instance.request(options);
	//</editor-fold>
};

remoteRequest.getCancelToken = () => {
	//<editor-fold defaultstate="collapsed" desc="getCancelToken">
	return axios.CancelToken.source();
	//</editor-fold>
};

remoteRequest.all = axios.all;
remoteRequest.spread = axios.spread;

remoteRequest.getCancelToken = () => {
	//<editor-fold defaultstate="collapsed" desc="getCancelToken">
	return axios.CancelToken.source();
	//</editor-fold>
};

remoteRequest.queue = (options) => {
	//<editor-fold defaultstate="collapsed" desc="queue">
	options = getOptions(options);

	invariant(!isNull(options.url), 'No url');

	const { onSuccess, onError, onFail } = options;

	return queue
		.add(() => {
			return instance.request(options);
		})
		.then((response) => {
			remoteRequest.parse({
				response: response.data,
				onSuccess,
				onError,
				onFail,
			});
		})
		.catch((error) => {
			onFail(error);
		});
	//</editor-fold>
};

remoteRequest.download = (options) => {
	//<editor-fold defaultstate="collapsed" desc="remoteRequest">
	options = getOptions(options);
	options.responseType = 'blob';

	const fileName = get(options, 'fileName', 'download.txt');
	const forceDownload = get(options, 'forceDownload', false);

	invariant(!isNull(options.url), 'No url');

	const { onSuccess, onError, onFail } = options;

	instance
		.request(options)
		.then((response) => {
			if (forceDownload) {
				onSuccess(response);
				saveAs(new Blob([response.data]), fileName);
				return;
			}

			const dataType = get(response, 'data.type');

			if (dataType === 'application/json') {
				const reader = new FileReader();
				reader.onload = function () {
					try {
						const jsonResponse = JSON.parse(reader.result);
						remoteRequest.parse({
							response: jsonResponse,
							onSuccess,
							onError,
							onFail,
						});
					} catch (e) {
						//not json
						onSuccess(response);
						saveAs(new Blob([response.data]), fileName);
					}
				};
				reader.readAsText(response.data);
			} else {
				//not json
				onSuccess(response);
				saveAs(new Blob([response.data]), fileName);
			}
		})
		.catch((error) => {
			onFail(error);
		});
	//</editor-fold>
};

export default remoteRequest;
