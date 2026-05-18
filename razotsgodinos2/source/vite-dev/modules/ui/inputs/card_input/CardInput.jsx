import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import payment from 'payment';
import creditCardType from 'credit-card-type';

import Image from 'ui/media/image';

import {
	formatCardNumber,
	formatExpiry,
	hasCardNumberReachedMaxLength,
	hasCVCReachedMaxLength,
} from './utils/formatter';
import images from './utils/images';
import isExpiryInvalid from './utils/is-expiry-invalid';
import isZipValid from './utils/is-zip-valid';

const BACKSPACE_KEY_CODE = 8;
const CARD_TYPES = {
	mastercard: 'MASTERCARD',
	visa: 'VISA',
	amex: 'AMERICAN_EXPRESS',
};

import styles from './CardInput.module.less';

const propTypes = {
	classNames: PropTypes.object,

	enableZipInput: PropTypes.bool,
	disabled: PropTypes.bool,

	errorText: PropTypes.string,

	cardNumberFieldError: PropTypes.bool,
	cardExpiryFieldError: PropTypes.bool,
	cvcFieldError: PropTypes.bool,
	zipFieldError: PropTypes.bool,
	forcePropsUpdate: PropTypes.string, //_g.generateShortId();

	translations: PropTypes.object,
};

const defaultProps = {
	classNames: {},

	enableZipInput: false,
	disabled: false,

	translations: {
		card_number: 'Card number',
		card_number_is_invalid: 'Card number is invalid.',
		cvc_is_invalid: 'CVC is invalid.',
		zip_code_is_invalid: 'ZIP code is invalid.',
		expiry_date_is_invalid: 'Expiry date is invalid.',
		expiry_month_out_of_range: 'Expiry month must be between 01 and 12.',
		expiry_year_out_of_range: 'Expiry year cannot be in the past.',
		expiry_date_out_of_range: 'Expiry date cannot be in the past.',
	},
};

class CardInput extends Component {
	constructor(props) {
		super(props);

		this.cardNumberField = React.createRef();
		this.cardExpiryField = React.createRef();
		this.cvcField = React.createRef();
		this.zipField = React.createRef();

		this.state = {
			cardImage: images.placeholder,
			cardNumber: '',
			cardNumberDisplay: '',
			expDate: '',
			cvc: '',
			zip: '',
			errorText: null,
			showZip: false,
			cardNumberFieldError: false,
			cardExpiryFieldError: false,
			cvcFieldError: false,
			zipFieldError: false,
		};
	}

	componentDidUpdate(prevProps) {
		//<editor-fold defaultstate="collapsed" desc="componentDidUpdate">
		const updatedState = {};

		_.forEach(
			[
				'errorText',
				'cardNumberFieldError',
				'cardExpiryFieldError',
				'cvcFieldError',
				'zipFieldError',
			],
			key => {
				if (
					prevProps[key] !== this.props[key] ||
					prevProps['forcePropsUpdate'] !== this.props['forcePropsUpdate']
				) {
					if (this.state[key] !== this.props[key]) {
						updatedState[key] = this.props[key];
					}
				}
			},
		);

		if (!_g.isEmpty(updatedState)) {
			this.setState(updatedState);
		}
		//</editor-fold>
	}

	getData = () => {
		//<editor-fold defaultstate="collapsed" desc="getData">
		const cardNumber = this.state.cardNumber;
		const expData = this.state.expDate.split(' / ');
		const expMonth = _.get(expData, 0, '');
		const expYear = _.get(expData, 1, '');
		const cvc = this.state.cvc;

		const { enableZipInput } = this.props;

		const extra = {};
		if (enableZipInput) {
			extra.zip = this.state.zip;
		}

		return {
			cardNumber,
			expMonth,
			expYear,
			cvc,
			...extra,
		};
		//</editor-fold>
	};

	setData = ({ cardNumber, expMonth, expYear, cvc, zip }) => {
		//<editor-fold defaultstate="collapsed" desc="setData">
		this.handleCardNumberChange(cardNumber, true);
		this.handleCardExpiryChange(expMonth + ' / ' + expYear, true);
		this.handleCardCVCChange(cvc, true);

		const { enableZipInput } = this.props;

		if (enableZipInput) {
			this.handleCardZipChange(zip);
		}
		//</editor-fold>
	};

