import React, { PureComponent as Component } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import CardInput from 'ui/inputs/card_input';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

const title = 'CardInput: inside Form';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import CardInput from 'ui/inputs/card_input';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

class Test extends Component {
	constructor(props) {
		super(props);
		this.cardInput = React.createRef();

		this.state = {
			cardInputKey: '',
			loading: false,
		};
	}

	onProcess = ({ data, Form }) => {
		//<editor-fold defaultstate="collapsed" desc="onProcess">
		const isValid = this.cardInput.current.isValid();

		if (!isValid) {
			this.setState({
				loading: false,
			});

			Form.unlock();
			return;
		}
		const cardData = this.cardInput.current.getData();

		const { cardNumber, expMonth, expYear, cvc } = cardData;

		data.card_number = cardNumber;
		data.exp_month = expMonth;
		data.exp_year = '20' + expYear;
		data.cvc = cvc;

		this.setState({
			loading: true,
		});

		remoteRequest({
			url: 'actions/echo',
			data: {
				action: 'view',
				id: 1,
			},
			onSuccess: () => {
				Form.showSuccess('Paid!');
				Form.clear();

				this.setState({
					cardInputKey: _g.generateShortId(),
					loading: false,
				});
			},
		});
		//</editor-fold>
	};

	render() {
		const { loading, cardInputKey } = this.state;
		return (
			<Form
				onProcess={this.onProcess}
				submit={{
					title: 'Pay',
				}}>
				<Field label="Name" name="name" component={Input} isRequired={true} />
				<Field
					label="Surname"
					name="surname"
					component={Input}
					isRequired={true}
				/>
				<div className="text-align-right">
					<CardInput
						key={cardInputKey}
						ref={this.cardInput}
						disabled={loading}
					/>
				</div>
			</Form>
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
			cardInputKey: '',
			loading: false,
		};
	}

	onProcess = ({ data, Form }) => {
		//<editor-fold defaultstate="collapsed" desc="onProcess">
		const isValid = this.cardInput.current.isValid();

		if (!isValid) {
			this.setState({
				loading: false,
			});

			Form.unlock();
			return;
		}
		const cardData = this.cardInput.current.getData();

		const { cardNumber, expMonth, expYear, cvc } = cardData;

		data.card_number = cardNumber;
		data.exp_month = expMonth;
		data.exp_year = '20' + expYear;
		data.cvc = cvc;

		this.setState({
			loading: true,
		});

		remoteRequest({
			url: 'actions/echo',
			data: {
				action: 'view',
				id: 1,
			},
			onSuccess: () => {
				Form.showSuccess('Paid!');
				Form.clear();

				this.setState({
					cardInputKey: _g.generateShortId(),
					loading: false,
				});
			},
		});
		//</editor-fold>
	};

	render() {
		const { loading, cardInputKey } = this.state;
		return (
			<Form
				onProcess={this.onProcess}
				submit={{
					title: 'Pay',
				}}>
				<Field label="Name" name="name" component={Input} isRequired={true} />
				<Field
					label="Surname"
					name="surname"
					component={Input}
					isRequired={true}
				/>
				<div className="text-align-right">
					<CardInput
						key={cardInputKey}
						ref={this.cardInput}
						disabled={loading}
					/>
				</div>
			</Form>
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
