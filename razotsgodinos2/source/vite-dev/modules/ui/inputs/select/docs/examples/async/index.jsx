import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Select from 'ui/inputs/select';

const title = 'Select: async';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Load options asynchronously. Search for actors.',
	code: `
import Select from 'ui/inputs/select';

//Basic
<Select
	optionsUrl="example_api/autocomplete"
	extraData={{ action: 'search' }}
	async={true}
	termKey="term"
	valueKey="id"
	labelKey="name"
	parseOptions={response => {
		return response.options;
	}}
/>
//Advanced
<Select
	optionsUrl="example_api/autocomplete"
	async={true}
	extraData={{ action: 'search' }}
	termKey="term"
	valueKey="id"
	labelKey="name"
	asyncMinInput={3}
	asyncTimeout={300}
	parseOptions={response => {
		return response.options;
	}}
	multi={true}
	value="485"
	options={[
		{
			name: 'Leonardo DiCaprio',
			id: 485,
		},
	]}
/>
//Autoload
<Select
	optionsUrl="example_api/autocomplete"
	extraData={{ action: 'search' }}
	async={true}
	termKey="term"
	valueKey="id"
	labelKey="name"
	parseOptions={response => {
		return response.options;
	}}
	clearable={true}
	open={true} //open select
	autoload={true} //whether to auto-load the default async options set
/>

//Custom asyncSearch
<Select
	optionsUrl="example_api/autocomplete"
	extraData={{ action: 'search' }}
	async={true}
	termKey="term"
	valueKey="id"
	labelKey="name"
	parseOptions={response => {
		return response.options;
	}}
	asyncSearch={({
		force,
		term,
		optionsUrl,
		asyncMinInput,
		extraData,
		termKey,
		mounted,
		Select,
	}) => {
		let data = _g.cloneDeep(extraData);

		term = _.trim(term);

		if (!force && term.length < asyncMinInput) {
			return;
		}

		data[termKey] = term;

		Select.setState({
			loading: true,
		});

		remoteRequest({
			url: optionsUrl,
			data: data,
			onSuccess: response => {
				if (!mounted) {
					return;
				}
				Select.setState({
					options: Select.parseOptions(response),
					loading: false,
				});
			},
			onError: response => {
				if (!mounted) {
					return;
				}
				Select.setState({
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
			<Select
				optionsUrl="example_api/autocomplete"
				extraData={{ action: 'search' }}
				async={true}
				termKey="term"
				valueKey="id"
				labelKey="name"
				parseOptions={response => {
					return response.options;
				}}
			/>
			<h3>Advanced</h3>
			<Select
				optionsUrl="example_api/autocomplete"
				async={true}
				extraData={{ action: 'search' }}
				termKey="term"
				valueKey="id"
				labelKey="name"
				asyncMinInput={3}
				asyncTimeout={300}
				parseOptions={response => {
					return response.options;
				}}
				multi={true}
				value="485"
				options={[
					{
						name: 'Leonardo DiCaprio',
						id: 485,
					},
				]}
			/>
			<h3>Autoload</h3>
			<Select
				optionsUrl="example_api/autocomplete"
				extraData={{ action: 'search' }}
				async={true}
				termKey="term"
				valueKey="id"
				labelKey="name"
				parseOptions={response => {
					return response.options;
				}}
				clearable={true}
				open={true} //open select
				autoload={true} //whether to auto-load the default async options set
			/>
			<h3>Custom asyncSearch</h3>
			<Select
				optionsUrl="example_api/autocomplete"
				extraData={{ action: 'search' }}
				async={true}
				termKey="term"
				valueKey="id"
				labelKey="name"
				parseOptions={response => {
					return response.options;
				}}
				asyncSearch={({
					force,
					term,
					optionsUrl,
					asyncMinInput,
					extraData,
					termKey,
					mounted,
					Select,
				}) => {
					let data = _g.cloneDeep(extraData);

					term = _.trim(term);

					if (!force && term.length < asyncMinInput) {
						return;
					}

					data[termKey] = term;

					Select.setState({
						loading: true,
					});

					remoteRequest({
						url: optionsUrl,
						data: data,
						onSuccess: response => {
							if (!mounted) {
								return;
							}
							Select.setState({
								options: Select.parseOptions(response),
								loading: false,
							});
						},
						onError: response => {
							if (!mounted) {
								return;
							}
							Select.setState({
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
