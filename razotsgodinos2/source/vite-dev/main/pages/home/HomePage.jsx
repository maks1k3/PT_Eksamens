// HomePage.jsx
import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Hero from './components/hero/Hero';
import Center from './components/center/Center';
import Projects from './components/projects/Projects';
import About from './components/about/About';
import Prices from './components/prices/Prices';
import Review from './components/review/Review';
import Contact from './components/contact/Contact';

const propTypes = {};
const defaultProps = {};

const uiProps = () => ({});

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectsItems: [],
			projectsLoading: true,
		};
	}

	componentDidMount() {
		this.getProjects();
	}

	getProjects = () => {
		this.setState({ projectsLoading: true });

		remoteRequest({
			url: 'blog/search',
			data: {
				category_id: null,
			},
			onSuccess: (response) => {
				this.setState({
					projectsLoading: false,
					projectsItems: response.rows || [],
				});
			},
			onError: (response) => {
				this.setState({ projectsLoading: false, projectsItems: [] });
				showAlert({ content: response.msg });
			},
		});
	};

	render() {
		const { projectsItems, projectsLoading } = this.state;

		return (
			<>
				<Hero />
				<Center />
				<Projects items={projectsItems} loading={projectsLoading} />
				<About />
				<Prices items={projectsItems} loading={projectsLoading} />

				<Review />
				<Contact />
			</>
		);
	}
}

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default WithUi(uiProps)(HomePage);
