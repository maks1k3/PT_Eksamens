import React, { PureComponent as Component } from 'react';

import styles from './Calculator.module.less';

import Form from 'ui/form';
import FormField from 'ui/form/field';
import FormSubmitButton from 'ui/form/form_submit_button';

import Input from 'ui/inputs/input';
import RadioGroup from 'ui/inputs/radio_group';
import Button from 'ui/controls/button';

import TextArea from 'ui/inputs/textarea';
import Checkbox from 'ui/inputs/checkbox';
import Dropdown from 'ui/controls/dropdown';

import { calcTotal } from './utils/CalcPrice';
import Link from 'core/navigation/link';
import getMainUrl from 'helpers/getMainUrl';
import WithUi from 'hoc/store/ui';
import { defaultProps, propTypes } from 'hoc/sortable/props';
import Editable from 'cms/editable';

const uiProps = (ownProps) => {
	return {
		content: {
			price_calculator_head: {
				langData: 'langData',
			},
			calculate: {
				langData: 'langData1',
			},
			type: {
				langData: 'langData2',
			},
			area: {
				langData: 'langData3',
			},
			predict: {
				langData: 'langData4',
			},

			eur: {
				langData: 'langData5',
			},

			pvn: {
				langData: 'langData6',
			},
			note: {
				langData: 'langData7',
			},
			contact: {
				langData: 'langData8',
			},

			send: {
				langData: 'langData9',
			},

			back: {
				langData: 'langData10',
			},

			success_message: {
				langData: 'langData11',
			},
		},
	};
};

class Calculator extends Component {
	state = {
		category: null,
		result: null,
		lastData: null,
		isSent: false,
		contactData: null,
		isMobile: false,
		isMobile500: false,

		labelsDb: null,
		pricingDb: null,
		pricingLoading: false,
		pricingError: false,

		isSuccess: false,
	};

