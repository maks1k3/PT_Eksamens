import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Table from 'ui/tables/table';

import styles from './styles.less';

const title = 'Table: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Table from 'ui/tables/table';

<Table
	classNames={styles}
	header={['ID', 'Name', 'Date', 'Value']}
	footer={['ID', 'Name', 'Date', 'Value']}
	rows={[
		{
			id: '1',
			name: 'Name 1',
			date: '2017.05.06',
			value: 'This is some data',
		},
		{
			id: '2',
			name: 'Name 2',
			date: '2017.05.07',
			value: 'This is some data',
		},
		{
			id: '3',
			name: 'Name 3',
			date: '2017.05.08',
			value: 'This is some data',
		},
	]}
	renderHeader={({ classNames, header, Table }) => {
		const rows = _.map(header, (item, index) => {
			return <th key={index}>{item}</th>;
		});

		return (
			<thead>
				<tr className={classNames['header']}>{rows}</tr>
			</thead>
		);
	}}
	renderFooter={({ classNames, footer, Table }) => {
		const rows = _.map(footer, (item, index) => {
			return <th key={index}>{item}</th>;
		});

		return (
			<tfoot>
				<tr className={classNames['footer']}>{rows}</tr>
			</tfoot>
		);
	}}
	renderRows={({ classNames, rows, renderRow, Table }) => {
		const _rows = _.map(rows, (row, index) => {
			return renderRow({ classNames, row, index });
		});

		return <tbody>{_rows}</tbody>;
	}}
	renderRow={({ classNames, row, index, renderCell, Table }) => {
		const cells = _.map(row, (cell, index) => {
			return renderCell({ classNames, cell, index });
		});

		return (
			<tr key={index} className={classNames['row']}>
				{cells}
			</tr>
		);
	}}
	renderCell={({ classNames, cell, index, Table }) => {
		return <td key={index}>{cell}</td>;
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
			<Table
				classNames={styles}
				header={['ID', 'Name', 'Date', 'Value']}
				footer={['ID', 'Name', 'Date', 'Value']}
				rows={[
					{
						id: '1',
						name: 'Name 1',
						date: '2017.05.06',
						value: 'This is some data',
					},
					{
						id: '2',
						name: 'Name 2',
						date: '2017.05.07',
						value: 'This is some data',
					},
					{
						id: '3',
						name: 'Name 3',
						date: '2017.05.08',
						value: 'This is some data',
					},
				]}
				renderHeader={({ classNames, header, Table }) => {
					const rows = _.map(header, (item, index) => {
						return <th key={index}>{item}</th>;
					});

					return (
						<thead>
							<tr className={classNames['header']}>{rows}</tr>
						</thead>
					);
				}}
				renderFooter={({ classNames, footer, Table }) => {
					const rows = _.map(footer, (item, index) => {
						return <th key={index}>{item}</th>;
					});

					return (
						<tfoot>
							<tr className={classNames['footer']}>{rows}</tr>
						</tfoot>
					);
				}}
				renderRows={({ classNames, rows, renderRow, Table }) => {
					const _rows = _.map(rows, (row, index) => {
						return renderRow({ classNames, row, index });
					});

					return <tbody>{_rows}</tbody>;
				}}
				renderRow={({ classNames, row, index, renderCell, Table }) => {
					const cells = _.map(row, (cell, index) => {
						return renderCell({ classNames, cell, index });
					});

					return (
						<tr key={index} className={classNames['row']}>
							{cells}
						</tr>
					);
				}}
				renderCell={({ classNames, cell, index, Table }) => {
					return <td key={index}>{cell}</td>;
				}}
			/>
		</ExampleHolder>
	);
};

export default Example;
