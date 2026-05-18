import React, { Fragment } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import LangsTab from 'ui/common/langs_tab';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title = 'LangsTab: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import LangsTab from 'ui/common/langs_tab';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

<Form
	action="actions/success"
	submit={{
		title: 'Save',
	}}>
	<LangsTab
		langs={['lv', 'en', 'ru']}
		renderItem={lang => {
			return (
				<Fragment>
					<Field
						label={\`Field 1 \${lang}\`}
						name={\`field_1_\${lang}\`}
						component={Input}
					/>
					<Field
						label={\`Field 2 \${lang}\`}
						name={\`field_2_\${lang}\`}
						component={Input}
					/>
				</Fragment>
			);
		}}
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
				action="actions/success"
				submit={{
					title: 'Save',
				}}>
				<LangsTab
					langs={['lv', 'en', 'ru']}
					renderItem={lang => {
						return (
							<Fragment>
								<Field
									label={`Field 1 ${lang}`}
									name={`field_1_${lang}`}
									component={Input}
								/>
								<Field
									label={`Field 2 ${lang}`}
									name={`field_2_${lang}`}
									component={Input}
								/>
							</Fragment>
						);
					}}
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
