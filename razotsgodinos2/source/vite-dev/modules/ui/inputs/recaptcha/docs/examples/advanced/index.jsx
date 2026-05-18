import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import ReCaptcha from 'ui/inputs/recaptcha';

const title = 'ReCaptcha: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import ReCaptcha from 'ui/inputs/recaptcha';

<Form
	refresh={true}
	action="example_api/recaptcha"
	submit={{
		title: 'Save',
	}}>
	<Field label="Some" name="data" component={Input} />
	<div
		style={{
			display: 'flex',
			justifyContent: 'flex-end',
			marginBottom: '20px',
		}}>
		<div>
			<Field
				name="captcha"
				component={ReCaptcha}
				componentProps={{
					lang: 'ru',
					theme: 'dark',
					size: 'compact',
					verifyCallback: token => {
						console.log('verifyCallback:', token);
					},
					expiredCallback: () => {
						console.log('expiredCallback');
					},
				}}
				isRequired={true}
			/>
		</div>
	</div>
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
				refresh={true}
				action="example_api/recaptcha"
				submit={{
					title: 'Save',
				}}>
				<Field label="Some" name="data" component={Input} />
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						marginBottom: '20px',
					}}>
					<div>
						<Field
							name="captcha"
							component={ReCaptcha}
							componentProps={{
								lang: 'ru',
								theme: 'dark',
								size: 'compact',
								verifyCallback: token => {
									console.log('verifyCallback:', token);
								},
								expiredCallback: () => {
									console.log('expiredCallback');
								},
							}}
							isRequired={true}
						/>
					</div>
				</div>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
