import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

const title = 'AdministrationPopupHeader: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import AdministrationPopupHeader from 'popups/components/administration/components/header';

<AdministrationPopupHeader
	classNames={classNames}
	showRefresh={true}
	onRefreshClick={onRefreshClick}
	onImageClick={onImageClick}
	image="/url/to_image.jpg"
	rows={['ID: 1', 'Title: item']}
	ImageProps={{
		title: 'This is item',
	}}
	refreshIcon={{
		provider: 'fa',
		name: 'refresh',
	}}
	renderRows={({
		rows,
		image,
		classNames,
		AdministrationPopupHeader,
	}) => {
		const content = _.map(rows, (row, index) => {
			return (
				<div key={index} className={classNames['row-item']}>
					{row}
				</div>
			);
		});

		const className = _g.classNames(classNames['rows'], {
			[classNames['rows_with-image']]: !_g.isEmpty(image),
		});

		return (
			<div className={className}>
				{AdministrationPopupHeader.renderRefreshIcon(classNames)}
				{content}
			</div>
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
			code={info.code}
		/>
	);
};

export default Example;
