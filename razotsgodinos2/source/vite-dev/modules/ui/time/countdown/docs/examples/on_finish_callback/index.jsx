import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Countdown from 'ui/time/countdown';

const title = 'Countdown: onFinish';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Countdown from 'ui/time/countdown';

<Countdown
	eventTime={moment()
		.add(60, 'seconds')
		.unix()}
	currentTime={moment().unix()}	
	onFinish={() => {
		console.log('Countdown has finished!');
	}}
	render={({
		hours,
		hoursTitle,
		minutes,
		minutesTitle,
		seconds,
		secondsTitle,
	}) => {
		return (
			<span>
				{hours} {hoursTitle} {minutes} {minutesTitle} {seconds}{' '}
				{secondsTitle}
			</span>
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
			<Countdown
				eventTime={moment()
					.add(60, 'seconds')
					.unix()}
				currentTime={moment().unix()}
				onFinish={() => {
					console.log('Countdown has finished!');
				}}
				render={({
					hours,
					hoursTitle,
					minutes,
					minutesTitle,
					seconds,
					secondsTitle,
				}) => {
					return (
						<span>
							{hours} {hoursTitle} {minutes} {minutesTitle} {seconds}{' '}
							{secondsTitle}
						</span>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
