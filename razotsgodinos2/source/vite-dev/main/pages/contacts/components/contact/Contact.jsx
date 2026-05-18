import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Contact.module.less';
import Form from 'ui/form';
import FormField from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import Checkbox from 'ui/inputs/checkbox';
import FormSubmitButton from 'ui/form/form_submit_button';
import Svg1 from './svg/Svg1';
import Svg2 from './svg/Svg2';
import Svg3 from './svg/Svg3';
import Svg4 from './svg/Svg4';
import Svg5 from './svg/Svg5';
import Svg6 from './svg/Svg6';
import getMainUrl from 'helpers/getMainUrl';
import Link from 'core/navigation/link';
import WithUi from 'hoc/store/ui';
import Editable from 'cms/editable';

const propTypes = {};

const uiProps = (ownProps) => {
	return {
		content: {
			phone: {
				langData: 'langData',
			},
			email: {
				langData: 'langData1',
			},
			facebook: {
				langData: 'langData2',
			},
			instagram: {
				langData: 'langData3',
			},
			adress: {
				langData: 'langData4',
			},
			send_message: {
				langData: 'langData5',
			},
			our_contacts: {
				langData: 'langData6',
			},
			contact_send_btn: {
				langData: 'langData7',
			},
		},
	};
};

const defaultProps = {};

class Contact extends Component {
	state = {
		isSuccess: false,
		sendError: null,
		sending: false,
	};

