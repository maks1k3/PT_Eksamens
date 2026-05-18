import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Input from 'ui/inputs/input';

const title = 'Input: customFormat';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Input from 'ui/inputs/input';

//Only number and max length 10
<Input
	customFormat={({ value, previousValue, Input }) => {
		console.log('customFormat', { value, previousValue, Input });
		//remove non numeric
		value = value.replace(/\\D/g, '');

		//max card number length is 10
		value = _.truncate(value, {
			length: 10,
			omission: '',
		});

		return value;
	}}
/>

//Card number
<Input
	customFormat={({ value }) => {
		//remove non numeric
		value = value.replace(/\\D/g, '');
		//remove spaces
		value = value.replace(/\\s/g, '');
		//max card number length is 19
		value = _.truncate(value, {
			length: 19,
			omission: '',
		});
		//pretty format for card number
		let match = value.match(/(\\d{1,4})/g);
		if (match !== null) {
			value = match.join(' ');
		}

		return value;
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
			<h3>Only number and max length 10</h3>
			<Input
				customFormat={({ value, previousValue, Input }) => {
					console.log('customFormat', { value, previousValue, Input });
					//remove non numeric
					value = value.replace(/\D/g, '');

					//max card number length is 10
					value = _.truncate(value, {
						length: 10,
						omission: '',
					});

					return value;
				}}
			/>
			<h3>Card number</h3>
			<Input
				customFormat={({ value }) => {
					//remove non numeric
					value = value.replace(/\D/g, '');
					//remove spaces
					value = value.replace(/\s/g, '');
					//max card number length is 19
					value = _.truncate(value, {
						length: 19,
						omission: '',
					});
					//pretty format for card number
					let match = value.match(/(\d{1,4})/g);
					if (match !== null) {
						value = match.join(' ');
					}

					return value;
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
