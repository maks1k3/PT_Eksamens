import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';
import Menu from 'ui/controls/menu';

const title = 'Menu: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Menu from 'ui/controls/menu';

<Menu
	rows={[
		{
			name: 'controls',
			title: 'Controls',
			url: '#',
			icon: {
				provider: 'icomoon',
				name: 'chip',
			},
			subMenu: [
				//<editor-fold defaultstate="collapsed" desc="controls">
				{
					name: 'collapsible',
					title: 'Collapsible',
					url: '/web_docs/controls/collapsible',
					subMenu: null,
				},
				{
					name: 'tabs',
					title: 'Tabs',
					url: '/web_docs/controls/tabs',
					subMenu: null,
				},
				{
					name: 'menu',
					title: 'Menu',
					url: '/web_docs/controls/menu',
					subMenu: null,
				},
				//</editor-fold>
			],
		},
		{
			name: 'form',
			title: 'Form',
			url: '#',
			icon: {
				provider: 'icomoon',
				name: 'insert-template',
			},
			subMenu: [
				//<editor-fold defaultstate="collapsed" desc="inputs">
				{
					name: 'form',
					title: 'Form',
					url: '/web_docs/form',
					subMenu: null,
				},
				{
					name: 'field',
					title: 'Field',
					url: '/web_docs/form/field',
					subMenu: null,
				},
				//</editor-fold>
			],
		},
		{
			name: 'menu_levels',
			title: 'Menu levels',
			url: '#',
			icon: {
				provider: 'icomoon',
				name: 'tree5',
			},
			subMenu: [
				{
					name: 'second_level_1',
					title: 'Second level 1',
					url: '#',
					icon: {
						provider: 'icomoon',
						name: 'IE',
					},
					subMenu: null,
					onClick: ({ Item }) => {
						console.log({ onClick: { Item } });
					},
					mode: 'navigation',
				},
				{
					name: 'second_level_2',
					title: 'Second level 2',
					url: '#',
					icon: {
						provider: 'icomoon',
						name: 'firefox',
					},
					subMenu: [
						{
							name: 'third_level_1',
							title: 'Third level 1',
							url: '#',
							icon: {
								provider: 'icomoon',
								name: 'android',
							},
							subMenu: null,
						},
						{
							name: 'third_level_2',
							title: 'Third level 2',
							url: '#',
							icon: {
								provider: 'icomoon',
								name: 'apple2',
							},
							subMenu: [
								{
									name: 'fourth_level_1',
									title: 'Fourth level 1',
									url: '#',
									icon: {
										provider: 'icomoon',
										name: 'html5',
									},
									subMenu: null,
								},
								{
									name: 'fourth_level_2',
									title: 'Fourth level 2',
									url: '#',
									icon: {
										provider: 'icomoon',
										name: 'css3',
									},
									subMenu: null,
								},
							],
						},
						{
							name: 'third_level_3',
							title: 'Third level 3',
							url: '#',
							icon: {
								provider: 'icomoon',
								name: 'windows',
							},
							subMenu: null,
						},
					],
				},
				{
					name: 'second_level_3',
					title: 'Second level 3',
					url: '#',
					icon: {
						provider: 'icomoon',
						name: 'chrome',
					},
					subMenu: null,
				},
			],
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
			<Menu
				rows={[
					{
						name: 'controls',
						title: 'Controls',
						url: '#',
						icon: {
							provider: 'icomoon',
							name: 'chip',
						},
						subMenu: [
							//<editor-fold defaultstate="collapsed" desc="controls">
							{
								name: 'collapsible',
								title: 'Collapsible',
								url: '/web_docs/controls/collapsible',
								subMenu: null,
							},
							{
								name: 'tabs',
								title: 'Tabs',
								url: '/web_docs/controls/tabs',
								subMenu: null,
							},
							{
								name: 'menu',
								title: 'Menu',
								url: '/web_docs/controls/menu',
								subMenu: null,
							},
							//</editor-fold>
						],
					},
					{
						name: 'form',
						title: 'Form',
						url: '#',
						icon: {
							provider: 'icomoon',
							name: 'insert-template',
						},
						subMenu: [
							//<editor-fold defaultstate="collapsed" desc="inputs">
							{
								name: 'form',
								title: 'Form',
								url: '/web_docs/form',
								subMenu: null,
							},
							{
								name: 'field',
								title: 'Field',
								url: '/web_docs/form/field',
								subMenu: null,
							},
							//</editor-fold>
						],
					},
					{
						name: 'menu_levels',
						title: 'Menu levels',
						url: '#',
						icon: {
							provider: 'icomoon',
							name: 'tree5',
						},
						subMenu: [
							{
								name: 'second_level_1',
								title: 'Second level 1',
								url: '#',
								icon: {
									provider: 'icomoon',
									name: 'IE',
								},
								subMenu: null,
								onClick: ({ Item }) => {
									console.log({ onClick: { Item } });
								},
								mode: 'navigation',
							},
							{
								name: 'second_level_2',
								title: 'Second level 2',
								url: '#',
								icon: {
									provider: 'icomoon',
									name: 'firefox',
								},
								subMenu: [
									{
										name: 'third_level_1',
										title: 'Third level 1',
										url: '#',
										icon: {
											provider: 'icomoon',
											name: 'android',
										},
										subMenu: null,
									},
									{
										name: 'third_level_2',
										title: 'Third level 2',
										url: '#',
										icon: {
											provider: 'icomoon',
											name: 'apple2',
										},
										subMenu: [
											{
												name: 'fourth_level_1',
												title: 'Fourth level 1',
												url: '#',
												icon: {
													provider: 'icomoon',
													name: 'html5',
												},
												subMenu: null,
											},
											{
												name: 'fourth_level_2',
												title: 'Fourth level 2',
												url: '#',
												icon: {
													provider: 'icomoon',
													name: 'css3',
												},
												subMenu: null,
											},
										],
									},
									{
										name: 'third_level_3',
										title: 'Third level 3',
										url: '#',
										icon: {
											provider: 'icomoon',
											name: 'windows',
										},
										subMenu: null,
									},
								],
							},
							{
								name: 'second_level_3',
								title: 'Second level 3',
								url: '#',
								icon: {
									provider: 'icomoon',
									name: 'chrome',
								},
								subMenu: null,
							},
						],
					},
				]}
			/>
		</ExampleHolder>
	);
};

export default Example;