	getExpiryError = error => {
		//<editor-fold defaultstate="collapsed" desc="getExpiryError">
		const { translations } = this.props;
		let result = _.get(
			translations,
			'expiry_date_is_invalid',
			'Expiry date is invalid.',
		);

		switch (error) {
			case 'expiry_month_out_of_range':
				result = _.get(
					translations,
					'expiry_month_out_of_range',
					'Expiry month must be between 01 and 12.',
				);
				break;
			case 'expiry_year_out_of_range':
				result = _.get(
					translations,
					'expiry_year_out_of_range',
					'Expiry year cannot be in the past.',
				);
				break;
			case 'expiry_date_out_of_range':
				result = _.get(
					translations,
					'expiry_date_out_of_range',
					'Expiry date cannot be in the past.',
				);
				break;
		}

		return result;
		//</editor-fold>
	};

	isValid = () => {
		//<editor-fold defaultstate="collapsed" desc="isValid">
		const { translations, enableZipInput } = this.props;

		const cardNumber = this.state.cardNumber;

		const isValidCardNumber = payment.fns.validateCardNumber(cardNumber);

		if (!isValidCardNumber) {
			this.setState({
				cardNumberFieldError: true,
				errorText: _.get(
					translations,
					'card_number_is_invalid',
					'Card number is invalid!',
				),
			});
			return false;
		}

		const expDate = this.state.expDate.split(' / ').join('/');

		const expiryError = isExpiryInvalid(expDate, {});

		if (expiryError) {
			this.setState({
				cardExpiryFieldError: true,
				errorText: this.getExpiryError(expiryError),
			});
			return false;
		}

		const cvc = this.state.cvc;
		const cardType = payment.fns.cardType(this.state.cardNumber);

		if (!payment.fns.validateCardCVC(cvc, cardType)) {
			this.setState({
				cvcFieldError: true,
				errorText: _.get(translations, 'cvc_is_invalid', 'CVC is invalid!'),
			});
			return false;
		}

		if (enableZipInput) {
			const zip = this.state.zip;

			if (!isZipValid(zip)) {
				this.setState({
					zipFieldError: true,
					errorText: _.get(
						translations,
						'zip_code_is_invalid',
						'ZIP code is invalid!',
					),
				});
				return false;
			}
		}

		return true;
		//</editor-fold>
	};

	removeNonNumeric = value => {
		//<editor-fold defaultstate="collapsed" desc="removeNonNumeric">
		return value.replace(/\D/g, '');
		//</editor-fold>
	};

	handleKeyDown = ref => {
		//<editor-fold defaultstate="collapsed" desc="handleKeyDown">
		return e => {
			if (e.keyCode === BACKSPACE_KEY_CODE && !e.target.value) {
				ref.current.focus();
			}
		};
		//</editor-fold>
	};

	formatCardNumberValue = value => {
		//<editor-fold defaultstate="collapsed" desc="formatCardNumberValue">
		value = value.split(' ').join('');
		value = this.removeNonNumeric(value);

		if (hasCardNumberReachedMaxLength(value, value.length - 1)) {
			value = this.state.cardNumber;
		}

		if (value.length >= 19) {
			value = this.state.cardNumber;
		}

		return value;
		//</editor-fold>
	};

	handleCardNumberChange = (value, manual = false) => {
		//<editor-fold defaultstate="collapsed" desc="handleCardNumberChange">
		const { disabled } = this.props;

		if (disabled && !manual) {
			return;
		}

		const { translations, enableZipInput } = this.props;
		const cardNumber = this.formatCardNumberValue(value);

		const cardNumberLength = cardNumber.length;
		const cardType = payment.fns.cardType(formatCardNumber(cardNumber));
		const cardTypeInfo =
			creditCardType.getTypeInfo(creditCardType.types[CARD_TYPES[cardType]]) ||
			{};
		const cardTypeLengths = cardTypeInfo.lengths || [16];

		this.setState({
			cardImage: images[cardType] || images.placeholder,
			cardNumber,
			cardNumberDisplay: formatCardNumber(cardNumber),
			cardNumberFieldError: false,
			errorText: null,
		});

		if (enableZipInput) {
			this.setState({ showZip: cardNumberLength >= 6 });
		}

		if (cardTypeLengths) {
			const lastCardTypeLength = cardTypeLengths[cardTypeLengths.length - 1];
			for (let length of cardTypeLengths) {
				if (
					length === cardNumberLength &&
					payment.fns.validateCardNumber(cardNumber)
				) {
					if (!manual) {
						this.cardExpiryField.current.focus();
					}

					break;
				}
				if (cardNumberLength === lastCardTypeLength) {
					this.setState({
						cardNumberFieldError: true,
						errorText: _.get(
							translations,
							'card_number_is_invalid',
							'Card number is invalid!',
						),
					});
				}
			}
		}
		//</editor-fold>
	};

