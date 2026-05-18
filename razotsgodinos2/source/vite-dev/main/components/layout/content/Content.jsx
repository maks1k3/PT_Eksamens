import WithUi from 'hoc/store/ui';
import { get } from 'lodash-es';
import PrivacyPolicy from 'main/info_pages/privacy_policy/PrivacyPolicy';
import BlogPage from 'main/pages/blog/BlogPage';
import BlogOpenPage from 'main/pages/blog_open/BlogOpenPage';
import HomePage from 'main/pages/home/HomePage';
import AboutPage from 'main/pages/about_us/AboutPage';
import PropTypes from 'prop-types';
import PriceCalculator from 'main/pages/calculator/PriceCalculator';
import Contacts from 'main/pages/contacts/Contacts';
import Tipveida_blog from 'main/pages/tipveida_blog/Tipveida_blog';

const uiProps = (ownProps) => {
	return {
		Page: {
			current: 'current',
		},
	};
};

function Content(props) {
	const { current } = props;

	const pageRenderer = {
		home: <HomePage />,
		blog: <BlogPage />,
		blog_entry: <BlogOpenPage />,
		about_us: <AboutPage />,
		price_calculator: <PriceCalculator />,
		privacy_policy: <PrivacyPolicy />,
		contacts: <Contacts />,
		tipveida_blog: <Tipveida_blog />,
	};

	const page = get(pageRenderer, current, null);
	console.log('Page.current:', current);
	console.log('RAW:', JSON.stringify(current));
	console.log('TRIM:', JSON.stringify(String(current || '').trim()));

	return (
		<div className="flex-grow flex-shrink w-full">{page ?? 'wrong page'}</div>
	);
}

Content.propTypes = {
	current: PropTypes.any,
};

Content.defaultProps = {
	current: null,
};

export default WithUi(uiProps)(Content);