	componentDidMount() {
		this.updateIsMobile();
		window.addEventListener('resize', this.updateIsMobile);
		this.loadPricingFromDb();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateIsMobile);
	}

	updateIsMobile = () => {
		const isMobile = window.innerWidth <= 768;
		const isMobile500 = window.innerWidth <= 500;

		if (
			this.state.isMobile !== isMobile ||
			this.state.isMobile500 !== isMobile500
		) {
			this.setState({ isMobile, isMobile500 });
		}
	};

	loadPricingFromDb = () => {
		this.setState({ pricingLoading: true, pricingError: false });

		fetch(`/api/pricing?lang=${_g?.lang?.() || 'lv'}`, {
			method: 'GET',
			credentials: 'include',
			headers: { Accept: 'application/json' },
		})
			.then(async (r) => {
				const text = await r.text();
				let json = null;
				try {
					json = JSON.parse(text);
				} catch (e) {}
				if (!r.ok) throw new Error(json?.message || `HTTP ${r.status}`);
				return json;
			})
			.then((json) => {
				const pricing =
					json?.pricing ||
					json?.data?.pricing ||
					json?.response?.pricing ||
					null;

				const labels =
					json?.labels || json?.data?.labels || json?.response?.labels || null;

				this.setState({
					pricingDb: pricing,
					labelsDb: labels,
					pricingLoading: false,
					pricingError: !pricing,
				});
			})
			.catch(() => {
				this.setState({ pricingLoading: false, pricingError: true });
			});
	};

	getDbLabel = (group, key, fallback = '') => {
		const { labelsDb } = this.state;
		return labelsDb?.[group]?.[key] ?? fallback ?? key ?? '';
	};

	getOptionLabel = (workType, value, fallback = '') => {
		const { labelsDb } = this.state;
		return labelsDb?.option?.[workType]?.[value] ?? fallback ?? value ?? '';
	};

	getCategoriesFromDb = () => {
		const { pricingDb, labelsDb } = this.state;
		if (!pricingDb) return [];

		return Object.keys(pricingDb)
			.filter((key) => pricingDb?.[key] && typeof pricingDb[key] === 'object')
			.sort()
			.map((key) => ({
				value: key,
				label: labelsDb?.category?.[key] ?? key,
			}));
	};

	getWorkTypeOptions = (workType) => {
		const { pricingDb, category } = this.state;
		const cfg = pricingDb?.[category];
		if (!cfg) return [];

		const bucketPerM2 = `${workType}PerM2`;
		const bucketFlat = `${workType}Flat`;
		const bucket = cfg?.[bucketPerM2]
			? bucketPerM2
			: cfg?.[bucketFlat]
				? bucketFlat
				: null;

		const map = bucket ? cfg?.[bucket] : null;
		if (!map || typeof map !== 'object') return [];

		return Object.keys(map)
			.sort((a, b) => String(a).localeCompare(String(b)))
			.map((value) => ({
				value,
				label: this.getOptionLabel(workType, value, value),
			}));
	};

	setCategory = (category) => {
		this.setState({
			category,
			result: null,
			lastData: null,
			isSent: false,
			contactData: null,
		});
	};

	onCalculate = ({ data }) => {
		const { category, pricingDb } = this.state;

		if (!pricingDb) {
			this.setState({ pricingError: true });
			return;
		}

		const res = calcTotal(category, data, pricingDb);

		this.setState({
			result: res,
			lastData: data,
			isSent: false,
			contactData: null,
		});
	};

	onContactSubmit = ({ data }) => {
		const { privacy, ...contactOnly } = data;
		this.setState({ isSent: true, contactData: contactOnly });
	};

	onFinalSubmit = ({ data }) => {
		const { lastData, result, category, contactData } = this.state;

		const payload = {
			category_code: category,
			calc: lastData,
			total: Number(result?.total || 0),
			nickname: contactData?.name || '',
			phone: contactData?.phone || '',
			email: contactData?.email || '',
			message: contactData?.message || null,
			privacy: data?.privacy ? 1 : 0,
		};

		return fetch('/api/calculator_requests/send', {
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
				this.setState({
					isSuccess: true,
				});
			})
			.catch((e) => {
				console.error(e);
			});
	};

	renderReadonlyContactInputs = () => {
		const { contactData } = this.state;

		return (
			<>
				<div className={styles.field}>
					<div className={styles.inputRow}>
						<Input
							value={contactData?.name || ''}
							readonly
							disabled
							classNames={{
								wrapper: styles.inputWrapper,
								input: styles.inputControl,
							}}
							placeholder="Vārds vai Nosaukums *"
						/>
					</div>
				</div>

				<div className={styles.field}>
					<div className={styles.inputRow}>
						<Input
							value={contactData?.phone || ''}
							readonly
							disabled
							classNames={{
								wrapper: styles.inputWrapper,
								input: styles.inputControl,
							}}
							placeholder="Telefons *"
						/>
					</div>
				</div>

				<div className={styles.field}>
					<div className={styles.inputRow}>
						<Input
							value={contactData?.email || ''}
							readonly
							disabled
							type="email"
							classNames={{
								wrapper: styles.inputWrapper,
								input: styles.inputControl,
							}}
							placeholder="E-pasts *"
						/>
					</div>
				</div>

				<TextArea
					value={contactData?.message || ''}
					readonly
					readOnly
					disabled
					classNames={{
						wrapper: styles.textareaWrapper,
						textarea: styles.textareaControl,
					}}
					placeholder="Papildus detaļas (Pēc izvēles)"
				/>
			</>
		);
	};

	renderSuccessScreen = () => {
		const { category, result, lastData } = this.state;

		return (
			<div className={styles.container}>
				<div className={styles.rectangle} />
				<div className={styles.wrapper}>
					<div className={styles.calculator}>
						<div className={styles.heading}>
							<svg
								className={styles.calcSvg}
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 32 32"
								fill="none">
								<path
									d="M10 15H22C22.2652 15 22.5196 14.8946 22.7071 14.7071C22.8946 14.5196 23 14.2652 23 14V8C23 7.73478 22.8946 7.48043 22.7071 7.29289C22.5196 7.10536 22.2652 7 22 7H10C9.73478 7 9.48043 7.10536 9.29289 7.29289C9.10536 7.48043 9 7.73478 9 8V14C9 14.2652 9.10536 14.5196 9.29289 14.7071C9.48043 14.8946 9.73478 15 10 15ZM11 9H21V13H11V9ZM25 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V27C5 27.5304 5.21071 28.0391 5.58579 28.4142C5.96086 28.7893 6.46957 29 7 29H25C25.5304 29 26.0391 28.7893 26.4142 28.4142C26.7893 28.0391 27 27.5304 27 27V5C27 4.46957 26.7893 3.96086 26.4142 3.58579C26.0391 3.21071 25.5304 3 25 3ZM25 27H7V5H25V27Z"
									fill="#252521"
								/>
							</svg>
							<div className={styles.heading_title}>Kalkulators</div>
						</div>

						<div className={styles.form}>
							<div className={styles.summaryRow}>
								<div className={styles.summaryCol}>
									<div className={styles.summaryItem}>
										<span className={styles.summaryKey}>
											<Editable
												edit={{
													name: 'type',
												}}>
												{this.props.langData2?.types}
											</Editable>
										</span>
										<span className={styles.summaryVal}>
											{this.getDbLabel('category', category, category)}
										</span>
									</div>

									<div className={styles.summaryItem}>
										<span className={styles.summaryKey}>
											<Editable
												edit={{
													name: 'area',
												}}>
												{this.props.langData3?.areaa}
											</Editable>
										</span>
										<span className={styles.summaryVal}>{result.area}</span>
									</div>

									<div className={styles.summaryItem}>
										<span className={styles.summaryKey}>
											{this.getDbLabel('work_type', 'pamati', 'Pamati')}:
										</span>
										<span className={styles.summaryVal}>
											{this.getOptionLabel(
												'pamati',
												lastData?.pamati,
												lastData?.pamati,
											)}
										</span>
									</div>

									<div className={styles.summaryItem}>
										<span className={styles.summaryKey}>
											{this.getDbLabel('work_type', 'grida', 'Grīda')}:
										</span>
										<span className={styles.summaryVal}>
											{this.getOptionLabel(
												'grida',
												lastData?.grida,
												lastData?.grida,
											)}
										</span>
									</div>
								</div>

								<div className={styles.summaryCol}>
									<div className={styles.summaryItem}>
										<span className={styles.summaryKey}>
											{this.getDbLabel('work_type', 'sienas', 'Sienas')}:
										</span>
										<span className={styles.summaryVal}>
											{this.getOptionLabel(
												'sienas',
												lastData?.sienas,
												lastData?.sienas,
											)}
										</span>
									</div>

									<div className={styles.summaryItem}>
										<span className={styles.summaryKey}>
											{this.getDbLabel('work_type', 'krasots', 'Krāsots')}:
										</span>
										<span className={styles.summaryVal}>
											{this.getOptionLabel(
												'krasots',
												lastData?.krasots,
												lastData?.krasots,
											)}
										</span>
									</div>

									<div className={styles.summaryItem}>
										<span className={styles.summaryKey}>
											{this.getDbLabel('work_type', 'jumts', 'Jumts')}:
										</span>
										<span className={styles.summaryVal}>
											{this.getOptionLabel(
												'jumts',
												lastData?.jumts,
												lastData?.jumts,
											)}
										</span>
									</div>

									<div className={styles.summaryItem}>
										<span className={styles.summaryKey}>
											{this.getDbLabel(
												'work_type',
												'vizualizacija',
												'Vizualizācija',
											)}
											:
										</span>
										<span className={styles.summaryVal}>
											{this.getOptionLabel(
												'vizualizacija',
												lastData?.vizualizacija,
												lastData?.vizualizacija,
											)}
										</span>
									</div>
								</div>
							</div>

							<div className={styles.line} />

							<div className={styles.totalRow}>
								<div className={styles.totalLabel}>
									<Editable
										edit={{
											name: 'predict',
										}}>
										{this.props.langData4?.price}
									</Editable>
								</div>
								<div className={styles.totalValue}>
									{Number(result.total || 0).toFixed(2)}{' '}
									<Editable
										edit={{
											name: 'eur',
										}}>
										{this.props.langData5?.eurr}
									</Editable>
									<span className={styles.totalHint}>
										<Editable
											edit={{
												name: 'pvn',
											}}>
											{this.props.langData6?.pvnn}
										</Editable>
									</span>
								</div>
							</div>

							<div className={styles.noteBox}>
								<div className={styles.icon}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none">
										<path
											d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM13.5 16.5C13.5 16.6989 13.421 16.8897 13.2803 17.0303C13.1397 17.171 12.9489 17.25 12.75 17.25C12.3522 17.25 11.9706 17.092 11.6893 16.8107C11.408 16.5294 11.25 16.1478 11.25 15.75V12C11.0511 12 10.8603 11.921 10.7197 11.7803C10.579 11.6397 10.5 11.4489 10.5 11.25C10.5 11.0511 10.579 10.8603 10.7197 10.7197C10.8603 10.579 11.0511 10.5 11.25 10.5C11.6478 10.5 12.0294 10.658 12.3107 10.9393C12.592 11.2206 12.75 11.6022 12.75 12V15.75C12.9489 15.75 13.1397 15.829 13.2803 15.9697C13.421 16.1103 13.5 16.3011 13.5 16.5ZM10.5 7.875C10.5 7.6525 10.566 7.43499 10.6896 7.24998C10.8132 7.06498 10.9889 6.92078 11.1945 6.83564C11.4001 6.75049 11.6263 6.72821 11.8445 6.77162C12.0627 6.81502 12.2632 6.92217 12.4205 7.0795C12.5778 7.23684 12.685 7.43729 12.7284 7.65552C12.7718 7.87375 12.7495 8.09995 12.6644 8.30552C12.5792 8.51109 12.435 8.68679 12.25 8.8104C12.065 8.93402 11.8475 9 11.625 9C11.3266 9 11.0405 8.88147 10.8295 8.6705C10.6185 8.45952 10.5 8.17337 10.5 7.875Z"
											fill="#FC9732"
										/>
									</svg>
								</div>
								<div className={styles.noteText}>
									<Editable
										edit={{
											name: 'note',
										}}>
										{this.props.langData7?.notes}
									</Editable>
								</div>
							</div>

							<div className={styles.line} />

							<div className={styles.successMessage}>
								<Editable
									edit={{
										name: 'success_message',
									}}>
									{this.props.langData11?.message}
								</Editable>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	renderPrivacyCheckbox = () => (
		<div className={styles.checkbox}>
			<FormField
				name="privacy"
				component={Checkbox}
				mustAccept
				defaultValue="0"
				componentProps={{
					classNames: {
						outer: styles.cbOuter,
						wrapper: styles.cbBox,
						wrapper_focused: styles.cbBoxFocused,
						wrapper_error: styles.cbBoxError,
						wrapper_disabled: styles.cbBoxDisabled,
						wrapper_custom_active: styles.cbBoxActive,
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
					theme: 'custom',
				}}
			/>
		</div>
	);

	renderCategoryMobileDropdown = () => {
		const { category } = this.state;
		const items = this.getCategoriesFromDb();

		const currentLabel =
			items.find((i) => i.value === category)?.label || 'Projekta tips';

		return (
			<div className={styles.categoriesMobile}>
				<Dropdown
					align="bottom-right"
					classNames={{
						wrapper: styles.ddWrapper,
						trigger: styles.ddTrigger,
						content_style: styles.ddContent,
					}}
					trigger={
						<div className={styles.ddTriggerInner}>
							<span className={styles.ddTriggerText}>{currentLabel}</span>
							<span className={styles.ddCaret}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none">
									<path
										d="M16.6925 7.94205L10.4425 14.192C10.3845 14.2502 10.3156 14.2963 10.2397 14.3277C10.1638 14.3592 10.0825 14.3754 10.0003 14.3754C9.91821 14.3754 9.83688 14.3592 9.76101 14.3277C9.68514 14.2963 9.61621 14.2502 9.55816 14.192L3.30816 7.94205C3.19088 7.82477 3.125 7.66571 3.125 7.49986C3.125 7.33401 3.19088 7.17495 3.30816 7.05767C3.42544 6.9404 3.5845 6.87451 3.75035 6.87451C3.9162 6.87451 4.07526 6.9404 4.19253 7.05767L10.0003 12.8663L15.8082 7.05767C15.8662 6.9996 15.9352 6.95354 16.011 6.92211C16.0869 6.89069 16.1682 6.87451 16.2503 6.87451C16.3325 6.87451 16.4138 6.89069 16.4897 6.92211C16.5655 6.95354 16.6345 6.9996 16.6925 7.05767C16.7506 7.11574 16.7967 7.18468 16.8281 7.26055C16.8595 7.33642 16.8757 7.41774 16.8757 7.49986C16.8757 7.58198 16.8595 7.6633 16.8281 7.73917C16.7967 7.81504 16.7506 7.88398 16.6925 7.94205Z"
										fill="#252521"
									/>
								</svg>
							</span>
						</div>
					}
					content={
						<div className={styles.ddList}>
							{items.map((it) => (
								<div
									key={it.value}
									className={styles.ddItem}
									onClick={() => this.setCategory(it.value)}>
									{it.label}
								</div>
							))}
						</div>
					}
				/>
			</div>
		);
	};

	renderRadioAsDropdown = ({
		name,
		label,
		options,
		placeholder = 'Izvēlies variantu',
	}) => (
		<div className={`${styles.field} ${styles.dropdownFull}`}>
			<label className={styles.label}>{label}</label>

			<FormField
				name={name}
				component={RadioGroup}
				defaultValue=""
				isRequired
				componentProps={{
					allowEmpty: true,
					options,
					classNames: {
						wrapper: styles.segRgWrapper,
						inner: styles.segRgInner,
					},
					renderOptions: ({ RadioGroup }) => {
						const selected =
							options.find((o) => o.value === RadioGroup?.value)?.label ||
							placeholder;

						return (
							<div className={styles.radio_to_dropdown}>
								<Dropdown
									align="bottom-right"
									classNames={{
										wrapper: styles.ddWrapper,
										trigger: styles.ddTrigger,
										content_style: styles.ddContent,
									}}
									trigger={
										<div className={styles.ddTriggerInner}>
											<span
												className={
													selected === placeholder
														? styles.ddPlaceholder
														: styles.ddTriggerText
												}>
												{selected}
											</span>
											<span className={styles.ddCaret}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													viewBox="0 0 20 20"
													fill="none">
													<path
														d="M16.6925 7.94205L10.4425 14.192C10.3845 14.2502 10.3156 14.2963 10.2397 14.3277C10.1638 14.3592 10.0825 14.3754 10.0003 14.3754C9.91821 14.3754 9.83688 14.3592 9.76101 14.3277C9.68514 14.2963 9.61621 14.2502 9.55816 14.192L3.30816 7.94205C3.19088 7.82477 3.125 7.66571 3.125 7.49986C3.125 7.33401 3.19088 7.17495 3.30816 7.05767C3.42544 6.9404 3.5845 6.87451 3.75035 6.87451C3.9162 6.87451 4.07526 6.9404 4.19253 7.05767L10.0003 12.8663L15.8082 7.05767C15.8662 6.9996 15.9352 6.95354 16.011 6.92211C16.0869 6.89069 16.1682 6.87451 16.2503 6.87451C16.3325 6.87451 16.4138 6.89069 16.4897 6.92211C16.5655 6.95354 16.6345 6.9996 16.6925 7.05767C16.7506 7.11574 16.7967 7.18468 16.8281 7.26055C16.8595 7.33642 16.8757 7.41774 16.8757 7.49986C16.8757 7.58198 16.8595 7.6633 16.8281 7.73917C16.7967 7.81504 16.7506 7.88398 16.6925 7.94205Z"
														fill="#252521"
													/>
												</svg>
											</span>
										</div>
									}
									content={
										<div className={styles.ddList}>
											{options.map((o) => (
												<div
													key={o.value}
													className={styles.ddItem}
													onClick={() => RadioGroup.onChange(o.value)}>
													{o.label}
												</div>
											))}
										</div>
									}
								/>
							</div>
						);
					},
				}}
			/>
		</div>
	);

	render() {
		const {
			category,
			result,
			lastData,
			isSent,
			isMobile,
			isMobile500,
			pricingLoading,
			pricingError,
		} = this.state;

		const isResult = !!result;

		const areaLabel = 'Platība, m² *';

		const pamatiLabel = this.getDbLabel('work_type', 'pamati', 'Pamati') + ' *';
		const gridaLabel = this.getDbLabel('work_type', 'grida', 'Grīda') + ' *';
		const sienasLabel = this.getDbLabel('work_type', 'sienas', 'Sienas') + ' *';
		const krasotsLabel =
			this.getDbLabel('work_type', 'krasots', 'Krāsots') + ' *';
		const jumtsLabel = this.getDbLabel('work_type', 'jumts', 'Jumts') + ' *';
		const vizLabel =
			this.getDbLabel('work_type', 'vizualizacija', 'Vizualizācija') + ' *';

		const pamatiOptions = this.getWorkTypeOptions('pamati');
		const yesNoGrida = this.getWorkTypeOptions('grida');
		const yesNoSienas = this.getWorkTypeOptions('sienas');
		const yesNoKrasots = this.getWorkTypeOptions('krasots');
		const jumtsOptions = this.getWorkTypeOptions('jumts');
		const vizOptions = this.getWorkTypeOptions('vizualizacija');

		const { isSuccess } = this.state;

		if (isSuccess) {
			return this.renderSuccessScreen();
		}

		return (
			<div className={styles.container}>
				<div className={styles.rectangle} />
				<div className={styles.wrapper}>
					<div className={styles.calculator}>
						<div className={styles.heading}>
							<svg
								className={styles.calcSvg}
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 32 32"
								fill="none">
								<path
									d="M10 15H22C22.2652 15 22.5196 14.8946 22.7071 14.7071C22.8946 14.5196 23 14.2652 23 14V8C23 7.73478 22.8946 7.48043 22.7071 7.29289C22.5196 7.10536 22.2652 7 22 7H10C9.73478 7 9.48043 7.10536 9.29289 7.29289C9.10536 7.48043 9 7.73478 9 8V14C9 14.2652 9.10536 14.5196 9.29289 14.7071C9.48043 14.8946 9.73478 15 10 15ZM11 9H21V13H11V9ZM25 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V27C5 27.5304 5.21071 28.0391 5.58579 28.4142C5.96086 28.7893 6.46957 29 7 29H25C25.5304 29 26.0391 28.7893 26.4142 28.4142C26.7893 28.0391 27 27.5304 27 27V5C27 4.46957 26.7893 3.96086 26.4142 3.58579C26.0391 3.21071 25.5304 3 25 3ZM25 27H7V5H25V27Z"
									fill="#252521"
								/>
							</svg>
							<div className={styles.heading_title}>
								<Editable
									edit={{
										name: 'price_calculator_head',
									}}>
									{this.props.langData?.heading}
								</Editable>
							</div>
						</div>

						{!pricingLoading && !pricingError && (
							<>
								{!isResult && (
									<div className={styles.form}>
										{isMobile ? (
											this.renderCategoryMobileDropdown()
										) : (
											<div className={styles.categories}>
												{this.getCategoriesFromDb().map((it) => (
													<Button
														key={it.value}
														type="button"
														theme="custom"
														title={it.label}
														onClick={() => this.setCategory(it.value)}
														classNames={{
															wrapper: styles.catBtn,
															wrapper_custom: `${styles.catBtn} ${
																category === it.value ? styles.catBtnActive : ''
															}`,
															title: `${styles.catBtnTitle} ${
																category === it.value
																	? styles.catBtnTitleActive
																	: ''
															}`,
														}}
													/>
												))}
											</div>
										)}

										{category && (
											<Form
												key={category}
												name={`price_calc_${category}`}
												onSubmit={this.onCalculate}
												showResponse={false}
												submit={undefined}>
												<div className={styles.form}>
													<div className={styles.line1} />

													<div className={styles.field}>
														<label className={styles.label}>{areaLabel}</label>
														<div className={styles.inputRow}>
															<span className={styles.unit}>m²</span>
															<div className={styles.input_line} />
															<FormField
																name="area"
																component={Input}
																defaultValue=""
																isRequired
																componentProps={{
																	type: 'text',
																	number: {
																		allowNegative: false,
																		allowDecimal: true,
																	},
																	placeholder: '--',
																	classNames: {
																		wrapper: styles.inputWrapper,
																		input: styles.inputControl,
																	},
																}}
															/>
														</div>
													</div>

													{isMobile ? (
														this.renderRadioAsDropdown({
															name: 'pamati',
															label: pamatiLabel,
															options: pamatiOptions,
														})
													) : (
														<div className={styles.field}>
															<label className={styles.label}>
																{pamatiLabel}
															</label>
															<FormField
																name="pamati"
																component={RadioGroup}
																defaultValue=""
																isRequired
																componentProps={{
																	allowEmpty: true,
																	options: pamatiOptions,
																	classNames: {
																		wrapper: styles.pamatiWrapper,
																		inner: styles.pamatiInner,
																		'option-wrapper': styles.pamatiOption,
																		option: styles.pamatiCircle,
																		circle: styles.pamatiCircleInner,
																		label: styles.pamatiText,
																		circle_main: styles.pamatiCircleInnerActive,
																	},
																}}
															/>
														</div>
													)}

													<div className={styles.tripleRow}>
														{[
															{
																name: 'grida',
																label: gridaLabel,
																options: yesNoGrida,
															},
															{
																name: 'sienas',
																label: sienasLabel,
																options: yesNoSienas,
															},
															{
																name: 'krasots',
																label: krasotsLabel,
																options: yesNoKrasots,
															},
														].map(({ name, label, options }) => (
															<div className={styles.tripleCol} key={name}>
																<label className={styles.label}>{label}</label>
																<FormField
																	name={name}
																	component={RadioGroup}
																	defaultValue=""
																	isRequired
																	componentProps={{
																		allowEmpty: true,
																		classNames: {
																			wrapper: styles.segRgWrapper,
																			inner: styles.segRgInner,
																		},
																		options,
																		renderOptions: ({ options }) => (
																			<div className={styles.seg}>
																				{options}
																			</div>
																		),
																		renderOption: ({
																			value,
																			label,
																			active,
																			RadioGroup,
																		}) => (
																			<Button
																				type="button"
																				theme="custom"
																				title={label}
																				onClick={() =>
																					RadioGroup.onChange(value)
																				}
																				classNames={{
																					wrapper: styles.segBtn,
																					wrapper_custom: `${styles.segBtn} ${
																						active ? styles.segBtnActive : ''
																					}`,
																					title: `${styles.segBtnTitle} ${
																						active
																							? styles.segBtnTitleActive
																							: ''
																					}`,
																				}}
																			/>
																		),
																	}}
																/>
															</div>
														))}
													</div>

													{isMobile ? (
														this.renderRadioAsDropdown({
															name: 'jumts',
															label: jumtsLabel,
															options: jumtsOptions,
														})
													) : (
														<div className={styles.field}>
															<label className={styles.label}>
																{jumtsLabel}
															</label>
															<FormField
																name="jumts"
																component={RadioGroup}
																defaultValue=""
																isRequired
																componentProps={{
																	allowEmpty: true,
																	options: jumtsOptions,
																	classNames: {
																		wrapper: styles.pamatiWrapper,
																		inner: styles.pamatiInner,
																		'option-wrapper': styles.pamatiOption,
																		option: styles.pamatiCircle,
																		circle: styles.pamatiCircleInner,
																		label: styles.pamatiText,
																		circle_main: styles.pamatiCircleInnerActive,
																	},
																}}
															/>
														</div>
													)}

													<div className={styles.field_viz}>
														<label className={styles.label}>{vizLabel}</label>
														<FormField
															name="vizualizacija"
															component={RadioGroup}
															defaultValue=""
															isRequired
															componentProps={{
																classNames: {
																	wrapper: styles.segRgWrapper,
																	inner: styles.segRgInner,
																},
																allowEmpty: true,
																options: vizOptions,
																renderOptions: ({ options }) => (
																	<div className={styles.seg}>{options}</div>
																),
																renderOption: ({
																	value,
																	label,
																	active,
																	RadioGroup,
																}) => (
																	<Button
																		type="button"
																		theme="custom"
																		title={label}
																		onClick={() => RadioGroup.onChange(value)}
																		classNames={{
																			wrapper: styles.segBtn,
																			wrapper_custom: `${styles.segBtn} ${
																				active ? styles.segBtnActive : ''
																			}`,
																			title: `${styles.segBtnTitle} ${
																				active ? styles.segBtnTitleActive : ''
																			}`,
																		}}
																	/>
																),
															}}
														/>
													</div>

													<div className={styles.line1} />

													<div className={styles.calcButtonWrap}>
														<FormSubmitButton
															ButtonProps={{
																type: 'button',
																theme: 'custom',
																classNames: {
																	wrapper: styles.calcButton,
																	wrapper_custom: styles.calcButton,
																},
																customTitle: (
																	<span className={styles.calcButtonContent}>
																		<span>
																			<Editable
																				edit={{
																					name: 'calculate',
																				}}>
																				{this.props.langData1?.calc}
																			</Editable>
																		</span>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="24"
																			height="24"
																			viewBox="0 0 24 24"
																			fill="none">
																			<path
																				d="M7.5 11.25H16.5C16.6989 11.25 16.8897 11.171 17.0303 11.0303C17.171 10.8897 17.25 10.6989 17.25 10.5V6C17.25 5.80109 17.171 5.61032 17.0303 5.46967C16.8897 5.32902 16.6989 5.25 16.5 5.25H7.5C7.30109 5.25 7.11032 5.32902 6.96967 5.46967C6.82902 5.61032 6.75 5.80109 6.75 6V10.5C6.75 10.6989 6.82902 10.8897 6.96967 11.0303C7.11032 11.171 7.30109 11.25 7.5 11.25ZM8.25 6.75H15.75V9.75H8.25V6.75ZM18.75 2.25H5.25C4.85218 2.25 4.47064 2.40804 4.18934 2.68934C3.90804 2.97064 3.75 3.35218 3.75 3.75V20.25C3.75 20.6478 3.90804 21.0294 4.18934 21.3107C4.47064 21.592 4.85218 21.75 5.25 21.75H18.75C19.1478 21.75 19.5294 21.592 19.8107 21.3107C20.092 21.0294 20.25 20.6478 20.25 20.25V3.75C20.25 3.35218 20.092 2.97064 19.8107 2.68934C19.5294 2.40804 19.1478 2.25 18.75 2.25ZM18.75 20.25H5.25V3.75H18.75V20.25ZM9.375 13.875C9.375 14.0975 9.30902 14.315 9.1854 14.5C9.06179 14.685 8.88609 14.8292 8.68052 14.9144C8.47495 14.9995 8.24875 15.0218 8.03052 14.9784C7.81229 14.935 7.61184 14.8278 7.4545 14.6705C7.29717 14.5132 7.19002 14.3127 7.14662 14.0945C7.10321 13.8762 7.12549 13.65 7.21064 13.4445C7.29578 13.2389 7.43998 13.0632 7.62498 12.9396C7.80999 12.816 8.0275 12.75 8.25 12.75C8.54837 12.75 8.83452 12.8685 9.0455 13.0795C9.25647 13.2905 9.375 13.5766 9.375 13.875ZM13.125 13.875C13.125 14.0975 13.059 14.315 12.9354 14.5C12.8118 14.685 12.6361 14.8292 12.4305 14.9144C12.225 14.9995 11.9988 15.0218 11.7805 14.9784C11.5623 14.935 11.3618 14.8278 11.2045 14.6705C11.0472 14.5132 10.94 14.3127 10.8966 14.0945C10.8532 13.8762 10.8755 13.65 10.9606 13.4445C11.0458 13.2389 11.19 13.0632 11.375 12.9396C11.56 12.816 11.7775 12.75 12 12.75C12.2984 12.75 12.5845 12.8685 12.7955 13.0795C13.0065 13.2905 13.125 13.5766 13.125 13.875ZM16.875 13.875C16.875 14.0975 16.809 14.315 16.6854 14.5C16.5618 14.685 16.3861 14.8292 16.1805 14.9144C15.975 14.9995 15.7488 15.0218 15.5305 14.9784C15.3123 14.935 15.1118 14.8278 14.9545 14.6705C14.7972 14.5132 14.69 14.3127 14.6466 14.0945C14.6032 13.8762 14.6255 13.65 14.7106 13.4445C14.7958 13.2389 14.94 13.0632 15.125 12.9396C15.31 12.816 15.5275 12.75 15.75 12.75C16.0484 12.75 16.3345 12.8685 16.5455 13.0795C16.7565 13.2905 16.875 13.5766 16.875 13.875ZM9.375 17.625C9.375 17.8475 9.30902 18.065 9.1854 18.25C9.06179 18.435 8.88609 18.5792 8.68052 18.6644C8.47495 18.7495 8.24875 18.7718 8.03052 18.7284C7.81229 18.685 7.61184 18.5778 7.4545 18.4205C7.29717 18.2632 7.19002 18.0627 7.14662 17.8445C7.10321 17.6262 7.12549 17.4 7.21064 17.1945C7.29578 16.9889 7.43998 16.8132 7.62498 16.6896C7.80999 16.566 8.0275 16.5 8.25 16.5C8.54837 16.5 8.83452 16.6185 9.0455 16.8295C9.25647 17.0405 9.375 17.3266 9.375 17.625ZM13.125 17.625C13.125 17.8475 13.059 18.065 12.9354 18.25C12.8118 18.435 12.6361 18.5792 12.4305 18.6644C12.225 18.7495 11.9988 18.7718 11.7805 18.7284C11.5623 18.685 11.3618 18.5778 11.2045 18.4205C11.0472 18.2632 10.94 18.0627 10.8966 17.8445C10.8532 17.6262 10.8755 17.4 10.9606 17.1945C11.0458 16.9889 11.19 16.8132 11.375 16.6896C11.56 16.566 11.7775 16.5 12 16.5C12.2984 16.5 12.5845 16.6185 12.7955 16.8295C13.0065 17.0405 13.125 17.3266 13.125 17.625ZM16.875 17.625C16.875 17.8475 16.809 18.065 16.6854 18.25C16.5618 18.435 16.3861 18.5792 16.1805 18.6644C15.975 18.7495 15.7488 18.7718 15.5305 18.7284C15.3123 18.685 15.1118 18.5778 14.9545 18.4205C14.7972 18.2632 14.69 18.0627 14.6466 17.8445C14.6032 17.6262 14.6255 17.4 14.7106 17.1945C14.7958 16.9889 14.94 16.8132 15.125 16.6896C15.31 16.566 15.5275 16.5 15.75 16.5C16.0484 16.5 16.3345 16.6185 16.5455 16.8295C16.7565 17.0405 16.875 17.3266 16.875 17.625Z"
																				fill="white"
																			/>
																		</svg>
																	</span>
																),
															}}
														/>
													</div>
												</div>
											</Form>
										)}
									</div>
								)}

								{isResult && (
									<div className={styles.form}>
										<div className={styles.summaryRow}>
											<div className={styles.summaryCol}>
												<div className={styles.summaryItem}>
													<span className={styles.summaryKey}>
														<Editable
															edit={{
																name: 'type',
															}}>
															{this.props.langData2?.types}
														</Editable>
													</span>
													<span className={styles.summaryVal}>
														{this.getDbLabel('category', category, category)}
													</span>
												</div>

												<div className={styles.summaryItem}>
													<span className={styles.summaryKey}>
														<Editable
															edit={{
																name: 'area',
															}}>
															{this.props.langData3?.areaa}
														</Editable>
													</span>
													<span className={styles.summaryVal}>
														{result.area}
													</span>
												</div>

												<div className={styles.summaryItem}>
													<span className={styles.summaryKey}>
														{this.getDbLabel('work_type', 'pamati', 'Pamati')}:
													</span>
													<span className={styles.summaryVal}>
														{this.getOptionLabel(
															'pamati',
															lastData?.pamati,
															lastData?.pamati,
														)}
													</span>
												</div>

												<div className={styles.summaryItem}>
													<span className={styles.summaryKey}>
														{this.getDbLabel('work_type', 'grida', 'Grīda')}:
													</span>
													<span className={styles.summaryVal}>
														{this.getOptionLabel(
															'grida',
															lastData?.grida,
															lastData?.grida,
														)}
													</span>
												</div>
											</div>

											<div className={styles.summaryCol}>
												<div className={styles.summaryItem}>
													<span className={styles.summaryKey}>
														{this.getDbLabel('work_type', 'sienas', 'Sienas')}:
													</span>
													<span className={styles.summaryVal}>
														{this.getOptionLabel(
															'sienas',
															lastData?.sienas,
															lastData?.sienas,
														)}
													</span>
												</div>

												<div className={styles.summaryItem}>
													<span className={styles.summaryKey}>
														{this.getDbLabel('work_type', 'krasots', 'Krāsots')}
														:
													</span>
													<span className={styles.summaryVal}>
														{this.getOptionLabel(
															'krasots',
															lastData?.krasots,
															lastData?.krasots,
														)}
													</span>
												</div>

												<div className={styles.summaryItem}>
													<span className={styles.summaryKey}>
														{this.getDbLabel('work_type', 'jumts', 'Jumts')}:
													</span>
													<span className={styles.summaryVal}>
														{this.getOptionLabel(
															'jumts',
															lastData?.jumts,
															lastData?.jumts,
														)}
													</span>
												</div>

												<div className={styles.summaryItem}>
													<span className={styles.summaryKey}>
														{this.getDbLabel(
															'work_type',
															'vizualizacija',
															'Vizualizācija',
														)}
														:
													</span>
													<span className={styles.summaryVal}>
														{this.getOptionLabel(
															'vizualizacija',
															lastData?.vizualizacija,
															lastData?.vizualizacija,
														)}
													</span>
												</div>
											</div>
										</div>

										<div className={styles.line} />

										<div className={styles.totalRow}>
											<div className={styles.totalLabel}>
												<Editable
													edit={{
														name: 'predict',
													}}>
													{this.props.langData4?.price}
												</Editable>
											</div>
											<div className={styles.totalValue}>
												{Number(result.total || 0).toFixed(2)}{' '}
												<Editable
													edit={{
														name: 'eur',
													}}>
													{this.props.langData5?.eurr}
												</Editable>
												<span className={styles.totalHint}>
													<Editable
														edit={{
															name: 'pvn',
														}}>
														{this.props.langData6?.pvnn}
													</Editable>
												</span>
											</div>
										</div>

										<div className={styles.noteBox}>
											<div className={styles.icon}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none">
													<path
														d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM13.5 16.5C13.5 16.6989 13.421 16.8897 13.2803 17.0303C13.1397 17.171 12.9489 17.25 12.75 17.25C12.3522 17.25 11.9706 17.092 11.6893 16.8107C11.408 16.5294 11.25 16.1478 11.25 15.75V12C11.0511 12 10.8603 11.921 10.7197 11.7803C10.579 11.6397 10.5 11.4489 10.5 11.25C10.5 11.0511 10.579 10.8603 10.7197 10.7197C10.8603 10.579 11.0511 10.5 11.25 10.5C11.6478 10.5 12.0294 10.658 12.3107 10.9393C12.592 11.2206 12.75 11.6022 12.75 12V15.75C12.9489 15.75 13.1397 15.829 13.2803 15.9697C13.421 16.1103 13.5 16.3011 13.5 16.5ZM10.5 7.875C10.5 7.6525 10.566 7.43499 10.6896 7.24998C10.8132 7.06498 10.9889 6.92078 11.1945 6.83564C11.4001 6.75049 11.6263 6.72821 11.8445 6.77162C12.0627 6.81502 12.2632 6.92217 12.4205 7.0795C12.5778 7.23684 12.685 7.43729 12.7284 7.65552C12.7718 7.87375 12.7495 8.09995 12.6644 8.30552C12.5792 8.51109 12.435 8.68679 12.25 8.8104C12.065 8.93402 11.8475 9 11.625 9C11.3266 9 11.0405 8.88147 10.8295 8.6705C10.6185 8.45952 10.5 8.17337 10.5 7.875Z"
														fill="#FC9732"
													/>
												</svg>
											</div>
											<div className={styles.noteText}>
												<Editable
													edit={{
														name: 'note',
													}}>
													{this.props.langData7?.notes}
												</Editable>
											</div>
										</div>

										<div className={styles.line} />
										<div className={styles.contactHead}>
											<Editable
												edit={{
													name: 'contact',
												}}>
												{this.props.langData8?.contacts}
											</Editable>
										</div>

										{!isSent ? (
											<Form
												key="screen2"
												name="form_screen2"
												showResponse={false}
												submit={undefined}
												onSubmit={this.onContactSubmit}>
												<div className={styles.contactForm}>
													<div className={styles.field}>
														<div className={styles.inputRow}>
															<FormField
																name="name"
																component={Input}
																isRequired
																componentProps={{
																	placeholder: 'Vārds vai Nosaukums *',

																	classNames: {
																		wrapper: styles.inputWrapper,
																		input: styles.inputControl,
																	},
																}}
															/>
														</div>
													</div>

													<div className={styles.field}>
														<div className={styles.inputRow}>
															<FormField
																name="phone"
																component={Input}
																isRequired
																componentProps={{
																	placeholder: 'Telefons *',
																	classNames: {
																		wrapper: styles.inputWrapper,
																		input: styles.inputControl,
																	},
																}}
															/>
														</div>
													</div>

													<div className={styles.field}>
														<div className={styles.inputRow}>
															<FormField
																name="email"
																component={Input}
																isRequired
																componentProps={{
																	placeholder: 'E-pasts *',

																	type: 'email',
																	classNames: {
																		wrapper: styles.inputWrapper,
																		input: styles.inputControl,
																	},
																}}
															/>
														</div>
													</div>

													<FormField
														name="message"
														component={TextArea}
														componentProps={{
															placeholder: 'Papildus detaļas (Pēc izvēles)',

															classNames: {
																wrapper: styles.textareaWrapper,
																textarea: styles.textareaControl,
															},
														}}
													/>

													{this.renderPrivacyCheckbox()}

													<div className={styles.contactActions}>
														<Button
															type="button"
															theme="custom"
															onClick={() =>
																this.setState({
																	result: null,
																	isSent: false,
																	contactData: null,
																})
															}
															classNames={{
																wrapper: styles.backBtn,
																wrapper_custom: styles.backBtn,
															}}
															customTitle={
																<span className={styles.backBtnContent}>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="24"
																		height="24"
																		viewBox="0 0 24 24"
																		fill="none">
																		<path
																			d="M21.0006 12.0004C21.0006 12.1993 20.9216 12.3901 20.7809 12.5307C20.6403 12.6714 20.4495 12.7504 20.2506 12.7504H5.5609L11.0312 18.2198C11.1009 18.2895 11.1562 18.3722 11.1939 18.4632C11.2316 18.5543 11.251 18.6519 11.251 18.7504C11.251 18.849 11.2316 18.9465 11.1939 19.0376C11.1562 19.1286 11.1009 19.2114 11.0312 19.281C10.9615 19.3507 10.8788 19.406 10.7878 19.4437C10.6967 19.4814 10.5991 19.5008 10.5006 19.5008C10.402 19.5008 10.3045 19.4814 10.2134 19.4437C10.1224 19.406 10.0396 19.3507 9.96996 19.281L3.21996 12.531C3.15023 12.4614 3.09491 12.3787 3.05717 12.2876C3.01943 12.1966 3 12.099 3 12.0004C3 11.9019 3.01943 11.8043 3.05717 11.7132C3.09491 11.6222 3.15023 11.5394 3.21996 11.4698L9.96996 4.71979C10.1107 4.57906 10.3016 4.5 10.5006 4.5C10.6996 4.5 10.8905 4.57906 11.0312 4.71979C11.1719 4.86052 11.251 5.05139 11.251 5.25042C11.251 5.44944 11.1719 5.64031 11.0312 5.78104L5.5609 11.2504H20.2506C20.4495 11.2504 20.6403 11.3294 20.7809 11.4701C20.9216 11.6107 21.0006 11.8015 21.0006 12.0004Z"
																			fill="#FC9732"
																		/>
																	</svg>
																	<span className={styles.backBtnText}>
																		<Editable
																			edit={{
																				name: 'back',
																			}}>
																			{this.props.langData10?.backk}
																		</Editable>
																	</span>
																</span>
															}
														/>

														<FormSubmitButton
															ButtonProps={{
																type: 'button',
																theme: 'custom',
																classNames: {
																	wrapper: styles.sendButton,
																	wrapper_custom: styles.calcButton,
																	title: styles.sendButtonTitle,
																},
																customTitle: (
																	<span className={styles.sendButtonContent}>
																		<span>
																			<Editable
																				edit={{
																					name: 'send',
																				}}>
																				{this.props.langData9?.sendd}
																			</Editable>
																		</span>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="24"
																			height="24"
																			viewBox="0 0 24 24"
																			fill="none">
																			<path
																				d="M20.7806 12.531L14.0306 19.281C13.8899 19.4218 13.699 19.5008 13.5 19.5008C13.301 19.5008 13.1101 19.4218 12.9694 19.281C12.8286 19.1403 12.7496 18.9494 12.7496 18.7504C12.7496 18.5514 12.8286 18.3605 12.9694 18.2198L18.4397 12.7504H3.75C3.55109 12.7504 3.36032 12.6714 3.21967 12.5307C3.07902 12.3901 3 12.1993 3 12.0004C3 11.8015 3.07902 11.6107 3.21967 11.4701C3.36032 11.3294 3.55109 11.2504 3.75 11.2504H18.4397L12.9694 5.78104C12.8286 5.64031 12.7496 5.44944 12.7496 5.25042C12.7496 5.05139 12.8286 4.86052 12.9694 4.71979C13.1101 4.57906 13.301 4.5 13.5 4.5C13.699 4.5 13.8899 4.57906 14.0306 4.71979L20.7806 11.4698C20.8504 11.5394 20.9057 11.6222 20.9434 11.7132C20.9812 11.8043 21.0006 11.9019 21.0006 12.0004C21.0006 12.099 20.9812 12.1966 20.9434 12.2876C20.9057 12.3787 20.8504 12.4614 20.7806 12.531Z"
																				fill="white"
																			/>
																		</svg>
																	</span>
																),
															}}
														/>
													</div>
												</div>
											</Form>
										) : (
											<Form
												key="screen3"
												name="form_screen3"
												showResponse={false}
												submit={undefined}
												onSubmit={this.onFinalSubmit}>
												<div className={styles.contactForm}>
													{this.renderReadonlyContactInputs()}
													{this.renderPrivacyCheckbox()}

													<div className={styles.contactActions}>
														{isMobile500 && (
															<Button
																type="button"
																theme="custom"
																onClick={() => this.setState({ isSent: false })}
																classNames={{
																	wrapper: styles.backBtn,
																	wrapper_custom: styles.backBtn,
																}}
																customTitle={
																	<span className={styles.backBtnContent}>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="24"
																			height="24"
																			viewBox="0 0 24 24"
																			fill="none">
																			<path
																				d="M21.0006 12.0004C21.0006 12.1993 20.9216 12.3901 20.7809 12.5307C20.6403 12.6714 20.4495 12.7504 20.2506 12.7504H5.5609L11.0312 18.2198C11.1009 18.2895 11.1562 18.3722 11.1939 18.4632C11.2316 18.5543 11.251 18.6519 11.251 18.7504C11.251 18.849 11.2316 18.9465 11.1939 19.0376C11.1562 19.1286 11.1009 19.2114 11.0312 19.281C10.9615 19.3507 10.8788 19.406 10.7878 19.4437C10.6967 19.4814 10.5991 19.5008 10.5006 19.5008C10.402 19.5008 10.3045 19.4814 10.2134 19.4437C10.1224 19.406 10.0396 19.3507 9.96996 19.281L3.21996 12.531C3.15023 12.4614 3.09491 12.3787 3.05717 12.2876C3.01943 12.1966 3 12.099 3 12.0004C3 11.9019 3.01943 11.8043 3.05717 11.7132C3.09491 11.6222 3.15023 11.5394 3.21996 11.4698L9.96996 4.71979C10.1107 4.57906 10.3016 4.5 10.5006 4.5C10.6996 4.5 10.8905 4.57906 11.0312 4.71979C11.1719 4.86052 11.251 5.05139 11.251 5.25042C11.251 5.44944 11.1719 5.64031 11.0312 5.78104L5.5609 11.2504H20.2506C20.4495 11.2504 20.6403 11.3294 20.7809 11.4701C20.9216 11.6107 21.0006 11.8015 21.0006 12.0004Z"
																				fill="#FC9732"
																			/>
																		</svg>
																		<span className={styles.backBtnText}>
																			<Editable
																				edit={{
																					name: 'back',
																				}}>
																				{this.props.langData10?.backk}
																			</Editable>
																		</span>
																	</span>
																}
															/>
														)}

														<FormSubmitButton
															ButtonProps={{
																theme: 'custom',
																classNames: {
																	wrapper: `${styles.sendButton} ${styles.sendButtonHidden}`,
																	wrapper_custom: styles.calcButton,
																	title: styles.sendButtonTitle,
																},
																customTitle: (
																	<span className={styles.sendButtonContent}>
																		<span>
																			<Editable
																				edit={{
																					name: 'send',
																				}}>
																				{this.props.langData9?.sendd}
																			</Editable>
																		</span>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="24"
																			height="24"
																			viewBox="0 0 24 24"
																			fill="none">
																			<path
																				d="M20.7806 12.531L14.0306 19.281C13.8899 19.4218 13.699 19.5008 13.5 19.5008C13.301 19.5008 13.1101 19.4218 12.9694 19.281C12.8286 19.1403 12.7496 18.9494 12.7496 18.7504C12.7496 18.5514 12.8286 18.3605 12.9694 18.2198L18.4397 12.7504H3.75C3.55109 12.7504 3.36032 12.6714 3.21967 12.5307C3.07902 12.3901 3 12.1993 3 12.0004C3 11.8015 3.07902 11.6107 3.21967 11.4701C3.36032 11.3294 3.55109 11.2504 3.75 11.2504H18.4397L12.9694 5.78104C12.8286 5.64031 12.7496 5.44944 12.7496 5.25042C12.7496 5.05139 12.8286 4.86052 12.9694 4.71979C13.1101 4.57906 13.301 4.5 13.5 4.5C13.699 4.5 13.8899 4.57906 14.0306 4.71979L20.7806 11.4698C20.8504 11.5394 20.9057 11.6222 20.9434 11.7132C20.9812 11.8043 21.0006 11.9019 21.0006 12.0004C21.0006 12.099 20.9812 12.1966 20.9434 12.2876C20.9057 12.3787 20.8504 12.4614 20.7806 12.531Z"
																				fill="white"
																			/>
																		</svg>
																	</span>
																),
															}}
														/>
													</div>
												</div>
											</Form>
										)}
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		);
	}
}

Calculator.propTypes = propTypes;

Calculator.defaultProps = defaultProps;

export default WithUi(uiProps)(Calculator);