	formatCardExpiryValue = value => {
		//<editor-fold defaultstate="collapsed" desc="formatCardExpiry">
		value = this.removeNonNumeric(value);
		value = _.truncate(value, {
			length: 4,
			omission: '',
		});
		return value;

		// const values = value.split(' / ');
		//
		// for (let i = 0; i < values.length; i++) {
		// 	value = values[i];
		// 	value = this.removeNonNumeric(value);
		// 	value = _.truncate(value, {
		// 		length: 2,
		// 		omission: '',
		// 	});
		//
		// 	values[i] = value;
		// }
		//
		// return values.join('/');
		//</editor-fold>
	};

	handleCardExpiryChange = (value, manual = false) => {
		//<editor-fold defaultstate="collapsed" desc="handleCardExpiryChange">
		const { disabled } = this.props;

		if (disabled && !manual) {
			return;
		}

		value = this.formatCardExpiryValue(value);

		this.setState({
			expDate: formatExpiry(value),
			cardExpiryFieldError: false,
			errorText: null,
		});

		let cardExpiry = formatExpiry(value);

		if (!_g.isEmpty(cardExpiry)) {
			cardExpiry = cardExpiry.split(' / ').join('/');
		}

		const expiryError = isExpiryInvalid(cardExpiry, {});
		if (cardExpiry.length > 4) {
			if (expiryError) {
				this.setState({
					cardExpiryFieldError: true,
					errorText: this.getExpiryError(expiryError),
				});
			} else {
				if (!manual) {
					this.cvcField.current.focus();
				}
			}
		}
		//</editor-fold>
	};

	formatCVCValue = value => {
		//<editor-fold defaultstate="collapsed" desc="formatCVCValue">
		value = this.removeNonNumeric(value);

		if (value.length >= 4) {
			value = _.truncate(value, {
				length: 4,
				omission: '',
			});
		}

		return value;
		//</editor-fold>
	};

	handleCardCVCChange = (value, manual = false) => {
		//<editor-fold defaultstate="collapsed" desc="handleCardCVCChange">
		const { disabled } = this.props;

		if (disabled && !manual) {
			return;
		}

		value = this.formatCVCValue(value);

		const { translations } = this.props;
		const CVC = value;
		const CVCLength = CVC.length;
		const isZipFieldAvailable = this.props.enableZipInput && this.state.showZip;
		const cardType = payment.fns.cardType(this.state.cardNumber);

		this.setState({
			cvc: value,
			cvcFieldError: false,
			errorText: null,
		});
		if (CVCLength >= 4) {
			if (!payment.fns.validateCardCVC(CVC, cardType)) {
				this.setState({
					cvcFieldError: true,
					errorText: _.get(translations, 'cvc_is_invalid', 'CVC is invalid!'),
				});
			}
		}

		if (
			isZipFieldAvailable &&
			hasCVCReachedMaxLength(cardType, CVCLength) &&
			!manual
		) {
			this.zipField.current.focus();
		}
		//</editor-fold>
	};

	formatZipValue = value => {
		//<editor-fold defaultstate="collapsed" desc="formatZipValue">
		value = this.removeNonNumeric(value);

		if (value.length >= 5) {
			value = _.truncate(value, {
				length: 5,
				omission: '',
			});
		}

		return value;
		//</editor-fold>
	};

