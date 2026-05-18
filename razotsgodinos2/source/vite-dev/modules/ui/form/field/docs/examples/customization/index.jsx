import React, { Fragment } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

import styles from './styles.less';

const title = 'Field: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';

<Form
	action="actions/success"
	submit={{
		title: 'Save',
	}}
	FieldProps={{
		classNames: styles,
		render: ({
			classNames,
			displayType,
			labelWidth,
			inputWidth,
			isRequired,
			disabled,
			label,
			showError,
			errorMsg,
			input,
			Field,
		}) => {
			//wrapper
			const wrapperClassName = _g.classNames(
				classNames['wrapper'],
				{
					[classNames['wrapper_row']]: displayType === 'row',
				},
				{
					[classNames['wrapper_column']]: displayType === 'column',
				},
			);

			//label wrapper
			const lableClassName = _g.classNames({
				[classNames['label-wrapper_row']]: displayType === 'row',
				[classNames['label-wrapper_column']]: displayType === 'column',
			});

			let extra = {};

			if (displayType === 'row' && !_.isUndefined(labelWidth)) {
				extra.style = {
					width: labelWidth,
				};
			}

			//input wrapper
			const inputClassName = _g.classNames({
				[classNames['input-wrapper_row']]: displayType === 'row',
				[classNames['input-wrapper_column']]:
					displayType === 'column',
			});

			extra = {};

			if (displayType === 'row' && !_.isUndefined(inputWidth)) {
				extra.style = {
					width: inputWidth,
				};
			}

			return (
				<div className={wrapperClassName}>
					<div className={lableClassName} {...extra}>
						<span className={classNames['label']}>{label}</span>
						{isRequired && (
							<span className={classNames['is-required-mark']}> *</span>
						)}
					</div>

					<div className={inputClassName} {...extra}>
						{input}
						{showError && (
							<div className={classNames['error-wrapper']}>
								<span className={classNames['error-msg']}>
									{errorMsg}
								</span>
							</div>
						)}
					</div>
				</div>
			);
		},
	}}>
	<Field
		label="Field 1"
		name="field_1"
		component={Input}
		isRequired={true}
	/>
	<Field
		label="Field 2"
		name="field_2"
		component={Input}
		value="Some value"
		defaultValue="This is defaultValue"
		displayType="row"
		labelWidth="20%"
		inputWidth="30%"
	/>
	<Field
		classNames={styles}
		name="field_3"
		component={Input}
		isRequired={true}
		render={({ classNames, showError, errorMsg, input }) => {
			//Render only input and error.
			//Useful for customizing error messages.
			return (
				<Fragment>
					{input}
					{showError && (
						<div className={classNames['error-wrapper']}>
							<span className={classNames['error-msg']}>{errorMsg}</span>
						</div>
					)}
				</Fragment>
			);
		}}
	/>
</Form>

  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Form
				action="actions/success"
				submit={{
					title: 'Save',
				}}
				FieldProps={{
					classNames: styles,
					render: ({
						classNames,
						displayType,
						labelWidth,
						inputWidth,
						isRequired,
						disabled,
						label,
						showError,
						errorMsg,
						input,
						Field,
					}) => {
						//wrapper
						const wrapperClassName = _g.classNames(
							classNames['wrapper'],
							{
								[classNames['wrapper_row']]: displayType === 'row',
							},
							{
								[classNames['wrapper_column']]: displayType === 'column',
							},
						);

						//label wrapper
						const lableClassName = _g.classNames({
							[classNames['label-wrapper_row']]: displayType === 'row',
							[classNames['label-wrapper_column']]: displayType === 'column',
						});

						let extra = {};

						if (displayType === 'row' && !_.isUndefined(labelWidth)) {
							extra.style = {
								width: labelWidth,
							};
						}

						//input wrapper
						const inputClassName = _g.classNames({
							[classNames['input-wrapper_row']]: displayType === 'row',
							[classNames['input-wrapper_column']]: displayType === 'column',
						});

						extra = {};

						if (displayType === 'row' && !_.isUndefined(inputWidth)) {
							extra.style = {
								width: inputWidth,
							};
						}

						return (
							<div className={wrapperClassName}>
								<div className={lableClassName} {...extra}>
									<span className={classNames['label']}>{label}</span>
									{isRequired && (
										<span className={classNames['is-required-mark']}> *</span>
									)}
								</div>

								<div className={inputClassName} {...extra}>
									{input}
									{showError && (
										<div className={classNames['error-wrapper']}>
											<span className={classNames['error-msg']}>
												{errorMsg}
											</span>
										</div>
									)}
								</div>
							</div>
						);
					},
				}}>
				<Field
					label="Field 1"
					name="field_1"
					component={Input}
					isRequired={true}
				/>
				<Field
					label="Field 2"
					name="field_2"
					component={Input}
					value="Some value"
					defaultValue="This is defaultValue"
					displayType="row"
					labelWidth="20%"
					inputWidth="30%"
				/>
				<Field
					classNames={styles}
					name="field_3"
					component={Input}
					isRequired={true}
					render={({ classNames, showError, errorMsg, input }) => {
						//Render only input and error.
						//Useful for customizing error messages.
						return (
							<Fragment>
								{input}
								{showError && (
									<div className={classNames['error-wrapper']}>
										<span className={classNames['error-msg']}>{errorMsg}</span>
									</div>
								)}
							</Fragment>
						);
					}}
				/>
			</Form>
		</ExampleHolder>
	);
};

export default Example;
