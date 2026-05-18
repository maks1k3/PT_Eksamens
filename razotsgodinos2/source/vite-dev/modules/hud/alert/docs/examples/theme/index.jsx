import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Button from 'ui/controls/button';

const title = 'Alert: theme';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
//danger
showAlert({ theme: 'danger', content: 'This is danger.' });

//success
showAlert({ theme: 'success', content: 'This is success.' });

//info
showAlert({ theme: 'info', content: 'This is info.' });

//warning
showAlert({ theme: 'warning', content: 'This is warning.' });

//primary
showAlert({ theme: 'primary', content: 'This is primary.' });

//custom
showAlert({ theme: 'custom', content: 'This is custom.' });
  `,
};

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<div style={{ marginTop: '5px' }}>
				<Button
					title="danger"
					onClick={() => {
						showAlert({ theme: 'danger', content: 'This is danger.' });
					}}
				/>
			</div>
			<div style={{ marginTop: '5px' }}>
				<Button
					title="success"
					onClick={() => {
						showAlert({ theme: 'success', content: 'This is success.' });
					}}
				/>
			</div>
			<div style={{ marginTop: '5px' }}>
				<Button
					title="info"
					onClick={() => {
						showAlert({ theme: 'info', content: 'This is info.' });
					}}
				/>
			</div>
			<div style={{ marginTop: '5px' }}>
				<Button
					title="warning"
					onClick={() => {
						showAlert({ theme: 'warning', content: 'This is warning.' });
					}}
				/>
			</div>
			<div style={{ marginTop: '5px' }}>
				<Button
					title="primary"
					onClick={() => {
						showAlert({ theme: 'primary', content: 'This is primary.' });
					}}
				/>
			</div>
			<div style={{ marginTop: '5px' }}>
				<Button
					title="custom"
					onClick={() => {
						showAlert({ theme: 'custom', content: 'This is custom.' });
					}}
				/>
			</div>
		</ExampleHolder>
	);
};

export default Example;
