import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import Countdown from 'ui/time/countdown';
import LocaleProvider from 'ui/misc/locale_provider';

const title = 'Countdown: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Countdown from 'ui/time/countdown';
import InfoTable from 'ui/tables/info_table';
import LocaleProvider from 'ui/misc/locale_provider';

<LocaleProvider locale="ru">//en,lv,ru
	<Countdown
		eventTime={1487671200}
		currentTime={951123600}
		translations={{
			years: {
				nom: 'год',
				gen: 'года',
				plu: 'лет',
			},
			months: {
				nom: 'месяц',
				gen: 'месяца',
				plu: 'месяцев',
			},
			weeks: {
				nom: 'неделя',
				gen: 'недели',
				plu: 'недель',
			},
			days: {
				nom: 'день',
				gen: 'дня',
				plu: 'дней',
			},
			hours: {
				nom: 'час',
				gen: 'часа',
				plu: 'часов',
			},
			minutes: {
				nom: 'минута',
				gen: 'минуты',
				plu: 'минут',
			},
			seconds: {
				nom: 'секунда',
				gen: 'секунды',
				plu: 'секунд',
			},
		}}
		render={({
			years,
			yearsTitle,
			asYears,
			asYearsTitle,
			months,
			monthsTitle,
			asMonths,
			asMonthsTitle,
			weeks,
			weeksTitle,
			asWeeks,
			asWeeksTitle,
			days,
			daysTitle,
			asDays,
			asDaysTitle,
			hours,
			hoursTitle,
			asHours,
			asHoursTitle,
			minutes,
			minutesTitle,
			asMinutes,
			asMinutesTitle,
			seconds,
			secondsTitle,
			asSeconds,
			asSecondsTitle,
		}) => {
			return (
				<div>
					<div>
						<b>years:</b>
						{years}
					</div>
					<div>
						<b>yearsTitle:</b>
						{yearsTitle}
					</div>
					<div>
						<b>asYears:</b>
						{asYears}
					</div>
					<div>
						<b>asYearsTitle:</b>
						{asYearsTitle}
					</div>
					<div>
						<b>months:</b>
						{months}
					</div>
					<div>
						<b>monthsTitle:</b>
						{monthsTitle}
					</div>
					<div>
						<b>asMonths:</b>
						{asMonths}
					</div>
					<div>
						<b>asMonthsTitle:</b>
						{asMonthsTitle}
					</div>
					<div>
						<b>weeks:</b>
						{weeks}
					</div>
					<div>
						<b>weeksTitle:</b>
						{weeksTitle}
					</div>
					<div>
						<b>asWeeks:</b>
						{asWeeks}
					</div>
					<div>
						<b>asWeeksTitle:</b>
						{asWeeksTitle}
					</div>
					<div>
						<b>days:</b>
						{days}
					</div>
					<div>
						<b>daysTitle:</b>
						{daysTitle}
					</div>
					<div>
						<b>asDays:</b>
						{asDays}
					</div>
					<div>
						<b>asDaysTitle:</b>
						{asDaysTitle}
					</div>
					<div>
						<b>hours:</b>
						{hours}
					</div>
					<div>
						<b>hoursTitle:</b>
						{hoursTitle}
					</div>
					<div>
						<b>asHours:</b>
						{asHours}
					</div>
					<div>
						<b>asHoursTitle:</b>
						{asHoursTitle}
					</div>
					<div>
						<b>minutes:</b>
						{minutes}
					</div>
					<div>
						<b>minutesTitle:</b>
						{minutesTitle}
					</div>
					<div>
						<b>asMinutes:</b>
						{asMinutes}
					</div>
					<div>
						<b>asMinutesTitle:</b>
						{asMinutesTitle}
					</div>
					<div>
						<b>seconds:</b>
						{seconds}
					</div>
					<div>
						<b>secondsTitle:</b>
						{secondsTitle}
					</div>
					<div>
						<b>asSeconds:</b>
						{asSeconds}
					</div>
					<div>
						<b>asSecondsTitle:</b>
						{asSecondsTitle}
					</div>
				</div>
			);
		}}
	/>