	sendContactToDb = ({ data }) => {
		this.setState({ sending: true, sendError: null });

		const payload = {
			nickname: data.nickname,
			phone: data.phone,
			email: data.email,
			message: data.message,
			privacy: data.privacy ? 1 : 0,
		};

		return fetch('/api/contact_form/send', {
			method: 'POST',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
			.then(async (r) => {
				const text = await r.text();
				let json = null;

				try {
					json = JSON.parse(text);
				} catch (e) {}

				if (!json) throw new Error('Not JSON response');
				if (json.reload)
					throw new Error('CSRF reload (add URI to VerifyCsrfToken $except)');
				if (json.success === false)
					throw new Error(json.message || 'Server error');

				return json;
			})
			.then(() => {
				this.setState({ isSuccess: true, sending: false });

				setTimeout(() => window.location.reload(), 2000);

				return { success: true };
			})
			.catch((e) => {
				console.error(e);
				this.setState({
					sending: false,
					sendError: e?.message || 'Server error',
				});

				throw e;
			});
	};

	render() {
		const { isSuccess } = this.state;

		if (isSuccess) {
			return (
				<div className={styles.container}>
					<div className={styles.info}>
						<div className={styles.left}>
							<div className={styles.head}>Ziņa veiksmīgi nosūtīta!</div>
						</div>
					</div>
				</div>
			);
		}

		const baseInputProps = {
			showStyledPlaceholder: true,
			classNames: {
				wrapper: styles.inputWrap,
				wrapper_focused: styles.inputWrapFocused,
				wrapper_error: styles.inputWrapError,
				wrapper_disabled: styles.inputWrapDisabled,
				center: styles.center,
				input: styles.input,
				'styled-placeholder-wrapper': styles.labelWrap,
				'styled-placeholder': styles.label,
			},
		};

		return (
			<div className={styles.container}>
				<div className={styles.info}>
					<div className={styles.left}>
						<div className={styles.head}>
							<Editable
								edit={{
									name: 'send_message',
								}}>
								{this.props.langData5?.message}
							</Editable>
						</div>

						<Form
							name="contactForm"
							showResponse={false}
							submit={undefined}
							onSubmit={this.sendContactToDb}>
							<div className={styles.forma}>
								<FormField
									name="nickname"
									component={Input}
									componentProps={{
										...baseInputProps,
										placeholder: 'Vārds, vai uzņēmums *',
									}}
									isRequired
								/>

								<div className={styles.row2}>
									<FormField
										name="phone"
										component={Input}
										componentProps={{
											...baseInputProps,
											placeholder: 'Tel. nr. *',
										}}
										isRequired
									/>

									<FormField
										name="email"
										component={Input}
										componentProps={{
											...baseInputProps,
											placeholder: 'E-pasts *',
										}}
										isRequired
										isEmail
									/>
								</div>

								<FormField
									name="message"
									component={TextArea}
									componentProps={{
										...baseInputProps,
										placeholder: 'Ziņa ... ',
										classNames: {
											...baseInputProps.classNames,
											textarea: styles.textarea,
											'styled-placeholder-wrapper': styles.textareaLabelWrap,
										},
									}}
									isRequired
								/>
							</div>
							<div className={styles.checkbox}>
								<FormField
									name="privacy"
									component={Checkbox}
									componentProps={{
										classNames: {
											outer: styles.cbOuter,
											wrapper: styles.cbBox,
											wrapper_focused: styles.cbBoxFocused,
											wrapper_error: styles.cbBoxError,
											wrapper_disabled: styles.cbBoxDisabled,
											wrapper_main_active: styles.cbBoxActive,
											tick: styles.cbTick,
											label: styles.cbLabel,
											label_disabled: styles.cbLabelDisabled,
										},
										renderLabel: ({ classNames, onClick }) => (
											<div className={classNames.label} onClick={onClick}>
												Es piekrītu{' '}
												<Link
													to={getMainUrl(true) + 'privatumu-politika'}
													className={styles.privacyLink}>
													{_g.lang('privacy')}
												</Link>{' '}
												noteikumiem *
											</div>
										),
									}}
									mustAccept
								/>
							</div>
							<div className={styles.row3}>
								<FormSubmitButton
									ButtonProps={{
										theme: 'custom',

										classNames: {
											wrapper: styles.submitBtn,
											wrapper_custom: styles.submitBtnTheme,
										},
										customTitle: (
											<div className={styles.submitContent}>
												<span className={styles.submitText}>
													<Editable
														edit={{
															name: 'contact_send_btn',
														}}>
														{this.props.langData7?.contact_send_Btn}
													</Editable>
												</span>
												<div className={styles.submitIcon}>
													<Svg1 />
												</div>
											</div>
										),
									}}
								/>
							</div>
						</Form>
					</div>

					<div className={styles.right}>
						<div className={styles.head}>
							<Editable
								edit={{
									name: 'our_contacts',
								}}>
								{this.props.langData6?.contacts}
							</Editable>
						</div>
						<div className={styles.adress}>
							<div className={styles.adress_top}>
								<div className={styles.adress_top_line}>
									<div className={styles.adress_svg}>
										<Svg2 />
									</div>
									<div className={styles.adress_top_text}>
										<Editable
											edit={{
												name: 'adress',
											}}>
											<p>{this.props.langData4?.Adress}</p>
										</Editable>
									</div>
								</div>

								<div className={styles.adress_top_line}>
									<div className={styles.adress_svg}>
										<Svg3 />
									</div>

									<div className={styles.adress_top_text}>
										<Editable
											edit={{
												name: 'phone',
											}}>
											<a href={this.props.langData?.phone_url}>
												{this.props.langData?.phone_number}
											</a>
										</Editable>
									</div>
								</div>

								<a className={styles.adress_top_line}>
									<div className={styles.adress_svg}>
										<Svg4 />
									</div>
									<div className={styles.adress_top_text}>
										<Editable
											edit={{
												name: 'email',
											}}>
											<a href={this.props.langData1?.Email_url}>
												<p>{this.props.langData1?.Email}</p>
											</a>
										</Editable>
									</div>
								</a>
							</div>
							<div className={styles.adress_bottom}>
								<div className={styles.adress_bottom_container}>
									<a
										className={styles.adress_bottom_container_left}
										href={this.props.langData2?.facebook_url}
										target="_blank"
										rel="noreferrer">
										<Editable edit={{ name: 'facebook' }}>
											<Svg5 />
										</Editable>
									</a>

									<a
										className={styles.adress_bottom_container_left}
										href={this.props.langData3?.instagram_url}
										target="_blank"
										rel="noreferrer">
										<Editable edit={{ name: 'instagram' }}>
											<Svg6 />
										</Editable>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Contact.propTypes = propTypes;
Contact.defaultProps = defaultProps;

export default WithUi(uiProps)(Contact);
