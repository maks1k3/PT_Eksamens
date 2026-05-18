import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Pagination from 'ui/controls/pagination';
import Link from 'core/navigation/link';

const title = 'Pagination: customization';

import styles from './styles.less';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Pagination from 'ui/controls/pagination';
import Link from 'core/navigation/link';

<Pagination
	classNames={styles}
	previousLabel="Previous"
	breakLabel="break"
	nextLabel="Next"
	renderPrevious={({
		onClick,
		getLinkUrl,
		page,
		disabled,
		classNames,
		previousLabel,
		Pagination,
	}) => {
		const className = _g.classNames(
			classNames['item'],
			classNames['previous'],
			{
				[classNames['previous_disabled']]: disabled,
			},
		);

		if (_.isFunction(getLinkUrl) && !disabled) {
			return (
				<Link to={getLinkUrl(page)}>
					<span className={className} onClick={onClick}>
						{previousLabel}
					</span>
				</Link>
			);
		}

		return (
			<li>
				<span className={className} onClick={onClick}>
					{previousLabel}
				</span>
			</li>
		);
	}}
	renderBreak={({ breakLabel, index, classNames, Pagination }) => {
		return (
			<li key={\`break-\${index}\`}>
				<span className={classNames['break']}>{breakLabel}</span>
			</li>
		);
	}}
	renderNext={({
		onClick,
		getLinkUrl,
		page,
		disabled,
		classNames,
		nextLabel,
		Pagination,
	}) => {
		const className = _g.classNames(
			classNames['item'],
			classNames['next'],
			{
				[classNames['next_disabled']]: disabled,
			},
		);

		if (_.isFunction(getLinkUrl) && !disabled) {
			return (
				<Link to={getLinkUrl(page)}>
					<span className={className} onClick={onClick}>
						{nextLabel}
					</span>
				</Link>
			);
		}

		return (
			<li>
				<span className={className} onClick={onClick}>
					{nextLabel}
				</span>
			</li>
		);
	}}
	renderPageItem={({
		page,
		disabled,
		classNames,
		onClick,
		getLinkUrl,
		Pagination,
	}) => {
		const className = _g.classNames(classNames['item'], {
			[classNames['item_active']]: page === Pagination.state.page,
		});

		if (_.isFunction(getLinkUrl) && !disabled) {
			return (
				<Link to={getLinkUrl(page)}>
					<span className={className} onClick={onClick}>
						{page}
					</span>
				</Link>
			);
		}

		return (
			<li key={page}>
				<span className={className} onClick={onClick}>
					{page}
				</span>
			</li>
		);
	}}
	pageCount={10}
	pageRangeDisplayed={2}
	marginPagesDisplayed={1}
	page={4}
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
			<Pagination
				classNames={styles}
				previousLabel="Previous"
				breakLabel="break"
				nextLabel="Next"
				renderPrevious={({
					onClick,
					getLinkUrl,
					page,
					disabled,
					classNames,
					previousLabel,
					Pagination,
				}) => {
					const className = _g.classNames(
						classNames['item'],
						classNames['previous'],
						{
							[classNames['previous_disabled']]: disabled,
						},
					);

					if (_.isFunction(getLinkUrl) && !disabled) {
						return (
							<Link to={getLinkUrl(page)}>
								<span className={className} onClick={onClick}>
									{previousLabel}
								</span>
							</Link>
						);
					}

					return (
						<li>
							<span className={className} onClick={onClick}>
								{previousLabel}
							</span>
						</li>
					);
				}}
				renderBreak={({ breakLabel, index, classNames, Pagination }) => {
					return (
						<li key={`break-${index}`}>
							<span className={classNames['break']}>{breakLabel}</span>
						</li>
					);
				}}
				renderNext={({
					onClick,
					getLinkUrl,
					page,
					disabled,
					classNames,
					nextLabel,
					Pagination,
				}) => {
					const className = _g.classNames(
						classNames['item'],
						classNames['next'],
						{
							[classNames['next_disabled']]: disabled,
						},
					);

					if (_.isFunction(getLinkUrl) && !disabled) {
						return (
							<Link to={getLinkUrl(page)}>
								<span className={className} onClick={onClick}>
									{nextLabel}
								</span>
							</Link>
						);
					}

					return (
						<li>
							<span className={className} onClick={onClick}>
								{nextLabel}
							</span>
						</li>
					);
				}}
				renderPageItem={({
					page,
					disabled,
					classNames,
					onClick,
					getLinkUrl,
					Pagination,
				}) => {
					const className = _g.classNames(classNames['item'], {
						[classNames['item_active']]: page === Pagination.state.page,
					});

					if (_.isFunction(getLinkUrl) && !disabled) {
						return (
							<Link to={getLinkUrl(page)}>
								<span className={className} onClick={onClick}>
									{page}
								</span>
							</Link>
						);
					}

					return (
						<li key={page}>
							<span className={className} onClick={onClick}>
								{page}
							</span>
						</li>
					);
				}}
				pageCount={10}
				pageRangeDisplayed={2}
				marginPagesDisplayed={1}
				page={4}
			/>
		</ExampleHolder>
	);
};

export default Example;