</LocaleProvider>
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div>
				<h3>EN</h3>
				<LocaleProvider locale="en">
					<Countdown
						eventTime={1487671200}
						currentTime={951123600}
						render={({
							years,
							yearsTitle,
							asYears,
							asYearsTitle,
							months,
							monthsTitle,
							asMonths,
							asMonthsTitle,
							weeks,
							weeksTitle,
							asWeeks,
							asWeeksTitle,
							days,
							daysTitle,
							asDays,
							asDaysTitle,
							hours,
							hoursTitle,
							asHours,
							asHoursTitle,
							minutes,
							minutesTitle,
							asMinutes,
							asMinutesTitle,
							seconds,
							secondsTitle,
							asSeconds,
							asSecondsTitle,
						}) => {
							return (
								<div>
									<div>
										<b>years:</b>
										{years}
									</div>
									<div>
										<b>yearsTitle:</b>
										{yearsTitle}
									</div>
									<div>
										<b>asYears:</b>
										{asYears}
									</div>
									<div>
										<b>asYearsTitle:</b>
										{asYearsTitle}
									</div>
									<div>
										<b>months:</b>
										{months}
									</div>
									<div>
										<b>monthsTitle:</b>
										{monthsTitle}
									</div>
									<div>
										<b>asMonths:</b>
										{asMonths}
									</div>
									<div>
										<b>asMonthsTitle:</b>
										{asMonthsTitle}
									</div>
									<div>
										<b>weeks:</b>
										{weeks}
									</div>
									<div>
										<b>weeksTitle:</b>
										{weeksTitle}
									</div>
									<div>
										<b>asWeeks:</b>
										{asWeeks}
									</div>
									<div>
										<b>asWeeksTitle:</b>
										{asWeeksTitle}
									</div>
									<div>
										<b>days:</b>
										{days}
									</div>
									<div>
										<b>daysTitle:</b>
										{daysTitle}
									</div>
									<div>
										<b>asDays:</b>
										{asDays}
									</div>
									<div>
										<b>asDaysTitle:</b>
										{asDaysTitle}
									</div>
									<div>
										<b>hours:</b>
										{hours}
									</div>
									<div>
										<b>hoursTitle:</b>
										{hoursTitle}
									</div>
									<div>
										<b>asHours:</b>
										{asHours}
									</div>
									<div>
										<b>asHoursTitle:</b>
										{asHoursTitle}
									</div>
									<div>
										<b>minutes:</b>
										{minutes}
									</div>
									<div>
										<b>minutesTitle:</b>
										{minutesTitle}
									</div>
									<div>
										<b>asMinutes:</b>
										{asMinutes}
									</div>
									<div>
										<b>asMinutesTitle:</b>
										{asMinutesTitle}
									</div>
									<div>
										<b>seconds:</b>
										{seconds}
									</div>
									<div>
										<b>secondsTitle:</b>
										{secondsTitle}
									</div>
									<div>
										<b>asSeconds:</b>
										{asSeconds}
									</div>
									<div>
										<b>asSecondsTitle:</b>
										{asSecondsTitle}
									</div>
								</div>
							);
						}}
					/>
				</LocaleProvider>
			</div>
			<div>
				<h3>LV</h3>
				<LocaleProvider locale="lv">
					<Countdown
						eventTime={1487671200}
						currentTime={951123600}
						render={({
							years,
							yearsTitle,
							asYears,
							asYearsTitle,
							months,
							monthsTitle,
							asMonths,
							asMonthsTitle,
							weeks,
							weeksTitle,
							asWeeks,
							asWeeksTitle,
							days,
							daysTitle,
							asDays,
							asDaysTitle,
							hours,
							hoursTitle,
							asHours,
							asHoursTitle,
							minutes,
							minutesTitle,
							asMinutes,
							asMinutesTitle,
							seconds,
							secondsTitle,
							asSeconds,
							asSecondsTitle,
						}) => {
							return (
								<div>
									<div>
										<b>years:</b>
										{years}
									</div>
									<div>
										<b>yearsTitle:</b>
										{yearsTitle}
									</div>
									<div>
										<b>asYears:</b>
										{asYears}
									</div>
									<div>
										<b>asYearsTitle:</b>
										{asYearsTitle}
									</div>
									<div>
										<b>months:</b>
										{months}
									</div>
									<div>
										<b>monthsTitle:</b>
										{monthsTitle}
									</div>
									<div>
										<b>asMonths:</b>
										{asMonths}
									</div>
									<div>
										<b>asMonthsTitle:</b>
										{asMonthsTitle}
									</div>
									<div>
										<b>weeks:</b>
										{weeks}
									</div>
									<div>
										<b>weeksTitle:</b>
										{weeksTitle}
									</div>
									<div>
										<b>asWeeks:</b>
										{asWeeks}
									</div>
									<div>
										<b>asWeeksTitle:</b>
										{asWeeksTitle}
									</div>
									<div>
										<b>days:</b>
										{days}
									</div>
									<div>
										<b>daysTitle:</b>
										{daysTitle}
									</div>
									<div>
										<b>asDays:</b>
										{asDays}
									</div>
									<div>
										<b>asDaysTitle:</b>
										{asDaysTitle}
									</div>
									<div>
										<b>hours:</b>
										{hours}
									</div>
									<div>
										<b>hoursTitle:</b>
										{hoursTitle}
									</div>
									<div>
										<b>asHours:</b>
										{asHours}
									</div>
									<div>
										<b>asHoursTitle:</b>
										{asHoursTitle}
									</div>
									<div>
										<b>minutes:</b>
										{minutes}
									</div>
									<div>
										<b>minutesTitle:</b>
										{minutesTitle}
									</div>
									<div>
										<b>asMinutes:</b>
										{asMinutes}
									</div>
									<div>
										<b>asMinutesTitle:</b>
										{asMinutesTitle}
									</div>
									<div>
										<b>seconds:</b>
										{seconds}
									</div>
									<div>
										<b>secondsTitle:</b>
										{secondsTitle}
									</div>
									<div>
										<b>asSeconds:</b>
										{asSeconds}
									</div>
									<div>
										<b>asSecondsTitle:</b>
										{asSecondsTitle}
									</div>
								</div>
							);
						}}
					/>
				</LocaleProvider>
			</div>
			<div>
				<h3>RU</h3>
				<LocaleProvider locale="ru">
					<Countdown
						eventTime={1487671200}
						currentTime={951123600}
						render={({
							years,
							yearsTitle,
							asYears,
							asYearsTitle,
							months,
							monthsTitle,
							asMonths,
							asMonthsTitle,
							weeks,
							weeksTitle,
							asWeeks,
							asWeeksTitle,
							days,
							daysTitle,
							asDays,
							asDaysTitle,
							hours,
							hoursTitle,
							asHours,
							asHoursTitle,
							minutes,
							minutesTitle,
							asMinutes,
							asMinutesTitle,
							seconds,
							secondsTitle,
							asSeconds,
							asSecondsTitle,
						}) => {
							return (
								<div>
									<div>
										<b>years:</b>
										{years}
									</div>
									<div>
										<b>yearsTitle:</b>
										{yearsTitle}
									</div>
									<div>
										<b>asYears:</b>
										{asYears}
									</div>
									<div>
										<b>asYearsTitle:</b>
										{asYearsTitle}
									</div>
									<div>
										<b>months:</b>
										{months}
									</div>
									<div>
										<b>monthsTitle:</b>
										{monthsTitle}
									</div>
									<div>
										<b>asMonths:</b>
										{asMonths}
									</div>
									<div>
										<b>asMonthsTitle:</b>
										{asMonthsTitle}
									</div>
									<div>
										<b>weeks:</b>
										{weeks}
									</div>
									<div>
										<b>weeksTitle:</b>
										{weeksTitle}
									</div>
									<div>
										<b>asWeeks:</b>
										{asWeeks}
									</div>
									<div>
										<b>asWeeksTitle:</b>
										{asWeeksTitle}
									</div>
									<div>
										<b>days:</b>
										{days}
									</div>
									<div>
										<b>daysTitle:</b>
										{daysTitle}
									</div>
									<div>
										<b>asDays:</b>
										{asDays}
									</div>
									<div>
										<b>asDaysTitle:</b>
										{asDaysTitle}
									</div>
									<div>
										<b>hours:</b>
										{hours}
									</div>
									<div>
										<b>hoursTitle:</b>
										{hoursTitle}
									</div>
									<div>
										<b>asHours:</b>
										{asHours}
									</div>
									<div>
										<b>asHoursTitle:</b>
										{asHoursTitle}
									</div>
									<div>
										<b>minutes:</b>
										{minutes}
									</div>
									<div>
										<b>minutesTitle:</b>
										{minutesTitle}
									</div>
									<div>
										<b>asMinutes:</b>
										{asMinutes}
									</div>
									<div>
										<b>asMinutesTitle:</b>
										{asMinutesTitle}
									</div>
									<div>
										<b>seconds:</b>
										{seconds}
									</div>
									<div>
										<b>secondsTitle:</b>
										{secondsTitle}
									</div>
									<div>
										<b>asSeconds:</b>
										{asSeconds}
									</div>
									<div>
										<b>asSecondsTitle:</b>
										{asSecondsTitle}
									</div>
								</div>
							);
						}}
					/>
				</LocaleProvider>
			</div>
			<div>
				<h3>Custom translations</h3>
				<Countdown
					eventTime={1487671200}
					currentTime={951123600}
					translations={{
						years: {
							nom: 'год ru',
							gen: 'года ru',
							plu: 'лет ru',
						},
						months: {
							nom: 'месяц ru',
							gen: 'месяца ru',
							plu: 'месяцев ru',
						},
						weeks: {
							nom: 'неделя ru',
							gen: 'недель ru',
							plu: 'недели ru',
						},
						days: {
							nom: 'день ru',
							gen: 'дня ru',
							plu: 'дней ru',
						},
						hours: {
							nom: 'час ru',
							gen: 'часа ru',
							plu: 'часов ru',
						},
						minutes: {
							nom: 'минута ru',
							gen: 'минут ru',
							plu: 'минуты ru',
						},
						seconds: {
							nom: 'секунда ru',
							gen: 'секунд ru',
							plu: 'секунды ru',
						},
					}}
					render={({
						years,
						yearsTitle,
						asYears,
						asYearsTitle,
						months,
						monthsTitle,
						asMonths,
						asMonthsTitle,
						weeks,
						weeksTitle,
						asWeeks,
						asWeeksTitle,
						days,
						daysTitle,
						asDays,
						asDaysTitle,
						hours,
						hoursTitle,
						asHours,
						asHoursTitle,
						minutes,
						minutesTitle,
						asMinutes,
						asMinutesTitle,
						seconds,
						secondsTitle,
						asSeconds,
						asSecondsTitle,
					}) => {
						return (
							<div>
								<div>
									<b>years:</b>
									{years}
								</div>
								<div>
									<b>yearsTitle:</b>
									{yearsTitle}
								</div>
								<div>
									<b>asYears:</b>
									{asYears}
								</div>
								<div>
									<b>asYearsTitle:</b>
									{asYearsTitle}
								</div>
								<div>
									<b>months:</b>
									{months}
								</div>
								<div>
									<b>monthsTitle:</b>
									{monthsTitle}
								</div>
								<div>
									<b>asMonths:</b>
									{asMonths}
								</div>
								<div>
									<b>asMonthsTitle:</b>
									{asMonthsTitle}
								</div>
								<div>
									<b>weeks:</b>
									{weeks}
								</div>
								<div>
									<b>weeksTitle:</b>
									{weeksTitle}
								</div>
								<div>
									<b>asWeeks:</b>
									{asWeeks}
								</div>
								<div>
									<b>asWeeksTitle:</b>
									{asWeeksTitle}
								</div>
								<div>
									<b>days:</b>
									{days}
								</div>
								<div>
									<b>daysTitle:</b>
									{daysTitle}
								</div>
								<div>
									<b>asDays:</b>
									{asDays}
								</div>
								<div>
									<b>asDaysTitle:</b>
									{asDaysTitle}
								</div>
								<div>
									<b>hours:</b>
									{hours}
								</div>
								<div>
									<b>hoursTitle:</b>
									{hoursTitle}
								</div>
								<div>
									<b>asHours:</b>
									{asHours}
								</div>
								<div>
									<b>asHoursTitle:</b>
									{asHoursTitle}
								</div>
								<div>
									<b>minutes:</b>
									{minutes}
								</div>
								<div>
									<b>minutesTitle:</b>
									{minutesTitle}
								</div>
								<div>
									<b>asMinutes:</b>
									{asMinutes}
								</div>
								<div>
									<b>asMinutesTitle:</b>
									{asMinutesTitle}
								</div>
								<div>
									<b>seconds:</b>
									{seconds}
								</div>
								<div>
									<b>secondsTitle:</b>
									{secondsTitle}
								</div>
								<div>
									<b>asSeconds:</b>
									{asSeconds}
								</div>
								<div>
									<b>asSecondsTitle:</b>
									{asSecondsTitle}
								</div>
							</div>
						);
					}}
				/>
			</div>
		</ExampleHolder>
	);
};

export default Example;
