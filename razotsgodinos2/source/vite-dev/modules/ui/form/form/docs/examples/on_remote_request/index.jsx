import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import axios from 'axios';

const title = 'Form: onRemoteRequest';

export const info = {
	id: _g.slugify(title),
	title: title,
	description:
		'You can use onRemoteRequest to customize ajax request. For example when sending data to other servers.',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import axios from 'axios';

<Form
	onRemoteRequest={({ data, Form }) => {
		console.log('onRemoteRequest:', { data, Form });

		axios
			.get('https://api.github.com/search/repositories', { params: data })
			.then(function(response) {
				console.log('response:', response.data);
				Form.showSuccess(
					\`Found \${response.data.total_count} repositories.\`,
				);
			})
			.catch(function(error) {
				console.error(error.data);
				Form.showError('Server error!');
			});
	}}
	submit={{
		title: 'Save',
	}}>
	<Field
		label="Repository name"
		name="q"
		component={Input}
		value="React"
	/>
</Form>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Form
				onRemoteRequest={({ data, Form }) => {
					console.log('onRemoteRequest:', { data, Form });

					axios
						.get('https://api.github.com/search/repositories', { params: data })
						.then(function(response) {
							console.log('response:', response.data);
							Form.showSuccess(
								`Found ${response.data.total_count} repositories.`,
							);
						})
						.catch(function(error) {
							console.error(error.data);
							Form.showError('Server error!');
						});
				}}
				submit={{
					title: 'Save',
				}}>
				<Field
					label="Repository name"
					name="q"
					component={Input}
					value="React"
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
