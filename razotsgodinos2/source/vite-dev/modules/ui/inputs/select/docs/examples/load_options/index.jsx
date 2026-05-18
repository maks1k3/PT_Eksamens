import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Select from 'ui/inputs/select';

const title = 'Select: server-side options';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'Load options from server on DidMount.',
	code: `
import Select from 'ui/inputs/select';

<Select
	optionsUrl="example_api/options" //load options from url
	extraData={{ type: 'option_group_1' }} //extra data that will be sent to server
	//parse server response to extract options
	parseOptions={response => {
		return _.map(response.options, item => {
			return {
				value: item.value,
				label: item.label,
			};
		});
	}}
/>

//Custom loadOptions
<Select
	optionsUrl="example_api/options" //load options from url
	loadOptions={({ optionsUrl, extraData, mounted, Select }) => {
		Select.setState({
			loading: true,
		});

		remoteRequest({
			url: optionsUrl,
			data: extraData,
			onSuccess: response => {
				if (!mounted) {
					return;
				}
				Select.setState({
					options: Select.parseOptions(response),
					label: Select.getLabel(Select.value, Select.options),
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
			<Select
				optionsUrl="example_api/options" //load options from url
				extraData={{ type: 'option_group_1' }} //extra data that will be sent to server
				//parse server response to extract options
				parseOptions={response => {
					return _.map(response.options, item => {
						return {
							value: item.value,
							label: item.label,
						};
					});
				}}
			/>
			<h3>Custom loadOptions</h3>
			<Select
				optionsUrl="example_api/options" //load options from url
				extraData={{ type: 'option_group_1' }} //extra data that will be sent to server
				//parse server response to extract options
				parseOptions={response => {
					return _.map(response.options, item => {
						return {
							value: item.value,
							label: item.label,
						};
					});
				}}
				loadOptions={({ optionsUrl, extraData, mounted, Select }) => {
					Select.setState({
						loading: true,
					});

					remoteRequest({
						url: optionsUrl,
						data: extraData,
						onSuccess: response => {
							if (!mounted) {
								return;
							}
							Select.setState({
								options: Select.parseOptions(response),
								label: Select.getLabel(Select.value, Select.options),
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
