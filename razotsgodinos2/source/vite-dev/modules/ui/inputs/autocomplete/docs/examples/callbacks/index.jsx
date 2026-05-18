import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import AutoComplete from 'ui/inputs/autocomplete';

const title = 'AutoComplete: callbacks';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AutoComplete from 'ui/inputs/autocomplete';

<AutoComplete
	onChange={({ value, AutoComplete }) => {
		console.log('onChange:', { value, AutoComplete });
	}}
	onOpen={({ AutoComplete }) => {
		console.log('onOpen:', { AutoComplete });
	}}
	onClose={({ AutoComplete }) => {
		console.log('onClose:', { AutoComplete });
	}}
	onSelect={({ value, label, index, option, AutoComplete }) => {
		console.log('onSelect:', {
			value,
			label,
			index,
			option,
			AutoComplete,
		});
		AutoComplete.onSelected(label);
		//or
		//AutoComplete.reset();
	}}
	onFocus={({ AutoComplete }) => {
		console.log('onFocus:', { AutoComplete });
	}}
	onBlur={({ AutoComplete }) => {
		console.log('onBlur:', { AutoComplete });
	}}
	onInputKeyDown={({
		value,
		targetValue,
		key,
		event,
		Input,
		AutoComplete,
	}) => {
		console.log('onInputKeyDown:', {
			value,
			targetValue,
			key,
			event,
			Input,
			AutoComplete,
		});
	}}
	onInputSubmit={({ AutoComplete }) => {
		console.log('onInputSubmit:', {
			AutoComplete,
		});
	}}
	onArrowKeyUp={({ AutoComplete }) => {
		console.log('onArrowKeyUp:', {
			AutoComplete,
		});

		const { opened, focusedIndex, options } = AutoComplete.state;

		if (opened) {
			event.preventDefault();
		}

		if (!opened || options.length === 0) {
			return;
		}

		const newIndex = _.isNull(focusedIndex)
			? options.length - 1
			: focusedIndex - 1;

		if (!_.isUndefined(options[newIndex])) {
			AutoComplete.setState({
				focusedIndex: newIndex,
			});
		} else {
			AutoComplete.setState({
				focusedIndex: null,
			});
		}
	}}
	onArrowKeyDown={({ AutoComplete }) => {
		console.log('onArrowKeyDown:', {
			AutoComplete,
		});

		const { opened, focusedIndex, options } = AutoComplete.state;

		if (opened) {
			event.preventDefault();
		}

		if (!opened && options.length > 0) {
			event.preventDefault();
			AutoComplete.open();
		}

		if (!opened || options.length === 0) {
			return;
		}

		const newIndex = _.isNull(focusedIndex) ? 0 : focusedIndex + 1;

		if (!_.isUndefined(options[newIndex])) {
			AutoComplete.setState({
				focusedIndex: newIndex,
			});
		} else {
			AutoComplete.setState({
				focusedIndex: null,
			});
		}
	}}
	options={[
		{
			value: 'age_of_mythology',
			label: 'Age of Mythology',
		},
		{
			value: 'starcraft',
			label: 'StarCraft',
		},
		{
			value: 'counter_strike',
			label: 'Counter strike',
		},
	]}
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
			<AutoComplete
				onChange={({ value, AutoComplete }) => {
					console.log('onChange:', { value, AutoComplete });
				}}
				onOpen={({ AutoComplete }) => {
					console.log('onOpen:', { AutoComplete });
				}}
				onClose={({ AutoComplete }) => {
					console.log('onClose:', { AutoComplete });
				}}
				onSelect={({ value, label, index, option, AutoComplete }) => {
					console.log('onSelect:', {
						value,
						label,
						index,
						option,
						AutoComplete,
					});
					AutoComplete.onSelected(label);
					//or
					//AutoComplete.reset();
				}}
				onFocus={({ AutoComplete }) => {
					console.log('onFocus:', { AutoComplete });
				}}
				onBlur={({ AutoComplete }) => {
					console.log('onBlur:', { AutoComplete });
				}}
				onInputKeyDown={({
					value,
					targetValue,
					key,
					event,
					Input,
					AutoComplete,
				}) => {
					console.log('onInputKeyDown:', {
						value,
						targetValue,
						key,
						event,
						Input,
						AutoComplete,
					});
				}}
				onInputSubmit={({ AutoComplete }) => {
					console.log('onInputSubmit:', {
						AutoComplete,
					});
				}}
				onArrowKeyUp={({ AutoComplete }) => {
					console.log('onArrowKeyUp:', {
						AutoComplete,
					});

					const { opened, focusedIndex, options } = AutoComplete.state;

					if (opened) {
						event.preventDefault();
					}

					if (!opened || options.length === 0) {
						return;
					}

					const newIndex = _.isNull(focusedIndex)
						? options.length - 1
						: focusedIndex - 1;

					if (!_.isUndefined(options[newIndex])) {
						AutoComplete.setState({
							focusedIndex: newIndex,
						});
					} else {
						AutoComplete.setState({
							focusedIndex: null,
						});
					}
				}}
				onArrowKeyDown={({ AutoComplete }) => {
					console.log('onArrowKeyDown:', {
						AutoComplete,
					});

					const { opened, focusedIndex, options } = AutoComplete.state;

					if (opened) {
						event.preventDefault();
					}

					if (!opened && options.length > 0) {
						event.preventDefault();
						AutoComplete.open();
					}

					if (!opened || options.length === 0) {
						return;
					}

					const newIndex = _.isNull(focusedIndex) ? 0 : focusedIndex + 1;

					if (!_.isUndefined(options[newIndex])) {
						AutoComplete.setState({
							focusedIndex: newIndex,
						});
					} else {
						AutoComplete.setState({
							focusedIndex: null,
						});
					}
				}}
				options={[
					{
						value: 'age_of_mythology',
						label: 'Age of Mythology',
					},
					{
						value: 'starcraft',
						label: 'StarCraft',
					},
					{
						value: 'counter_strike',
						label: 'Counter strike',
					},
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
