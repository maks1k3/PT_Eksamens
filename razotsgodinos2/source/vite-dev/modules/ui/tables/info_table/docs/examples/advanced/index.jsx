import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import InfoTable from 'ui/tables/info_table';

import styles from './styles.less';

const title = 'InfoTable: advanced';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import InfoTable from 'ui/tables/info_table';

<InfoTable
	recursive={false}
	classNames={styles}
	firstColumnWidth={300}
	rows={[
		{
			title: 'User',
			renderTitle: title => _.upperCase(title),
			value: 'Some data',
			renderValue: title => _.kebabCase(title),
		},
		{
			title: 'Extra',
			value: {
				name: 'Den',
				lastName: 'Max',
				thumbnail:
					'http://my-codebase/uploads/avatars/fe386d0219eb6241b5990ea9d34e721f_thumbnail.jpghttp://my-codebase/uploads/avatars/fe386d0219eb6241b5990ea9d34e721f_thumbnail.jpghttp://my-codebase/uploads/avatars/fe386d0219eb6241b5990ea9d34e721f_thumbnail.jpg',
			},
		},
	]}
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
			<InfoTable
				recursive={false}
				classNames={styles}
				firstColumnWidth={300}
				rows={[
					{
						title: 'User',
						renderTitle: title => _.upperCase(title),
						value: 'Some data',
						renderValue: title => _.kebabCase(title),
					},
					{
						title: 'Extra',
						value: {
							name: 'Den',
							lastName: 'Max',
							thumbnail:
								'http://my-codebase/uploads/avatars/fe386d0219eb6241b5990ea9d34e721f_thumbnail.jpghttp://my-codebase/uploads/avatars/fe386d0219eb6241b5990ea9d34e721f_thumbnail.jpghttp://my-codebase/uploads/avatars/fe386d0219eb6241b5990ea9d34e721f_thumbnail.jpg',
						},
					},
				]}
			/>
			<h3>Recursive</h3>
			<InfoTable
				recursive={true}
				classNames={styles}
				firstColumnWidth={300}
				rows={[
					{
						title: 'User',
						renderTitle: title => _.upperCase(title),
						value: 'Some data',
						renderValue: title => _.kebabCase(title),
					},
					{
						title: 'Extra',
						value: {
							name: 'Den',
							lastName: 'Max',
							thumbnail:
								'http://my-codebase/uploads/avatars/fe386d0219eb6241b5990ea9d34e721f_thumbnail.jpghttp://my-codebase/uploads/avatars/fe386d0219eb6241b5990ea9d34e721f_thumbnail.jpghttp://my-codebase/uploads/avatars/fe386d0219eb6241b5990ea9d34e721f_thumbnail.jpg',
						},
					},
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
