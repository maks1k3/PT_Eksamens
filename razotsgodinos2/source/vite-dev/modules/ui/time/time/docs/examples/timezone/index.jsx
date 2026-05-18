import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Time from 'ui/time/time';

const title = 'Time: timezone';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Time from 'ui/time/time';

Australia/Sydney
<Time timeZone="Australia/Sydney"/>

America/New_York
<Time timeZone="America/New_York"/>

Russia/Moscow
<Time timeZone="Europe/Moscow"/>

Danmark/Silkeborg
<Time timeZone="Europe/Copenhagen"/>

China/Chongqing
<Time timeZone="Asia/Chongqing"/>
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
				<h2>Australia/Sydney</h2>
				<Time timeZone="Australia/Sydney" />
			</div>

			<div>
				<h2>America/New_York</h2>
				<Time timeZone="America/New_York" />
			</div>

			<div>
				<h2>Russia/Moscow</h2>
				<Time timeZone="Europe/Moscow" />
			</div>

			<div>
				<h2>Danmark/Silkeborg</h2>
				<Time timeZone="Europe/Copenhagen" />
			</div>

			<div>
				<h2>China/Chongqing</h2>
				<Time timeZone="Asia/Chongqing" />
			</div>
		</ExampleHolder>
	);
};

export default Example;