	handleCardZipChange = (value, manual = false) => {
		//<editor-fold defaultstate="collapsed" desc="handleCardZipChange">
		const { disabled } = this.props;

		if (disabled && !manual) {
			return;
		}

		value = this.formatZipValue(value);

		const { translations } = this.props;
		const zip = value;
		const zipLength = zip.length;

		this.setState({
			zip: value,
			zipFieldError: false,
			errorText: null,
		});

		if (zipLength >= 5 && !isZipValid(zip)) {
			this.setState({
				zipFieldError: true,
				errorText: _.get(
					translations,
					'zip_code_is_invalid',
					'ZIP code is invalid!',
				),
			});
		}
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Card Number events
	 *
	 * ========================================================================*/
	onCardNumberBlur = e => {
		//<editor-fold defaultstate="collapsed" desc="onCardNumberBlur">
		const { translations } = this.props;
		if (
			e.target.value.length > 0 &&
			!payment.fns.validateCardNumber(e.target.value)
		) {
			this.setState({
				cardNumberFieldError: true,
				errorText: _.get(
					translations,
					'card_number_is_invalid',
					'Card number is invalid!',
				),
			});
		}
		//</editor-fold>
	};

	onCardNumberChange = e => {
		//<editor-fold defaultstate="collapsed" desc="onCardNumberChange">
		this.handleCardNumberChange(e.target.value);
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Card Expiry events
	 *
	 * ========================================================================*/
	onCardExpiryBlur = e => {
		//<editor-fold defaultstate="collapsed" desc="onCardExpiryBlur">
		if (e.target.value.length === 0) {
			return;
		}

		let value = this.formatCardExpiryValue(e.target.value);
		let cardExpiry = formatExpiry(value);

		if (!_g.isEmpty(cardExpiry)) {
			cardExpiry = cardExpiry.split(' / ').join('/');
		}

		const expiryError = isExpiryInvalid(cardExpiry, {});
		if (expiryError) {
			this.setState({
				cardExpiryFieldError: true,
				errorText: this.getExpiryError(expiryError),
			});
		}
		//</editor-fold>
	};

	onCardExpiryChange = e => {
		//<editor-fold defaultstate="collapsed" desc="onCardExpiryChange">
		this.handleCardExpiryChange(e.target.value);
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Card CVC events
	 *
	 * ========================================================================*/
	onCardCVCBlur = e => {
		//<editor-fold defaultstate="collapsed" desc="onCardCVCBlur">
		const { translations } = this.props;
		if (
			e.target.value.length > 0 &&
			!payment.fns.validateCardCVC(e.target.value)
		) {
			this.setState({
				cvcFieldError: true,
				errorText: _.get(translations, 'cvc_is_invalid', 'CVC is invalid!'),
			});
		}
		//</editor-fold>
	};

	onCardCVCChange = e => {
		//<editor-fold defaultstate="collapsed" desc="onCardCVCChange">
		this.handleCardCVCChange(e.target.value);
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Card ZIP events
	 *
	 * ========================================================================*/
	onCardZipBlur = e => {
		//<editor-fold defaultstate="collapsed" desc="onCardZipBlur">
		const { translations } = this.props;
		if (e.target.value.length > 0 && !isZipValid(e.target.value)) {
			this.setState({
				zipFieldError: true,
				errorText: _.get(
					translations,
					'zip_code_is_invalid',
					'ZIP code is invalid!',
				),
			});
		}
		//</editor-fold>
	};

	onCardZipChange = e => {
		//<editor-fold defaultstate="collapsed" desc="onCardZipChange">
		this.handleCardZipChange(e.target.value);
		//</editor-fold>
	};

	/* ========================================================================*
 *
 *                     Renderers
 *
 * ========================================================================*/
	renderCardImage = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderCardImage">
		const { cardImage } = this.state;
		return (
			<div>
				<Image className={classNames['card-image']} src={cardImage} />
			</div>
		);
		//</editor-fold>
	};

	renderCardNumberInput = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderCardNumberInput">
		const { translations } = this.props;
		const placeholder = _.get(translations, 'card_number', 'Card number');

		const { cardNumberFieldError, cardNumberDisplay } = this.state;

		const className = _g.classNames(classNames['input'], {
			[classNames['input_error']]: cardNumberFieldError,
		});

		return (
			<div
				className={classNames['input-wrapper']}
				data-max="4242 4242 4242 4242 4240">
				<input
					ref={this.cardNumberField}
					className={className}
					autoComplete="cc-number"
					placeholder={placeholder}
					type="tel"
					onBlur={this.onCardNumberBlur}
					onChange={this.onCardNumberChange}
					value={cardNumberDisplay}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderCardExpDateInput = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderCardExpDateInput">
		const { enableZipInput } = this.props;
		const { showZip, expDate } = this.state;

		const inputWrapperclassName = _g.classNames(classNames['input-wrapper'], {
			[classNames['input-wrapper_translate']]: !enableZipInput
				? false
				: !showZip,
		});

		const { cardExpiryFieldError } = this.state;

		const className = _g.classNames(classNames['input'], {
			[classNames['input_error']]: cardExpiryFieldError,
		});

		return (
			<div className={inputWrapperclassName} data-max="MM / YY0">
				<input
					ref={this.cardExpiryField}
					className={className}
					autoComplete="cc-exp"
					placeholder="MM/YY"
					type="tel"
					onBlur={this.onCardExpiryBlur}
					onChange={this.onCardExpiryChange}
					onKeyDown={this.handleKeyDown(this.cardNumberField)}
					value={expDate}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderCardCVCInput = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderCardCVCInput">
		const { enableZipInput } = this.props;
		const { showZip, cvc } = this.state;

		const inputWrapperclassName = _g.classNames(classNames['input-wrapper'], {
			[classNames['input-wrapper_translate']]: !enableZipInput
				? false
				: !showZip,
		});

		const { cvcFieldError } = this.state;

		const className = _g.classNames(classNames['input'], {
			[classNames['input_error']]: cvcFieldError,
		});

		return (
			<div className={inputWrapperclassName} data-max="00000">
				<input
					ref={this.cvcField}
					className={className}
					autoComplete="off"
					placeholder="CVC"
					type="tel"
					onBlur={this.onCardCVCBlur}
					onChange={this.onCardCVCChange}
					onKeyDown={this.handleKeyDown(this.cardExpiryField)}
					value={cvc}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderCardZipInput = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderCardZipInput">
		const { enableZipInput } = this.props;
		const { showZip, zip } = this.state;

		const inputWrapperclassName = _g.classNames(classNames['input-wrapper'], {
			[classNames['input-wrapper_hidden']]: !enableZipInput,
			[classNames['input-wrapper_translate']]: !enableZipInput
				? false
				: !showZip,
		});

		const { zipFieldError } = this.state;

		const className = _g.classNames(classNames['input'], {
			[classNames['input_error']]: zipFieldError,
			[classNames['input_hidden']]: !enableZipInput || !showZip,
		});

		return (
			<div className={inputWrapperclassName} data-max="902100">
				<input
					ref={this.zipField}
					className={className}
					autoComplete="postal-code"
					placeholder="ZIP"
					type="tel"
					onBlur={this.onCardZipBlur}
					onChange={this.onCardZipChange}
					onKeyDown={this.handleKeyDown(this.cvcField)}
					value={zip}
				/>
			</div>
		);
		//</editor-fold>
	};

	renderErrorText = classNames => {
		//<editor-fold defaultstate="collapsed" desc="renderErrorText">
		const { errorText } = this.state;
		let text = '';

		if (!_g.isEmpty(errorText)) {
			text = errorText;
		}

		return <div className={classNames['error']}>{text}</div>;
		//</editor-fold>
	};

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		this.classNames = classNames;

		const { errorText } = this.state;

		const className = _g.classNames(classNames['wrapper'], {
			[classNames['wrapper_error']]: !_g.isEmpty(errorText),
		});

		return (
			<div className={classNames['outer-wrapper']}>
				<div className={className}>
					{this.renderCardImage(classNames)}
					{this.renderCardNumberInput(classNames)}
					{this.renderCardExpDateInput(classNames)}
					{this.renderCardCVCInput(classNames)}
					{this.renderCardZipInput(classNames)}
				</div>
				{this.renderErrorText(classNames)}
			</div>
		);
	}
}

CardInput.propTypes = propTypes;

CardInput.defaultProps = defaultProps;

CardInput = WithLocale(CardInput);

export default CardInput;
