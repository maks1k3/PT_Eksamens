const forms = {
	clear: formName => {
		ee.trigger(events.form.clear, { formName });
	},
	getData: (formName, callback) => {
		ee.trigger(events.form.getData, { formName, callback });
	},
	hideResponse: formName => {
		ee.trigger(events.form.hideResponse, { formName });
	},
	lock: formName => {
		ee.trigger(events.form.lock, { formName });
	},
	reset: formName => {
		ee.trigger(events.form.reset, { formName });
	},
	showError: (formName, content) => {
		ee.trigger(events.form.showError, { formName, content });
	},
	showSuccess: (formName, content) => {
		ee.trigger(events.form.showSuccess, { formName, content });
	},
	submit: formName => {
		ee.trigger(events.form.submit, { formName });
	},
	unLock: formName => {
		ee.trigger(events.form.unLock, { formName });
	},
	update: (formName, data) => {
		ee.trigger(events.form.update, { formName, data });
	},
};

export default forms;
