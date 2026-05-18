import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Input from 'ui/inputs/input';

const title = 'Input: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Input from 'ui/inputs/input';

<Input
	placeholder="Type something..."
	clearable={true}
	onSubmit={({ value, event, Input }) => {
		console.log('onSubmit:', { value, event, Input });
	}}
	onSearch={({ value, event, Input }) => {
		console.log('onSearch:', { value, event, Input });
	}}
	searchTimeout={400}
	onKeyUp={({ value, targetValue, key, event, Input }) => {
		console.log('onKeyUp:', { value, targetValue, key, event, Input });
	}}
	onKeyDown={({ value, targetValue, key, event, Input }) => {
		console.log('onKeyDown:', { value, targetValue, key, event, Input });
	}}
	onKeyPress={({ value, targetValue, key, event, Input }) => {
		console.log('onKeyPress:', { value, targetValue, key, event, Input });
	}}
	onChange={({ value, event, Input }) => {
		console.log('onChange:', { value, event, Input });
	}}
	onFocus={({ value, event, Input }) => {
		console.log('onFocus:', { value, event, Input });
	}}
	onBlur={({ value, event, Input }) => {
		console.log('onBlur:', { value, event, Input });
	}}
	onCopy={({ value, event, Input }) => {
		console.log('onCopy:', { value, event, Input });
	}}
	onCut={({ value, event, Input }) => {
		console.log('onCut:', { value, event, Input });
	}}
	onPaste={({ value, pasted, event, Input }) => {
		console.log('onPaste:', { value, pasted, event, Input });
	}}
	onClear={({ value, event, Input }) => {
		console.log('onClear:', { value, event, Input });
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
			<Input
				placeholder="Type something..."
				clearable={true}
				onSubmit={({ value, event, Input }) => {
					console.log('onSubmit:', { value, event, Input });
				}}
				onSearch={({ value, event, Input }) => {
					console.log('onSearch:', { value, event, Input });
				}}
				searchTimeout={400}
				onKeyUp={({ value, targetValue, key, event, Input }) => {
					console.log('onKeyUp:', { value, targetValue, key, event, Input });
				}}
				onKeyDown={({ value, targetValue, key, event, Input }) => {
					console.log('onKeyDown:', { value, targetValue, key, event, Input });
				}}
				onKeyPress={({ value, targetValue, key, event, Input }) => {
					console.log('onKeyPress:', { value, targetValue, key, event, Input });
				}}
				onChange={({ value, event, Input }) => {
					console.log('onChange:', { value, event, Input });
				}}
				onFocus={({ value, event, Input }) => {
					console.log('onFocus:', { value, event, Input });
				}}
				onBlur={({ value, event, Input }) => {
					console.log('onBlur:', { value, event, Input });
				}}
				onCopy={({ value, event, Input }) => {
					console.log('onCopy:', { value, event, Input });
				}}
				onCut={({ value, event, Input }) => {
					console.log('onCut:', { value, event, Input });
				}}
				onPaste={({ value, pasted, event, Input }) => {
					console.log('onPaste:', { value, pasted, event, Input });
				}}
				onClear={({ value, event, Input }) => {
					console.log('onClear:', { value, event, Input });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
