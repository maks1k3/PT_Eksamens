import React, { Fragment, PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CardInput from 'ui/inputs/card_input';
import Title from 'ui/common/title';

const title = 'CardInput: pre-filled values';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CardInput from 'ui/inputs/card_input';
import Title from 'ui/common/title';

class Test extends Component {
	constructor(props) {
		super(props);
		this.cardInput = React.createRef();
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.cardInput.current.setData({
			cardNumber: '4242 4242 4242 4242',
			expMonth: '12',
			expYear: '99',
			cvc: '123',
		});
		//</editor-fold>
	}

	render() {
		return (
			<Fragment>
				<div className="margin-bottom">
					<Title>Visa</Title>
					<CardInput ref={this.cardInput} />
				</div>
			</Fragment>
		);
	}
}
  `,
};

class Test extends Component {
	constructor(props) {
		super(props);
		this.cardInputVisa = React.createRef();
		this.cardInputMastercard = React.createRef();
		this.cardInputAmericanExpress = React.createRef();
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		this.cardInputVisa.current.setData({
			cardNumber: '4242 4242 4242 4242',
			expMonth: '12',
			expYear: '99',
			cvc: '123',
		});

		this.cardInputMastercard.current.setData({
			cardNumber: '5555 5555 5555 4444',
			expMonth: '12',
			expYear: '99',
			cvc: '123',
		});

		this.cardInputAmericanExpress.current.setData({
			cardNumber: '3714 496353 98431',
			expMonth: '12',
			expYear: '99',
			cvc: '123',
			zip: '54545',
		});
		//</editor-fold>
	}

	render() {
		return (
			<Fragment>
				<div className="margin-bottom">
					<Title>Visa</Title>
					<CardInput ref={this.cardInputVisa} />
				</div>
				<div className="margin-bottom">
					<Title>Mastercard</Title>
					<CardInput ref={this.cardInputMastercard} />
				</div>
				<div className="margin-bottom">
					<Title>American Express enableZipInput:true</Title>
					<CardInput
						ref={this.cardInputAmericanExpress}
						enableZipInput={true}
					/>
				</div>
			</Fragment>
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
