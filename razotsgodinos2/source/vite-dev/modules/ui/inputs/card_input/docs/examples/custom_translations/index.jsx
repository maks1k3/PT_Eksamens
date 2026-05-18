import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CardInput from 'ui/inputs/card_input';

const title = 'CardInput: custom translations';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CardInput from 'ui/inputs/card_input';

<CardInput
	translations={{
		card_number: 'Your card number',
		card_number_is_invalid: 'Card number is invalid.',
		cvc_is_invalid: 'CVC is invalid.',
		zip_code_is_invalid: 'ZIP code is invalid.',
		expiry_date_is_invalid: 'Expiry date is invalid.',
		expiry_month_out_of_range: 'Expiry month must be between 01 and 12.',
		expiry_year_out_of_range: 'Expiry year cannot be in the past.',
		expiry_date_out_of_range: 'Expiry date cannot be in the past.',
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
			<CardInput
				translations={{
					card_number: 'Your card number',
					card_number_is_invalid: 'Card number is invalid.',
					cvc_is_invalid: 'CVC is invalid.',
					zip_code_is_invalid: 'ZIP code is invalid.',
					expiry_date_is_invalid: 'Expiry date is invalid.',
					expiry_month_out_of_range: 'Expiry month must be between 01 and 12.',
					expiry_year_out_of_range: 'Expiry year cannot be in the past.',
					expiry_date_out_of_range: 'Expiry date cannot be in the past.',
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
