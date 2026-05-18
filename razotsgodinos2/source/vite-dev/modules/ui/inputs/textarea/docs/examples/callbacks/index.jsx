import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import TextArea from 'ui/inputs/textarea';

const title = 'TextArea: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import TextArea from 'ui/inputs/textarea';

<TextArea
	placeholder="Type something..."
	clearable={true}
	onSubmit={({ value, event, TextArea }) => {
		console.log('onSubmit:', { value, event, TextArea });
	}}
	onSearch={({ value, event, TextArea }) => {
		console.log('onSearch:', { value, event, TextArea });
	}}
	searchTimeout={400}
	onKeyUp={({ value, targetValue, key, event, TextArea }) => {
		console.log('onKeyUp:', { value, targetValue, key, event, TextArea });
	}}
	onKeyDown={({ value, targetValue, key, event, TextArea }) => {
		console.log('onKeyDown:', { value, targetValue, key, event, TextArea });
	}}
	onKeyPress={({ value, targetValue, key, event, TextArea }) => {
		console.log('onKeyPress:', { value, targetValue, key, event, TextArea });
	}}
	onChange={({ value, event, TextArea }) => {
		console.log('onChange:', { value, event, TextArea });
	}}
	onFocus={({ value, event, TextArea }) => {
		console.log('onFocus:', { value, event, TextArea });
	}}
	onBlur={({ value, event, TextArea }) => {
		console.log('onBlur:', { value, event, TextArea });
	}}
	onCopy={({ value, event, TextArea }) => {
		console.log('onCopy:', { value, event, TextArea });
	}}
	onCut={({ value, event, TextArea }) => {
		console.log('onCut:', { value, event, TextArea });
	}}
	onPaste={({ value, pasted, event, TextArea }) => {
		console.log('onPaste:', { value, pasted, event, TextArea });
	}}
	onClear={({ value, event, TextArea }) => {
		console.log('onClear:', { value, event, TextArea });
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
			<TextArea
				placeholder="Type something..."
				clearable={true}
				onSubmit={({ value, event, TextArea }) => {
					console.log('onSubmit:', { value, event, TextArea });
				}}
				onSearch={({ value, event, TextArea }) => {
					console.log('onSearch:', { value, event, TextArea });
				}}
				searchTimeout={400}
				onKeyUp={({ value, targetValue, key, event, TextArea }) => {
					console.log('onKeyUp:', { value, targetValue, key, event, TextArea });
				}}
				onKeyDown={({ value, targetValue, key, event, TextArea }) => {
					console.log('onKeyDown:', {
						value,
						targetValue,
						key,
						event,
						TextArea,
					});
				}}
				onKeyPress={({ value, targetValue, key, event, TextArea }) => {
					console.log('onKeyPress:', {
						value,
						targetValue,
						key,
						event,
						TextArea,
					});
				}}
				onChange={({ value, event, TextArea }) => {
					console.log('onChange:', { value, event, TextArea });
				}}
				onFocus={({ value, event, TextArea }) => {
					console.log('onFocus:', { value, event, TextArea });
				}}
				onBlur={({ value, event, TextArea }) => {
					console.log('onBlur:', { value, event, TextArea });
				}}
				onCopy={({ value, event, TextArea }) => {
					console.log('onCopy:', { value, event, TextArea });
				}}
				onCut={({ value, event, TextArea }) => {
					console.log('onCut:', { value, event, TextArea });
				}}
				onPaste={({ value, pasted, event, TextArea }) => {
					console.log('onPaste:', { value, pasted, event, TextArea });
				}}
				onClear={({ value, event, TextArea }) => {
					console.log('onClear:', { value, event, TextArea });
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
