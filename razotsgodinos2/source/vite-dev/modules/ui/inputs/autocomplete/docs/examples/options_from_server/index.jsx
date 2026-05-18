import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AutoComplete from 'ui/inputs/autocomplete';

const title = 'AutoComplete: options from server';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AutoComplete from 'ui/inputs/autocomplete';

//Basic
<AutoComplete
	optionsUrl="example_api/autocomplete"
/>
//Advanced
<AutoComplete
	optionsUrl="example_api/autocomplete"
	extraData={{ action: 'search' }}
	valueKey="id"
	labelKey="name"
	termKey="term"
	parseOptions={response => {
		return response.options;
	}}
	searchMinInput={3}
	searchTimeout={300}
/>
//Autoload
<AutoComplete
	optionsUrl="example_api/autocomplete"
	extraData={{ action: 'search' }}
	valueKey="id"
	labelKey="name"
	termKey="term"
	parseOptions={response => {
		return response.options;
	}}
	searchMinInput={3}
	searchTimeout={300}
	autoload={true}
/>
//Custom onSearch
<AutoComplete
	optionsUrl="example_api/autocomplete"
	valueKey="id"
	labelKey="name"
	onRemoteSearch={({
		term,
		force,
		optionsUrl,
		searchMinInput,
		extraData,
		termKey,
		parseOptions,
		mounted,
		AutoComplete,
	}) => {
		let data = _g.cloneDeep(extraData);

		term = _.trim(term);

		if (!force && term.length < searchMinInput) {
			return;
		}

		data[termKey] = term;

		AutoComplete.setState({
			loading: true,
		});

		remoteRequest({
			url: optionsUrl,
			data: data,
			onSuccess: response => {
				if (!mounted) {
					return;
				}
				if (AutoComplete.stopped) {
					return;
				}

				let options = [];
				if (_.isFunction(parseOptions)) {
					options = parseOptions(response);
				} else {
					options = response.options;
				}

				AutoComplete.options = _g.cloneDeep(options);

				let opened = options.length > 0 && !force;

				AutoComplete.setState(prevState => {
					if (prevState.opened === false && opened) {
						AutoComplete.onOpen();
					} else if (prevState.opened === true && !opened) {
						AutoComplete.onClose();
					}

					return {
						options: options,
						loading: false,
						opened: opened,
					};
				});
			},
			onError: response => {
				if (!mounted) {
					return;
				}
				AutoComplete.setState({
					loading: false,
				});
				showAlert({ content: response.msg });
			},
		});
	}}
/>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<h3>Basic</h3>
			<AutoComplete
				optionsUrl="example_api/autocomplete"
				valueKey="id"
				labelKey="name"
			/>
			<h3>Advanced</h3>
			<AutoComplete
				optionsUrl="example_api/autocomplete"
				extraData={{ action: 'search' }}
				valueKey="id"
				labelKey="name"
				termKey="term"
				parseOptions={response => {
					return response.options;
				}}
				searchMinInput={3}
				searchTimeout={300}
			/>
			<h3>Autoload</h3>
			<AutoComplete
				optionsUrl="example_api/autocomplete"
				extraData={{ action: 'search' }}
				valueKey="id"
				labelKey="name"
				termKey="term"
				parseOptions={response => {
					return response.options;
				}}
				searchMinInput={3}
				searchTimeout={300}
				autoload={true}
			/>
			<h3>Custom onSearch</h3>
			<AutoComplete
				optionsUrl="example_api/autocomplete"
				valueKey="id"
				labelKey="name"
				onRemoteSearch={({
					term,
					force,
					optionsUrl,
					searchMinInput,
					extraData,
					termKey,
					parseOptions,
					mounted,
					AutoComplete,
				}) => {
					let data = _g.cloneDeep(extraData);

					term = _.trim(term);

					if (!force && term.length < searchMinInput) {
						return;
					}

					data[termKey] = term;

					AutoComplete.setState({
						loading: true,
					});

					remoteRequest({
						url: optionsUrl,
						data: data,
						onSuccess: response => {
							if (!mounted) {
								return;
							}
							if (AutoComplete.stopped) {
								return;
							}

							let options = [];
							if (_.isFunction(parseOptions)) {
								options = parseOptions(response);
							} else {
								options = response.options;
							}

							AutoComplete.options = _g.cloneDeep(options);

							let opened = options.length > 0 && !force;

							AutoComplete.setState(prevState => {
								if (prevState.opened === false && opened) {
									AutoComplete.onOpen();
								} else if (prevState.opened === true && !opened) {
									AutoComplete.onClose();
								}

								return {
									options: options,
									loading: false,
									opened: opened,
								};
							});
						},
						onError: response => {
							if (!mounted) {
								return;
							}
							AutoComplete.setState({
								loading: false,
							});
							showAlert({ content: response.msg });
						},
					});
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
