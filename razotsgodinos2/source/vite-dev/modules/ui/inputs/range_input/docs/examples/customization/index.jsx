import React, { Fragment } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import RangeInput from 'ui/inputs/range_input';

import styles from './RangeInput.less';

const title = 'RangeInput: customization';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import RangeInput from 'ui/inputs/range_input';

<RangeInput
	classNames={styles}
	value="25"
	valueLabelDisplay="auto"
	step={2}
	marks={true}
	renderTrack={({ className, trackStyle, RangeInput }) => {
		return <div className={className} style={trackStyle} />;
	}}
	renderThumb={({
		thumbClassName,
		disabled,
		style,
		index,
		onKeyDown,
		onFocus,
		onBlur,
		onMouseOver,
		onMouseLeave,
		RangeInput,
	}) => {
		return (
			<span
				className={thumbClassName}
				tabIndex={disabled ? null : 0}
				role="slider"
				style={style}
				data-index={index}
				onKeyDown={onKeyDown}
				onFocus={onFocus}
				onBlur={onBlur}
				onMouseOver={onMouseOver}
				onMouseLeave={onMouseLeave}
			/>
		);
	}}
	renderRail={({ className, RangeInput }) => {
		return <div className={className} />;
	}}
	renderValueLabel={({ className, classNames, value, RangeInput }) => {
		return (
			<span className={className}>
				<span className={classNames['valueLabel_circle']}>
					<span className={classNames['valueLabel_label']}>{value}</span>
				</span>
			</span>
		);
	}}
	renderMark={({
		markClassName,
		markLabelClassName,
		style,
		index,
		mark,
		RangeInput,
	}) => {
		return (
			<Fragment key={mark.value}>
				<span
					style={style}
					data-index={index}
					className={markClassName}
				/>
				{mark.label != null ? (
					<span
						data-index={index}
						style={style}
						className={markLabelClassName}>
						{mark.label}
					</span>
				) : null}
			</Fragment>
		);
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
			<RangeInput
				classNames={styles}
				value="25"
				step={2}
				marks={true}
				valueLabelDisplay="auto"
				renderTrack={({ className, trackStyle, RangeInput }) => {
					return <div className={className} style={trackStyle} />;
				}}
				renderThumb={({
					thumbClassName,
					disabled,
					style,
					index,
					onKeyDown,
					onFocus,
					onBlur,
					onMouseOver,
					onMouseLeave,
					RangeInput,
				}) => {
					return (
						<span
							className={thumbClassName}
							tabIndex={disabled ? null : 0}
							role="slider"
							style={style}
							data-index={index}
							onKeyDown={onKeyDown}
							onFocus={onFocus}
							onBlur={onBlur}
							onMouseOver={onMouseOver}
							onMouseLeave={onMouseLeave}
						/>
					);
				}}
				renderRail={({ className, RangeInput }) => {
					return <div className={className} />;
				}}
				renderValueLabel={({ className, classNames, value, RangeInput }) => {
					return (
						<span className={className}>
							<span className={classNames['valueLabel_circle']}>
								<span className={classNames['valueLabel_label']}>{value}</span>
							</span>
						</span>
					);
				}}
				renderMark={({
					markClassName,
					markLabelClassName,
					style,
					index,
					mark,
					RangeInput,
				}) => {
					return (
						<Fragment key={mark.value}>
							<span
								style={style}
								data-index={index}
								className={markClassName}
							/>
							{mark.label != null ? (
								<span
									data-index={index}
									style={style}
									className={markLabelClassName}>
									{mark.label}
								</span>
							) : null}
						</Fragment>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
