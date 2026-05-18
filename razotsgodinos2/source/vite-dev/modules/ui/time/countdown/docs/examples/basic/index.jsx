import React, { Fragment } from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Countdown from 'ui/time/countdown';

const title = 'Countdown: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: 'From 2017-01-01 13:50:45 to 2017-02-21 12:00:00.',
	code: `
import Countdown from 'ui/time/countdown';

<Countdown
	eventTime={1487671200} //php: strtotime('2017-02-21 12:00:00')
	currentTime={1483271445} //php: strtotime('2017-01-01 13:50:45')
	render={({
		months,
		monthsTitle,
		days,
		daysTitle,
		asDays,
		asDaysTitle,
		hours,
		hoursTitle,
		minutes,
		minutesTitle,
		seconds,
		secondsTitle,
	}) => {
		return (
			<Fragment>
				<div>
					<span>
						{months} {monthsTitle} {days} {daysTitle} {hours} {hoursTitle}{' '}
						{minutes} {minutesTitle} {seconds} {secondsTitle}
					</span>
				</div>
				<div>
					<span>
						{asDays} {asDaysTitle} {hours} {hoursTitle} {minutes}{' '}
						{minutesTitle} {seconds} {secondsTitle}
					</span>
				</div>
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
			<Countdown
				eventTime={1487671200} //php: strtotime('2017-02-21 12:00:00')
				currentTime={1483271445} //php: strtotime('2017-01-01 13:50:45')
				render={({
					months,
					monthsTitle,
					days,
					daysTitle,
					asDays,
					asDaysTitle,
					hours,
					hoursTitle,
					minutes,
					minutesTitle,
					seconds,
					secondsTitle,
				}) => {
					return (
						<Fragment>
							<div>
								<span>
									{months} {monthsTitle} {days} {daysTitle} {hours} {hoursTitle}{' '}
									{minutes} {minutesTitle} {seconds} {secondsTitle}
								</span>
							</div>
							<div>
								<span>
									{asDays} {asDaysTitle} {hours} {hoursTitle} {minutes}{' '}
									{minutesTitle} {seconds} {secondsTitle}
								</span>
							</div>
						</Fragment>
					);
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
