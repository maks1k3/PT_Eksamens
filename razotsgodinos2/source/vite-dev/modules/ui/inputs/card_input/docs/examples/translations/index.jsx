import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CardInput from 'ui/inputs/card_input';
import RadioGroup from 'ui/inputs/radio_group';
import LocaleProvider from 'ui/misc/locale_provider';

const title = 'CardInput: translations';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CardInput from 'ui/inputs/card_input';
import RadioGroup from 'ui/inputs/radio_group';
import LocaleProvider from 'ui/misc/locale_provider';

class Test extends Component {
	constructor(props) {
		super(props);
		this.cardInput = React.createRef();

		this.state = {
			locale: 'en',
		};
	}

	render() {
		const { locale } = this.state;
		return (
			<LocaleProvider locale={locale}>
				<RadioGroup
					onChange={({ value }) => {
						this.setState({
							locale: value,
						});
					}}
					controlled={true}
					value={locale}
					options={[
						{
							value: 'en',
							label: 'en',
						},
						{
							value: 'lv',
							label: 'lv',
						},
						{
							value: 'ru',
							label: 'ru',
						},
					]}
				/>
				<CardInput />
			</LocaleProvider>
		);
	}
}
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);
		this.cardInput = React.createRef();

		this.state = {
			locale: 'en',
		};
	}

	render() {
		const { locale } = this.state;
		return (
			<LocaleProvider locale={locale}>
				<RadioGroup
					onChange={({ value }) => {
						this.setState({
							locale: value,
						});
					}}
					controlled={true}
					value={locale}
					options={[
						{
							value: 'en',
							label: 'en',
						},
						{
							value: 'lv',
							label: 'lv',
						},
						{
							value: 'ru',
							label: 'ru',
						},
					]}
				/>
				<CardInput />
			</LocaleProvider>
		);
	}
}

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Test />
		</ExampleHolder>
	);
};

export default Example;
