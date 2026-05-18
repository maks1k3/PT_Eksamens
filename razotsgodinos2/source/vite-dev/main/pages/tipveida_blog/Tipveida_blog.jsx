import React, { PureComponent as Component } from 'react';
import Hero from './components/hero/Hero';
import Items from './components/items/Items';

class TipveidaPage extends Component {
	state = {
		items: [],
		loading: true,
	};

	componentDidMount() {
		remoteRequest({
			url: 'blog/search',
			onSuccess: (res) => {
				this.setState({
					items: res.rows || [],
					loading: false,
				});
			},
		});
	}

	render() {
		const { items, loading } = this.state;

		return (
			<Hero>
				<Items items={items} loading={loading} showTipveida={true} />
			</Hero>
		);
	}
}

export default TipveidaPage;
